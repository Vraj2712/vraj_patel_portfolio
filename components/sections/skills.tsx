import { BrainCircuit, ChartBar, Activity, Database, TerminalSquare, Languages as LanguagesIcon, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RevealGroup } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { portfolio } from "@/data/portfolio";

// Icons per skill category, mapped locally by the exact category strings in
// data/portfolio.ts (which stays plain label/items pairs, untouched).
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Machine Learning": BrainCircuit,
  "Data Analysis": ChartBar,
  "Healthcare Data": Activity,
  "SQL & Databases": Database,
  Tools: TerminalSquare,
  Languages: LanguagesIcon,
};

export function Skills() {
  return (
    <section id="skills" className="texture-grid relative flex min-h-[100dvh] flex-col justify-center py-24 sm:py-32">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionTag label="skills" />
        <h2 className="mb-14 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
          Skills
        </h2>

        <RevealGroup className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {portfolio.skills.map((group) => {
            const Icon = CATEGORY_ICONS[group.category];
            return (
              <div key={group.category} data-reveal-item className="flex flex-col gap-3">
                <h3 className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  {Icon && <Icon aria-hidden size={14} strokeWidth={2} className="text-brand" />}
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="h-auto rounded-full border-border px-3.5 py-1.5 text-sm font-normal text-foreground/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_6px_18px_-6px_var(--brand-shadow)]"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
