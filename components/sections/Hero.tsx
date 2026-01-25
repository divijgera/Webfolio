"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/constants";

/**
 * Hero Section Component - Dopefolio Style
 * Full-height hero with gradient background and centered content
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, rgba(17, 17, 17, 0.95), rgba(17, 17, 17, 0.95)), linear-gradient(to right, #111111, #333333)",
      }}
    >
{/* Main Content */}
      <div className="main-container">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Greeting */}
          <h1 className="heading-primary mb-10 text-white">
            Hey, I&apos;m {siteConfig.author.name}
          </h1>

          {/* Description */}
          <p className="max-w-[80rem] mx-auto mb-10 text-white/80 text-[2.2rem] leading-relaxed">
            A Full Stack Developer building and managing the Front-end and Back-end of Websites
            and Web Applications that leads to the success of the overall product. Check out my
            work below.
          </p>

          {/* CTA Button */}
          <Link 
            href="#projects" 
            className="btn btn--bg"
            style={{ backgroundColor: '#4285F4', color: 'white' }}
          >
            Projects
          </Link>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2">
        <div className="mouse" />
      </div>
    </section>
  );
}

