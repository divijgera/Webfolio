"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Social Sidebar Component
 * Fixed vertical sidebar with social links
 * Hidden on mobile, visible on desktop
 */
export function SocialSidebar() {
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

  return (
    <div className="hidden lg:flex fixed left-8 bottom-0 z-40 flex-col items-center gap-6 pb-8">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            target={link.name !== "Email" ? "_blank" : undefined}
            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
            className={cn(
              "text-secondary hover:text-accent transition-all duration-200",
              "hover:-translate-y-1"
            )}
            aria-label={link.name}
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
      {/* Vertical line */}
      <div className="w-[1px] h-24 bg-border" />
    </div>
  );
}
