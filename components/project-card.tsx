"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { ProjectItem } from "@/data/portfolio";

/**
 * A project card with a faint gradient border (always on, brightens on
 * hover) and a cursor-following radial spotlight. The spotlight is plain
 * mousemove -> CSS custom properties (no React state, no re-renders) and
 * never attaches at all when the visitor prefers reduced motion.
 */
export function ProjectCard({ project, featured = false }: { project: ProjectItem; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Card
      ref={ref}
      data-reveal-item
      className="gradient-border group relative h-full overflow-hidden py-6 shadow-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-32px_var(--brand-shadow)]"
    >
      {/* Cursor-following spotlight, opacity-gated to hover only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--brand-shadow), transparent 70%)",
        }}
      />

      <CardHeader className="relative gap-2 px-6">
        <CardTitle className="text-2xl font-medium sm:text-3xl">{project.title}</CardTitle>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="h-auto rounded-full bg-muted px-2.5 py-0.5 font-mono text-[0.7rem] font-normal text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="relative flex flex-col gap-4 px-6">
        <ul className={`flex flex-col gap-2 ${featured ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2" : ""}`}>
          {project.description.map((line) => (
            <li key={line} className="flex gap-2.5 text-base leading-relaxed text-foreground/80">
              <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-border" />
              {line}
            </li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-brand underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
