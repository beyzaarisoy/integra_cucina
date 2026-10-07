"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { familyLabels, finishes, texture, type Finish, type FinishFamily } from "@/lib/finishes";
import { BlurText, Reveal } from "../motion/Reveal";
import { Arrow } from "../layout/Arrow";
import { useLenis } from "../motion/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;
const families = Object.keys(familyLabels) as FinishFamily[];

export function FinishLibrary() {
  const [family, setFamily] = useState<FinishFamily | "all">("all");
  const [open, setOpen] = useState<Finish | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const lenis = useLenis();
  const list = family === "all" ? finishes : finishes.filter((f) => f.family === family);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, lenis]);

  return (
    <section id="finishes" className="bg-char py-28 text-ivory md:py-40">
      <div className="container-lux">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-mist">Finish library</p>
            </Reveal>
            <BlurText text={`${finishes.length} materials,\n*endless kitchens.*`} className="display mt-6 text-5xl md:text-7xl" />
          </div>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-md text-ivory/65">
              Woods, lacquers, natural stone and solid metals — each available as a physical sample, delivered free to your door
              within the continental US.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="no-scrollbar mt-14 flex gap-2 overflow-x-auto">
          {(["all", ...families] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={clsx(
                "shrink-0 border px-5 py-3 text-xs transition-colors duration-500",
                family === f ? "border-ivory bg-ivory text-ink" : "border-ivory/20 text-ivory/70 hover:border-ivory/60",
              )}
            >
              {f === "all" ? "All materials" : familyLabels[f]}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {list.map((f, i) => (
              <motion.button
                layout
                key={f.id}
                onClick={() => setOpen(f)}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.7, ease, delay: Math.min(i, 12) * 0.03 }}
                className="group text-left"
                data-cursor="View"
              >
                <div className="relative aspect-square overflow-hidden">
                  <motion.div
                    layoutId={`finish-${f.id}`}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url(${texture(f.id)})` }}
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <p className="font-serif text-xl leading-tight">{f.name}</p>
                  <p className="eyebrow text-[0.52rem] text-mist">{f.code}</p>
                </div>
                <p className="mt-1 text-xs text-ivory/50">{f.note}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {mounted && createPortal(<AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setOpen(null)} />
            <motion.div
              className="relative grid w-full max-w-5xl overflow-hidden bg-ivory text-ink md:grid-cols-2"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
            >
              <div className="relative aspect-square">
                <motion.div layoutId={`finish-${open.id}`} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${texture(open.id)})` }} />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="eyebrow text-[0.6rem] text-stone">
                    {familyLabels[open.family]} · {open.code}
                  </p>
                  <p className="display mt-5 text-5xl md:text-6xl">{open.name}</p>
                  <p className="mt-5 text-stone">{open.note}.</p>
                  <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
                    <div>
                      <dt className="eyebrow text-[0.56rem] text-stone">Available on</dt>
                      <dd className="mt-2">
                        {open.family === "stone" ? "Countertops, islands, backsplashes" : open.family === "metal" ? "Hardware, frames, plinths" : "Fronts, panels, shelving"}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.56rem] text-stone">Sample</dt>
                      <dd className="mt-2">Free · ships in 3 days</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href={`/contact?finish=${open.id}#consultation`}
                    className="group inline-flex items-center gap-3 bg-ink px-6 py-4 eyebrow text-[0.6rem] text-ivory"
                  >
                    Request a sample <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <button onClick={() => setOpen(null)} className="eyebrow border border-ink/20 px-6 py-4 text-[0.6rem]">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </section>
  );
}
