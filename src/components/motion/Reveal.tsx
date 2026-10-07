"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

const motionTags = { div: motion.div, li: motion.li, span: motion.span, section: motion.section } as const;

/** Fades a block up out of a soft blur when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  blur = 10,
  once = true,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
  once?: boolean;
  as?: keyof typeof motionTags;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motionTags[as] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1.2, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Splits text into words that rise out of a blur one after another.
 * Use `\n` in the string to force a line break; wrap a word in *asterisks*
 * to set it in italic.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  as: Tag = "h2",
  trigger,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
  /** When provided, controls the animation instead of the viewport. */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = trigger ?? inView;
  // Words between *asterisks* (which may span several words) are set in italic.
  let italic = false;
  const lines = text.split("\n").map((line) =>
    line.split(" ").map((raw) => {
      const opens = raw.startsWith("*");
      const closes = raw.endsWith("*") && raw.length > 1;
      if (opens) italic = true;
      const token = { word: raw.replace(/\*/g, ""), italic };
      if (closes) italic = false;
      return token;
    }),
  );
  let i = 0;
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.map(({ word, italic }, wi) => {
            const idx = i++;
            return (
              <span key={wi} className="inline-block">
                <motion.span
                  className={clsx("inline-block will-change-transform", italic && "italic")}
                  initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
                  animate={show ? { opacity: 1, y: "0em", filter: "blur(0px)" } : { opacity: 0, y: "0.35em", filter: "blur(12px)" }}
                  transition={{ duration: 1.1, ease, delay: delay + idx * stagger }}
                >
                  {word}
                </motion.span>
                {wi < line.length - 1 && "\u00a0"}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Image wrapper that unveils with a clip-path wipe and settles from a slight zoom. */
export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const from = {
    up: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[direction];
  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: from }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25, filter: "blur(8px)" }}
          animate={inView ? { scale: 1, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1.9, ease, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Moves its content against the scroll for a gentle depth effect. */
export function Parallax({ children, className, offset = 80 }: { children: ReactNode; className?: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      <motion.div style={{ y, top: -offset, bottom: -offset }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/** A paragraph whose words light up one by one as it travels through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  let italic = false;
  const words = text.split(" ").map((raw) => {
    if (raw.startsWith("*")) italic = true;
    const token = { word: raw.replace(/\*/g, ""), italic };
    if (raw.replace(/[.,;:]$/, "").endsWith("*")) italic = false;
    return token;
  });
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} italic={w.italic}>
          {w.word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, italic }: { children: string; progress: MotionValue<number>; range: [number, number]; italic: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={clsx("inline", italic && "italic")}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Animated number that counts up once visible. */
export function CountUp({ to, suffix = "", prefix = "", className }: { to: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4 }}
      >
        {inView ? <Counter to={to} /> : 0}
      </motion.span>
      {suffix}
    </span>
  );
}

function Counter({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [to]);
  return <>{v.toLocaleString("en-US")}</>;
}
