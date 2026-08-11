"use client";

import { useSyncExternalStore } from "react";
import { NeuralNetworkCanvas } from "@/components/sections/neural-network-canvas";

const QUERY = "(prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Full-bleed hero backdrop: a soft static gradient wash (always present,
 * and the *only* thing shown under prefers-reduced-motion), an optional
 * neural-network canvas layered on top when motion is allowed, and a
 * theme-aware scrim so the hero text stays readable either way.
 */
export function HeroBackground() {
  const allowMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Static wash: renders alone under reduced motion, and as the base
          tone under the canvas otherwise. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,var(--brand-shadow),transparent_60%),radial-gradient(ellipse_60%_50%_at_85%_75%,var(--brand-shadow),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {allowMotion && <NeuralNetworkCanvas className="absolute inset-0 h-full w-full opacity-70" />}

      {/* Contrast scrim: stronger where the text sits (left), lighter over
          the photo (right), tuned to work in both themes. */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,var(--background)_8%,color-mix(in_oklab,var(--background)_55%,transparent)_45%,color-mix(in_oklab,var(--background)_18%,transparent)_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,var(--background),transparent_70%)] opacity-80" />
    </div>
  );
}
