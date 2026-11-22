import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} - صفحه اصلی`}>
          {site.name}
        </Link>
        <nav aria-label="منوی اصلی">
          <Link href="/">مقاله‌ها</Link>
          <Link href="/about">درباره</Link>
          <a href="/feed.xml">RSS</a>
        </nav>
      </div>
    </header>
  );
}
