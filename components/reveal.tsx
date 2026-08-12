"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VIEWPORT_CUTOFF_RATIO = 0.85;

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
 *
 * On mount, if the element is already past where its scroll-trigger would
 * fire (e.g. loading directly on a #hash URL, or a browser restoring scroll
 * position), it's shown immediately instead of animating from a hidden
 * state — otherwise there's no further scroll event to make ScrollTrigger
 * re-check, and the content can get stuck invisible forever.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ref.current) return;

        const cutoff = window.innerHeight * VIEWPORT_CUTOFF_RATIO;
        if (ref.current.getBoundingClientRect().top < cutoff) {
          gsap.set(ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
          return;
        }

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
 * Items already past the reveal point at mount (see <Reveal> above) are
 * shown immediately instead of animated.
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

        const cutoff = window.innerHeight * VIEWPORT_CUTOFF_RATIO;
        const alreadyVisible = items.filter((el) => el.getBoundingClientRect().top < cutoff);
        const pending = items.filter((el) => el.getBoundingClientRect().top >= cutoff);

        if (alreadyVisible.length) {
          gsap.set(alreadyVisible, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        }

        if (pending.length) {
          gsap.fromTo(
            pending,
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
        }
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
