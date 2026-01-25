"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * ScrollNav Component
 * Floating navigation dots for quick section jumping
 */
export function ScrollNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
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

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center"
            aria-label={`Go to ${label}`}
          >
            <span className="absolute right-8 bg-card border border-border px-3 py-1 rounded text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>
            <div
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-all duration-300",
                activeSection === id
                  ? "border-accent bg-accent scale-125"
                  : "border-secondary hover:border-accent hover:scale-110"
              )}
            />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
