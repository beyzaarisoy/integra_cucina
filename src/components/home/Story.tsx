"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { finishes, texture } from "@/lib/finishes";
import { media } from "@/lib/media";
import { Photo } from "../Photo";
import { Arrow } from "../layout/Arrow";
import { BlurText, ImageReveal, Parallax, Reveal } from "../motion/Reveal";

export const processSteps = [
  {
    n: "01",
    title: "Private consultation",
    text: "Meet a designer in one of our showrooms or at home. We listen to how you cook, host and live — then measure everything.",
    image: "/images/detail-natural-oak-travertino.jpg",
  },
  {
    n: "02",
    title: "Design & materials",
    text: "Photoreal renderings, a physical material board and a fixed proposal. Revisions are part of the process, not an extra.",
    image: "/images/detail-sage-arabescato.jpg",
  },
  {
    n: "03",
    title: "Crafted to the millimetre",
    text: "Your kitchen is built to order in our partner ateliers in Italy, then finished and quality-checked by hand.",
    image: "/images/pantry-canaletto-walnut-nero-marquina.jpg",
  },
  {
    n: "04",
    title: "White-glove installation",
    text: "Our own installers fit, level and align every front. We leave only when the last door closes perfectly.",
    image: "/images/detail-midnight-calacatta-oro.jpg",
  },
];

/** Sticky image on the left that changes as each step scrolls past on the right. */
export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="bg-char py-28 text-ivory md:py-40">
      <div className="container-lux">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-mist">How we work</p>
          </Reveal>
          <BlurText text={"From first sketch\nto *final fitting.*"} className="display mt-6 text-5xl md:text-7xl" />
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Photo media={{ src: processSteps[active].image, alt: processSteps[active].title }} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-6 left-6 font-serif text-8xl text-ivory/90">{processSteps[active].n}</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {processSteps.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[46vh] flex-col justify-center border-t border-ivory/10 py-12 lg:min-h-[70vh]"
              >
                <Reveal>
                  <div className="relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
                    <Photo media={{ src: s.image, alt: s.title }} />
                  </div>
                  <p className={clsx("eyebrow text-[0.62rem] transition-colors duration-700", active === i ? "text-bronze" : "text-mist")}>Step {s.n}</p>
                  <h3 className={clsx("display mt-5 text-4xl transition-opacity duration-700 md:text-5xl", active === i ? "opacity-100" : "lg:opacity-35")}>{s.title}</h3>
                  <p className="mt-6 max-w-md leading-relaxed text-ivory/65">{s.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Infinite ribbon of material swatches. */
export function MaterialMarquee() {
  const row = finishes.filter((f) => f.family !== "metal");
  return (
    <section className="overflow-hidden bg-ivory py-20" aria-label="Material library">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {[...row, ...row].map((f, i) => (
          <Link key={i} href="/products#finishes" className="group relative h-52 w-40 shrink-0 overflow-hidden md:h-64 md:w-48">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              style={{ backgroundImage: `url(${texture(f.id)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 text-ivory">
              <p className="eyebrow text-[0.5rem] opacity-80">{f.code}</p>
              <p className="font-serif text-lg leading-tight">{f.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  return (
    <section ref={ref} className="bg-ivory py-28 md:py-40">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <Parallax className="aspect-[4/5] bg-bone" offset={70}>
            <Photo media={media.craft} />
          </Parallax>
          <motion.div style={{ y }} className="absolute -bottom-10 -right-4 hidden w-[42%] md:block lg:-right-16">
            <ImageReveal className="aspect-square shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" delay={0.2}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${texture("calacatta-oro")})` }} />
            </ImageReveal>
          </motion.div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow text-stone">Craftsmanship</p>
          </Reveal>
          <BlurText text={"Stone chosen\nslab by *slab.*"} className="display mt-6 text-5xl md:text-7xl" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md leading-relaxed text-stone">
              Our stone buyers travel to quarries in Carrara, Tivoli and Macael to select every slab in person. Veins are
              book-matched and mitred so a countertop reads as one continuous piece of nature.
            </p>
            <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-5 text-sm">
              {["Book-matched veining", "Hand-oiled timber", "Soft-close Blum motion", "Lifetime cabinet warranty"].map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-line pb-4">
                  <span className="h-1 w-1 rounded-full bg-bronze" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about#craft" className="eyebrow link-underline mt-10 inline-flex items-center gap-2 text-[0.64rem]">
              Inside the atelier <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "From the first meeting in SoHo to the day the last drawer was aligned, it felt like working with an atelier, not a contractor. Our kitchen is the calmest room in the house.",
    name: "Caroline & James W.",
    place: "Tribeca, New York",
  },
  {
    quote: "We changed our minds about the stone three times. The team never blinked — they brought slabs to us. The Calacatta waterfall is pure art.",
    name: "Daniela R.",
    place: "Coral Gables, Florida",
  },
  {
    quote: "The walnut pantry with the pocket doors is the most-photographed corner of our home. Precise, warm and built to outlive us.",
    name: "Michael T.",
    place: "Pacific Palisades, California",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((i + 1) % testimonials.length), 8000);
    return () => clearTimeout(t);
  }, [i]);
  const t = testimonials[i];
  return (
    <section className="bg-bone py-28 md:py-40">
      <div className="container-lux text-center">
        <Reveal>
          <p className="eyebrow text-stone">Client stories</p>
        </Reveal>
        <div className="relative mx-auto mt-12 min-h-[18rem] max-w-5xl md:min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display text-3xl leading-[1.15] md:text-5xl">“{t.quote}”</blockquote>
              <figcaption className="mt-10">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="eyebrow mt-2 text-[0.58rem] text-stone">{t.place}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className="group py-3">
              <span className={clsx("block h-px transition-all duration-700", k === i ? "w-14 bg-ink" : "w-6 bg-ink/25 group-hover:bg-ink/50")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export const showrooms = [
  { city: "New York", area: "SoHo", address: "142 Greene Street, New York, NY 10012", hours: "Mon–Sat · 10am – 7pm", image: "/images/kitchen-midnight-calacatta-oro.jpg" },
  { city: "Miami", area: "Design District", address: "3930 NE 2nd Avenue, Miami, FL 33137", hours: "Mon–Sat · 10am – 6pm", image: "/images/kitchen-sage-arabescato.jpg" },
  { city: "Los Angeles", area: "West Hollywood", address: "8687 Melrose Avenue, West Hollywood, CA 90069", hours: "Mon–Sat · 10am – 6pm", image: "/images/kitchen-canaletto-walnut-nero-marquina.jpg" },
  { city: "Chicago", area: "River North", address: "222 W Merchandise Mart Plaza, Chicago, IL 60654", hours: "Mon–Fri · 9am – 5pm", image: "/images/kitchen-graphite-taj-mahal.jpg" },
];

export function Showrooms() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="container-lux">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-stone">Visit us</p>
            </Reveal>
            <BlurText text={"Four showrooms,\n*coast to coast.*"} className="display mt-6 text-5xl md:text-7xl" />
          </div>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-md text-stone">Touch the materials, open the drawers, cook in our working kitchens. Private appointments available after hours.</p>
          </Reveal>
        </div>

        <ul className="relative mt-16 border-t border-line" onMouseLeave={() => setHover(null)}>
          {showrooms.map((s, i) => (
            <Reveal as="li" key={s.city} delay={i * 0.06}>
              <Link
                href="/contact#showrooms"
                onMouseEnter={() => setHover(i)}
                className="group grid grid-cols-12 items-center gap-4 border-b border-line py-8 md:py-10"
              >
                <span className="eyebrow col-span-2 text-[0.6rem] text-stone md:col-span-1">0{i + 1}</span>
                <span className="display col-span-10 text-5xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:col-span-4 md:text-6xl">
                  {s.city}
                </span>
                <span className="col-span-12 text-sm text-stone md:col-span-4">
                  {s.area} — {s.address}
                </span>
                <span className="col-span-10 text-sm text-stone md:col-span-2">{s.hours}</span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                    <Arrow />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={hover}
                className="pointer-events-none absolute right-[18%] top-0 z-10 hidden aspect-[4/5] w-64 overflow-hidden shadow-2xl xl:block"
                style={{ top: `${hover * 25}%` }}
                initial={{ opacity: 0, scale: 0.9, rotate: -3, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Photo media={{ src: s(hover).image, alt: `${s(hover).city} showroom` }} />
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
const s = (i: number) => showrooms[i];
