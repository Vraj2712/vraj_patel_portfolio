"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const SPOTLIGHT_TARGETS = [
  "resume",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
] as const;
export type SpotlightTarget = (typeof SPOTLIGHT_TARGETS)[number];

const TOOLTIP_TEXT: Record<SpotlightTarget, string> = {
  resume: "Click to download the resume",
  about: "Click here",
  skills: "Click here",
  experience: "Click here",
  projects: "Click here",
  education: "Click here",
  contact: "Click here",
};

const AUTO_DISMISS_MS = 6000;
const PADDING = 8;

type Rect = { top: number; left: number; width: number; height: number };

export function Spotlight({
  target,
  onDismiss,
}: {
  target: SpotlightTarget | null;
  onDismiss: () => void;
}) {
  const [rect, setRect] = useState<Rect | null>(null);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!target) {
      return;
    }

    const el =
      document.querySelector<HTMLElement>(`[data-tour="${target}"]`) ??
      document.getElementById(target);

    if (!el) {
      onDismissRef.current();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });

    const updateRect = () => {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top - PADDING,
        left: r.left - PADDING,
        width: r.width + PADDING * 2,
        height: r.height + PADDING * 2,
      });
    };

    updateRect();
    // Scroll-into-view may still be animating; measure again a beat later.
    const settleFrame = requestAnimationFrame(updateRect);

    const handleTargetClick = () => onDismissRef.current();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismissRef.current();
    };

    el.addEventListener("click", handleTargetClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    const timeoutId = window.setTimeout(() => onDismissRef.current(), AUTO_DISMISS_MS);

    return () => {
      cancelAnimationFrame(settleFrame);
      el.removeEventListener("click", handleTargetClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      window.clearTimeout(timeoutId);
    };
  }, [target]);

  if (!target || !rect) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const spaceBelow = viewportH - (rect.top + rect.height);
  const tooltipBelow = spaceBelow > 70;
  const tooltipTop = tooltipBelow ? rect.top + rect.height + 10 : rect.top - 10;
  const tooltipWidth = 220;
  const tooltipLeft = Math.min(Math.max(rect.left, 8), viewportW - tooltipWidth - 8);

  return (
    <div className="fixed inset-0 z-[45]" aria-hidden={false}>
      {/* Click-catching strips surrounding the cutout -- clicking any of
          these (the dimmed area) dismisses the spotlight. The cutout
          itself is left uncovered so clicks reach the real element. */}
      <div
        onClick={onDismiss}
        className="fixed inset-x-0 top-0"
        style={{ height: Math.max(rect.top, 0) }}
      />
      <div
        onClick={onDismiss}
        className="fixed inset-x-0 bottom-0"
        style={{ top: rect.top + rect.height }}
      />
      <div
        onClick={onDismiss}
        className="fixed top-0 left-0 bottom-0"
        style={{ top: rect.top, height: rect.height, width: Math.max(rect.left, 0) }}
      />
      <div
        onClick={onDismiss}
        className="fixed top-0 right-0 bottom-0"
        style={{ top: rect.top, height: rect.height, left: rect.left + rect.width }}
      />

      {/* Dim + rounded cutout via the box-shadow trick. pointer-events-none
          so clicks land on the real element underneath. */}
      <div
        aria-hidden
        className="pointer-events-none fixed rounded-2xl transition-[top,left,width,height] duration-200 ease-out motion-reduce:transition-none"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
        }}
      />

      {/* Soft pulsing ring around the cutout. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed rounded-2xl ring-2 ring-primary",
          !prefersReducedMotion && "animate-pulse"
        )}
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      />

      <div
        role="status"
        className="pointer-events-none fixed max-w-[220px] rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-lg"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          transform: tooltipBelow ? undefined : "translateY(-100%)",
        }}
      >
        {TOOLTIP_TEXT[target]}
      </div>
    </div>
  );
}
