import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>
          © {year} {portfolio.name}
        </p>
        <Link
          href="#top"
          className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Back to top
        </Link>
      </div>
    </footer>
  );
}
