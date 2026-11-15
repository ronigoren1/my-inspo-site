import type { ReactNode } from "react";

/** The title at the top of a page. */
export function PageHeader({ label, title, children }: { label?: string; title: string; children?: ReactNode }) {
  return (
    <header className="reveal px-5 pb-16 pt-20 text-center md:pb-24 md:pt-32">
      {label && <p className="caps text-soft">{label}</p>}
      <h1 className="mt-5 text-[clamp(2.6rem,11vw,8.5rem)]">{title}</h1>
      {children && <div className="mx-auto mt-8 max-w-xl italic-serif text-2xl leading-snug text-soft">{children}</div>}
    </header>
  );
}
