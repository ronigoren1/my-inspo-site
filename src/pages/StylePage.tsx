import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { style } from "@/content/style";
import { photosIn } from "@/lib/photos";
import { usePageTitle } from "@/usePageTitle";

export function StylePage() {
  usePageTitle("Style");
  return (
    <>
      <PageHeader title="Style">{style.intro || null}</PageHeader>
      <div className="px-5 md:px-10"><Gallery photos={photosIn("style")} /></div>
    </>
  );
}
