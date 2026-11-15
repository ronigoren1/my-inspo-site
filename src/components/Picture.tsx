import type { Photo } from "@/lib/photos";

/** A photo that fills its box (or a soft panel if there's no photo yet). */
export function Picture({ photo, className = "", eager, large, position = "center" }: {
  photo?: Photo; className?: string; eager?: boolean; large?: boolean; position?: string;
}) {
  return (
    <div className={`overflow-hidden bg-sand ${className}`}>
      {photo && (
        <img
          src={large ? photo.full : photo.thumb}
          alt={photo.caption}
          loading={eager ? "eager" : "lazy"}
          style={{ objectPosition: position }}
          className="zoom h-full w-full object-cover"
        />
      )}
    </div>
  );
}
