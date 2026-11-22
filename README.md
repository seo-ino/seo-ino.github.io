# SEOINO

یک صفحه لندینگ ساده با Next.js (خروجی ایستا) برای GitHub Pages.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # خروجی در پوشه out
```

## متغیرهای اختیاری

در Settings ← Secrets and variables ← Actions ← Variables:

| نام | کاربرد |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | شناسه Google Analytics 4 (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | مقدار `content` تگ تأیید Search Console |

با هر پوش به شاخه `main`، سایت خودکار منتشر می‌شود (`.github/workflows/deploy.yml`).
