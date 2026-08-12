import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="texture-dots relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-start bg-surface pt-20 pb-24 sm:pt-24 sm:pb-32"
    >
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
          <Reveal>
            <SectionTag label="about" />
            <h2 className="font-display text-heading font-medium tracking-tight text-foreground">
              About
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex max-w-[68ch] flex-col gap-6">
            {portfolio.about.map((paragraph) => (
              <p key={paragraph} className="text-xl leading-relaxed text-foreground/85">
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-brand/60 pl-4 text-lg leading-relaxed text-muted-foreground italic-safe">
              {portfolio.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
