import { Separator } from "@/components/ui/separator";

/**
 * A section boundary that fades out at both edges instead of a hard,
 * full-bleed line. Sits absolutely at the top edge of its (relatively
 * positioned) parent section, so it doesn't add any extra vertical
 * rhythm beyond the section's own padding.
 */
export function SectionDivider() {
  return (
    <div className="absolute inset-x-0 top-0 flex justify-center px-5 sm:px-8">
      <Separator className="h-px w-full max-w-6xl bg-[linear-gradient(to_right,transparent,var(--border)_18%,var(--border)_82%,transparent)]" />
    </div>
  );
}
