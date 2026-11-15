// Reads the blog posts and city pages from src/content.
// You never need to edit this file.
import { findPhoto, photosIn, type Photo } from "./photos";
import { splitFile, toHtml, isEmpty } from "./markdown";

const slugOf = (path: string) => path.split("/").pop()!.replace(/\.md$/, "");
const str = (v: unknown) => (v === undefined || v === null ? "" : String(v));

// ── Blog ───────────────────────────────────────────────
export type Post = {
  slug: string;
  title: string;
  date: Date | null;
  summary: string;
  cover?: Photo;
  html: string;
};

const postFiles = import.meta.glob<string>("/src/content/blog/*.md", {
  eager: true, query: "?raw", import: "default",
});

export const posts: Post[] = Object.entries(postFiles)
  .filter(([path]) => !slugOf(path).startsWith("_"))
  .map(([path, raw]) => {
    const { data, body } = splitFile(raw);
    const d = data.date ? new Date(str(data.date)) : null;
    return {
      slug: slugOf(path),
      title: str(data.title) || slugOf(path).replace(/-/g, " "),
      date: d && !isNaN(d.getTime()) ? d : null,
      summary: str(data.summary),
      cover: findPhoto("blog", str(data.cover)),
      html: toHtml(body, "blog"),
      draft: data.draft === true,
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

export const formatDate = (d: Date | null) =>
  d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

// ── Cities ─────────────────────────────────────────────
export type City = {
  slug: string;
  name: string;
  country: string;
  status: "visited" | "next" | "dream";
  /** Optional: a smaller number shows first (e.g. order: 1). Without it, cities go A to Z. */
  order: number;
  html: string;
  hasWords: boolean;
  photos: Photo[];
};

const cityFiles = import.meta.glob<string>("/src/content/cities/*.md", {
  eager: true, query: "?raw", import: "default",
});

export const cities: City[] = Object.entries(cityFiles)
  .filter(([path]) => !slugOf(path).startsWith("_"))
  .map(([path, raw]) => {
    const slug = slugOf(path);
    const { data, body } = splitFile(raw);
    const status = str(data.status).toLowerCase();
    return {
      slug,
      name: str(data.name) || slug,
      country: str(data.country),
      status: (status === "next" || status === "dream" ? status : "visited") as City["status"],
      order: Number.isFinite(Number(data.order)) && data.order !== undefined ? Number(data.order) : 100,
      html: toHtml(body, `cities/${slug}`),
      hasWords: !isEmpty(body),
      // Photos can be in a folder named after the file ("tel-aviv") or the city ("Tel Aviv", "Firenze")
      photos: photosIn("cities", slug).length ? photosIn("cities", slug) : photosIn("cities", str(data.name) || slug),
    };
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
