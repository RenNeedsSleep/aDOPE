import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CORE_TEAM_DATA } from '../data/mockData';
import { CoreTeamMember } from '../types';
import { ImageSkeleton, LoadingImage } from './LoadingImage';

interface CoreTeamSectionProps {
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
}

interface TeamCardProps {
  member: CoreTeamMember;
  index: number;
  highlightedImageId: string | null;
  onImageEnter: (imageId: string) => void;
  onImageLeave: (imageId: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  member,
  index,
  highlightedImageId,
  onImageEnter,
  onImageLeave,
}) => {
  const reduceMotion = useReducedMotion();
  const imageId = `team-${member.id}`;
  const isHighlighted = highlightedImageId === imageId;

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.38, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() =>
        window.matchMedia('(hover: hover)').matches && member.imageUrl && onImageEnter(imageId)
      }
      onPointerLeave={() =>
        window.matchMedia('(hover: hover)').matches && member.imageUrl && onImageLeave(imageId)
      }
      onClick={() =>
        window.matchMedia('(hover: none)').matches && member.imageUrl && onImageEnter(imageId)
      }
      className="group relative flex min-w-0 flex-col overflow-hidden border border-white/12 bg-neutral-950/80 shadow-[0_16px_44px_rgba(0,0,0,0.55)] transition-all duration-200 hover:border-white/40 hover:shadow-[0_24px_52px_rgba(255,255,255,0.04)]"
    >
      {/* Natural-ratio portrait frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        {member.imageUrl ? (
          <LoadingImage
            src={member.imageUrl}
            alt={member.name}
            className="absolute inset-0"
            imageClassName={`h-full w-full object-cover ${
              member.imageUrl === '/krish-srk.jpeg' ? 'object-[center_38%]' : 'object-top'
            } transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
            style={{
              filter: isHighlighted
                ? 'none'
                : 'grayscale(0.8) contrast(1.08) brightness(0.9)',
            }}
          />
        ) : (
          <ImageSkeleton className="bg-neutral-950" />
        )}

        {/* Index badge */}
        <span className="absolute left-3 top-3 border border-white/20 bg-black/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Bottom gradient for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Details below photo */}
      <div className="flex flex-col gap-1.5 px-5 py-4 sm:px-6 sm:py-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-400 sm:text-[10px]">
          {member.role}
        </span>
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
          {member.name}
        </h3>
        {member.bio && (
          <p className="mt-1 text-xs leading-relaxed text-neutral-400 sm:text-sm line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </motion.article>
  );
};

export const CoreTeamSection: React.FC<CoreTeamSectionProps> = ({
  highlightedImageId,
  onImageEnter,
  onImageLeave,
}) => {
  const reduceMotion = useReducedMotion();
  const teamMembers = CORE_TEAM_DATA.filter((m) => m.name && m.name.trim() !== '');

  return (
    <section
      id="team"
      className="relative z-20 border-b border-white/10 bg-black py-12 sm:py-28 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-10 sm:mb-14">
          <div>
            <motion.span
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-2 block font-mono text-[9px] uppercase tracking-[0.21em] text-neutral-500 sm:text-[10px]"
            >
              04 // Core team / 2026
            </motion.span>
            <motion.h2
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.03 }}
              className="text-2xl font-extrabold uppercase tracking-[-0.06em] text-white sm:text-4xl md:text-5xl"
            >
              The people behind aDOPE
            </motion.h2>
          </div>
          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.06 }}
            className="max-w-md text-xs leading-relaxed text-neutral-400 sm:text-sm"
          >
            The organisers, designers, and faculty mentors turning campus moments into lasting design work.
          </motion.p>
        </div>

        {/* Divider */}
        <div className="mb-10 sm:mb-14 h-px bg-white/15" />

        {/* Row-first grid keeps the roster in reading order at every breakpoint. */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              highlightedImageId={highlightedImageId}
              onImageEnter={onImageEnter}
              onImageLeave={onImageLeave}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[9px]">
          <span>Collective Direction // MGIT Hyderabad</span>
          <span>{teamMembers.length} Leaders // One Studio</span>
        </div>
      </div>
    </section>
  );
};
