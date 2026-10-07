"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BlurText } from "./motion/Reveal";
import { useIntroDone } from "./layout/Preloader";

/** Light editorial page opener used by inner pages. */
export function PageHero({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro: string; aside?: ReactNode }) {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory pb-20 pt-40 md:pb-28 md:pt-52">
      <div className="container-lux grid gap-12 lg:grid-cols-12 lg:items-end">
        <motion.div style={{ y }} className="lg:col-span-8">
          <motion.p
            className="eyebrow text-stone"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.p>
          <BlurText text={title} as="h1" trigger={ready} delay={0.1} className="display mt-8 text-[clamp(3.6rem,10vw,10rem)] leading-[0.9]" />
          <motion.p
            className="mt-10 max-w-xl text-lg leading-relaxed text-stone"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            {intro}
          </motion.p>
        </motion.div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>
    </section>
  );
}
