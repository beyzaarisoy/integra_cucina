"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

// Tiny shared store so page intros can wait for the curtain to lift.
let introDone = false;
const listeners = new Set<() => void>();
const finishIntro = () => {
  introDone = true;
  listeners.forEach((l) => l());
};
export function useIntroDone() {
  const [done, setDone] = useState(introDone);
  useEffect(() => {
    if (introDone) return setDone(true);
    const l = () => setDone(true);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);
  return done;
}

/** Brand intro shown once per browser session. */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ic-intro") === "1";
      sessionStorage.setItem("ic-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      finishIntro();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
      setTimeout(finishIntro, 350);
    }, 2300);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const letters = "INTEGRA".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-char text-ivory"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="flex flex-col items-center">
            <div className="flex overflow-hidden text-2xl tracking-[0.5em] md:text-3xl">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease, delay: 0.1 + i * 0.05 }}
                  className="font-semibold"
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)", letterSpacing: "0.2em" }}
              animate={{ opacity: 0.7, filter: "blur(0px)", letterSpacing: "0.62em" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="mt-4 pl-[0.62em] text-[0.7rem] uppercase"
            >
              Cucina
            </motion.p>
            <div className="mt-10 h-px w-40 overflow-hidden bg-ivory/15">
              <motion.div
                className="h-full bg-ivory"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
