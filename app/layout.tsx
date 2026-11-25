import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seo-ino.github.io"),
  title: "SEOINO",
  description: "مقالات  سئو و تمرین‌های کاربردی برای مبتدیان",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "seoino",
    description: "مقالات  سئو و تمرین‌های کاربردی برای مبتدیان",
    url: "/",
    siteName: "seoino",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "seoino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "seoino",
    description: "نکات، آموزش‌ها و تحلیل‌های سئو",
    images: ["/opengraph-image.png"],
  },

}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}