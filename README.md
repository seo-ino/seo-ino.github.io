# SEOINO

بلاگ فارسی آموزش سئو، ساخته‌شده با **Next.js (App Router) + TypeScript**، برای تمرین عملی سئو و نمایش در رزومه.

## امکانات سئو

- متادیتای کامل برای هر صفحه (title، description، canonical، Open Graph، Twitter)
- داده ساختاریافته JSON-LD: `WebSite`، `Article`، `BreadcrumbList`
- `sitemap.xml` و `robots.txt` خودکار (`app/sitemap.ts`، `app/robots.ts`)
- فید RSS در `/feed.xml`
- صفحه ۴۰۴ سفارشی، `lang="fa"` و `dir="rtl"`، فهرست مطالب و مقاله‌های مرتبط (لینک‌سازی داخلی)
- تأیید مالکیت Search Console با متغیر محیطی
- Google Analytics 4 فقط در نسخه production
- تولید ایستا (SSG)، بدون نیاز به سرور

## اجرای پروژه

```bash
npm install
cp .env.example .env.local   # در ویندوز: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

برای بررسی خروجی نهایی:

```bash
npm run build   # خروجی ایستا در پوشه out
```

## افزودن مقاله جدید

یک فایل `.md` در `content/posts/` بسازید. نام فایل همان آدرس مقاله می‌شود.

```md
---
title: "عنوان مقاله"
description: "توضیحات متا، حدود ۱۲۰ تا ۱۶۰ کاراکتر"
date: 2026-11-25
updated: 2026-12-01   # اختیاری
keyword: "کلمه کلیدی اصلی"
tags: ["سئو", "..."]
---

متن مقاله با Markdown. برای سرتیتر بخش‌ها از ## استفاده کنید.
```

مقاله‌های هم‌تگ، خودکار در بخش «مقاله‌های مرتبط» نمایش داده می‌شوند.

## انتشار رایگان روی GitHub Pages

1. در اکانت `seo-ino` یک ریپوی عمومی به نام **`seo-ino.github.io`** بسازید (نام ریپو دقیقاً همین باشد تا سایت روی ریشه دامنه بیاید و `basePath` لازم نباشد).
2. پروژه را پوش کنید:

   ```bash
   git init -b main
   git add .
   git commit -m "feat: initial SEOINO blog"
   git remote add origin https://github.com/seo-ino/seo-ino.github.io.git
   git push -u origin main
   ```

3. در ریپو: **Settings ← Pages ← Source: GitHub Actions** را انتخاب کنید. فایل `.github/workflows/deploy.yml` با هر پوش، سایت را می‌سازد و منتشر می‌کند.
4. آدرس سایت: `https://seo-ino.github.io`

### تنظیم متغیرها

در ریپو: **Settings ← Secrets and variables ← Actions ← Variables** سه متغیر زیر را اضافه کنید (مقدارشان عمومی است و در HTML سایت دیده می‌شود، پس Variable کافی است):

| نام | مقدار |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://seo-ino.github.io` |
| `NEXT_PUBLIC_GA_ID` | شناسه `G-XXXXXXXXXX` از GA4 |
| `NEXT_PUBLIC_GSC_VERIFICATION` | مقدار `content` تگ تأیید Search Console |

بعد از تغییر متغیرها، workflow را دوباره اجرا کنید (Actions ← Deploy ← Run workflow).

## اتصال به Google Search Console و GA4

1. **Search Console:** پراپرتی از نوع URL prefix با آدرس `https://seo-ino.github.io/` بسازید، روش «HTML tag» را انتخاب کنید و مقدار `content` را در `NEXT_PUBLIC_GSC_VERIFICATION` بگذارید. بعد از دیپلوی Verify بزنید و سپس در بخش Sitemaps عبارت `sitemap.xml` را ثبت کنید.
2. **GA4:** پراپرتی و Web data stream بسازید و شناسه `G-...` را در `NEXT_PUBLIC_GA_ID` بگذارید. در Realtime بازدید خودتان را ببینید.
3. **اتصال دو ابزار:** GA4 ← Admin ← Product links ← Search Console links.

راهنمای کامل‌تر در مقاله `content/posts/connect-search-console-and-ga4.md` است.

## ساختار پروژه

```text
app/             صفحه‌ها، layout، sitemap، robots، RSS
components/      Header، Footer، PostCard، GoogleAnalytics
content/posts/   مقاله‌ها (Markdown)
lib/             خواندن مقاله‌ها و تنظیمات سایت
.github/         دیپلوی خودکار
```

## نکته‌هایی برای رزومه

- لینک سایت زنده و ریپوی GitHub را کنار هم بنویسید.
- نتایج واقعی را ثبت کنید: تعداد صفحه‌های ایندکس‌شده، نمایش (Impressions) و کلیک در Search Console، و امتیاز PageSpeed Insights قبل و بعد از بهینه‌سازی.
- مثال جمله رزومه: «ساخت بلاگ فارسی با Next.js و پیاده‌سازی سئو تکنیکال (sitemap، canonical، JSON-LD)، اتصال به Search Console و GA4 و انتشار ۵ مقاله سئو‌شده».
- عددها را فقط بعد از دیدن در Search Console بنویسید، نه پیش از آن.

## ایده‌های بعدی برای تمرین

- افزودن تصویر OG اختصاصی برای هر مقاله
- افزودن `FAQPage` به مقاله‌های دارای بخش پرسش‌وپاسخ و تست با Rich Results Test
- ثبت رویدادهای سفارشی در GA4
- گرفتن گزارش Lighthouse و بهبود Core Web Vitals
