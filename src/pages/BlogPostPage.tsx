import { Link, useParams } from "react-router-dom";
import { formatDate, posts } from "@/lib/content";
import { usePageTitle } from "@/usePageTitle";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  usePageTitle(post ? post.title : "Not found");
  if (!post) return <NotFoundPage />;

  return (
    <article>
      <header className="reveal mx-auto max-w-4xl px-5 pb-16 pt-20 text-center md:pt-28">
        <Link to="/blog" className="link-line">Blog</Link>
        <p className="caps mt-12 text-soft">{formatDate(post.date)}</p>
        <h1 className="mt-5 text-5xl leading-[1.05] md:text-8xl">{post.title}</h1>
        {post.summary && <p className="mt-8 italic-serif text-2xl text-soft">{post.summary}</p>}
      </header>
      {post.cover && <img src={post.cover.full} alt="" className="mx-auto w-full max-w-6xl md:px-10" />}
      <div className="prose-roni mx-auto mt-16 max-w-2xl px-5" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
