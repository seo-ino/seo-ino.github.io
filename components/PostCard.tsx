import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const fmt = new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" });

export function formatDate(iso: string) {
  return fmt.format(new Date(iso));
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card">
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.description}</p>
      <p className="meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
      </p>
    </article>
  );
}
