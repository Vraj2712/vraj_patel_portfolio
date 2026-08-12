"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { User, Sparkles, Briefcase, FolderGit2, GraduationCap, Mail, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { portfolio } from "@/data/portfolio";

// Icons for the tubelight nav. Kept local to this component (not in
// data/portfolio.ts) since that file only carries plain label/href pairs.
const NAV_ICONS: Record<string, typeof User> = {
  "#about": User,
  "#skills": Sparkles,
  "#experience": Briefcase,
  "#projects": FolderGit2,
  "#education": GraduationCap,
  "#contact": Mail,
};

const navItems: NavItem[] = portfolio.nav.map((item) => ({
  name: item.label,
  url: item.href,
  icon: NAV_ICONS[item.href] ?? Circle,
}));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeUrl, setActiveUrl] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section is crossing the vertical center of the
  // viewport becomes the active tab. Sections are full-screen, so this
  // "centered band" technique reliably tracks the one the visitor is on.
  useEffect(() => {
    const sections = portfolio.nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveUrl(`#${visible.target.id}`);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 w-full items-center border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-2 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link
          href="#top"
          className="flex items-center gap-2 rounded-sm text-sm font-medium tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand font-display text-[0.8rem] font-semibold text-brand-foreground">
            VP
          </span>
          <span className="hidden font-display text-base sm:inline">{portfolio.firstName} Patel</span>
        </Link>

        {/* Middle grid track always gets exactly the space left over between
            the logo and actions, so the nav can never overlap either one.
            justify-start below md: if the pill ever needs to scroll on a
            very narrow phone, centering + overflow would hide the start of
            the content behind a default centered scroll position. */}
        <div className="flex justify-start overflow-x-auto md:justify-center">
          <NavBar items={navItems} activeUrl={activeUrl} onItemSelect={setActiveUrl} />
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <ThemeToggle />
          <Button
            size="sm"
            className="gap-0 rounded-full px-2.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] sm:gap-1.5 sm:px-4"
            nativeButton={false}
            render={<a href={portfolio.resumeFile} download />}
          >
            <DownloadSimpleIcon className="size-4" weight="regular" />
            <span className="hidden sm:inline">Resume</span>
            <span className="sr-only sm:hidden">Download resume</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
