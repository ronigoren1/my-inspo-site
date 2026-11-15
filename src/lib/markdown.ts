import { Marked } from "marked";
import { parse as parseYaml } from "yaml";
import { findPhoto } from "./photos";

/** Splits a .md file into its settings (between the --- lines) and its text. */
export function splitFile(raw: string): { data: Record<string, unknown>; body: string } {
  const text = raw.replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: text };
  let data: Record<string, unknown> = {};
  try {
    data = (parseYaml(match[1]) as Record<string, unknown>) ?? {};
  } catch {
    console.warn("Could not read the settings at the top of a file:", match[1]);
  }
  return { data, body: text.slice(match[0].length) };
}

/** Turns your writing into web page HTML. Photos are looked up in the given photos folder. */
export function toHtml(body: string, photoFolder: string): string {
  const md = new Marked({
    breaks: false,
    renderer: {
      image({ href, text }) {
        const photo = findPhoto(photoFolder, href);
        const src = photo ? photo.full : href;
        const safe = (text ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
        const caption = safe ? `<figcaption>${safe}</figcaption>` : "";
        return `<figure><img src="${src}" alt="${safe}" loading="lazy" />${caption}</figure>`;
      },
    },
  });
  // Remove <!-- notes --> so they never show on the site
  return md.parse(body.replace(/<!--[\s\S]*?-->/g, "").trim()) as string;
}

/** True when a file has no real writing yet (only notes). */
export function isEmpty(body: string) {
  return body.replace(/<!--[\s\S]*?-->/g, "").trim() === "";
}
