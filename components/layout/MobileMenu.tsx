"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (id?: string) => (event: React.MouseEvent) => void;
}

/**
 * Minimal Modern Mobile Menu with GSAP animations
 * Full-screen overlay with elegant staggered animations
 */
export function MobileMenu({ isOpen, onClose, onNavClick }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Set up initial states
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0, visibility: "hidden" });
      }
      menuItemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { y: 60, opacity: 0 });
      });
      if (closeButtonRef.current) {
        gsap.set(closeButtonRef.current, { opacity: 0, rotate: -90 });
      }
    });
    return () => ctx.revert();
  }, []);

  // Handle open/close animations
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    if (isOpen) {
      // Opening animation
      tl.set(overlayRef.current, { visibility: "visible" })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          closeButtonRef.current,
          {
            opacity: 1,
            rotate: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          menuItemsRef.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.3"
        );
    } else {
      // Closing animation - faster and smoother
      tl.to(
          menuItemsRef.current.filter(Boolean),
          {
            y: -40,
            opacity: 0,
            duration: 0.25,
            stagger: 0.03,
            ease: "power2.in",
          },
          0
        )
        .to(
          closeButtonRef.current,
          {
            opacity: 0,
            rotate: 90,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.2"
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          },
          "-=0.15"
        )
        .set(overlayRef.current, { visibility: "hidden" });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const setMenuItemRef = (index: number) => (el: HTMLAnchorElement | null) => {
    if (el) menuItemsRef.current[index] = el;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-background md:hidden"
      aria-hidden={!isOpen}
    >
      {/* Close Button - Top Right */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-8 right-6 z-10 w-12 h-12 flex items-center justify-center group"
        aria-label="Close menu"
      >
        <span className="relative w-7 h-7">
          <span className="absolute top-1/2 left-0 w-full h-[2px] bg-foreground rotate-45 transition-transform group-hover:rotate-[135deg]" />
          <span className="absolute top-1/2 left-0 w-full h-[2px] bg-foreground -rotate-45 transition-transform group-hover:rotate-[-135deg]" />
        </span>
      </button>

      {/* Main Content */}
      <div className="h-full flex flex-col justify-center px-10">
        {/* Navigation */}
        <nav className="mb-16">
          <ul className="space-y-1">
            {siteConfig.navigation.map((item, index) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  ref={setMenuItemRef(index)}
                  href={item.href}
                  onClick={(e) => {
                    onNavClick(item.id)(e);
                    onClose();
                  }}
                  className="group flex items-center gap-6 py-4"
                >
                  {/* Number */}
                  <span className="mobile-menu__index text-[1.2rem] font-mono tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Label */}
                  <span className="text-[4rem] font-light text-foreground tracking-tight transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#4285F4]">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
