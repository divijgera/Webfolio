"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider Component
 * Handles section-by-section scrolling on the home page
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);
  const currentSectionRef = useRef(0);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    const isHome = pathname === "/";
    if (!isHome) return;

    const getSections = () => Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];

    const scrollToSection = (index: number) => {
      const sections = getSections();
      if (index < 0 || index >= sections.length) return;
      
      const target = sections[index];
      currentSectionRef.current = index;
      isTransitioningRef.current = true;

      // Use scrollIntoView which respects CSS scroll-margin-top
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
    };

    const wheelHandler = (event: WheelEvent) => {
      // Always prevent default scroll on home page
      event.preventDefault();
      event.stopPropagation();

      // Don't process if already transitioning
      if (isTransitioningRef.current) return;

      // Debounce rapid wheel events
      const now = Date.now();
      if (now - lastWheelTime.current < 100) return;
      lastWheelTime.current = now;

      const sections = getSections();
      const delta = event.deltaY;

      // Scroll down
      if (delta > 0 && currentSectionRef.current < sections.length - 1) {
        scrollToSection(currentSectionRef.current + 1);
      }
      // Scroll up
      else if (delta < 0 && currentSectionRef.current > 0) {
        scrollToSection(currentSectionRef.current - 1);
      }
    };

    // Sync currentSectionRef with actual scroll position on load
    const syncCurrentSection = () => {
      const sections = getSections();
      const scrollTop = window.scrollY;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        // Account for scroll-margin-top (96px)
        if (scrollTop >= section.offsetTop - 100) {
          currentSectionRef.current = i;
          break;
        }
      }
    };

    // Initialize
    syncCurrentSection();

    // Add wheel listener
    window.addEventListener("wheel", wheelHandler, { passive: false, capture: true });

    // Cleanup
    return () => {
      window.removeEventListener("wheel", wheelHandler, { capture: true });
    };
  }, [pathname]);

  return <>{children}</>;
}
