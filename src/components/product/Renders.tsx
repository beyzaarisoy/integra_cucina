"use client";

import { useId } from "react";
import clsx from "clsx";
import { texture } from "@/lib/finishes";
import type { DoorStyle } from "@/lib/products";

/* Studio-lit sample renders of fronts, slabs and hardware, driven by the finish textures. */

const light =
  "linear-gradient(118deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 38%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.16) 100%)";

const overlays: Partial<Record<DoorStyle, string>> = {
  fluted:
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(255,255,255,0.16) 2px, rgba(255,255,255,0.05) 6px, rgba(0,0,0,0.04) 9px, rgba(0,0,0,0.28) 12px)",
  tambour:
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(255,255,255,0.18) 1.5px, rgba(255,255,255,0.02) 4px, rgba(0,0,0,0.3) 6px)",
};

export function DoorRender({ finish, style, className }: { finish: string; style: DoorStyle; className?: string }) {
  const tex = `url(${texture(finish)})`;
  return (
    <div className={clsx("relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_50%_10%,#f7f4ee_0%,#e6e0d5_60%,#d9d1c3_100%)]", className)}>
      {/* floor */}
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-b from-[#d6cdbd] to-[#cfc5b3]" />
      <div className="absolute bottom-[12.5%] left-1/2 h-[4%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-xl" />
      <div
        className="absolute bottom-[14%] left-1/2 h-[76%] w-[50%] -translate-x-1/2 shadow-[18px_24px_40px_-12px_rgba(40,30,20,0.45),0_2px_3px_rgba(0,0,0,0.2)] transition-[background-image] duration-700"
        style={{ backgroundImage: tex, backgroundSize: style === "fluted" || style === "tambour" ? "260% auto" : "200% auto", backgroundPosition: "center" }}
      >
        {style === "reeded" && (
          <div className="absolute inset-[9%] overflow-hidden bg-[linear-gradient(180deg,#e9ebe8,#cfd4d2)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)]">
            <div className="absolute left-[18%] top-[22%] h-[10%] w-[60%] rounded-full bg-[#a69c8d] blur-[6px]" />
            <div className="absolute left-[24%] top-[52%] h-[18%] w-[18%] rounded-sm bg-[#8b8173] blur-[6px]" />
            <div className="absolute left-[55%] top-[56%] h-[14%] w-[22%] rounded-full bg-[#b9ad9b] blur-[6px]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.55)_0px,rgba(255,255,255,0.08)_3px,rgba(0,0,0,0.12)_6px,rgba(255,255,255,0.4)_8px)]" />
          </div>
        )}
        {overlays[style] && <div className="absolute inset-0" style={{ backgroundImage: overlays[style] }} />}
        {style === "handleless" && (
          <div className="absolute inset-x-0 top-0 h-[5%] bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.15)_70%,rgba(255,255,255,0.25))]" />
        )}
        {style === "shaker" && (
          <div className="absolute inset-[13%] shadow-[inset_3px_3px_5px_rgba(0,0,0,0.35),inset_-2px_-2px_3px_rgba(255,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.12)]" />
        )}
        {style === "framed" && (
          <>
            <div className="absolute inset-[8%] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.18)]" />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
              <path d="M0 0 8 8M100 0 92 8M0 100 8 92M100 100 92 92" stroke="rgba(0,0,0,0.3)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
            </svg>
          </>
        )}
        {style === "slab" && <div className="absolute right-[7%] top-[44%] h-[12%] w-[1.6%] rounded-full bg-[linear-gradient(90deg,#8d7246,#d9bd86,#8d7246)] shadow-[2px_2px_3px_rgba(0,0,0,0.35)]" />}
        <div className="absolute inset-0" style={{ backgroundImage: light }} />
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),inset_-1px_-1px_0_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
}

type Pt = [number, number];
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const pts = (...p: Pt[]) => p.map((q) => q.join(",")).join(" ");

export function SlabRender({ finish, edge, className }: { finish: string; edge: "mitred" | "thin" | "waterfall"; className?: string }) {
  const id = useId().replace(/:/g, "");
  const O: Pt = [62, 196];
  const u: Pt = [214, -70];
  const v: Pt = [92, 46];
  const h = edge === "thin" ? 7 : edge === "mitred" ? 24 : 12;
  const fall = edge === "waterfall" ? 128 : 0;
  const T = 512;
  const top = [O, add(O, u), add(add(O, u), v), add(O, v)] as Pt[];
  const fl = add(O, v);
  const fr = add(add(O, u), v);
  const front = [fl, fr, add(fr, [0, h]), add(fl, [0, h])] as Pt[];
  const r1 = add(O, u);
  const side = [r1, fr, add(fr, [0, h + fall]), add(r1, [0, h + fall])] as Pt[];
  const m = (a: Pt, b: Pt, o: Pt) => `matrix(${a[0] / T} ${a[1] / T} ${b[0] / T} ${b[1] / T} ${o[0]} ${o[1]})`;

  return (
    <div className={clsx("relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#f7f4ee_0%,#e7e1d6_60%,#dad2c4_100%)]", className)}>
      <svg viewBox="45 70 320 290" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <pattern id={`t${id}`} patternUnits="userSpaceOnUse" width={T} height={T} patternTransform={m(u, v, O)}>
            <image href={texture(finish)} width={T} height={T} preserveAspectRatio="none" />
          </pattern>
          <pattern id={`f${id}`} patternUnits="userSpaceOnUse" width={T} height={T} patternTransform={m(u, [0, Math.max(h, 40)], fl)}>
            <image href={texture(finish)} width={T} height={T} preserveAspectRatio="none" />
          </pattern>
          <pattern id={`s${id}`} patternUnits="userSpaceOnUse" width={T} height={T} patternTransform={m(v, [0, Math.max(h + fall, 40)], r1)}>
            <image href={texture(finish)} width={T} height={T} preserveAspectRatio="none" />
          </pattern>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.12" />
          </linearGradient>
          <filter id={`b${id}`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <polygon points={pts(add(O, [10, h + fall + 22]), add(add(O, u), [40, h + fall + 10]), add(add(add(O, u), v), [20, h + fall + 22]), add(add(O, v), [0, h + 30]))} fill="rgba(60,45,30,0.32)" filter={`url(#b${id})`} />
        {fall > 0 && (
          <>
            <polygon points={pts(...side)} fill={`url(#s${id})`} />
            <polygon points={pts(...side)} fill="rgba(0,0,0,0.3)" />
          </>
        )}
        <polygon points={pts(...front)} fill={`url(#f${id})`} />
        <polygon points={pts(...front)} fill="rgba(0,0,0,0.18)" />
        {fall === 0 && (
          <>
            <polygon points={pts(r1, fr, add(fr, [0, h]), add(r1, [0, h]))} fill={`url(#s${id})`} />
            <polygon points={pts(r1, fr, add(fr, [0, h]), add(r1, [0, h]))} fill="rgba(0,0,0,0.32)" />
          </>
        )}
        <polygon points={pts(...top)} fill={`url(#t${id})`} />
        <polygon points={pts(...top)} fill={`url(#g${id})`} />
        <polyline points={pts(fl, fr, r1)} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

export function HardwareRender({ finish, shape, className }: { finish: string; shape: "edge" | "bar" | "knob" | "loop"; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={clsx("relative h-full w-full overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${texture("cashmere")})`, backgroundSize: "cover" }} />
      <div className="absolute inset-0" style={{ backgroundImage: light }} />
      <div className="absolute left-0 right-0 top-[58%] h-px bg-black/25 shadow-[0_1px_0_rgba(255,255,255,0.4)]" />
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id={`m${id}`} patternUnits="userSpaceOnUse" width="400" height="400">
            <image href={texture(finish)} width="400" height="400" preserveAspectRatio="none" />
          </pattern>
          <linearGradient id={`cy${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.35" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id={`rd${id}`} cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
          <filter id={`sh${id}`} x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="6" dy="10" stdDeviation="7" floodColor="#2b2014" floodOpacity="0.45" />
          </filter>
        </defs>
        {shape === "edge" && (
          <g filter={`url(#sh${id})`}>
            <rect x="80" y="282" width="240" height="14" fill={`url(#m${id})`} />
            <rect x="80" y="282" width="240" height="14" fill={`url(#cy${id})`} />
          </g>
        )}
        {shape === "bar" && (
          <g filter={`url(#sh${id})`}>
            <rect x="95" y="232" width="14" height="40" fill={`url(#m${id})`} />
            <rect x="291" y="232" width="14" height="40" fill={`url(#m${id})`} />
            <rect x="70" y="218" width="260" height="22" rx="11" fill={`url(#m${id})`} />
            <rect x="70" y="218" width="260" height="22" rx="11" fill={`url(#cy${id})`} />
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1={140 + i * 5} y1="219" x2={136 + i * 5} y2="239" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            ))}
          </g>
        )}
        {shape === "knob" && (
          <g filter={`url(#sh${id})`}>
            <circle cx="200" cy="230" r="44" fill={`url(#m${id})`} />
            <circle cx="200" cy="230" r="44" fill={`url(#rd${id})`} />
            <circle cx="200" cy="230" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </g>
        )}
        {shape === "loop" && (
          <g filter={`url(#sh${id})`}>
            <path d="M120 270 C120 160, 280 160, 280 270" fill="none" stroke={`url(#m${id})`} strokeWidth="18" strokeLinecap="round" />
            <path d="M120 270 C120 160, 280 160, 280 270" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round" transform="translate(-3 -5)" />
            <ellipse cx="120" cy="272" rx="16" ry="7" fill={`url(#m${id})`} />
            <ellipse cx="280" cy="272" rx="16" ry="7" fill={`url(#m${id})`} />
          </g>
        )}
      </svg>
    </div>
  );
}
