"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

// The system theme is only known once JS runs on the client, so the very
// first client render must match the server's markup exactly. This
// "mounted" flag flips true right after hydration (via useSyncExternalStore
// instead of a setState-in-effect) so the real icon only appears once it's
// safe to differ from the server-rendered HTML.
function subscribe() {
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground/70 hover:text-foreground"
    >
      {isDark ? <SunIcon className="size-4" weight="regular" /> : <MoonIcon className="size-4" weight="regular" />}
    </Button>
  );
}
