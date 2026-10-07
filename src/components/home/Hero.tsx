"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { media } from "@/lib/media";
import { Photo } from "../Photo";
import { Arrow } from "../layout/Arrow";
import { BlurText } from "../motion/Reveal";
import { useIntroDone } from "../layout/Preloader";

const slides = [
  {
    title: "The art of\n*the kitchen.*",
    collection: "Notte Collection",
    finish: "Canaletto Walnut · Nero Marquina",
    image: media.hero[0],
  },
  {
    title: "Designed in Italy.\n*Made for living.*",
    collection: "Linea Collection",
    finish: "Alabastro Lacquer · Calacatta Oro",
    image: media.hero[1],
  },
  {
    title: "Where stone\n*meets silence.*",
    collection: "Pietra Collection",
    finish: "Grafite · Taj Mahal Quartzite",
    image: media.hero[2],
  },
];

const DURATION = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ready = useIntroDone();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (!ready || paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, ready, paused, go]);

  const slide = slides[index];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-char text-ivory" aria-roledescription="carousel">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, clipPath: "inset(0% 0% 0% 100%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.18 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
            >
              <Photo media={slide.image} priority sizes="100vw" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Preload the remaining slides so transitions never wait. */}
        <div className="hidden">
          {slides.map((s, i) => i !== index && <Photo key={i} media={s.image} />)}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,14,0.72)_0%,rgba(18,16,14,0.35)_45%,rgba(18,16,14,0.1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.45)_0%,transparent_25%,transparent_65%,rgba(18,16,14,0.6)_100%)]" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-lux relative flex h-full flex-col justify-center">
        <motion.p
          className="eyebrow text-[0.66rem] text-ivory/80"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          Italian design <span className="mx-2 opacity-50">·</span> Crafted for American homes
        </motion.p>

        <div className="relative mt-8 min-h-[2.1em] text-[clamp(3.4rem,9vw,9.5rem)]">
          <AnimatePresence mode="wait">
            <motion.div key={index} exit={{ opacity: 0, filter: "blur(14px)", y: -20 }} transition={{ duration: 0.6, ease }}>
              <BlurText text={slide.title} as="h1" trigger={ready} delay={0.15} stagger={0.08} className="display leading-[0.92]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease, delay: 0.6 }}
        >
          <Link
            href="/products"
            className="pointer-events-auto group inline-flex items-center gap-5 border border-ivory/40 px-7 py-5 eyebrow text-[0.66rem] backdrop-blur-sm transition-colors duration-500 hover:bg-ivory hover:text-ink"
          >
            Discover our collections
            <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.7, ease }}
              className="text-sm"
            >
              <p className="font-serif text-xl italic">{slide.collection}</p>
              <p className="eyebrow mt-1 text-[0.6rem] text-ivory/60">{slide.finish}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        className="container-lux absolute inset-x-0 bottom-0 grid grid-cols-2 items-end pb-8 md:grid-cols-3 md:pb-10"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        <div className="flex items-center gap-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => go(i)} className="group flex flex-col gap-3 text-left" aria-label={`Show ${s.collection}`}>
              <span className={clsx("eyebrow text-[0.6rem] transition-opacity", i === index ? "opacity-100" : "opacity-50 group-hover:opacity-80")}>
                0{i + 1}
              </span>
              <span className="relative block h-px w-12 overflow-hidden bg-ivory/25 md:w-20">
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-0 origin-left bg-ivory"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: ready && !paused ? 1 : 0.02 }}
                    transition={{ duration: ready && !paused ? DURATION / 1000 : 0.3, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden justify-self-center md:flex md:flex-col md:items-center md:gap-3">
          <span className="eyebrow text-[0.6rem] text-ivory/80">Scroll to explore</span>
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
            <span className="animate-scroll-cue absolute inset-0 bg-ivory" />
          </span>
        </div>
        <p className="eyebrow justify-self-end text-[0.6rem] text-ivory/80">Est. 1968</p>
      </motion.div>
    </section>
  );
}
