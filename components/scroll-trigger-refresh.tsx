"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two related fixes for loading the page directly on a #hash URL (e.g.
 * refreshing while scrolled to #contact, or any direct link to a section):
 *
 * 1. Next.js's App Router client-side routing interferes with the browser's
 *    native "scroll to the element matching the URL fragment" behavior on
 *    initial load — confirmed by watching scrollY snap back to ~0 shortly
 *    after a real scroll-to-anchor briefly happens. So we do it ourselves.
 *
 * 2. Once we've moved the scroll position, force GSAP to re-measure every
 *    ScrollTrigger against it. Without this, Reveal/RevealGroup content
 *    that's now on-screen but whose trigger already "passed" during our
 *    manual jump can be stuck at its pre-animation hidden state (each of
 *    those components also independently checks this at their own mount
 *    time, but this is a global safety net for anything created before or
 *    after the jump).
 */
export function ScrollTriggerRefresh() {
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    }

    const refresh = () => ScrollTrigger.refresh();
    const fontsReady = document.fonts?.ready;
    if (fontsReady && typeof fontsReady.then === "function") {
      fontsReady.then(refresh);
    }
    window.addEventListener("load", refresh);
    const timeoutId = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
