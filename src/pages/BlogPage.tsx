import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Picture } from "@/components/Picture";
import { formatDate, posts, type Post } from "@/lib/content";
import { usePageTitle } from "@/usePageTitle";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <Picture photo={post.cover} className="aspect-[4/5]" />
      <p className="caps mt-5 text-soft">{formatDate(post.date)}</p>
      <h3 className="mt-3 text-3xl leading-tight group-hover:italic">{post.title}</h3>
      {post.summary && <p className="mt-2 italic-serif text-xl text-soft">{post.summary}</p>}
    </Link>
  );
}

export function BlogPage() {
  usePageTitle("Blog");
  return (
    <>
      <PageHeader title="Blog" />
      <div className="px-5 md:px-10">
        {posts.length === 0 ? (
          <p className="py-10 text-center italic-serif text-2xl text-soft">The first story is on its way.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
