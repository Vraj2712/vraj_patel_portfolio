"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ListIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 w-full items-center border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="flex items-center gap-2 rounded-sm text-sm font-medium tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand font-display text-[0.8rem] font-semibold text-brand-foreground">
            VP
          </span>
          <span className="hidden font-display text-base sm:inline">{portfolio.firstName} Patel</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {portfolio.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden gap-1.5 sm:inline-flex"
            nativeButton={false}
            render={<a href={portfolio.resumeFile} download />}
          >
            <DownloadSimpleIcon className="size-4" weight="bold" />
            Resume
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <ListIcon className="size-5" weight="bold" />
            </Button>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {portfolio.nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-md px-2 py-2.5 text-base text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                <Button
                  className="gap-1.5"
                  nativeButton={false}
                  render={<a href={portfolio.resumeFile} download />}
                >
                  <DownloadSimpleIcon className="size-4" weight="bold" />
                  Download Resume
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
