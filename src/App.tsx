// Which web address shows which page.
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArchitecturePage } from "@/pages/ArchitecturePage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { CitiesPage } from "@/pages/CitiesPage";
import { CityPage } from "@/pages/CityPage";
import { ContactPage } from "@/pages/ContactPage";
import { CinemaPage } from "@/pages/CinemaPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { StylePage } from "@/pages/StylePage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/cities/:slug" element={<CityPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/style" element={<StylePage />} />
        <Route path="/cinema" element={<CinemaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
