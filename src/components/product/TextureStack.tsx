"use client";

import { motion } from "motion/react";
import { texture } from "@/lib/finishes";
import { useIntroDone } from "../layout/Preloader";

const stack = ["calacatta-oro", "canaletto-walnut", "sage", "nero-marquina"];

/** A fanned stack of material samples for the products hero. */
export function TextureStack() {
  const ready = useIntroDone();
  return (
    <div className="relative mx-auto h-72 w-56 md:h-96 md:w-72" aria-hidden>
      {stack.map((id, i) => (
        <motion.div
          key={id}
          className="absolute inset-0 bg-cover bg-center shadow-[0_30px_50px_-20px_rgba(40,30,20,0.45)]"
          style={{ backgroundImage: `url(${texture(id)})`, zIndex: stack.length - i }}
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={ready ? { opacity: 1, y: i * -14, x: i * 26, rotate: i * 5 - 4 } : undefined}
          whileHover={{ y: i * -14 - 10 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.12 }}
        />
      ))}
    </div>
  );
}
