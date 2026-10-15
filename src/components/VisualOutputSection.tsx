import React, { useRef } from 'react';
import { Eye } from 'lucide-react';
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ARTWORKS_DATA } from '../data/mockData';
import { Artwork } from '../types';
import { NirvanaPhoenix } from './NirvanaPhoenix';
import { LoadingImage } from './LoadingImage';

interface VisualOutputSectionProps {
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

const ORBIT_STATES = [
  { entryX: '-64vw', entryY: '-34vh', settleX: '-31vw', settleY: '-22vh', exitX: '-36vw', exitY: '-27vh', entryRotate: -16, settleRotate: -7, exitRotate: -10 },
  { entryX: '66vw', entryY: '-36vh', settleX: '31vw', settleY: '-16vh', exitX: '37vw', exitY: '-22vh', entryRotate: 15, settleRotate: 8, exitRotate: 11 },
  { entryX: '-70vw', entryY: '39vh', settleX: '-33vw', settleY: '20vh', exitX: '-39vw', exitY: '25vh', entryRotate: 12, settleRotate: 6, exitRotate: 9 },
  { entryX: '70vw', entryY: '40vh', settleX: '33vw', settleY: '22vh', exitX: '39vw', exitY: '28vh', entryRotate: -15, settleRotate: -7, exitRotate: -10 },
  { entryX: '2vw', entryY: '75vh', settleX: '2vw', settleY: '34vh', exitX: '3vw', exitY: '41vh', entryRotate: 9, settleRotate: 2, exitRotate: 4 },
];

const DESIGN_TOOLS = [
  { name: 'Photoshop', src: '/tools/photoshop.png' },
  { name: 'Premiere Pro', src: '/tools/premiere.png' },
  { name: 'DaVinci Resolve', src: '/tools/davinci.png' },
  { name: 'Figma', src: '/tools/figma.png' },
  { name: 'After Effects', src: '/tools/aftereffects.png' },
];

interface OrbitArtworkProps {
  art: Artwork;
  index: number;
  progress: MotionValue<number>;
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

const OrbitArtwork: React.FC<OrbitArtworkProps> = ({ art, index, progress, highlightedImageId, onImageEnter, onImageLeave, onSelectArtwork }) => {
  const reduceMotion = useReducedMotion();
  const state = ORBIT_STATES[index];
  const imageId = `work-${art.id}`;
  const isHighlighted = highlightedImageId === imageId;
  const enterStart = index * 0.1;
  const enterEnd = 0.17 + index * 0.1;
  const exitStart = 0.62 + index * 0.065;
  const x = useTransform(progress, [enterStart, enterEnd, exitStart, 1], [state.entryX, state.settleX, state.settleX, state.exitX]);
  const y = useTransform(progress, [enterStart, enterEnd, exitStart, 1], [state.entryY, state.settleY, state.settleY, state.exitY]);
  const rotate = useTransform(progress, [enterStart, enterEnd, exitStart, 1], [state.entryRotate, state.settleRotate, state.settleRotate, state.exitRotate]);
  const scale = useTransform(progress, [enterStart, enterEnd, exitStart, 1], [0.56, 1, 1, 0.88]);
  const opacity = useTransform(progress, [enterStart, enterEnd, exitStart, 1], [0, 1, 1, 0.72]);
  const imageScale = useTransform(progress, [enterStart, enterEnd, 1], [1.17, 1.04, 1.1]);

  return (
    <motion.article
      onPointerEnter={() => window.matchMedia('(hover: hover)').matches && onImageEnter(imageId)}
      onPointerLeave={() => window.matchMedia('(hover: hover)').matches && onImageLeave(imageId)}
      onClick={() => onSelectArtwork(art)}
      className="absolute left-1/2 top-1/2 z-20 w-[43vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 cursor-pointer will-change-transform sm:w-[25vw] sm:max-w-[390px]"
      style={reduceMotion ? { x: state.settleX, y: state.settleY, rotate: state.settleRotate, zIndex: 20 + index } : { x, y, rotate, scale, opacity, zIndex: 20 + index }}
    >
      <div className="group relative aspect-[1.12] overflow-hidden border border-white/20 bg-black shadow-[0_26px_66px_rgba(0,0,0,.42)]">
        <LoadingImage
          src={art.imageUrl}
          alt=""
          className="absolute inset-0"
          imageClassName="h-full w-full object-cover object-center transition duration-700"
          style={{
            filter: isHighlighted ? 'none' : 'grayscale(1) contrast(1.08)',
            scale: reduceMotion ? 1.04 : imageScale,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.8),transparent_58%)]" />
        <span className="absolute left-2.5 top-2.5 border border-white/20 bg-black/40 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-white/75 backdrop-blur-sm sm:text-[8px]">{art.category}</span>
        <Eye className="absolute right-2.5 top-2.5 h-4 w-4 text-white/0 transition group-hover:text-white/80" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4">
          <span className="mb-1 block font-mono text-[7px] uppercase tracking-[0.14em] text-white/60 sm:text-[8px]">{art.artistName} · {art.year}</span>
          <h3 className="text-base font-extrabold leading-none tracking-[-0.045em] text-white sm:text-xl">{art.title}</h3>
        </div>
      </div>
    </motion.article>
  );
};

/** The archive resolves into a moving orbit: artwork arrives on independent routes around the draggable Nirvana core. */
export const VisualOutputSection: React.FC<VisualOutputSectionProps> = ({ highlightedImageId, onImageEnter, onImageLeave, onSelectArtwork }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 82, damping: 24, mass: 0.38 });
  const headerY = useTransform(progress, [0, 0.28], ['0vh', '-6vh']);
  const headerOpacity = useTransform(progress, [0, 0.05, 0.24], [1, 1, 0]);
  const coreY = useTransform(progress, [0, 0.5, 1], ['13vh', '0vh', '-4vh']);
  const coreScale = useTransform(progress, [0, 0.42, 1], [0.76, 1, 1.08]);
  const coreGlow = useTransform(progress, [0, 0.48, 1], [0.2, 0.76, 0.45]);
  const archivePieces = ARTWORKS_DATA.filter((art) => art.id !== 'art-nirvana-2026');

  return (
    <section ref={sectionRef} id="work" className="relative z-20 h-[330svh] overflow-clip border-b border-white/10 bg-black sm:h-[300svh]">
      <div className="sticky top-0 h-[100svh] min-h-[650px] overflow-hidden">

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,169,85,.12),transparent_35%),radial-gradient(ellipse_at_80%_8%,rgba(255,255,255,.06),transparent_26%)]" />

        <motion.header className="absolute left-4 right-4 top-6 z-40 flex items-start justify-between gap-5 sm:left-6 sm:right-6 sm:top-8 md:left-16 md:right-16 md:top-10" style={reduceMotion ? undefined : { y: headerY, opacity: headerOpacity }}>
          <div>
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.21em] text-neutral-400 sm:text-[10px]">05 // A living archive</span>
            <h2 className="text-[clamp(2.6rem,6.8vw,7.6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.06em] text-white">Design<br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.72)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,.72)]">Orbit</span></h2>
          </div>
          <div className="hidden max-w-[19rem] pt-2 text-right sm:block">
            <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.17em] text-white/52">Each fragment follows its own route.<br />The Nirvana mark holds the system together.</span>
          </div>
        </motion.header>

        <motion.div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(66vw,640px)] w-[min(66vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,175,90,.21),rgba(255,175,90,.04)_42%,transparent_69%)] blur-2xl" style={reduceMotion ? undefined : { opacity: coreGlow }} />
        <motion.div
          aria-label="Design tools orbit"
          role="group"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[15] h-[min(88vw,900px)] w-[min(88vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={reduceMotion ? undefined : { duration: 48, ease: 'linear', repeat: Infinity }}
        >
          {DESIGN_TOOLS.map((tool, index) => {
            const angle = (index / DESIGN_TOOLS.length) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 50;
            const top = 50 + Math.sin(angle) * 50;

            return (
              <span
                key={tool.name}
                title={tool.name}
                className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/80 p-1.5 sm:h-9 sm:w-9"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <img src={tool.src} alt={tool.name} className="h-full w-full object-contain grayscale" />
              </span>
            );
          })}
        </motion.div>
        {/* Seamless 3D Nirvana Phoenix mark without the black box frame */}
        <motion.div className="absolute left-1/2 top-1/2 z-10 h-[min(64vw,610px)] w-[min(72vw,720px)] -translate-x-1/2 -translate-y-1/2" style={reduceMotion ? undefined : { y: coreY, scale: coreScale }}>
          <NirvanaPhoenix />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20 font-mono text-[8px] uppercase tracking-[0.15em] text-white/48 sm:bottom-6 sm:text-[9px]">Drag the mark to rotate</div>
        </motion.div>

        {archivePieces.map((art, index) => (
          <OrbitArtwork key={art.id} art={art} index={index} progress={progress} highlightedImageId={highlightedImageId} onImageEnter={onImageEnter} onImageLeave={onImageLeave} onSelectArtwork={onSelectArtwork} />
        ))}

        <div className="pointer-events-none absolute bottom-5 left-4 right-4 z-40 flex items-end justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-white/46 sm:bottom-8 sm:left-6 sm:right-6 sm:text-[9px] md:left-16 md:right-16">
          <span>Scroll to map the archive</span><span>{String(archivePieces.length + 1).padStart(2, '0')} fragments / no fixed order</span>
        </div>
      </div>
    </section>
  );
};
