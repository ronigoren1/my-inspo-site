import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { usePageTitle } from "@/usePageTitle";

export function NotFoundPage() {
  usePageTitle("Not found");
  return (
    <PageHeader label="404" title="Nothing here">
      <Link to="/" className="link-line not-italic">Back home</Link>
    </PageHeader>
  );
}
