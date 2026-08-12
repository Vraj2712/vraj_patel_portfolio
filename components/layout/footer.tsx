"use client";

import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8 lg:px-12 xl:px-16">
        <p>
          © {year} {portfolio.name}
        </p>
        <Link
          href="#top"
          onClick={(e) => {
            // Next.js's Link only triggers navigation (and the resulting
            // scroll) when the target hash differs from the current URL --
            // once the first click has already set the URL to "#top",
            // every click after that is a no-op. Scroll explicitly instead
            // so it works every time, regardless of the current hash.
            e.preventDefault();
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Back to top
        </Link>
      </div>
    </footer>
  );
}
