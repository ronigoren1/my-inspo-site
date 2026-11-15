import { useEffect } from "react";
import { site } from "@/content/site";

/** Sets the browser-tab title. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} - ${site.name}` : site.name;
  }, [title]);
}
