"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground/70 hover:text-foreground"
    >
      {/* resolvedTheme is undefined on the server; suppress the one-time
          hydration mismatch instead of adding an extra mounted-state effect */}
      <span suppressHydrationWarning>
        {isDark ? <SunIcon className="size-4" weight="bold" /> : <MoonIcon className="size-4" weight="bold" />}
      </span>
    </Button>
  );
}
