"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Arrow } from "./Arrow";
import { BlurText, Reveal } from "../motion/Reveal";

const columns = [
  {
    title: "Collections",
    links: [
      ["Aria", "/products?category=kitchens"],
      ["Linea", "/products?category=kitchens"],
      ["Pietra", "/products?category=kitchens"],
      ["Notte", "/products?category=kitchens"],
      ["Finish library", "/products#finishes"],
    ],
  },
  {
    title: "Studio",
    links: [
      ["About us", "/about"],
      ["Our process", "/about#process"],
      ["Craftsmanship", "/about#craft"],
      ["Book a consultation", "/contact#consultation"],
      ["Trade program", "/contact"],
    ],
  },
];

const showrooms = [
  ["New York", "SoHo"],
  ["Miami", "Design District"],
  ["Los Angeles", "West Hollywood"],
  ["Chicago", "River North"],
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0.4, 1], ["40%", "0%"]);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-char text-ivory">
      <div className="container-lux pt-28 md:pt-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-mist">Begin your project</p>
            <BlurText text={"Let's design the\n*kitchen* you'll love."} className="display mt-6 text-5xl md:text-7xl" />
            <Reveal delay={0.3}>
              <Link
                href="/contact#consultation"
                className="group mt-12 inline-flex items-center gap-4 border border-ivory/30 px-7 py-4 eyebrow text-[0.66rem] transition-colors duration-500 hover:bg-ivory hover:text-ink"
              >
                Book a private consultation
                <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-[0.62rem] text-mist">{col.title}</p>
                <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="link-underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow text-[0.62rem] text-mist">Showrooms</p>
              <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
                {showrooms.map(([city, area]) => (
                  <li key={city}>
                    {city} <span className="text-ivory/40">· {area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-ivory/10 pt-12 md:grid-cols-2">
          <div>
            <p className="eyebrow text-[0.62rem] text-mist">The journal</p>
            <p className="mt-4 max-w-sm text-ivory/70">Seasonal finishes, project stories and private showroom evenings — a few times a year.</p>
          </div>
          <form
            className="flex items-end gap-4 self-end border-b border-ivory/25 pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
          >
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={sent ? "Thank you — welcome to the journal." : "Your email address"}
                disabled={sent}
                className="w-full bg-transparent py-2 text-lg placeholder:text-ivory/40 focus:outline-none"
              />
            </label>
            <button type="submit" disabled={sent} className="eyebrow flex items-center gap-2 text-[0.64rem] disabled:opacity-40">
              Subscribe <Arrow direction="right" />
            </button>
          </form>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 text-xs text-ivory/45 md:flex-row">
          <p>© {new Date().getFullYear()} Integra Cucina. Italian design, crafted for American homes.</p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="link-underline">Pinterest</a>
            <a href="https://houzz.com" target="_blank" rel="noreferrer" className="link-underline">Houzz</a>
            <Link href="/contact" className="link-underline">Privacy</Link>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden" aria-hidden>
        <motion.p
          style={{ y: wordY }}
          className="display whitespace-nowrap text-center text-[18.5vw] leading-[0.78] tracking-[-0.04em] text-ivory/[0.07]"
        >
          Integra <em>Cucina</em>
        </motion.p>
      </div>
    </footer>
  );
}
