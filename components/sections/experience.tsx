import { RevealGroup } from "@/components/reveal";
import { portfolio } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-12 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Experience
        </h2>

        <RevealGroup className="relative flex flex-col gap-14 border-l border-border pl-8 sm:pl-10" stagger={0.12}>
          {portfolio.experience.map((job) => (
            <article key={`${job.company}-${job.dates}`} data-reveal-item className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[calc(2rem+5px)] size-[9px] rounded-full bg-brand ring-4 ring-background sm:-left-[calc(2.5rem+5px)]"
              />

              <p className="font-mono text-xs text-muted-foreground">{job.dates}</p>

              <h3 className="mt-1.5 font-display text-xl font-medium text-foreground sm:text-2xl">
                {job.role}
              </h3>

              <p className="mt-1 text-base text-brand">
                {job.company}
                <span className="text-muted-foreground"> · {job.location}</span>
              </p>

              {job.subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{job.subtitle}</p>
              )}

              <ul className="mt-4 flex flex-col gap-2.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/80">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-border" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
