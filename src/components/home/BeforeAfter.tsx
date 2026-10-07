"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { BlurText, Reveal } from "../motion/Reveal";
import { Arrow } from "../layout/Arrow";

const presets = [
  { id: "midnight-calacatta-oro", name: "Notte & Calacatta Oro" },
  { id: "canaletto-walnut-nero-marquina", name: "Walnut & Nero Marquina" },
  { id: "graphite-taj-mahal", name: "Grafite & Taj Mahal" },
  { id: "sage-arabescato", name: "Salvia & Arabescato" },
  { id: "ebony-oak-pietra-grey", name: "Ebony Oak & Pietra Grey" },
];

export function BeforeAfter() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, amount: 0.45 });
  const pos = useMotionValue(88);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const [preset, setPreset] = useState(presets[0]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (inView) animate(pos, 50, { duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.3 });
  }, [inView, pos]);

  const setFromEvent = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-ivory pb-28 md:pb-40">
      <div className="container-lux">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-stone">Before & after</p>
            </Reveal>
            <BlurText text={"Same room.\n*A different soul.*"} className="display mt-6 text-5xl md:text-7xl" />
          </div>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-md text-stone">
              Drag across the image to compare. Our designers re-imagine the same architecture in a new palette — the
              proportions stay, the atmosphere changes completely.
            </p>
          </Reveal>
        </div>

        <Reveal y={60} className="mt-14">
          <div
            ref={frame}
            data-cursor="Drag"
            className="relative aspect-[4/5] select-none overflow-hidden bg-bone sm:aspect-[16/11] lg:aspect-[16/9]"
            style={{ touchAction: "pan-y" }}
            onPointerDown={(e) => {
              setDragging(true);
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setFromEvent(e.clientX);
            }}
            onPointerMove={(e) => dragging && setFromEvent(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/kitchen-natural-oak-travertino.jpg"
              alt="Original kitchen in natural oak and travertine"
              className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
              draggable={false}
            />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={preset.id}
                  src={`/images/kitchen-${preset.id}.jpg`}
                  alt={`Reimagined kitchen in ${preset.name}`}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            <motion.span className="absolute left-5 top-5 bg-bronze px-3 py-1.5 eyebrow text-[0.56rem] text-ivory" style={{ opacity: useTransform(pos, [0, 14], [0, 1]) }}>
              Reimagined
            </motion.span>
            <motion.span className="absolute right-5 top-5 bg-ivory px-3 py-1.5 eyebrow text-[0.56rem] text-ink" style={{ opacity: useTransform(pos, [86, 100], [1, 0]) }}>
              Original
            </motion.span>

            <motion.div className="absolute inset-y-0 w-px -translate-x-1/2 bg-ivory/90" style={{ left }}>
              <div
                className={clsx(
                  "absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-ivory text-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-300",
                  dragging && "scale-90",
                )}
                role="slider"
                aria-label="Comparison position"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") pos.set(Math.max(2, pos.get() - 5));
                  if (e.key === "ArrowRight") pos.set(Math.min(98, pos.get() + 5));
                }}
              >
                <Arrow direction="left" className="h-2.5 w-2.5" />
                <Arrow direction="right" className="h-2.5 w-2.5" />
              </div>
            </motion.div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <span className="bg-ink/80 px-4 py-3 text-xs text-ivory backdrop-blur-md">
                <span className="eyebrow mr-3 text-[0.56rem] text-ivory/60">Palette</span>
                {preset.name}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p)}
              className={clsx(
                "shrink-0 border px-5 py-3 text-xs transition-colors duration-500",
                p.id === preset.id ? "border-ink bg-ink text-ivory" : "border-ink/15 hover:border-ink/50",
              )}
            >
              {p.name}
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
