import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/constants";

/**
 * Footer Component
 * Clean, minimal footer
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="py-12 md:py-16">
          <div className="flex items-center justify-center">
            <p className="text-lg font-light text-foreground/60 tracking-wider">
              Built with{" "}
              <span className="text-red-500 inline-block animate-pulse text-xl">❤️</span>{" "}
              by{" "}
              <span className="font-medium text-foreground/80">Divij</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
