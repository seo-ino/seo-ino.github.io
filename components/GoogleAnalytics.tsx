import Script from "next/script";
import { site } from "@/lib/site";

// GA4 فقط وقتی لود می‌شود که NEXT_PUBLIC_GA_ID تنظیم شده باشد
// و در حالت production باشیم، تا آمار توسعه محلی با آمار واقعی قاطی نشود.
export default function GoogleAnalytics() {
  if (!site.gaId || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${site.gaId}');
        `}
      </Script>
    </>
  );
}
