"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { configurator, finishById } from "@/lib/finishes";
import { Swatch } from "../product/Swatches";
import { BlurText, ImageReveal, Reveal } from "../motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

type Part = "cabinets" | "counters";

/** The base photograph with finish layers composited on top. */
export function KitchenStage({ cabinet, counter, className }: { cabinet: string; counter: string; className?: string }) {
  return (
    <div className={clsx("absolute inset-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/configurator/base.webp" alt="Integra Cucina Aria kitchen" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <AnimatePresence initial={false}>
        {cabinet !== configurator.baseCabinet && (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            key={`cab-${cabinet}`}
            src={`/configurator/cab-${cabinet}.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            draggable={false}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {counter !== configurator.baseCounter && (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            key={`top-${counter}`}
            src={`/configurator/top-${counter}.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            draggable={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Configurator({
  id,
  eyebrow = "Material study",
  title = "Beauty in\n*the details.*",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
}) {
  const [cabinet, setCabinet] = useState(configurator.baseCabinet);
  const [counter, setCounter] = useState(configurator.baseCounter);
  const [part, setPart] = useState<Part>("cabinets");
  const options = part === "cabinets" ? configurator.cabinets : configurator.counters;
  const value = part === "cabinets" ? cabinet : counter;
  const set = part === "cabinets" ? setCabinet : setCounter;
  const current = finishById(value);

  return (
    <section id={id} className="bg-ivory py-28 md:py-40">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <ImageReveal className="aspect-[1484/1360] bg-bone lg:col-span-7" direction="left">
          <KitchenStage cabinet={cabinet} counter={counter} />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-ivory/85 px-4 py-3 backdrop-blur-md">
            <span className="eyebrow text-[0.56rem] text-stone">Aria Kitchen</span>
            <span className="h-3 w-px bg-ink/20" />
            <AnimatePresence mode="wait">
              <motion.span
                key={cabinet + counter}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="text-xs"
              >
                {finishById(cabinet).name} · {finishById(counter).name}
              </motion.span>
            </AnimatePresence>
          </div>
        </ImageReveal>

        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-stone">{eyebrow}</p>
          </Reveal>
          <BlurText text={title} className="display mt-6 text-6xl md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md leading-relaxed text-stone">
              Every finish is selected for the way it changes with light and time. Explore the palette behind our most personal
              spaces — and see it on a real Integra kitchen.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-12 border-t border-line pt-8">
            <div className="flex gap-8" role="tablist">
              {(["cabinets", "counters"] as Part[]).map((p) => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={part === p}
                  onClick={() => setPart(p)}
                  className={clsx("eyebrow relative pb-2 text-[0.64rem] transition-colors", part === p ? "text-ink" : "text-mist hover:text-stone")}
                >
                  {p === "cabinets" ? "Cabinetry" : "Countertop"}
                  {part === p && <motion.span layoutId="cfg-tab" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {options.map((id) => (
                <Swatch key={id} id={id} size="lg" active={id === value} onSelect={() => set(id)} />
              ))}
            </div>

            <div className="mt-8 min-h-[4.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={value}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl">{current.name}</span>
                    <span className="eyebrow text-[0.56rem] text-stone">{current.code}</span>
                  </p>
                  <p className="mt-1 text-sm text-stone">{current.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
