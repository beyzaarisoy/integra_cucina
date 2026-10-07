import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-baseline gap-[0.45em] whitespace-nowrap text-[0.95rem] tracking-[0.32em] uppercase", className)}>
      <span className="font-semibold">Integra</span>
      <span className="font-light opacity-80">Cucina</span>
    </span>
  );
}
