import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          {site.name} · پروژه تمرینی یادگیری سئو ·{" "}
          <a href={site.github} rel="noopener noreferrer" target="_blank">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
