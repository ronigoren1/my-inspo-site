import { Link } from "react-router-dom";
import { allLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-40 bg-ink text-paper">
      <div className="grid gap-12 px-5 pb-10 pt-20 md:grid-cols-3 md:px-10">
        <div>
          <p className="caps text-paper/50">Write to me</p>
          <a href={`mailto:${site.email}`} className="mt-3 block italic-serif text-2xl hover:text-paper/60">{site.email}</a>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center" aria-label="Footer">
          {allLinks.map((l) => (
            <Link key={l.to} to={l.to} className="caps hover:text-paper/60">{l.label}</Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 md:items-end">
          <p className="caps text-paper/50">Instagram</p>
          {site.instagram.map((ig) => (
            <a key={ig.url} href={ig.url} target="_blank" rel="noreferrer" className="italic-serif text-xl hover:text-paper/60">{ig.handle}</a>
          ))}
        </div>
      </div>
      <p className="select-none overflow-hidden whitespace-nowrap px-3 pb-6 text-center font-display text-[13.5vw] uppercase leading-none tracking-[0.02em] text-paper/90">
        {site.name}
      </p>
      <p className="caps border-t border-paper/15 px-5 py-5 text-center text-paper/40">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
