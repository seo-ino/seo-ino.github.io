import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  keyword: string;
  tags: string[];
  readingMinutes: number;
};

export type TocItem = { id: string; text: string };

export type Post = PostMeta & { html: string; toc: TocItem[] };

function slugifyHeading(text: string) {
  return text
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .toLowerCase();
}

function readingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function parseFile(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: new Date(data.date).toISOString().slice(0, 10),
    updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : undefined,
    keyword: String(data.keyword ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingTime(content),
  };
  return { meta, content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => parseFile(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!getAllSlugs().includes(slug)) return null;
  const { meta, content } = parseFile(slug);
  const file = await remark().use(remarkGfm).use(remarkHtml).process(content);

  const toc: TocItem[] = [];
  const html = String(file).replace(
    /<h2>(.*?)<\/h2>/g,
    (_m, inner: string) => {
      const id = slugifyHeading(inner);
      toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
      return `<h2 id="${id}">${inner}</h2>`;
    },
  );

  return { ...meta, html, toc };
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.tags.filter((t) => tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
