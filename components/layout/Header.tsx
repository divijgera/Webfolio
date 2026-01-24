"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Minimal, centered navigation with mobile menu
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = siteConfig.navigation.map((item) => item.id).filter(Boolean) as string[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (id?: string) => (event: React.MouseEvent) => {
    if (!isHome || !id) return;
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-center bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="w-[95%] max-w-screen-2xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-foreground hover:text-accent transition-colors"
            >
              {siteConfig.author.name}
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center gap-8">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item.id)}
                  className={cn(
                    "text-sm font-medium transition-all duration-200 relative py-2 whitespace-nowrap",
                    isHome
                      ? activeSection === item.id
                        ? "text-foreground"
                        : "text-secondary hover:text-foreground"
                      : pathname === item.href
                      ? "text-foreground"
                      : "text-secondary hover:text-foreground"
                  )}
                >
                  {item.name}
                  {(isHome ? activeSection === item.id : pathname === item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side - Theme Toggle for desktop, theme + menu for mobile */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 w-full z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="w-[95%] max-w-screen-2xl mx-auto py-6">
              <nav className="space-y-1">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      handleNavClick(item.id)(event);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      isHome
                        ? activeSection === item.id
                          ? "bg-accent/10 text-accent"
                          : "text-secondary hover:bg-muted hover:text-foreground"
                        : pathname === item.href
                        ? "bg-accent/10 text-accent"
                        : "text-secondary hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
