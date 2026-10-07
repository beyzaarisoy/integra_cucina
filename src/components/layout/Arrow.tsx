import clsx from "clsx";

export function Arrow({ className, direction = "up-right" }: { className?: string; direction?: "up-right" | "right" | "left" | "down" }) {
  const rotate = { "up-right": "", right: "rotate-45", left: "-rotate-[135deg]", down: "rotate-[135deg]" }[direction];
  return (
    <svg viewBox="0 0 12 12" fill="none" className={clsx("h-3 w-3 shrink-0", rotate, className)} aria-hidden>
      <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}
