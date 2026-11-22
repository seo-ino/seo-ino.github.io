import type { Metadata, Viewport } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.github }],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  // Search Console: روش «HTML tag» برای تأیید مالکیت
  verification: site.gscVerification ? { google: site.gscVerification } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} dir="rtl">
      <body>
        <a className="skip-link" href="#main">
          پرش به محتوا
        </a>
        <Header />
        <main id="main" className="container">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
