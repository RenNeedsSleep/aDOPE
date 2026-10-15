import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ARTISTS_DATA } from '../data/mockData';
import { Artist } from '../types';
import { LoadingImage } from './LoadingImage';

interface ArtistsSectionProps {
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
}

interface PracticeCardProps {
  artist: Artist;
  index: number;
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  artist,
  index,
  highlightedImageId,
  onImageEnter,
  onImageLeave,
}) => {
  const reduceMotion = useReducedMotion();
  const imageId = `artist-${artist.id}`;
  const isHighlighted = highlightedImageId === imageId;

  return (
    <motion.article
      aria-label={`${index + 1} of ${ARTISTS_DATA.length}: ${artist.name}`}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.42,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerEnter={() =>
        window.matchMedia('(hover: hover)').matches && onImageEnter(imageId)
      }
      onPointerLeave={() =>
        window.matchMedia('(hover: hover)').matches && onImageLeave(imageId)
      }
      onClick={() =>
        window.matchMedia('(hover: none)').matches && onImageEnter(imageId)
      }
      className="group relative isolate min-w-0 overflow-hidden border border-white/12 bg-neutral-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/40 hover:shadow-[0_28px_60px_rgba(255,255,255,0.04)]"
    >
      {/* Background image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <LoadingImage
          src={artist.avatarUrl}
          alt=""
          className="absolute inset-0"
          imageClassName="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{
            filter: isHighlighted ? 'none' : 'grayscale(1) contrast(1.09)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        {/* Top badge */}
        <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-3rem)] whitespace-nowrap border border-white/25 bg-black/70 px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-md sm:left-4 sm:top-4 sm:px-2.5 sm:tracking-[0.18em] sm:text-[9px]">
          Practice / {String(index + 1).padStart(2, '0')}
        </span>

        {/* Bottom content overlaid on image */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-white/55 sm:text-[10px]">
            {artist.role}
          </span>
          <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl">
            {artist.name}
          </h3>
        </div>
      </div>

      {/* Card body below image */}
      <div className="flex flex-col gap-4 border-t border-white/10 p-5 sm:p-7">
        <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm line-clamp-3">
          {artist.bio}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {artist.specialty.map((spec) => (
            <span
              key={spec}
              className="border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/65 sm:text-[9px]"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-4 top-4 h-5 w-5 text-white/40 transition-all duration-300 group-hover:text-white/80 sm:h-6 sm:w-6"
      />
    </motion.article>
  );
};

/**
 * Areas of Practice — a responsive grid of cards that animate in
 * naturally as the user scrolls. No sticky pinning, no scroll-jacking.
 */
export const ArtistsSection: React.FC<ArtistsSectionProps> = ({
  highlightedImageId,
  onImageEnter,
  onImageLeave,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="artists" className="relative z-20 border-b border-white/10 bg-black py-20 sm:py-28 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-16">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-2 block font-mono text-[9px] uppercase tracking-[0.21em] text-neutral-400 sm:text-[10px]"
            >
              02 // Disciplines in Motion
            </motion.span>
            <motion.h2
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.06 }}
              className="text-[clamp(1.8rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.07em] text-white sm:text-4xl md:text-5xl"
            >
              Areas of Practice
            </motion.h2>
          </div>
          <motion.span
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12 }}
            className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 sm:text-[10px]"
          >
            {String(ARTISTS_DATA.length).padStart(2, '0')} practices // one studio
          </motion.span>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px bg-white/15 sm:mb-14" />

        {/* Responsive card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-8">
          {ARTISTS_DATA.map((artist, index) => (
            <PracticeCard
              key={artist.id}
              artist={artist}
              index={index}
              highlightedImageId={highlightedImageId}
              onImageEnter={onImageEnter}
              onImageLeave={onImageLeave}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 sm:mt-16 sm:text-[9px]">
          <span>Design disciplines // aDOPE Studio</span>
          <span>MGIT Hyderabad // Since 2020</span>
        </div>
      </div>
    </section>
  );
};
