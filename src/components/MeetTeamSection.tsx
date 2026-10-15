import React, { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as THREE from 'three';

const PIXEL_REVEAL_ORDER = Array.from({ length: 96 }, (_, index) => index)
  .sort((left, right) => ((left * 37) % 97) - ((right * 37) % 97));

interface MeetTeamSectionProps {
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
}

export const MeetTeamSection: React.FC<MeetTeamSectionProps> = ({ highlightedImageId, onImageEnter, onImageLeave }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hasPhotoEntered = useInView(photoRef, { once: true, amount: 0.2 });
  const clubPhotoId = 'club-photo';
  const isHighlighted = highlightedImageId === clubPhotoId;

  // Three.js ambient cosmic star/particle background
  useEffect(() => {
    const mount = canvasRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 18;

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Subtle drifting star/particle field
    const particleCount = 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.32,
    });
    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.0006;
      particleSystem.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      pMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section aria-label="Meet the team" className="relative z-20 h-[82svh] overflow-clip bg-black sm:h-[132svh]">
      <div className="sticky top-0 flex h-[82svh] min-h-[82svh] flex-col items-center justify-center gap-[2svh] border-b border-white/10 bg-black px-4 py-4 sm:h-[100svh] sm:min-h-[100svh] sm:justify-between sm:gap-0 sm:py-8 md:py-10">
        {/* Three.js Motion Canvas (Particles) in the background */}
        <div ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

        {/* Ambient radial lighting */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_46%,rgba(255,255,255,0.05),transparent_68%)]" />

        <div
          className="relative z-20 flex w-full flex-col items-center justify-center text-center"
        >
          <span className="relative z-10 mb-2 block font-mono text-[9px] uppercase tracking-[0.21em] text-neutral-400 sm:text-[10px]">
            03 // The Collective · Made Together
          </span>
          <h2 className="relative z-10 text-[clamp(2.5rem,6.2vw,5.8rem)] font-extrabold uppercase leading-none tracking-[-0.06em] text-white">
            MEET THE TEAM
          </h2>
        </div>

        <motion.div
          ref={photoRef}
          className="relative z-10 mx-auto flex max-h-[40svh] w-full max-w-[840px] items-center justify-center sm:max-h-[58svh]"
          onPointerEnter={() => window.matchMedia('(hover: hover)').matches && onImageEnter(clubPhotoId)}
          onPointerLeave={() => window.matchMedia('(hover: hover)').matches && onImageLeave(clubPhotoId)}
          onClick={() => window.matchMedia('(hover: none)').matches && onImageEnter(clubPhotoId)}
        >
          {/* Central Team Photo */}
          <img
            src="/adope-club-photo.jpeg"
            alt="aDOPE club members and faculty together at MGIT"
            className="block h-auto max-h-[40svh] w-auto max-w-full border border-white/15 object-contain shadow-2xl transition-all duration-200 sm:max-h-[58svh]"
            style={{
              filter: isHighlighted ? 'none' : 'grayscale(1) contrast(1.05)',
            }}
          />
          {!reduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 grid grid-cols-12 grid-rows-8"
            >
              {PIXEL_REVEAL_ORDER.map((tileIndex, revealOrder) => (
                <motion.span
                  key={tileIndex}
                  className="border border-white/[0.07] bg-[#b1b4b6]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: hasPhotoEntered ? 0 : 1 }}
                  transition={{
                    duration: 0.28,
                    delay: revealOrder * 0.009,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
