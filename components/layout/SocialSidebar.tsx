"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
  const [isMounted, setIsMounted] = useState(false);
  const isHome = pathname === "/";
  const isEnabledRoute = isHome || ["/about", "/projects", "/contact"].includes(pathname);
  const isDark = isMounted && resolvedTheme === "dark";

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
    {
      name: "Twitter",
      href: siteConfig.author.twitter,
      icon: Twitter,
    },
    {
      name: "Email",
      href: `mailto:${siteConfig.author.email}`,
      icon: Mail,
    },
  ];

  if (!isEnabledRoute) {
    return null;
  }

  const shouldShowPanel = isHome || isOpen;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (shouldShowPanel) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    }
    setIsAnimating(false);
  }, [shouldShowPanel]);

  return (
    <>
      {!isHome && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "group hidden lg:inline-flex fixed left-0 bottom-6 z-40 flex-col items-center justify-center gap-3 px-2 h-20 w-7 rounded-r-sm border border-border/80 bg-gradient-to-r from-background/95 to-background/70 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:translate-x-1",
            isDark ? "text-secondary hover:text-foreground" : "text-accent"
          )}
          aria-label="Open social links"
        >
          <span className="h-6 w-[2px] rounded-full bg-border/80 transition-colors group-hover:bg-accent" />
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
          <div className="hidden lg:flex fixed left-6 bottom-24 z-50 flex-col items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className={cn(
                    isHome
                      ? "text-secondary hover:text-accent"
                      : isOpen
                      ? isDark
                        ? "text-foreground drop-shadow-lg"
                        : "text-accent drop-shadow-lg"
                      : isDark
                      ? "text-secondary hover:text-accent"
                      : "text-secondary hover:text-accent",
                    "transition-all duration-200",
                    "hover:-translate-y-1",
                    "transition-all duration-300 ease-out drop-shadow-sm",
                    isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                  aria-label={link.name}
                  style={{ transitionDelay: `${socialLinks.indexOf(link) * 60}ms` }}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
            <div
              className={cn(
                "w-[2px] h-24 bg-gradient-to-b",
                isHome
                  ? "from-border/20 via-border to-border/10"
                  : "from-background/20 via-background/60 to-background/20 dark:from-border/20 dark:via-border dark:to-border/10"
              )}
            />
          </div>
        </>
      )}
    </>
  );
}
