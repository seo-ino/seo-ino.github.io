import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    description: site.description,
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
  };

  return (
    <>
      <section className="hero">
        <h1>آموزش سئو به زبان ساده</h1>
        <p>{site.description}</p>
      </section>

      <section aria-labelledby="latest">
        <h2 id="latest" className="section-title">
          آخرین مقاله‌ها
        </h2>
        {/* <div className="grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div> */}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
