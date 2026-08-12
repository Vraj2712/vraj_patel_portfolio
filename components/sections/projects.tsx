import { RevealGroup } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { ProjectCard } from "@/components/project-card";
import { portfolio } from "@/data/portfolio";

export function Projects() {
  const [featured, ...rest] = portfolio.projects;

  return (
    <section id="projects" className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-start overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-32">
      <SectionDivider />

      {/* Soft accent spotlight behind the card grid — static, no motion,
          just enough presence to make the cards read as popping forward. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_38%,color-mix(in_oklab,var(--brand)_16%,transparent),transparent_70%)] opacity-80 dark:opacity-100"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionTag label="projects" />
        <h2 className="mb-14 font-display text-heading font-medium tracking-tight text-foreground">
          Projects
        </h2>

        <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.1}>
          <div className="lg:col-span-2">
            <ProjectCard project={featured} featured />
          </div>
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
