// Gets your photos ready before the website is built. Runs by itself – you never run it.
//  1. iPhone .HEIC photos → turned into .jpg so browsers can show them.
//  2. Photos taken sideways → turned the right way up.
//     (Phones save "this photo is sideways" as a hidden tag instead of turning the picture.)
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import convert from "heic-convert";
import sharp from "sharp";

const root = new URL("../src/photos/", import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const exists = (p) => access(p).then(() => true, () => false);
let converted = 0;
let rotated = 0;

for await (const file of walk(root)) {
  try {
    if (/\.(heic|heif)$/i.test(file)) {
      const out = file.replace(/\.(heic|heif)$/i, ".heic.jpg");
      if (await exists(out)) continue;
      const jpg = await convert({ buffer: await readFile(file), format: "JPEG", quality: 0.9 });
      await writeFile(out, Buffer.from(jpg));
      converted++;
    } else if (/\.(jpe?g|png|webp)$/i.test(file)) {
      const { orientation } = await sharp(file).metadata();
      if (orientation && orientation > 1) {
        const fixed = await sharp(file).rotate().toBuffer(); // turn upright, drop the tag
        await writeFile(file, fixed);
        rotated++;
      }
    }
  } catch (err) {
    console.warn(`Skipped a photo that could not be read: ${file}\n  ${err.message}`);
  }
}
if (converted) console.log(`Converted ${converted} iPhone photo(s) to JPG.`);
if (rotated) console.log(`Turned ${rotated} sideways photo(s) upright.`);
