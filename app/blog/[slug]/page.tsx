import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard, { formatDate } from "@/components/PostCard";
import { getAllSlugs, getPost, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, ...post.tags],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: site.locale,
      siteName: site.name,
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: { card: "summary", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      inLanguage: site.language,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
      author: { "@type": "Organization", name: site.author, url: site.github },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <nav aria-label="مسیر صفحه" className="breadcrumb">
        <Link href="/">خانه</Link> / <span>{post.title}</span>
      </nav>

      <article className="prose">
        <header>
          <h1>{post.title}</h1>
          <p className="meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
            {post.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
            {post.updated && (
              <>
                {" "}
                · به‌روزرسانی: <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            )}
          </p>
        </header>

        {post.toc.length > 2 && (
          <nav aria-label="فهرست مطالب" className="toc">
            <strong>فهرست مطالب</strong>
            <ol>
              {post.toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="related">
          <h2 id="related" className="section-title">
            مقاله‌های مرتبط
          </h2>
          <div className="grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
