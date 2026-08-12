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
    <section id="contact" className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden py-24 sm:py-32">
      <SectionDivider />

      {/* Soft, static accent wash: a calm echo of the hero's aurora to
          bookend the page. No motion, no canvas — just a radial gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,var(--brand-shadow),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <Reveal className="flex flex-col gap-6">
          <SectionTag label="contact" />
          <h2 className="max-w-[26ch] text-balance font-display text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-7xl">
            I&apos;m open to new opportunities in machine learning and applied data science.
          </h2>
          <p className="max-w-[52ch] text-lg text-muted-foreground sm:text-xl">
            Reach out through any of the channels below. I usually reply within a day or two.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2">
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
