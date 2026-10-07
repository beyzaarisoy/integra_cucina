import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductsBrowser } from "@/components/product/ProductsBrowser";
import { FinishLibrary } from "@/components/product/FinishLibrary";
import { Configurator } from "@/components/home/Configurator";
import { TextureStack } from "@/components/product/TextureStack";
import { BlurText, Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/layout/Arrow";

export const metadata: Metadata = {
  title: "Products",
  description: "Kitchen collections, cabinet fronts, stone countertops, islands, pantry systems and hardware — configurable in 27 finishes.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The collection"
        title={"Products &\n*finishes.*"}
        intro="Complete kitchens, fronts, surfaces and hardware — each made to order in Italy and configurable in our full library of woods, lacquers, stones and metals."
        aside={<TextureStack />}
      />
      <Suspense fallback={<div className="h-screen bg-ivory" />}>
        <ProductsBrowser />
      </Suspense>
      <div className="border-t border-line" />
      <Configurator id="studio" eyebrow="Kitchen studio" title={"Design it\n*yourself.*"} />
      <FinishLibrary />
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-lux flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <BlurText text={"Feel the materials\n*in your own light.*"} className="display text-5xl md:text-7xl" />
          <Reveal delay={0.2}>
            <Link href="/contact#consultation" className="group inline-flex items-center gap-4 bg-ink px-8 py-5 eyebrow text-[0.64rem] text-ivory">
              Order free samples
              <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
