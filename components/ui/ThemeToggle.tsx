"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

// Hydration-safe mounted check without useEffect setState
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Theme Toggle Component
 * Switches between light and dark mode with smooth icon transition
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative h-9 w-9",
        "hover:opacity-70 transition-opacity duration-200",
        "focus:outline-none",
        "flex items-center justify-center"
      )}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun
        className={cn(
          "h-5 w-5 text-foreground transition-all duration-300",
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 text-foreground transition-all duration-300",
          isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
    </button>
  );
}
