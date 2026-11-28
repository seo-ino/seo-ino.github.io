import type { MetadataRoute } from "next";

// برای GitHub Pages (output: 'export') این خط لازم است
export const dynamic = "force-static";

const baseUrl = "https://seo-ino.github.io";

// const articles = [
//   { slug: 'article-1', updatedAt: '2026-11-01' },
//   { slug: 'article-2', updatedAt: '2026-11-15' },
// ]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
