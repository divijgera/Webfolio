"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { siteConfig } from "@/lib/constants";

// Hydration-safe mounted check without useEffect setState
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Header Component - Dopefolio Style
 * Transparent on home (dark mode) to show Aurora, solid when scrolled
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Track scroll position with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Make header transparent on home page when at top (after mount) to show Aurora
  const isTransparent = mounted && isHome && !scrolled;

  const handleNavClick = (id?: string) => (event: React.MouseEvent) => {
    if (!isHome || !id) return;
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${
        isTransparent ? "bg-transparent" : "bg-background shadow-sm"
      }`}
    >
      <div className="main-container">
        <div className="flex items-center justify-between h-[8rem]">
          {/* Logo */}
          <Link
            href="/"
            className="text-[2.4rem] font-bold text-foreground uppercase tracking-wider"
          >
            {siteConfig.author.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.id)}
                className="text-[1.8rem] font-bold text-foreground uppercase tracking-wider hover:text-[#4285F4] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="main-container py-8">
            <nav className="flex flex-col gap-6">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item.id)}
                  className="text-[2rem] font-bold text-foreground uppercase tracking-wider"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
