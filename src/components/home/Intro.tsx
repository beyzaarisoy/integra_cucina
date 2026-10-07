"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { media } from "@/lib/media";
import { Photo } from "../Photo";
import { Arrow } from "../layout/Arrow";
import { BlurText, CountUp, ImageReveal, Reveal, ScrollWords } from "../motion/Reveal";

export function Intro() {
  return (
    <section className="relative bg-ivory pb-28 pt-28 md:pb-40 md:pt-40">
      <div className="container-lux grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="eyebrow text-stone">Our philosophy</p>
            <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-stone">
              Founded in Treviso in 1968 and at home in America for over two decades.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrollWords
            className="display text-[clamp(2.1rem,4.4vw,4.6rem)] leading-[1.06]"
            text="We believe a kitchen should feel *inevitable* — every line, every grain and every vein of stone placed with intention, so the room simply feels *right* the moment you walk in."
          />
        </div>
      </div>

      <div className="container-lux mt-24 grid gap-12 md:mt-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <BlurText
            text={"Timeless kitchens,\ncrafted for *modern living.*"}
            className="display text-4xl md:text-6xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-[0.98rem] leading-relaxed text-stone">
              From the first sketch to the final fitting, a single team designs, builds and installs your kitchen. Italian
              proportions, European materials and the precision of joinery made to the millimetre.
            </p>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-3 bg-ink px-6 py-4 eyebrow text-[0.64rem] text-ivory">
              More about us
              <Arrow direction="right" className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {[
              { n: 58, s: "", l: "Years of craft" },
              { n: 2400, s: "+", l: "US kitchens" },
              { n: 98, s: "%", l: "Client referral" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={0.1 * i}>
                <CountUp to={s.n} suffix={s.s} className="display block text-4xl md:text-5xl" />
                <p className="eyebrow mt-3 text-[0.58rem] text-stone">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-7">
          <ImageReveal className="col-span-2 aspect-[16/10] bg-bone">
            <Photo media={{ src: "/images/kitchen-midnight-calacatta-oro.jpg", alt: "Notte lacquer kitchen with Calacatta Oro island" }} position="50% 60%" />
          </ImageReveal>
          <ImageReveal className="aspect-[4/5] bg-bone" delay={0.15}>
            <Photo media={{ src: "/images/pantry-canaletto-walnut-nero-marquina.jpg", alt: "Walnut pocket-door pantry" }} />
          </ImageReveal>
          <ImageReveal className="aspect-[4/5] bg-bone" delay={0.3}>
            <Photo media={{ src: "/images/detail-sage-arabescato.jpg", alt: "Salvia lacquer cabinetry with Arabescato marble" }} />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}

/** A framed image that grows to full bleed as it is scrolled into the centre of the screen. */
export function ExpandingImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const clip = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(exit, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[110svh] bg-ivory">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Photo media={media.expand} sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
          <motion.div style={{ y: textY }} className="container-lux absolute inset-x-0 bottom-0 pb-16 text-ivory md:pb-24">
            <p className="eyebrow text-[0.64rem] text-ivory/80">Showroom · New York</p>
            <BlurText text={"A kitchen is the room\n*you live in most.*"} className="display mt-5 text-5xl md:text-8xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
