import { RevealGroup } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { EducationBackground } from "@/components/education-background";
import { portfolio } from "@/data/portfolio";

export function Education() {
  return (
    <section
      id="education"
      className="relative isolate flex flex-col justify-start overflow-hidden bg-surface pt-20 pb-24 sm:pt-24 sm:pb-32"
    >
      <SectionDivider />
      <EducationBackground />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionTag label="education" />
        <h2 className="mb-14 font-display text-heading font-medium tracking-tight text-foreground">
          Education
        </h2>

        <RevealGroup className="flex flex-col gap-4">
          {portfolio.education.map((school) => (
            <div
              key={school.school}
              data-reveal-item
              className="flex flex-col gap-2 rounded-xl border border-border bg-card px-6 py-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_40px_-24px_var(--brand-shadow)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <h3 className="font-display text-heading-sm font-medium text-foreground">
                  {school.school}
                </h3>
                <p className="mt-1 text-lg text-foreground/80">{school.degree}</p>
                {school.detail && (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{school.detail}</p>
                )}
              </div>
              <div className="text-left sm:text-right">
                <p className="font-mono text-xs text-muted-foreground">{school.dates}</p>
                <p className="mt-1 text-sm text-muted-foreground">{school.location}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
