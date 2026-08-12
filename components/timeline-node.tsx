"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A hollow ring that fills solid with the brand color the first time it
 * scrolls into view — small, self-contained "data point" marker for the
 * Experience timeline. Synced to roughly the same scroll position as the
 * entry's own text reveal, so they read as one motion, not two.
 */
export function TimelineNode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ref.current) return;

        // Already past the reveal point at mount (e.g. loading directly on
        // a #hash URL) — leave it at its default filled state rather than
        // animating from 0, since there's no further scroll event to make
        // ScrollTrigger re-check and bring it back up.
        if (ref.current.getBoundingClientRect().top < window.innerHeight * 0.85) return;

        gsap.fromTo(
          ref.current,
          { "--fill": 0 } as gsap.TweenVars,
          {
            "--fill": 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          } as gsap.TweenVars
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden
      // Defaults to filled (--fill: 1) so it's already in its correct end
      // state with zero JS. GSAP only ever pulls this down to 0 inside the
      // "no-preference" branch above, right before animating back up — so
      // under reduced motion (or before hydration) it just stays filled.
      style={{ "--fill": 1 } as React.CSSProperties}
      className={className}
    >
      <span className="absolute inset-0 rounded-full border-2 border-border" />
      <span
        className="absolute inset-[3px] rounded-full bg-brand"
        style={{
          transform: "scale(var(--fill))",
          opacity: "var(--fill)",
        }}
      />
    </span>
  );
}
