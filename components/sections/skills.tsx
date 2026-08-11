import { RevealGroup } from "@/components/reveal";
import { portfolio } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-12 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Skills
        </h2>

        <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {portfolio.skills.map((group) => (
            <div key={group.category} data-reveal-item className="flex flex-col gap-3">
              <h3 className="font-mono text-xs text-muted-foreground">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground/80 transition-colors duration-200 hover:border-brand hover:text-brand"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
