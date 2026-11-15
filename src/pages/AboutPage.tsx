// The About page. The words are in src/content/about.ts, the photo in the folder "about".
import { Link } from "react-router-dom";
import { Picture } from "@/components/Picture";
import { about } from "@/content/about";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";

export function AboutPage() {
  usePageTitle("About");
  const [portrait, ...more] = photosIn("about");

  return (
    <>
      <section className="grid md:min-h-[calc(100svh-80px)] md:grid-cols-2">
        <Picture photo={portrait} large eager className="aspect-[4/5] md:aspect-auto" position="center 30%" />
        <div className="flex flex-col justify-center px-5 py-20 md:px-16 lg:px-24">
          <p className="caps reveal text-soft">About</p>
          <h1 className="reveal mt-6 text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.95]">{about.title}</h1>
          <p className="reveal mt-8 italic-serif text-2xl leading-snug text-cherry md:text-3xl">{about.intro}</p>
          <div className="mt-10 max-w-xl space-y-5 font-serif text-xl leading-relaxed md:text-[1.35rem]">
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-12 flex flex-wrap gap-8">
            <Link to="/cities" className="link-line">My cities</Link>
            <Link to="/contact" className="link-line">Write to me</Link>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="mt-6 grid grid-cols-2 gap-5 px-5 md:mt-6 md:grid-cols-3 md:gap-6 md:px-10">
          {more.map((p) => <Picture key={p.file} photo={p} className="aspect-[3/4]" />)}
        </section>
      )}
    </>
  );
}
