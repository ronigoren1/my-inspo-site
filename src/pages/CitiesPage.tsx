import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { cities, type City } from "@/lib/content";
import { usePageTitle } from "@/usePageTitle";

const groups: { status: City["status"]; title: string }[] = [
  { status: "visited", title: "Where I've been" },
  { status: "next", title: "Next stop" },
  { status: "dream", title: "Dreaming of" },
];

/** The cities as an index, like the contents page of a book.
 *  On a computer, hovering a city shows its photo beside the list. */
export function CitiesPage() {
  usePageTitle("Cities");
  const [hover, setHover] = useState<City | null>(null);
  const firstWithPhoto = cities.find((c) => c.photos.length > 0);
  const shown = (hover?.photos[0] ? hover : null) ?? firstWithPhoto;

  return (
    <>
      <PageHeader title="Cities" />
      <div className="grid gap-16 px-5 md:grid-cols-2 md:px-10">
        <div className="space-y-20">
          {groups.map(({ status, title }) => {
            const list = cities.filter((c) => c.status === status);
            if (list.length === 0) return null;
            return (
              <section key={status}>
                <h2 className="caps border-b border-ink pb-4">{title}</h2>
                <ul>
                  {list.map((c) => (
                    <li key={c.slug} className="border-b border-line">
                      <Link
                        to={`/cities/${c.slug}`}
                        onMouseEnter={() => setHover(c)}
                        className="group flex items-center gap-3 py-5 md:gap-5"
                      >
                        {c.photos[0] && (
                          <img src={c.photos[0].thumb} alt="" className="h-16 w-12 object-cover md:hidden" />
                        )}
                        <span className="min-w-0 font-display text-[2rem] leading-none group-hover:italic group-hover:text-cherry md:text-5xl">{c.name}</span>
                        <span className="caps ml-auto shrink-0 text-right text-soft">
                          {c.country}
                          {c.photos.length > 0 && <span className="text-cherry"> · {c.photos.length}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="hidden md:block">
          <div className="sticky top-32">
            <div className="aspect-[3/4] overflow-hidden bg-sand">
              {shown?.photos[0] && <img key={shown.slug} src={shown.photos[0].thumb} alt="" className="reveal h-full w-full object-cover" />}
            </div>
            {shown && <p className="mt-4 italic-serif text-2xl">{shown.name}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
