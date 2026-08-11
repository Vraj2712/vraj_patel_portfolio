"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Fades + slides a section into view the first time it scrolls into the
 * viewport, with a soft blur-to-sharp resolve for a heavier, cinematic
 * settle. No-ops entirely when the visitor prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0, y, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/**
 * Same idea as <Reveal>, but staggers every direct child marked with
 * data-reveal-item as it enters. Use for lists of cards, tags, or rows.
 */
export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ref.current) return;
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", ref.current);
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 22, filter: "blur(5px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power4.out",
            stagger,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
