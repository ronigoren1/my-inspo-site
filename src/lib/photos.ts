// Finds every photo automatically.
// You never need to edit this file - just upload photos into the folders.

export type Photo = {
  /** Small version, for grids */
  thumb: string;
  /** Large version, for full-width photos and the full-screen view */
  full: string;
  /** Made from the file name: "02 Duomo di Milano.jpg" → "Duomo di Milano" */
  caption: string;
  file: string;
  folder: string;
};

// Every image is shrunk and converted to a fast web format when the site is built.
// (.HEIC iPhone photos are turned into .jpg just before this, by scripts/prepare-photos.mjs)
//
// Photos live in folders at the TOP of the project: home, architecture, style, cinema, blog, cities.
// (Photos inside "photos/…" or "src/photos/…" are found too, so nothing breaks if a folder ends up there.)
const thumbs = import.meta.glob<string>(
  [
    "/{about,home,architecture,style,cinema,blog,cities}/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,Jpg,Jpeg,Png}",
    "/{photos,src/photos}/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,Jpg,Jpeg,Png}",
  ],
  { eager: true, import: "default", query: { w: "900", format: "webp", withoutEnlargement: "" } },
);
const fulls = import.meta.glob<string>(
  [
    "/{about,home,architecture,style,cinema,blog,cities}/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,Jpg,Jpeg,Png}",
    "/{photos,src/photos}/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,Jpg,Jpeg,Png}",
  ],
  { eager: true, import: "default", query: { w: "2000", format: "webp", withoutEnlargement: "" } },
);

/** "Tel Aviv", "tel-aviv" and "TEL_AVIV" all become "tel-aviv"; accents are dropped. */
export function normalize(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");
}

/** Camera-style names (IMG_1234, 86F4FD1C-…, WhatsApp Image …) don't become captions. */
function captionFrom(file: string) {
  const base = file
    .replace(/\.(heic|heif)\.jpg$/i, "")   // converted iPhone photo
    .replace(/\.[^.]+$/, "")               // remove .jpg
    .replace(/^\d+[\s._-]*/, "")           // remove a leading order number: "01 Duomo" → "Duomo"
    .replace(/_/g, " ")
    .trim();
  if (base === "") return "";
  if (/^(img|dsc|dscn|pxl|photo|image|pinterest|screenshot|whatsapp image|whatsapp)\b/i.test(base)) return "";
  if (/^[\d\s._-]+$/.test(base)) return "";
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(base)) return "";
  return base;
}

const all: Photo[] = Object.keys(thumbs)
  .map((path) => {
    const parts = path.replace(/^\/(src\/photos|photos)\//, "").replace(/^\//, "").split("/");
    const file = parts.pop()!;
    return {
      thumb: thumbs[path],
      full: fulls[path],
      caption: captionFrom(file),
      file,
      folder: parts.map(normalize).join("/"),
    };
  })
  .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: "base" }));

/** All photos in a folder, e.g. photosIn("architecture") or photosIn("cities", "Tel Aviv"). */
export function photosIn(...folder: string[]): Photo[] {
  const want = folder.map(normalize).join("/");
  return all.filter((p) => p.folder === want);
}

/** Find one photo by its file name inside a folder (used for blog covers and photos in posts). */
export function findPhoto(folder: string, file: string | undefined): Photo | undefined {
  if (!file) return undefined;
  const want = file.trim().toLowerCase();
  return photosIn(folder).find((p) => {
    const name = p.file.toLowerCase();
    return name === want || name === want.replace(/\.(heic|heif)$/, ".heic.jpg");
  });
}
