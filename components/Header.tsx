import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" >
          SEO-ino
        </Link>
      </div>
    </header>
  );
}
