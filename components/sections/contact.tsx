import { EnvelopeSimpleIcon, PhoneIcon, LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
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
    <section id="contact" className="relative py-24 sm:py-32">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <Reveal className="flex flex-col gap-6">
          <h2 className="max-w-[26ch] text-balance font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl">
            I&apos;m open to new opportunities in machine learning and applied data science.
          </h2>
          <p className="max-w-[52ch] text-base text-muted-foreground sm:text-lg">
            Reach out through any of the channels below. I usually reply within a day or two.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col flex-wrap gap-x-10 gap-y-4 sm:flex-row">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 text-base text-foreground/80 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" weight="regular" />
              <span className="border-b border-transparent group-hover:border-brand">{label}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
