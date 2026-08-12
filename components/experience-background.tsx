/**
 * Ambient "data flow" line for the Experience section background — a
 * faint vertical line with a few small dots drifting slowly down it on a
 * loop. Positioned in the open space to the right of the timeline content
 * (which is capped at max-w-[70ch]), so it never visually merges with the
 * real timeline UI on the left. Hidden below lg, where that open space
 * doesn't exist. Pure CSS: no JS, no canvas. Freezes invisibly under
 * prefers-reduced-motion via the global animation-duration override in
 * globals.css, leaving just the static line.
 */
export function ExperienceBackground() {
  const lines = [
    { position: "lg:right-[14%]", delays: ["0s", "2.2s", "4.4s"] },
    { position: "lg:right-[8%]", delays: ["1.1s", "3.3s", "5.5s"] },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-full lg:block">
      {lines.map(({ position, delays }) => (
        <div key={position} className={`absolute inset-y-0 ${position}`}>
          <div className="relative h-full w-px overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--brand)_45%,transparent)_15%,color-mix(in_oklab,var(--brand)_45%,transparent)_85%,transparent)] opacity-60 dark:opacity-70" />
            {delays.map((delay) => (
              <span
                key={delay}
                className="data-flow-dot absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand opacity-0"
                style={{ animationDelay: delay }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
