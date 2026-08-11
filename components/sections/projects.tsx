import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevealGroup } from "@/components/reveal";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { portfolio } from "@/data/portfolio";
import type { ProjectItem } from "@/data/portfolio";

function ProjectCard({ project, featured = false }: { project: ProjectItem; featured?: boolean }) {
  return (
    <Card
      data-reveal-item
      className="group h-full border border-border py-6 shadow-none ring-0 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60"
    >
      <CardHeader className="gap-2 px-6">
        <CardTitle className="text-xl font-medium sm:text-2xl">{project.title}</CardTitle>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-6">
        <ul className={`flex flex-col gap-2 ${featured ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2" : ""}`}>
          {project.description.map((line) => (
            <li key={line} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-foreground/80">
              <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-border" />
              {line}
            </li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {link.label}
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}

        {!project.links && (
          <p className="pt-1 font-mono text-xs text-muted-foreground">
            TODO: add a public repo or live link
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function Projects() {
  const [featured, ...rest] = portfolio.projects;

  return (
    <section id="projects" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-12 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
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
