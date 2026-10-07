"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/lib/products";
import { Photo } from "../Photo";
import { DoorRender, HardwareRender, SlabRender } from "./Renders";

export function ProductVisual({ product, finish }: { product: Product; finish: string }) {
  const v = product.visual;
  const key = v.kind === "photo" && !v.byFinish ? "static" : finish;
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={key}
        className="absolute inset-0"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {v.kind === "photo" && (
          <Photo media={v.byFinish?.[finish] ? { src: v.byFinish[finish], alt: v.media.alt } : v.media} sizes="(min-width: 1024px) 33vw, 90vw" />
        )}
        {v.kind === "door" && <DoorRender finish={finish} style={v.style} />}
        {v.kind === "slab" && <SlabRender finish={finish} edge={v.edge} />}
        {v.kind === "hardware" && <HardwareRender finish={finish} shape={v.shape} />}
      </motion.div>
    </AnimatePresence>
  );
}
