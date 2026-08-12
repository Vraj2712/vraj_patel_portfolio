/**
 * Faint blueprint-style contour lines for the Education section — a few
 * concentric arcs anchored off the top-right corner, static SVG, no
 * motion. Distinct from About's dot-grid and Skills' line-grid so each
 * textured section still reads as its own moment.
 */
export function EducationBackground() {
  const radii = [120, 220, 320, 420, 520];

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-24 -z-10 size-[700px] opacity-[0.14] dark:opacity-[0.22]"
      viewBox="0 0 700 700"
      fill="none"
    >
      {radii.map((r) => (
        <circle key={r} cx="700" cy="0" r={r} stroke="var(--brand)" strokeWidth="1" />
      ))}
    </svg>
  );
}
