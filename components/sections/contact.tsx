import { EnvelopeSimpleIcon, PhoneIcon, LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionTag } from "@/components/section-tag";
import { portfolio } from "@/data/portfolio";

const links = [
  {
    label: portfolio.links.email,
    href: `mailto:${portfolio.links.email}`,
    icon: EnvelopeSimpleIcon,
  },
  {
    label: portfolio.links.phone,
    href: `tel:${portfolio.links.phone.replace(/[^+\d]/g, "")}`,
    icon: PhoneIcon,
  },
  {
    label: "LinkedIn",
    href: portfolio.links.linkedin,
    icon: LinkedinLogoIcon,
  },
  {
    label: "GitHub",
    href: portfolio.links.github,
    icon: GithubLogoIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-start overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-32">
      <SectionDivider />

      {/* Soft, static accent wash: a calm echo of the hero's aurora to
          bookend the page. No motion, no canvas — just layered gradients,
          sized and placed so it's actually visible across the section
          rather than a sliver hiding in one corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_60%_at_50%_100%,color-mix(in_oklab,var(--brand)_20%,transparent),transparent_70%),radial-gradient(ellipse_50%_40%_at_15%_15%,color-mix(in_oklab,var(--brand)_10%,transparent),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center sm:px-8 lg:px-12 xl:px-16">
        <Reveal className="flex flex-col items-center gap-6">
          <SectionTag label="contact" />
          <h2 className="mx-auto max-w-[22ch] text-balance font-display text-heading-lg font-medium leading-tight tracking-tight text-foreground">
            Open to opportunities where I can build meaningful things and learn along the way.
          </h2>
          <p className="mx-auto max-w-[52ch] text-lg text-muted-foreground sm:text-xl">
            Reach out through any of the channels below. I usually reply within a day or two.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-base text-foreground/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" weight="regular" />
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
