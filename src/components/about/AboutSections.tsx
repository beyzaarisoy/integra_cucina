"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { media, localKitchens } from "@/lib/media";
import { texture } from "@/lib/finishes";
import { Photo } from "../Photo";
import { BlurText, CountUp, ImageReveal, Parallax, Reveal, ScrollWords } from "../motion/Reveal";
import { useIntroDone } from "../layout/Preloader";

export function AboutHero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-char text-ivory">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Photo media={{ src: localKitchens.walnut, alt: "Integra Cucina kitchen in Canaletto walnut and Nero Marquina" }} priority position="50% 55%" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.55)_0%,rgba(18,16,14,0.25)_40%,rgba(18,16,14,0.8)_100%)]" />
      <motion.div style={{ y }} className="container-lux relative flex h-full flex-col justify-end pb-16 md:pb-24">
        <motion.p
          className="eyebrow text-ivory/75"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1 }}
        >
          About Integra Cucina
        </motion.p>
        <BlurText text={"Since 1968,\n*the Italian way.*"} as="h1" trigger={ready} delay={0.1} className="display mt-6 text-[clamp(3.6rem,10vw,10rem)] leading-[0.9]" />
        <div className="mt-12 grid max-w-4xl gap-6 border-t border-ivory/20 pt-8 sm:grid-cols-3">
          {[
            ["Treviso", "Where it began"],
            ["4 showrooms", "Across the United States"],
            ["One team", "Design to installation"],
          ].map(([a, b], i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.1 }}
            >
              <p className="font-serif text-2xl">{a}</p>
              <p className="eyebrow mt-2 text-[0.56rem] text-ivory/60">{b}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function AboutStory() {
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="container-lux grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="eyebrow text-stone">Our story</p>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrollWords
            className="display text-[clamp(2rem,4.2vw,4.4rem)] leading-[1.07]"
            text="What began as a family joinery in the Veneto has become a design house trusted by architects and homeowners across America. We still build every kitchen the way we did the first one — *slowly, precisely,* and as if it were our own."
          />
        </div>
      </div>

      <div className="container-lux mt-24 grid gap-6 md:mt-36 md:grid-cols-12">
        <ImageReveal className="aspect-[4/5] bg-bone md:col-span-5">
          <Photo media={media.about.workshop} />
        </ImageReveal>
        <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
          <ImageReveal className="aspect-[16/10] bg-bone" delay={0.15} direction="right">
            <Photo media={media.about.material} />
          </ImageReveal>
          <Reveal className="max-w-lg">
            <BlurText text={"Italian design,\n*American homes.*"} className="display text-4xl md:text-6xl" />
            <p className="mt-8 leading-relaxed text-stone">
              Every Integra kitchen is designed by our studio, crafted in partner ateliers in Northern Italy and installed by our own
              teams in the United States. That single line of responsibility is why our kitchens arrive exactly as drawn — and why
              most of our new clients are introduced by old ones.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const milestones = [
  { year: "1968", title: "A workshop in Treviso", text: "A small family joinery begins making solid-wood kitchens for neighbours in the Veneto.", tex: "natural-oak" },
  { year: "1979", title: "The first lacquers", text: "Hand-sprayed matte lacquers bring colour into the Italian kitchen.", tex: "terracotta" },
  { year: "1994", title: "Salone del Mobile", text: "The handleless Linea collection debuts in Milan and wins the attention of architects.", tex: "alabaster" },
  { year: "2003", title: "New York", text: "Our first American showroom opens its doors in SoHo.", tex: "graphite" },
  { year: "2012", title: "Coast to coast", text: "Showrooms open in Miami’s Design District and West Hollywood.", tex: "calacatta-oro" },
  { year: "2019", title: "Chicago", text: "River North joins the family, with a dedicated trade studio.", tex: "canaletto-walnut" },
  { year: "Today", title: "2,400+ kitchens", text: "Designed, built and installed across the United States — and counting.", tex: "nero-marquina" },
];

/** Vertical scroll drives a horizontal ribbon of milestones. */
export function Timeline() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={section} className="relative bg-char text-ivory" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-lux mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-mist">Heritage</p>
            <p className="display mt-5 text-5xl md:text-7xl">
              Six decades <em>of craft.</em>
            </p>
          </div>
          <div className="hidden h-px w-60 bg-ivory/15 md:block">
            <motion.div className="h-full origin-left bg-ivory" style={{ scaleX: bar }} />
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 pr-[10vw] md:pl-10 xl:pl-16">
          {milestones.map((m) => (
            <article key={m.year} className="group relative flex h-[52vh] max-h-[520px] min-h-[380px] w-[78vw] shrink-0 flex-col justify-between overflow-hidden border border-ivory/10 p-8 sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-45"
                style={{ backgroundImage: `url(${texture(m.tex)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char via-char/60 to-transparent" />
              <p className="display relative text-7xl md:text-8xl">{m.year}</p>
              <div className="relative">
                <p className="font-serif text-3xl">{m.title}</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/65">{m.text}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const values = [
  { n: "01", t: "Material honesty", d: "Solid timber, real stone, solid metal. If it looks like brass, it is brass." },
  { n: "02", t: "Millimetre precision", d: "Shadow gaps of 3 mm, aligned across every front, from the plinth to the ceiling." },
  { n: "03", t: "Quiet luxury", d: "No logos, no noise. Luxury you feel each time a drawer glides shut." },
  { n: "04", t: "Built to last", d: "A lifetime warranty on carcasses and hinges, and a service team for life." },
];

export function Values() {
  return (
    <section id="craft" className="bg-ivory py-28 md:py-40">
      <div className="container-lux">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-stone">What we believe</p>
            </Reveal>
            <BlurText text={"Four principles,\n*never negotiable.*"} className="display mt-6 text-5xl md:text-7xl" />
          </div>
        </div>
        <div className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.1} className="border-b border-line py-10 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="eyebrow text-[0.6rem] text-bronze">{v.n}</p>
              <p className="display mt-6 text-3xl md:text-4xl">{v.t}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone">{v.d}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-28 grid gap-6 md:grid-cols-12">
          <Parallax className="aspect-[16/10] bg-bone md:col-span-8" offset={60}>
            <Photo media={media.about.studio} />
          </Parallax>
          <div className="flex flex-col justify-end gap-10 md:col-span-4">
            {[
              { n: 58, s: "", l: "Years of family craft" },
              { n: 2400, s: "+", l: "Kitchens installed in the US" },
              { n: 27, s: "", l: "Signature finishes" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1} className="border-t border-line pt-6">
                <CountUp to={s.n} suffix={s.s} className="display block text-6xl" />
                <p className="eyebrow mt-3 text-[0.58rem] text-stone">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="bg-bone py-28 md:py-40">
      <div className="container-lux max-w-5xl text-center">
        <BlurText
          text={"“A great kitchen should disappear into the life\nlived around it. *That is our only rule.*”"}
          className="display text-3xl leading-[1.15] md:text-5xl"
          stagger={0.03}
        />
        <Reveal delay={0.4}>
          <p className="mt-10 text-sm font-medium">The Integra Design Studio</p>
          <p className="eyebrow mt-2 text-[0.58rem] text-stone">Treviso · New York</p>
        </Reveal>
      </div>
    </section>
  );
}
