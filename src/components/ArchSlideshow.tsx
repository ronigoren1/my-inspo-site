import { useEffect, useState } from "react";
import type { Photo } from "@/lib/photos";

/** An arched window where photos slowly take turns (soft fade + gentle zoom). */
export function ArchSlideshow({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), 4500);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div className={`relative overflow-hidden rounded-t-full bg-sand ${className}`}>
      {photos.map((p, i) => (
        <img
          key={p.file}
          src={p.full}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          className={`arch-photo absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
            i === index ? "is-on opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
