import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <h1>صفحه پیدا نشد (۴۰۴)</h1>
      <p>آدرسی که دنبالش بودید وجود ندارد یا جابه‌جا شده است.</p>
      <p>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </p>
    </section>
  );
}
