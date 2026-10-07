"use client";

import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { media } from "@/lib/media";
import { bestsellers } from "@/lib/products";
import { Photo } from "../Photo";
import { Arrow } from "../layout/Arrow";
import { BlurText, Reveal } from "../motion/Reveal";
import { ProductCard } from "../product/ProductCard";

const collections = [
  { id: "aria", name: "Aria", line: "Warm minimalism in natural oak", m: media.collections.aria },
  { id: "linea", name: "Linea", line: "Handleless lacquer, perfectly quiet", m: media.collections.linea },
  { id: "pietra", name: "Pietra", line: "Architecture carved in stone", m: media.collections.pietra },
  { id: "notte", name: "Notte", line: "Walnut and marble, after dark", m: media.collections.notte },
  { id: "villa", name: "Villa", line: "Modern shaker, Italian proportions", m: media.collections.villa },
];

export function Collections() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-stone">The collections</p>
            </Reveal>
            <BlurText text={"Five kitchens,\n*one language.*"} className="display mt-6 text-5xl md:text-7xl" />
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-stone">
              Each collection is a complete architectural system — fronts, surfaces, storage and lighting designed together and
              tailored to your floor plan.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 hidden h-[78vh] max-h-[760px] min-h-[520px] gap-3 lg:flex" y={60}>
          {collections.map((c, i) => (
            <Link
              key={c.id}
              href={`/products?category=kitchens`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={clsx(
                "group relative overflow-hidden bg-bone transition-[flex-grow] duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)]",
                active === i ? "grow-[5]" : "grow",
              )}
              style={{ flexBasis: 0 }}
            >
              <div className={clsx("absolute inset-0 transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)]", active === i ? "scale-100" : "scale-110")}>
                <Photo media={c.m} sizes="60vw" />
              </div>
              <div className={clsx("absolute inset-0 transition-colors duration-700", active === i ? "bg-black/15" : "bg-black/45")} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 eyebrow text-[0.6rem] text-ivory/80">0{i + 1}</span>
              <span
                className={clsx(
                  "absolute bottom-8 left-6 origin-bottom-left -rotate-90 translate-x-[1.2em] whitespace-nowrap font-serif text-4xl text-ivory transition-opacity duration-500",
                  active === i ? "opacity-0" : "opacity-100 delay-300",
                )}
              >
                {c.name}
              </span>
              <div
                className={clsx(
                  "absolute inset-x-8 bottom-8 flex items-end justify-between gap-6 text-ivory transition-all duration-700",
                  active === i ? "translate-y-0 opacity-100 delay-300" : "translate-y-6 opacity-0",
                )}
              >
                <div>
                  <p className="display text-6xl xl:text-7xl">{c.name}</p>
                  <p className="mt-3 text-sm text-ivory/80">{c.line}</p>
                </div>
                <span className="eyebrow flex shrink-0 items-center gap-2 border border-ivory/40 px-5 py-3 text-[0.6rem] backdrop-blur-sm">
                  Explore <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:hidden">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.1}>
              <Link href="/products?category=kitchens" className="relative block aspect-[4/5] overflow-hidden bg-bone">
                <Photo media={c.m} sizes="90vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-ivory">
                  <p className="display text-5xl">{c.name}</p>
                  <p className="mt-2 text-sm text-ivory/80">{c.line}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Bestsellers() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState(0);
  const x = useMotionValue(0);
  const dragged = useRef(false);
  const progress = useTransform(x, (v) => 0.12 + 0.88 * (bounds ? Math.min(1, Math.max(0, -v / bounds)) : 0));

  useEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      setBounds(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const card = track.current?.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 400) + 24;
    animate(x, Math.min(0, Math.max(-bounds, x.get() - dir * w)), { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <section className="overflow-hidden bg-bone py-28 md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-stone">Most loved in America</p>
            </Reveal>
            <BlurText text={"*Bestsellers*"} className="display mt-6 text-6xl md:text-8xl" />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-stone">Tap a finish to see each piece transform. Every design is configurable in our full finish library.</p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="flex items-center gap-3">
            <button onClick={() => step(-1)} aria-label="Previous" className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 hover:bg-ink hover:text-ivory">
              <Arrow direction="left" />
            </button>
            <button onClick={() => step(1)} aria-label="Next" className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 hover:bg-ink hover:text-ivory">
              <Arrow direction="right" />
            </button>
          </Reveal>
        </div>

        <div ref={viewport} className="mt-16" data-cursor="Drag">
          <motion.div
            ref={track}
            className="flex w-max gap-6 active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -bounds, right: 0 }}
            dragElastic={0.06}
            dragTransition={{ power: 0.3, timeConstant: 320 }}
            style={{ x }}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
            onClickCapture={(e) => {
              if (dragged.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {bestsellers.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 4) * 0.08} className="w-[78vw] sm:w-[46vw] lg:w-[30vw] xl:w-[25vw] 3xl:w-[22rem]">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 flex items-center gap-8">
          <div className="relative h-px flex-1 bg-ink/15">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-ink" style={{ scaleX: progress }} />
          </div>
          <Link href="/products" className="eyebrow link-underline flex items-center gap-2 text-[0.64rem]">
            All products <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
