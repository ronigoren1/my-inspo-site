import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { cinema } from "@/content/cinema";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";

export function CinemaPage() {
  usePageTitle("Cinema");
  return (
    <>
      <PageHeader title="Cinema">{cinema.intro || null}</PageHeader>
      <div className="px-5 md:px-10"><Gallery photos={photosIn("cinema")} columns={2} /></div>
      <section className="mt-32 bg-ink px-5 py-24 text-center text-paper md:py-32">
        <p className="caps text-paper/50">Films I love</p>
        <p className="mx-auto mt-10 max-w-5xl break-words font-display text-[1.6rem] italic leading-snug sm:text-3xl md:text-5xl">
          {cinema.films.map((f, i) => (
            <span key={f}>
              {f}
              {i < cinema.films.length - 1 && <span className="mx-3 not-italic text-cherry">✦</span>}
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
