import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  // فقط برای اتصال Search Console (در صورت تنظیم)
  verification: site.gscVerification ? { google: site.gscVerification } : undefined,
};

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
