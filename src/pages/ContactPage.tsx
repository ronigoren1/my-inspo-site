import { Picture } from "@/components/Picture";
import { site } from "@/content/site";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";

export function ContactPage() {
  usePageTitle("Contact");
  const photo = photosIn("home")[0];
  return (
    <section className="grid md:min-h-[calc(100svh-80px)] md:grid-cols-2">
      <Picture photo={photo} large className="aspect-[4/5] md:aspect-auto" position="center 30%" />
      <div className="flex flex-col justify-center px-5 py-20 md:px-16">
        <h1 className="text-[clamp(3rem,8vw,6rem)]">Contact</h1>
        <p className="mt-6 max-w-md italic-serif text-2xl text-soft">{site.contactIntro}</p>
        <p className="caps mt-16 text-soft">Write to me</p>
        <a href={`mailto:${site.email}`} className="mt-3 break-all font-display text-3xl hover:italic hover:text-cherry md:text-4xl">{site.email}</a>
        <p className="caps mt-14 text-soft">Instagram</p>
        <div className="mt-3 space-y-1">
          {site.instagram.map((ig) => (
            <a key={ig.url} href={ig.url} target="_blank" rel="noreferrer" className="block italic-serif text-3xl hover:text-cherry">{ig.handle}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
