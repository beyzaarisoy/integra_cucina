"use client";

import clsx from "clsx";
import { finishById, texture } from "@/lib/finishes";

export function Swatch({
  id,
  active,
  onSelect,
  size = "md",
  dark = false,
}: {
  id: string;
  active?: boolean;
  onSelect?: () => void;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}) {
  const f = finishById(id);
  const dim = { sm: "h-4 w-4", md: "h-7 w-7", lg: "h-10 w-10" }[size];
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect?.();
      }}
      title={f.name}
      aria-label={`${f.name} finish`}
      aria-pressed={active}
      className={clsx(
        "relative shrink-0 rounded-full p-[3px] transition-[box-shadow,transform] duration-500 hover:scale-110",
        active ? (dark ? "shadow-[0_0_0_1px_#f4f1ea]" : "shadow-[0_0_0_1px_#1b1a18]") : "shadow-[0_0_0_1px_transparent]",
      )}
    >
      <span
        className={clsx("block rounded-full bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]", dim)}
        style={{ backgroundImage: `url(${texture(id)})`, backgroundColor: f.color }}
      />
    </button>
  );
}

export function SwatchRow({
  ids,
  value,
  onChange,
  max = 6,
  size = "sm",
}: {
  ids: string[];
  value: string;
  onChange: (id: string) => void;
  max?: number;
  size?: "sm" | "md";
}) {
  const shown = ids.slice(0, max);
  return (
    <div className="flex items-center gap-1">
      {shown.map((id) => (
        <Swatch key={id} id={id} size={size} active={id === value} onSelect={() => onChange(id)} />
      ))}
      {ids.length > max && <span className="ml-1 text-[0.7rem] text-stone">+{ids.length - max}</span>}
    </div>
  );
}
