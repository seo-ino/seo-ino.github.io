export const site = {
  name: "SEOINO",
  title: "SEOINO | آموزش سئو به زبان ساده",
  description:
    "مقاله‌های آموزشی سئو به فارسی: کلمات کلیدی، سئو تکنیکال، سئو داخلی، سرچ کنسول و گوگل آنالیتیکس، همراه با تجربه عملی.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "fa_IR",
  language: "fa",
  author: "SEOINO",
  github: "https://github.com/seo-ino",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
