"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "../motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductsBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get("category");
  const active = (categories.some((c) => c.id === raw) ? raw : "all") as Category | "all";

  const list = useMemo(() => (active === "all" ? products : products.filter((p) => p.category === active)), [active]);
  const meta = categories.find((c) => c.id === active);

  const select = (id: Category | "all") => {
    const url = id === "all" ? "/products" : `/products?category=${id}`;
    router.replace(url, { scroll: false });
  };

  return (
    <section id="catalogue" className="bg-ivory pb-28 md:pb-40">
      <div className="sticky top-0 z-30 border-y border-line bg-ivory/90 backdrop-blur-xl">
        <div className="container-lux no-scrollbar flex items-center gap-1 overflow-x-auto py-3">
          {[{ id: "all" as const, label: "All products" }, ...categories].map((c) => {
            const count = c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => select(c.id)}
                className={clsx(
                  "relative shrink-0 px-4 py-2.5 text-[0.8rem] transition-colors duration-500",
                  active === c.id ? "text-ivory" : "text-stone hover:text-ink",
                )}
              >
                {active === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 bg-ink" transition={{ duration: 0.6, ease }} />}
                <span className="relative">
                  {c.label}
                  <sup className="ml-1 text-[0.6rem] opacity-60">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-lux">
        <div className="flex flex-col justify-between gap-4 py-12 md:flex-row md:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="display text-4xl md:text-5xl">{meta ? meta.label : "The full collection"}</h2>
              <p className="mt-3 text-stone">{meta ? meta.blurb : "Kitchens, fronts, surfaces and hardware — all made to order."}</p>
            </motion.div>
          </AnimatePresence>
          <p className="eyebrow text-[0.6rem] text-stone">
            {list.length} {list.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <motion.div layout className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease, delay: Math.min(i, 8) * 0.05 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-24 grid gap-6 border-t border-line pt-12 md:grid-cols-3">
          {[
            ["Made to order", "Every piece is built for your floor plan — no stock sizes, no compromises."],
            ["Shipped from Italy", "Crafted in our partner ateliers and delivered fully insured to your door."],
            ["Lifetime warranty", "Cabinet carcasses and hinges are guaranteed for as long as you own them."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-serif text-2xl">{t}</p>
              <p className="mt-2 max-w-xs text-sm text-stone">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
