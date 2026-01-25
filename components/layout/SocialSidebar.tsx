"use client";

import Link from "next/link";
import { Github, Linkedin, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Hydration-safe mounted check without useEffect setState
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Social Sidebar Component
 * Fixed vertical sidebar with social links
 * Hidden on mobile, visible on desktop
 */
export function SocialSidebar() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const isHome = pathname === "/";
  const isEnabledRoute = isHome || ["/about", "/projects", "/contact"].includes(pathname);
  const isDark = isMounted && resolvedTheme === "dark";
  const shouldShowPanel = isHome || isOpen;

  const socialLinks = [
    {
      name: "GitHub",
      href: siteConfig.author.github,
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: siteConfig.author.linkedin,
      icon: Linkedin,
    },
  ];

  useEffect(() => {
    if (shouldShowPanel) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => {
        cancelAnimationFrame(id);
        setIsAnimating(false);
      };
    }
  }, [shouldShowPanel]);

  if (!isEnabledRoute) {
    return null;
  }

  return (
    <>
      {!isHome && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "group hidden lg:inline-flex fixed left-0 bottom-6 z-40 flex-col items-center justify-center gap-3 px-2 h-20 w-7 rounded-r-sm border border-border/80 bg-gradient-to-r from-background/95 to-background/70 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:translate-x-1",
            isDark ? "text-secondary hover:text-[#4285F4]" : "text-accent hover:text-[#4285F4]"
          )}
          aria-label="Open social links"
        >
          <span className="h-6 w-[2px] rounded-full bg-border/80 transition-colors group-hover:bg-[#4285F4]" />
          <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}

      {shouldShowPanel && (
        <>
          {!isHome && (
            <div
              className="hidden lg:block fixed inset-0 z-40 bg-black/70"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          )}
          <div className="hidden lg:flex fixed left-8 bottom-24 z-50 flex-col items-center gap-10">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    isHome
                      ? "text-secondary hover:text-[#4285F4]"
                      : isOpen
                      ? isDark
                        ? "text-foreground drop-shadow-lg"
                        : "text-accent drop-shadow-lg"
                      : isDark
                      ? "text-secondary hover:text-[#4285F4]"
                      : "text-secondary hover:text-[#4285F4]",
                    "group hover:text-[#4285F4]",
                    "transition-colors duration-200",
                    "hover:-translate-y-1",
                    "transition-all duration-300 ease-out drop-shadow-sm",
                    isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                  aria-label={link.name}
                  style={{ transitionDelay: `${socialLinks.indexOf(link) * 60}ms` }}
                >
                  <Icon className="h-8 w-8 transition-colors duration-200 group-hover:text-[#4285F4]" />
                </Link>
              );
            })}
            <div
              className="w-[2px] h-36 opacity-80"
              style={{
                backgroundColor: isHome
                  ? "var(--secondary)"
                  : isOpen
                  ? isDark
                    ? "var(--foreground)"
                    : "var(--accent)"
                  : "var(--secondary)",
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
