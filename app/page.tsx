import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="landing">
      <h1>{site.name}</h1>
    </main>
  );
}
