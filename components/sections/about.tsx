import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <SectionDivider />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              About
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex max-w-[62ch] flex-col gap-6">
            {portfolio.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-foreground/85">
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-brand/60 pl-4 text-base leading-relaxed text-muted-foreground italic-safe">
              {portfolio.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
