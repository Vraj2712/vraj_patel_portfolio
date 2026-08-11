import { RevealGroup } from "@/components/reveal";
import { portfolio } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-12 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Education
        </h2>

        <RevealGroup className="flex flex-col divide-y divide-border border-t border-border">
          {portfolio.education.map((school) => (
            <div
              key={school.school}
              data-reveal-item
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
                  {school.school}
                </h3>
                <p className="mt-1 text-[0.95rem] text-foreground/80">{school.degree}</p>
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
