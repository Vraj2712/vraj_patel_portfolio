"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: a section becomes active the instant its top crosses the
  // line just below the fixed navbar -- the same landing point anchor
  // links already scroll to (see `scroll-margin-top` in globals.css) --
  // so the highlight always matches whatever is actually docked under
  // the navbar, never early or late. The hero isn't in `portfolio.nav`,
  // so nothing is tracked (and the highlight correctly stays cleared)
  // while it's in view at the top of the page.
  //
  // IntersectionObserver only reports entries whose state *changed*, not
  // every observed target on every callback, so we keep our own map of
  // each section's last-known state and recompute the active one from
  // it -- otherwise there's no way to notice "nothing is intersecting
  // any more" (e.g. scrolling back up past the topmost section) and the
  // highlight would stay stuck on whatever was last active.
  useEffect(() => {
    const sections = portfolio.nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const intersecting = new Map<string, boolean>();
    let observer: IntersectionObserver | null = null;

    const updateActive = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        intersecting.set(entry.target.id, entry.isIntersecting);
      }
      // If more than one section is momentarily inside the trigger band
      // (the split second one leaves as the next enters), prefer the
      // lower one so the highlight switches forward immediately instead
      // of lagging on the section that's leaving.
      let active: HTMLElement | null = null;
      for (const el of sections) {
        if (intersecting.get(el.id)) active = el;
      }
      setActiveUrl(active ? `#${active.id}` : "");
    };

    const createObserver = () => {
      observer?.disconnect();
      intersecting.clear();
      const navbarHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const bandHeight = 4; // px -- a hair of height so the trigger reliably fires; a true zero-height rootMargin is unreliable in some browsers
      const bottomMargin = Math.max(window.innerHeight - navbarHeight - bandHeight, 0);
      observer = new IntersectionObserver(updateActive, {
        rootMargin: `-${navbarHeight}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      });
      sections.forEach((el) => observer!.observe(el));
    };

    createObserver();

    // Re-anchor the trigger line on resize -- the navbar height only
    // changes if root font-size does, but viewport height changes often
    // (mobile browser chrome, window resize), and that shifts where a
    // fixed-px bottom margin needs to land.
    let resizeFrame: number;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(createObserver);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 flex h-16 w-full items-center border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-2 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link
          href="#top"
          aria-label="Back to top"
          onClick={(e) => {
            // Same reasoning as the footer's back-to-top link: Next.js's
            // Link only scrolls when the target hash differs from the
            // current URL, so a second click while already at "#top" is
            // otherwise a silent no-op. Own the scroll explicitly instead.
            e.preventDefault();
            setActiveUrl("");
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="group flex items-center gap-2.5 rounded-full text-sm font-medium tracking-tight text-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span
            aria-hidden="true"
            className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/60 bg-background/40 font-display text-[0.95rem] italic tracking-tighter text-brand shadow-[0_0_0_0_var(--brand-shadow)] transition-[box-shadow,border-color] duration-300 group-hover:border-brand group-hover:shadow-[0_0_0_6px_var(--brand-shadow)]"
          >
            VP
            <span className="absolute -top-0.5 -right-0.5 size-[7px] rounded-full bg-brand ring-2 ring-background transition-transform duration-300 group-hover:scale-125" />
          </span>
          <span className="hidden font-display text-base tracking-tight transition-colors duration-300 group-hover:text-brand sm:inline">
            {portfolio.firstName} Patel
          </span>
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
            render={<a href={portfolio.resumeFile} download data-tour="resume" />}
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
