# Roni Goren

My site: Blog · Cities · Architecture · Style · Cinema · Contact.

Every change you save on GitHub goes live on the site by itself, about a minute later.

---

## Where to edit what

| I want to change… | Where |
|---|---|
| My name, the line over the top photo, the red quote, email, Instagram, menu | `src/content/site.ts` |
| The list of films on the Cinema page | `src/content/cinema.ts` |
| Architects / intro on Architecture | `src/content/architecture.ts` |
| A city's text (my feelings, tips) | `src/content/cities/<city>.md` |
| Colours and fonts | top of `src/styles.css` |

Only change the words **inside quote marks** `"like this"`. Keep the quote marks and commas.

## Photos - just upload, nothing else

Your photos live in folders at the **top** of the project (the first page you see on GitHub):

| Folder | Where the photos appear |
|---|---|
| `home` | The two big photos at the top of the Home page (the first two) |
| `cities` → one folder per city, e.g. `cities/paris` | That city's page. The first photo is the big cover. The folder can be named like the city: `Tel Aviv`, `Firenze`, `paris`… |
| `architecture` | Architecture gallery (first 3 also on Home) |
| `style` | Style gallery (first 4 also on Home) |
| `cinema` | Cinema page. **The file name becomes the caption**, e.g. `Roman Holiday.jpg` |
| `blog` | Photos for blog posts |

- **Order:** photos are sorted by name, so start names with numbers: `01.jpg`, `02.jpg`…
- **To upload:** open the folder on GitHub → **Add file** → **Upload files** → pick photos → **Commit changes**.
- **To remove:** open the photo on GitHub → **⋯** → **Delete file** → **Commit changes**.
- Any photo type works: **.jpg, .png, or iPhone .HEIC**. Photos taken sideways are turned upright automatically, and hidden location data is removed.

## Write a blog post

See `src/content/blog/_how-to-write-a-post.md` - it's a ready template.

## Add a city

1. In `src/content/cities`, copy any city file (e.g. `paris.md`) to a new name like `lisbon.md` and change the name/country.
   `status:` is `visited`, `next` or `dream`.
2. For the photos: on your computer make a folder called `Lisbon` with the photos inside. On GitHub open the `cities` folder → **Add file** → **Upload files** → drag the whole `Lisbon` folder in → **Commit changes**.

---

### For the technical bits
Vite + React + TypeScript + Tailwind CSS. Run locally with `npm install` then `npm run dev`.
Before each build, `scripts/prepare-photos.mjs` converts HEIC photos and fixes sideways ones.
