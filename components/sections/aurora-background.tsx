"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Soft, slow-drifting gradient blobs behind the hero. Purely decorative
 * (aria-hidden), GPU-cheap (transform/opacity only), and frozen in place
 * for anyone who prefers reduced motion.
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const blobs = gsap.utils.toArray<HTMLElement>("[data-blob]", ref.current);
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            x: i % 2 === 0 ? 36 : -30,
            y: i % 2 === 0 ? -24 : 28,
            scale: 1.08,
            duration: 14 + i * 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        data-blob
        className="absolute -top-56 right-[-10%] size-[640px] rounded-full bg-brand/35 blur-[110px]"
      />
      <div
        data-blob
        className="absolute top-24 -left-44 size-[520px] rounded-full bg-[oklch(0.72_0.14_45)]/25 blur-[100px]"
      />
      <div
        data-blob
        className="absolute -bottom-48 right-[14%] size-[420px] rounded-full bg-brand/25 blur-[100px]"
      />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
