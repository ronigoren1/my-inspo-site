import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { architecture } from "@/content/architecture";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";

export function ArchitecturePage() {
  usePageTitle("Architecture");
  return (
    <>
      <PageHeader title="Architecture">{architecture.intro || null}</PageHeader>
      <div className="px-5 md:px-10"><Gallery photos={photosIn("architecture")} /></div>
      {architecture.architects.length > 0 && (
        <section className="mt-32 px-5 text-center">
          <p className="caps text-soft">Architects I love</p>
          <p className="mt-6 font-display text-4xl italic md:text-6xl">{architecture.architects.join(" & ")}</p>
        </section>
      )}
    </>
  );
}
