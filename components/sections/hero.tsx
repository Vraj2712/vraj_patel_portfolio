"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/sections/aurora-background";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          "[data-hero-frame]",
          { autoAlpha: 0, y: 22, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }
        ).fromTo(
          "[data-hero-item]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.85"
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-10 pb-24 sm:pt-14 sm:pb-32">
      <AuroraBackground />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
          <p data-hero-item className="font-mono text-xs text-muted-foreground">
            {portfolio.location}
          </p>

          <h1
            data-hero-item
            className="text-balance font-display text-6xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-7xl"
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
            <Button
              size="lg"
              className="group gap-0 rounded-full py-1.5 pr-1.5 pl-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              nativeButton={false}
              render={<a href="#projects" />}
            >
              View Projects
              <span className="ml-3 flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRightIcon className="size-4" weight="regular" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              <EnvelopeSimpleIcon className="size-4" weight="regular" />
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            data-hero-frame
            className="relative w-full max-w-[320px] rounded-[2rem] border border-border/70 bg-gradient-to-br from-brand/10 to-transparent p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_40px_70px_-30px_rgba(20,20,30,0.35)] sm:max-w-[360px] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_40px_70px_-30px_rgba(0,0,0,0.6)]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem] bg-muted shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
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
