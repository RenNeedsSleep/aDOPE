import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Mission & Ethos — a single-screen layout that triggers its entrance
 * animation as soon as 30 % of the section enters the viewport.
 * No sticky / pinned scroll, no dead-scroll space.
 */
export const AboutSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0 };
  const animate = { opacity: 1 };
  const vp = { once: true, amount: 0.3 } as const;

  return (
    <section
      id="about"
      className="relative z-20 overflow-clip border-b border-white/10 bg-black"
    >
      <div className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:clamp(48px,7vw,104px)_clamp(48px,7vw,104px)]" />

        {/* Orbiting decoration */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-16vw] top-[12%] h-[46vw] w-[46vw] rounded-full border border-white/10 sm:left-[-9vw] sm:h-[32vw] sm:w-[32vw]"
          initial={initial}
          whileInView={animate}
          viewport={vp}
        >
          <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_22px_7px_rgba(255,255,255,.25)]" />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18vw] bottom-[-10vw] h-[48vw] w-[48vw] rounded-full border border-white/10 sm:-right-[9vw] sm:h-[35vw] sm:w-[35vw]"
          initial={initial}
          whileInView={animate}
          viewport={vp}
        >
          <span className="absolute left-0 top-[20%] h-3 w-3 rounded-full border border-white/60 bg-black" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 md:px-16 md:py-28">
          <motion.div
            className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:mb-8 sm:text-[10px]"
            initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            <span className="h-px w-10 bg-white/50" />
            01 // Mission &amp; Ethos
          </motion.div>

          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
            {/* Title */}
            <motion.div
              className="relative z-10"
              initial={reduceMotion ? {} : { opacity: 0, x: -60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(2.4rem,5.6vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.06em] text-white">
                Artists,<br />
                Designers &amp;<br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.72)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,.72)]">The Originals</span>
              </h2>
            </motion.div>

            {/* Bio / Statement */}
            <motion.div
              className="relative z-10 max-w-xl"
              initial={reduceMotion ? {} : { opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-5 h-px bg-white/60" />
              <p className="text-[clamp(1.05rem,1.4vw,1.38rem)] leading-[1.48] text-neutral-200">
                aDOPE is the design club of Mahatma Gandhi Institute of Technology in Hyderabad. It brings student creatives together to make identities, posters, editorial work, digital art, interfaces, and merchandise for campus culture.
              </p>
              <p className="mt-4 max-w-[55ch] text-xs leading-relaxed text-neutral-400 sm:mt-5 sm:text-sm">
                The club describes itself as a design team and digital art club. Its public archive shows a practice grounded in visual communication, collaborative briefs, and making memorable work for MGIT.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500 sm:mt-8">
                <span className="border border-white/15 px-2.5 py-1.5">MGIT / Hyderabad</span>
                <span className="border border-white/15 px-2.5 py-1.5">Since the first brief</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
