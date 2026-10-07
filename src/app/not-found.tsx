import Link from "next/link";
import { Arrow } from "@/components/layout/Arrow";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ivory pt-32">
      <div className="container-lux">
        <p className="eyebrow text-stone">404</p>
        <h1 className="display mt-6 text-6xl md:text-8xl">
          This room <em>doesn&rsquo;t exist.</em>
        </h1>
        <Link href="/" className="group mt-12 inline-flex items-center gap-3 bg-ink px-7 py-4 eyebrow text-[0.64rem] text-ivory">
          Back to home <Arrow />
        </Link>
      </div>
    </section>
  );
}
