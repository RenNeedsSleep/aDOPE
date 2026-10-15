import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { LOGO_URL } from '../data/mockData';
import {
  getDevicePerformanceProfile,
  subscribeToDevicePerformanceProfile,
} from '../utils/devicePerformance';
import { ImageSkeleton } from './LoadingImage';

const VIDEO_SRC = '/intro-4k.mp4';
const MOBILE_VIDEO_SRC = '/intro-mobile.mp4';

export const Hero: React.FC = () => {
  const [performanceProfile, setPerformanceProfile] = useState(getDevicePerformanceProfile);
  const [videoSrc, setVideoSrc] = useState(() => {
    const profile = getDevicePerformanceProfile();
    return profile.isCoarsePointer || profile.isLowEndDevice || profile.isSlowConnection
      ? MOBILE_VIDEO_SRC
      : VIDEO_SRC;
  });
  const [coords, setCoords] = useState({ x: '0.00', y: '100.00' });
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrcRef = useRef(videoSrc);
  const introTextRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const updateVideoSource = () => {
      const profile = getDevicePerformanceProfile();
      const nextSource =
        profile.isCoarsePointer || profile.isLowEndDevice || profile.isSlowConnection
          ? MOBILE_VIDEO_SRC
          : VIDEO_SRC;
      setPerformanceProfile(profile);
      if (videoSrcRef.current !== nextSource) {
        videoSrcRef.current = nextSource;
        setVideoReady(false);
        setVideoSrc(nextSource);
      }
    };

    return subscribeToDevicePerformanceProfile(updateVideoSource);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Muted inline autoplay is supported by mobile browsers. If a device blocks
  // playback, leave the animated Three.js background visible as the fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    const attemptPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.play().then(() => {
        setVideoReady(true);
      }).catch(() => {
        setVideoReady(false);
      });
    };

    const onCanPlay = () => attemptPlayback();

    video.addEventListener('canplay', onCanPlay, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) attemptPlayback();

    return () => video.removeEventListener('canplay', onCanPlay);
  }, [videoFailed, videoSrc]);

  /* Scroll-driven morph: fullscreen video -> docked into hero-card slot */
  const applyProgress = useCallback(() => {
    const stage = stageRef.current;
    const slot = slotRef.current;
    const wrap = videoWrapRef.current;
    const introText = introTextRef.current;
    const heroContent = heroContentRef.current;
    if (!stage || !slot || !wrap) return;

    const eased = progressRef.current;
    const stageRect = stage.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    const vw = stageRect.width;
    const vh = stageRect.height;
    if (vw === 0 || vh === 0) return;

    // Slot center relative to stage center
    const dx = slotRect.left - stageRect.left + slotRect.width / 2 - vw / 2;
    const dy = slotRect.top - stageRect.top + slotRect.height / 2 - vh / 2;
    const tx = dx * eased;
    const ty = dy * eased;

    // Animate the frame itself instead of scaling it, so the video never
    // distorts while it returns to the intro box's native 16:9 aspect ratio.
    wrap.style.width = `${vw + (slotRect.width - vw) * eased}px`;
    wrap.style.height = `${vh + (slotRect.height - vh) * eased}px`;
    wrap.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px)`;
    wrap.style.borderRadius = '0px';
    wrap.style.boxShadow = eased > 0.05 ? '0 0 40px rgba(255,255,255,0.08)' : 'none';

    if (introText) {
      introText.style.opacity = String(Math.max(0, 1 - eased * 2));
      introText.style.transform = `translateY(${-eased * 60}px)`;
    }
    if (heroContent) {
      const reveal = Math.max(0, Math.min(1, (eased - 0.45) / 0.55));
      heroContent.style.opacity = String(reveal);
      heroContent.style.transform = `translateY(${(1 - reveal) * 40}px)`;
      heroContent.style.pointerEvents = reveal > 0.6 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let current = 0;

    const loop = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const target = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      current += (target - current) * 0.14;
      const isSettled = Math.abs(target - current) < 0.0005;
      if (isSettled) current = target;
      progressRef.current = current;
      applyProgress();
      rafId = isSettled ? 0 : requestAnimationFrame(loop);
    };

    const scheduleProgressUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate, { passive: true });
    scheduleProgressUpdate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);
    };
  }, [applyProgress]);

  const handleSkip = () => {
    setSkipped(true);
    const section = sectionRef.current;
    if (section) {
      const total = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: section.offsetTop + total, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-[220svh] bg-black border-b border-white/10 md:h-[280vh]"
    >
      <div ref={stageRef} className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Technical Measurements */}
        <div className="absolute top-24 left-8 z-30 font-mono text-[10px] text-white/30 hidden md:block select-none tracking-widest">
          X: {coords.x} / Y: {coords.y}
        </div>
        <div className="absolute top-24 right-8 z-30 font-mono text-[10px] text-white/30 hidden md:block select-none tracking-widest">
          W: 100% / H: 100VH
        </div>

        {/* 3D Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <ThreeCanvas className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        </div>

        {/* The morphing intro video */}
        <div
          ref={videoWrapRef}
          className="absolute left-1/2 top-1/2 z-20 w-full h-full overflow-hidden bg-transparent will-change-transform"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
            <ImageSkeleton className="z-0" />
            {!videoFailed && (
              <video
                ref={videoRef}
                className="absolute inset-0 z-10 h-full w-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlaying={() => {
                  setVideoReady(true);
                }}
                onWaiting={() => setVideoReady(false)}
                onError={() => setVideoFailed(true)}
                style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.6s' }}
              />
            )}
            {!videoReady && !videoFailed && (
              <div
                role="status"
                aria-live="polite"
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 px-6"
              >
                <div aria-hidden="true" className="w-40 space-y-2.5">
                  <div className="h-1 w-full overflow-hidden bg-white/15">
                    <div className="h-full w-1/3 animate-[loading-progress_1.8s_ease-in-out_infinite] bg-white/70" />
                  </div>
                  <div className="h-px w-2/3 animate-pulse bg-white/20" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                  {performanceProfile.isSlowConnection
                    ? 'Low data mode · Loading compact intro'
                    : 'Loading intro'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Intro title overlay — fades out as the video shrinks */}
        <div
          ref={introTextRef}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        />

        {!skipped && (
          <button
            onClick={handleSkip}
            className="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-50 flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:text-white border border-white/25 hover:border-white px-4 py-2 sm:bottom-8 sm:right-8 bg-black/40 backdrop-blur-sm transition-all"
          >
            Skip Intro <X className="w-3 h-3" />
          </button>
        )}

        {/* Hero card content (revealed once the video docks) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          <div
            ref={heroContentRef}
            className="relative opacity-0 container max-w-[960px] mx-auto flex flex-col items-center justify-center text-center border border-white/10 p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
          >
            {/* Video slot — the fullscreen video docks exactly here */}
            <div
              ref={slotRef}
              className="relative w-full max-w-[720px] aspect-video border border-white/15 overflow-hidden bg-black mb-5 sm:mb-8"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white z-10" />
              <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-widest text-white/40 z-10">
                REC ● ARCHIVE_00
              </span>
            </div>

            <img
              src={LOGO_URL}
              alt="aDOPE Logo"
              className="h-10 md:h-12 object-contain filter invert opacity-95 hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
