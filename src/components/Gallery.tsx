import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/photos";

/**
 * A magazine-style photo wall: photos keep their own shape (nothing is cropped)
 * and flow in columns. Click a photo to see it big; arrow keys move, Esc closes.
 */
export function Gallery({ photos, columns = 3, empty = "Photographs coming soon." }: { photos: Photo[]; columns?: 2 | 3; empty?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const move = useCallback((step: number) => setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, move]);

  if (photos.length === 0) return <p className="py-20 text-center italic-serif text-2xl text-soft">{empty}</p>;
  const current = index === null ? null : photos[index];

  return (
    <>
      <div className={`gap-4 md:gap-6 ${columns === 2 ? "columns-1 sm:columns-2" : "columns-2 lg:columns-3"}`}>
        {photos.map((photo, i) => (
          <figure key={photo.folder + photo.file} className="mb-4 break-inside-avoid md:mb-6">
            <button type="button" onClick={() => setIndex(i)} className="block w-full overflow-hidden" aria-label={`Open ${photo.caption || "photo"}`}>
              <img src={photo.thumb} alt={photo.caption} loading="lazy" className="zoom w-full" />
            </button>
            {photo.caption && <figcaption className="mt-3 italic-serif text-lg">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper p-4 md:p-12" onClick={close} role="dialog" aria-modal="true">
          <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={current.full} alt={current.caption} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-5 flex items-baseline gap-4">
              {current.caption && <span className="italic-serif text-xl">{current.caption}</span>}
              <span className="caps text-soft">{(index ?? 0) + 1} / {photos.length}</span>
            </figcaption>
          </figure>
          <button type="button" onClick={close} className="caps absolute right-5 top-5 hover:text-cherry">Close</button>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); move(-1); }} className="caps absolute bottom-6 left-5 hover:text-cherry md:bottom-auto md:top-1/2">Prev</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); move(1); }} className="caps absolute bottom-6 right-5 hover:text-cherry md:bottom-auto md:top-1/2">Next</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
