/**
 * The repeating "// label" motif used above every section heading.
 * Deliberately tiny and muted — the connective thread that ties every
 * section's different motif back to one system.
 */
export function SectionTag({ label }: { label: string }) {
  return (
    <p aria-hidden className="mb-3 font-mono text-xs tracking-wide text-muted-foreground/90">
      {`// ${label}`}
    </p>
  );
}
