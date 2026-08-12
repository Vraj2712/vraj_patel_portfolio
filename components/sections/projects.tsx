import { RevealGroup } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { ProjectCard } from "@/components/project-card";
import { portfolio } from "@/data/portfolio";

export function Projects() {
  const [featured, ...rest] = portfolio.projects;

  return (
    <section id="projects" className="relative flex min-h-[100dvh] flex-col justify-center py-24 sm:py-32">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionTag label="projects" />
        <h2 className="mb-14 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
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
