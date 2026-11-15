import { Link, useParams } from "react-router-dom";
import { Gallery } from "@/components/Gallery";
import { cities } from "@/lib/content";
import { usePageTitle } from "@/usePageTitle";
import { NotFoundPage } from "./NotFoundPage";

const statusLabel = { visited: "", next: "Next stop", dream: "Dreaming of" };

export function CityPage() {
  const { slug } = useParams();
  const city = cities.find((c) => c.slug === slug);
  usePageTitle(city?.name);
  if (!city) return <NotFoundPage />;

  const [cover, ...rest] = city.photos;
  const list = cities.filter((c) => c.status === city.status);
  const next = list[(list.indexOf(city) + 1) % list.length];

  return (
    <>
      {cover ? (
        <section className="relative h-[85svh] min-h-[480px]">
          <img src={cover.full} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="reveal absolute inset-x-0 bottom-0 px-5 pb-12 text-center text-paper md:pb-16">
            <p className="caps text-paper/80">{city.country}</p>
            <h1 className="mt-4 text-[clamp(3rem,12vw,10rem)] leading-[0.95]">{city.name}</h1>
          </div>
        </section>
      ) : (
        <header className="reveal px-5 pb-16 pt-20 text-center md:pt-32">
          <p className="caps text-soft">{city.country}{statusLabel[city.status] && ` · ${statusLabel[city.status]}`}</p>
          <h1 className="mt-5 text-[clamp(3rem,12vw,10rem)] leading-[0.95]">{city.name}</h1>
        </header>
      )}

      <p className="mt-12 text-center"><Link to="/cities" className="link-line">All cities</Link></p>

      {city.hasWords && <div className="prose-roni mx-auto mt-16 max-w-2xl px-5" dangerouslySetInnerHTML={{ __html: city.html }} />}

      {(!cover || rest.length > 0) && (
        <div className="mt-16 px-5 md:px-10">
          <Gallery
            photos={rest}
            columns={2}
            empty={city.status === "visited" ? `Photographs from ${city.name} coming soon.` : "One day."}
          />
        </div>
      )}

      {next && next !== city && (
        <Link to={`/cities/${next.slug}`} className="group mt-32 block border-y border-line py-16 text-center">
          <span className="caps text-soft">Next city</span>
          <span className="mt-4 block font-display text-[clamp(2.6rem,9vw,6rem)] group-hover:italic group-hover:text-cherry">{next.name}</span>
        </Link>
      )}
    </>
  );
}
