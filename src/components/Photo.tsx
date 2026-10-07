"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { Media } from "@/lib/media";

/**
 * Plain <img> with graceful fallback and a soft fade-in once decoded.
 * Fills its (relatively positioned) parent by default.
 */
export function Photo({
  media,
  className,
  priority = false,
  sizes,
  fill = true,
  position = "center",
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  position?: string;
}) {
  const [src, setSrc] = useState(media.src);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setSrc(media.src);
  }, [media.src]);

  // The image may have finished (or failed) before hydration attached the handlers.
  useEffect(() => {
    const img = ref.current;
    if (!img?.complete) return;
    if (img.naturalWidth > 0) setLoaded(true);
    else if (media.fallback && src !== media.fallback) setSrc(media.fallback);
  }, [src, media.fallback]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={media.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (media.fallback && src !== media.fallback) setSrc(media.fallback);
      }}
      style={{ objectPosition: position }}
      className={clsx(
        fill && "absolute inset-0 h-full w-full object-cover",
        "transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
