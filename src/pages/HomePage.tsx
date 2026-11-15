import { Link } from "react-router-dom";
import { Picture } from "@/components/Picture";
import { cinema } from "@/content/cinema";
import { site } from "@/content/site";
import { cities, posts } from "@/lib/content";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";
import { PostCard } from "./BlogPage";

function SectionTitle({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 md:px-10">
      <h2 className="text-[clamp(2.4rem,7vw,4.5rem)]">{title}</h2>
      <Link to={to} className="link-line shrink-0">{label}</Link>
    </div>
  );
}

export function HomePage() {
  usePageTitle();
  const hero = photosIn("home");
  const arch = photosIn("architecture");
  const style = photosIn("style");
  const stills = photosIn("cinema");
  // The two cities you've been to with the most photos are featured; the rest are listed.
  const withPhotos = cities
    .filter((c) => c.status === "visited" && c.photos.length > 0)
    .sort((a, b) => b.photos.length - a.photos.length)
    .slice(0, 2);
  const others = cities.filter((c) => c.status === "visited" && !withPhotos.includes(c));

  return (
    <>
      <h1 className="sr-only">{site.name}</h1>

      {/* ── Opening: two photos side by side, full screen ── */}
      <section className="relative h-[100svh] min-h-[560px]">
        <div className="grid h-full md:grid-cols-2">
          <Picture photo={hero[0]} large eager className="h-full" position="center 30%" />
          <Picture photo={hero[1]} large eager className="hidden h-full md:block" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 md:via-20%" />
        <div className="reveal absolute bottom-0 left-0 px-5 pb-12 text-paper md:w-1/2 md:px-10 md:pb-16">
          <p className="max-w-md font-display text-4xl italic leading-[1.1] md:text-5xl">{site.tagline}</p>
        </div>
      </section>

      {/* ── Cities ── */}
      <section className="pt-28 md:pt-40">
        <SectionTitle title="Cities" to="/cities" label="All cities" />
        <div className="mt-12 grid gap-5 px-5 md:grid-cols-3 md:gap-6 md:px-10">
          {withPhotos.map((c) => (
            <Link key={c.slug} to={`/cities/${c.slug}`} className="group">
              <Picture photo={c.photos[0]} className="aspect-[3/4]" />
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-3xl group-hover:italic">{c.name}</h3>
                <span className="caps text-soft">{c.country}</span>
              </div>
            </Link>
          ))}
          <Link to="/cities" className="group flex aspect-[3/4] flex-col justify-center bg-sand p-8 text-center md:p-12">
            <p className="caps text-soft">{others.length ? "And also" : "All cities"}</p>
            <p className="mt-6 italic-serif text-3xl leading-snug md:text-[2.1rem]">
              {others.map((c) => c.name).join(" · ")}
            </p>
            <span className="link-line mx-auto mt-8 group-hover:text-cherry">Discover</span>
          </Link>
        </div>
      </section>

      {/* ── Your quote, in red ── */}
      <section className="mt-28 bg-cherry px-5 py-28 text-center text-paper md:mt-40 md:py-40">
        <p className="mx-auto max-w-4xl font-display text-4xl italic leading-tight md:text-7xl">“{site.quote}”</p>
        <p className="caps mt-10 text-paper/70">{site.quoteBy}</p>
      </section>

      {/* ── Architecture: one large photo, two smaller ones ── */}
      <section className="pt-28 md:pt-40">
        <SectionTitle title="Architecture" to="/architecture" label="The gallery" />
        <div className="mt-12 grid grid-cols-12 gap-5 px-5 md:gap-6 md:px-10">
          <Link to="/architecture" className="col-span-12 md:col-span-7">
            <Picture photo={arch[0]} className="aspect-[4/5]" />
          </Link>
          <div className="col-span-12 grid grid-cols-2 gap-5 md:col-span-4 md:col-start-9 md:grid-cols-1 md:gap-6">
            <Link to="/architecture" className="md:mt-24"><Picture photo={arch[1]} className="aspect-[3/4]" /></Link>
            <Link to="/architecture"><Picture photo={arch[2]} className="aspect-[3/4]" /></Link>
          </div>
        </div>
      </section>

      {/* ── Cinema ── */}
      <section className="mt-28 grid md:mt-40 md:grid-cols-2">
        <Picture photo={stills[0]} className="aspect-[4/5] md:aspect-auto md:min-h-[90vh]" position="center 60%" />
        <div className="flex flex-col justify-center bg-ink px-8 py-20 text-paper md:px-20">
          <p className="caps text-paper/50">Cinema</p>
          <h2 className="mt-5 text-5xl md:text-7xl">Films I love</h2>
          <ul className="mt-10 space-y-2">
            {cinema.films.slice(0, 6).map((f) => (
              <li key={f} className="italic-serif text-2xl md:text-3xl">{f}</li>
            ))}
          </ul>
          <Link to="/cinema" className="link-line mt-12 self-start">Enter the cinema</Link>
        </div>
      </section>

      {/* ── Style: a row of four, staggered ── */}
      <section className="pt-28 md:pt-40">
        <SectionTitle title="Style" to="/style" label="See more" />
        <div className="mt-12 grid grid-cols-2 gap-5 px-5 md:grid-cols-4 md:gap-6 md:px-10">
          {style.slice(0, 4).map((p, i) => (
            <Link key={p.file} to="/style" className={i % 2 === 1 ? "mt-12 md:mt-20" : ""}>
              <Picture photo={p} className="aspect-[3/4]" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── From the blog (appears once you've written a post) ── */}
      {posts.length > 0 && (
        <section className="pt-28 md:pt-40">
          <SectionTitle title="From the blog" to="/blog" label="All stories" />
          <div className="mt-12 grid gap-x-6 gap-y-14 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
