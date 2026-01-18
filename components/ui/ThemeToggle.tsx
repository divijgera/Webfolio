"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Theme Toggle Component
 * Switches between light and dark mode with smooth icon transition
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-card" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative h-9 w-9 rounded-lg border border-border bg-card",
        "hover:bg-muted transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        "flex items-center justify-center"
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-5 w-5 text-foreground transition-all duration-300",
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 text-foreground transition-all duration-300",
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
    </button>
  );
}
