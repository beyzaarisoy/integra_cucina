"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { showrooms } from "../home/Story";
import { Photo } from "../Photo";
import { Arrow } from "../layout/Arrow";
import { BlurText, ImageReveal, Reveal } from "../motion/Reveal";

export function ShowroomCards() {
  return (
    <section id="showrooms" className="bg-bone py-28 md:py-40">
      <div className="container-lux">
        <Reveal>
          <p className="eyebrow text-stone">Our showrooms</p>
        </Reveal>
        <BlurText text={"Come and *touch*\nthe materials."} className="display mt-6 text-5xl md:text-7xl" />
        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
          {showrooms.map((s, i) => (
            <Reveal key={s.city} delay={i * 0.08}>
              <ImageReveal className="aspect-[4/5] bg-ivory" delay={i * 0.08}>
                <Photo media={{ src: s.image, alt: `${s.city} showroom` }} />
              </ImageReveal>
              <p className="display mt-6 text-4xl">{s.city}</p>
              <p className="eyebrow mt-2 text-[0.58rem] text-stone">{s.area}</p>
              <p className="mt-5 text-sm leading-relaxed">{s.address}</p>
              <p className="mt-1 text-sm text-stone">{s.hours}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noreferrer"
                className="eyebrow link-underline mt-6 inline-flex items-center gap-2 text-[0.6rem]"
              >
                Get directions <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "How long does an Integra kitchen take?",
    a: "Most kitchens take 10 to 14 weeks from signed design to installation. Fronts, surfaces and hardware are made to order in Italy and shipped fully insured.",
  },
  {
    q: "Do you work with architects and interior designers?",
    a: "Yes. Our trade program offers dedicated project managers, technical drawings in CAD and Revit, and preferential terms. Choose “Architect / Trade” in the form above.",
  },
  {
    q: "Which areas do you install in?",
    a: "Our own teams install throughout the continental United States. For projects outside our showroom regions we schedule a dedicated installation crew.",
  },
  {
    q: "What does a consultation cost?",
    a: "Your first consultation, whether in a showroom, at home or online, is complimentary. Detailed design work is credited in full against your kitchen.",
  },
  {
    q: "Can I order material samples?",
    a: "Absolutely. Up to six finish samples ship free within the continental US, usually within three business days.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="container-lux grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-stone">Questions</p>
          </Reveal>
          <BlurText text={"Good to\n*know.*"} className="display mt-6 text-5xl md:text-7xl" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05} className="border-b border-line">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-serif text-2xl md:text-3xl">{f.q}</span>
                <span className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                  <span className={clsx("absolute left-1/2 top-0 h-4 w-px bg-ink transition-transform duration-500", open === i && "scale-y-0")} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-8 leading-relaxed text-stone">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
