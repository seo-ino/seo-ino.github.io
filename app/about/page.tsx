import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "درباره SEOINO",
  description:
    "SEOINO یک پروژه تمرینی برای یادگیری سئوی تکنیکال و محتوایی است؛ ساخته‌شده با Next.js و متصل به Search Console و Google Analytics.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>درباره SEOINO</h1>
      <p>
        SEOINO یک بلاگ فارسی است که برای تمرین عملی سئو ساخته شده. هر چیزی که در مسیر یادگیری سئو
        می‌آموزم، اول روی همین سایت پیاده می‌شود و بعد به شکل مقاله منتشر می‌شود.
      </p>
      <h2>این سایت چطور ساخته شده؟</h2>
      <ul>
        <li>Next.js (App Router) با تولید صفحات به‌صورت ایستا (SSG)</li>
        <li>متادیتای کامل، canonical، Open Graph و داده ساختاریافته JSON-LD</li>
        <li>سایت‌مپ و robots.txt خودکار، همراه با فید RSS</li>
        <li>اتصال به Google Search Console و Google Analytics 4</li>
      </ul>
      <p>
        سورس‌کد پروژه در{" "}
        <a href={site.github} rel="noopener noreferrer" target="_blank">
          GitHub
        </a>{" "}
        در دسترس است.
      </p>
    </article>
  );
}
