import { RevealGroup } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { TimelineNode } from "@/components/timeline-node";
import { ExperienceBackground } from "@/components/experience-background";
import { portfolio } from "@/data/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-start bg-surface pt-20 pb-24 sm:pt-24 sm:pb-32"
    >
      <SectionDivider />
      <ExperienceBackground />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionTag label="experience" />
        <h2 className="mb-14 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
          Experience
        </h2>

        <div className="relative">
          {/* Fading vertical line: same "fade at both ends" trick as the
              section dividers, so the timeline never looks like it's
              abruptly cut off. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px bg-[linear-gradient(to_bottom,transparent,var(--border)_6%,var(--border)_94%,transparent)] sm:left-0.5"
          />

          <RevealGroup className="relative flex flex-col gap-14 pl-8 sm:pl-10" stagger={0.12}>
            {portfolio.experience.map((job) => (
              <article key={`${job.company}-${job.dates}`} data-reveal-item className="relative max-w-[70ch]">
                <TimelineNode className="absolute top-1 -left-[calc(2rem+6px)] size-[13px] sm:-left-[calc(2.5rem+6px)]" />

                <p className="font-mono text-xs text-muted-foreground">{job.dates}</p>

                <h3 className="mt-1.5 font-display text-2xl font-medium text-foreground sm:text-3xl">
                  {job.role}
                </h3>

                <p className="mt-1.5 text-lg text-brand">
                  {job.company}
                  <span className="text-muted-foreground"> · {job.location}</span>
                </p>

                {job.subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">{job.subtitle}</p>
                )}

                <ul className="mt-4 flex flex-col gap-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-relaxed text-foreground/80">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-border" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
