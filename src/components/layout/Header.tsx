"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Arrow } from "./Arrow";
import { useLenis } from "../motion/SmoothScroll";
import { categories } from "@/lib/products";
import { texture } from "@/lib/finishes";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", mega: true },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

/** Routes whose first screen is a dark photograph. */
const darkHeroRoutes = ["/", "/about"];

const megaPreview: Record<string, string> = {
  kitchens: "/images/kitchen-midnight-calacatta-oro.jpg",
  fronts: texture("canaletto-walnut"),
  surfaces: texture("calacatta-oro"),
  islands: "/images/island-natural-oak-travertino.jpg",
  storage: "/images/pantry-canaletto-walnut-nero-marquina.jpg",
  hardware: texture("brushed-brass"),
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [preview, setPreview] = useState("kitchens");

  const overDark = darkHeroRoutes.includes(pathname) && !scrolled;
  const light = overDark && !mega;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 60);
    setHidden(y > 240 && y > prev && !menuOpen && !mega);
  });

  useEffect(() => {
    setMenuOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        onMouseLeave={() => setMega(false)}
      >
        <div
          className={clsx(
            "relative transition-[background-color,backdrop-filter,border-color,color] duration-700",
            light ? "text-ivory" : "text-ink",
            scrolled || mega ? "bg-ivory/85 backdrop-blur-xl border-b border-line" : "border-b border-transparent",
          )}
        >
          <div
            className={clsx(
              "container-lux grid grid-cols-[1fr_auto] items-center transition-[height] duration-700 lg:grid-cols-[1fr_auto_1fr]",
              scrolled ? "h-16" : "h-20 lg:h-24",
            )}
          >
            <Link href="/" aria-label="Integra Cucina home" className="justify-self-start">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setMega(!!item.mega)}
                    onFocus={() => setMega(!!item.mega)}
                    className="eyebrow link-underline py-1.5 text-[0.68rem]"
                    data-active={active}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-self-end gap-6">
              <Link
                href="/contact#consultation"
                className={clsx(
                  "group hidden items-center gap-3 border px-5 py-3 eyebrow text-[0.64rem] transition-colors duration-500 md:inline-flex",
                  light ? "border-ivory/40 hover:bg-ivory hover:text-ink" : "border-ink/25 hover:bg-ink hover:text-ivory",
                )}
              >
                Book a consultation
                <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className={clsx("absolute h-px w-7 bg-current transition-transform duration-500", menuOpen ? "rotate-45 text-ivory" : "-translate-y-[4px]")} />
                <span className={clsx("absolute h-px w-7 bg-current transition-transform duration-500", menuOpen ? "-rotate-45 text-ivory" : "translate-y-[4px]")} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mega && (
              <motion.div
                key="mega"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="hidden overflow-hidden text-ink lg:block"
              >
                <div className="container-lux grid grid-cols-12 gap-10 pb-12 pt-6">
                  <div className="col-span-3">
                    <p className="eyebrow text-stone">The collection</p>
                    <p className="display mt-5 text-4xl">
                      Everything for
                      <br />
                      <em>the kitchen.</em>
                    </p>
                    <Link href="/products" className="eyebrow link-underline mt-8 inline-flex items-center gap-2 text-[0.64rem]">
                      View all products <Arrow />
                    </Link>
                  </div>
                  <ul className="col-span-5 grid grid-cols-2 gap-x-10">
                    {categories.map((c, i) => (
                      <motion.li
                        key={c.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.08 + i * 0.04 }}
                      >
                        <Link
                          href={`/products?category=${c.id}`}
                          onMouseEnter={() => setPreview(c.id)}
                          className="group flex items-baseline justify-between border-b border-line py-4"
                        >
                          <span className="font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2">{c.label}</span>
                          <Arrow className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="relative col-span-4 aspect-[4/3] overflow-hidden bg-bone">
                    <AnimatePresence mode="popLayout">
                      <motion.img
                        key={preview}
                        src={megaPreview[preview]}
                        alt=""
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <p className="absolute bottom-4 left-4 eyebrow text-[0.6rem] text-ivory mix-blend-difference">
                      {categories.find((c) => c.id === preview)?.blurb}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu pathname={pathname} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[55] flex flex-col bg-char text-ivory lg:hidden"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="container-lux flex h-20 items-center">
        <Logo />
      </div>
      <nav className="container-lux mt-10 flex flex-1 flex-col gap-2" aria-label="Mobile">
        {nav.map((item, i) => (
          <div key={item.href} className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "110%" }}
              transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.07 }}
            >
              <Link href={item.href} className="flex items-baseline gap-4 py-1">
                <span className="eyebrow text-[0.6rem] text-mist">0{i + 1}</span>
                <span className={clsx("display text-6xl", pathname === item.href && "italic")}>{item.label}</span>
              </Link>
            </motion.div>
          </div>
        ))}
      </nav>
      <motion.div
        className="container-lux grid grid-cols-2 gap-6 pb-10 text-sm text-ivory/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
        exit={{ opacity: 0 }}
      >
        <div>
          <p className="eyebrow mb-2 text-[0.6rem] text-mist">Showroom</p>
          <p>
            New York · Miami
            <br />
            Los Angeles · Chicago
          </p>
        </div>
        <div>
          <p className="eyebrow mb-2 text-[0.6rem] text-mist">Talk to us</p>
          <a href="tel:+12125550198">+1 (212) 555-0198</a>
          <br />
          <a href="mailto:studio@integracucina.com">studio@integracucina.com</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
