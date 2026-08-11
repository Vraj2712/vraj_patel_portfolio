"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          "[data-hero-frame]",
          { autoAlpha: 0, y: 18, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }
        )
          .fromTo(
            "[data-hero-item]",
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
            "-=0.65"
          );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
          <p data-hero-item className="font-mono text-xs text-muted-foreground">
            {portfolio.location}
          </p>

          <h1
            data-hero-item
            className="text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          >
            {portfolio.name}
          </h1>

          <p data-hero-item className="text-xl font-medium text-brand sm:text-2xl">
            {portfolio.role}
          </p>

          <p data-hero-item className="max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {portfolio.tagline}
          </p>

          <div data-hero-item className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="gap-2" nativeButton={false} render={<a href="#projects" />}>
              View Projects
              <ArrowRightIcon className="size-4" weight="bold" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              <EnvelopeSimpleIcon className="size-4" weight="bold" />
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div data-hero-frame className="relative w-full max-w-[320px] sm:max-w-[360px]">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-brand/70"
            />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
              <Image
                src={portfolio.photo}
                alt={`Photo of ${portfolio.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 70vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
