"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import type { Product } from "@/lib/products";
import { categories } from "@/lib/products";
import { finishById } from "@/lib/finishes";
import { ProductVisual } from "./ProductVisual";
import { SwatchRow } from "./Swatches";
import { Arrow } from "../layout/Arrow";

export function ProductCard({ product, className, aspect = "aspect-[4/5]" }: { product: Product; className?: string; aspect?: string }) {
  const [finish, setFinish] = useState(product.finishes[0]);
  const category = categories.find((c) => c.id === product.category)!;
  return (
    <article className={clsx("group", className)}>
      <Link href={`/contact?product=${product.slug}&finish=${finish}#consultation`} className="block" draggable={false}>
        <div className={clsx("relative overflow-hidden bg-bone", aspect)}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <ProductVisual product={product} finish={finish} />
          </div>
          <div className="absolute left-4 top-4 flex gap-2">
            {product.bestseller && <span className="eyebrow bg-ivory/90 px-2.5 py-1.5 text-[0.55rem] text-ink backdrop-blur">Bestseller</span>}
            {product.isNew && <span className="eyebrow bg-ink px-2.5 py-1.5 text-[0.55rem] text-ivory">New</span>}
          </div>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Arrow />
          </div>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow text-[0.56rem] text-stone">{category.label}</p>
          <h3 className="mt-2 font-serif text-[1.65rem] leading-none">{product.name}</h3>
          <p className="mt-2 truncate text-sm text-stone">{product.tagline}</p>
        </div>
        <p className="eyebrow shrink-0 pt-0.5 text-[0.55rem] text-stone">{product.leadTime}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <SwatchRow ids={product.finishes} value={finish} onChange={setFinish} />
        <p className="truncate text-xs text-stone">{finishById(finish).name}</p>
      </div>
    </article>
  );
}
