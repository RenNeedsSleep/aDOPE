import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * Mission & Ethos — a single-screen layout that triggers its entrance
 * animation as soon as 30 % of the section enters the viewport.
 * No sticky / pinned scroll, no dead-scroll space.
 */
export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 92, damping: 26, mass: 0.34 });
  const titleX = useTransform(progress, [0, 0.35, 1], ['-12vw', '0vw', '0vw']);
  const titleScale = useTransform(progress, [0, 0.38, 1], [0.94, 1, 1]);
  const titleRotate = useTransform(progress, [0, 0.38, 1], [-2.5, 0, 0]);
  const titleOpacity = useTransform(progress, [0, 0.18, 1], [0.35, 1, 1]);
  const statementX = useTransform(progress, [0, 0.35, 1], ['12vw', '0vw', '0vw']);
  const statementOpacity = useTransform(progress, [0, 0.2, 1], [0.25, 1, 1]);
  const lineScale = useTransform(progress, [0.08, 0.42], [0, 1]);
  const orbit = useTransform(progress, [0, 1], [-22, 138]);

  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0 };
  const animate = { opacity: 1 };
  const vp = { once: true, amount: 0.3 } as const;

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    updateDesktop();
    desktopQuery.addEventListener('change', updateDesktop);
    return () => desktopQuery.removeEventListener('change', updateDesktop);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 h-[155svh] overflow-clip border-b border-white/10 bg-black sm:h-[165svh]"
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[580px] items-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:clamp(48px,7vw,104px)_clamp(48px,7vw,104px)]" />

        {/* Orbiting decoration */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-16vw] top-[12%] h-[46vw] w-[46vw] rounded-full border border-white/10 sm:left-[-9vw] sm:h-[32vw] sm:w-[32vw]"
          initial={initial}
          whileInView={animate}
          viewport={vp}
          style={reduceMotion || !isDesktop ? undefined : { rotate: orbit }}
        >
          <span className="absolute -right-1 top-1/2 hidden h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_22px_7px_rgba(255,255,255,.25)] sm:block" />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18vw] bottom-[-10vw] h-[48vw] w-[48vw] rounded-full border border-white/10 sm:-right-[9vw] sm:h-[35vw] sm:w-[35vw]"
          initial={initial}
          whileInView={animate}
          viewport={vp}
          style={reduceMotion || !isDesktop ? undefined : { rotate: orbit }}
        >
          <span className="absolute left-0 top-[20%] hidden h-3 w-3 rounded-full border border-white/60 bg-black sm:block" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 md:px-16">
          <motion.div
            className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:mb-8 sm:text-[10px]"
            initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            01 // Mission &amp; Ethos
          </motion.div>

          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
            {/* Title */}
            <motion.div
              className="relative z-10"
              style={reduceMotion
                ? undefined
                : isDesktop
                  ? { x: titleX, scale: titleScale, rotate: titleRotate, opacity: titleOpacity }
                  : { opacity: titleOpacity }}
            >
              <h2 className="text-[clamp(1.8rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.07em] text-white sm:text-[clamp(2.4rem,5.6vw,5.5rem)]">
                Artists,<br />
                Designers &amp;<br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.72)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,.72)]">The Originals</span>
              </h2>
            </motion.div>

            {/* Bio / Statement */}
            <motion.div
              className="relative z-10 max-w-xl"
              style={reduceMotion
                ? undefined
                : isDesktop
                  ? { x: statementX, opacity: statementOpacity }
                  : { opacity: statementOpacity }}
            >
              <motion.div
                className="mb-5 h-px origin-left bg-white/60"
                style={reduceMotion || !isDesktop ? undefined : { scaleX: lineScale }}
              />
              <p className="text-[clamp(1.05rem,1.4vw,1.38rem)] leading-[1.48] text-neutral-200">
                aDOPE is the design club of Mahatma Gandhi Institute of Technology in Hyderabad. It brings student creatives together to make identities, posters, editorial work, digital art, interfaces, and merchandise for campus culture.
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
