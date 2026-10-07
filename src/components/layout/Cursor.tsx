"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * Minimal companion cursor for fine pointers. Elements can set
 * `data-cursor="Drag"` (or any short word) to show a label.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      setLabel(el?.dataset.cursor ?? null);
      setHover(!!el && !el.dataset.cursor);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <div
        className={clsx(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          label ? "h-20 w-20" : hover ? "h-10 w-10" : "h-2 w-2",
        )}
      >
        {label && <span className="eyebrow text-[0.55rem]">{label}</span>}
      </div>
    </motion.div>
  );
}
