import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { allLinks, site } from "@/content/site";

function MenuLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `caps transition-opacity hover:opacity-60 ${isActive ? "text-cherry" : ""}`}>
      {label}
    </NavLink>
  );
}

/** Your name in the middle, the menu split on both sides – like a fashion house.
 *  On the Home page it floats over the opening, then gets a thin line when you scroll. */
export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the phone menu is open, the page behind it shouldn't scroll.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const atTop = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        atTop ? "bg-transparent text-ink" : "border-b border-line bg-paper/95 text-ink backdrop-blur"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-5 md:px-10 md:py-6">
        <nav className="hidden gap-8 lg:flex">
          {site.menuLeft.map((l) => <MenuLink key={l.to} {...l} />)}
        </nav>
        <button type="button" className="caps justify-self-start lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu">
          {open ? "Close" : "Menu"}
        </button>

        <Link
          to="/"
          className={`font-display text-[1.35rem] uppercase tracking-[0.3em] md:text-[1.7rem]`}
        >
          {site.name}
        </Link>

        <nav className="hidden justify-end gap-8 lg:flex">
          {site.menuRight.map((l) => <MenuLink key={l.to} {...l} />)}
        </nav>
      </div>

      {open && (
        <nav id="mobile-menu" className="flex h-[calc(100svh-68px)] flex-col items-center justify-center gap-6 bg-paper lg:hidden">
          {allLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `font-display text-4xl ${isActive ? "italic text-cherry" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
