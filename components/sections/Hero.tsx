"use client";

import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/constants";
import LightPillar from "@/components/animations/LightPillar";
import Antigravity from "@/components/animations/Antigravity";

const HERO_ROLES = [
  "build things for the web",
  "craft clean, modern UI",
  "ship full-stack products",
  "solve complex problems",
];

/**
 * Typewriter Component - Isolated to prevent parent re-renders
 * This component handles its own state updates without affecting siblings
 */
const Typewriter = memo(function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = HERO_ROLES[roleIndex];
    const typingSpeed = 110;
    const deletingSpeed = 70;
    const pauseTime = 1600;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && typedText === fullText) {
      delay = pauseTime;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText !== fullText) {
        setTypedText(fullText.slice(0, typedText.length + 1));
        return;
      }

      if (isDeleting && typedText !== "") {
        setTypedText(fullText.slice(0, typedText.length - 1));
        return;
      }

      if (!isDeleting && typedText === fullText) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  return (
    <p className="text-[3rem] md:text-[3.6rem] mb-10" style={{ color: "var(--foreground)", opacity: 0.9 }}>
      I{" "}
      <span className="inline-flex items-center">
        {typedText}
        <span className="ml-1 inline-block h-[1em] w-[3px] bg-[#4285F4] animate-pulse" />
      </span>
    </p>
  );
});

/**
 * Hero Section Component - Dopefolio Style
 * Full-height hero with gradient background and centered content
 */
export function Hero() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center"
      style={{
        background: !isMounted || resolvedTheme === "dark"
          ? "#0a0a0a"
          : "linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), linear-gradient(to right, #ffffff, #f5f5f5)",
      }}
    >
      {/* LightPillar Background for Dark Mode */}
      {isMounted && resolvedTheme === "dark" && (
        <div className="absolute inset-0 z-0">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
      )}

      {/* Antigravity Particles for Light Mode */}
      {isMounted && resolvedTheme === "light" && (
        <Antigravity particleCount={80} particleColor="#4285F4" />
      )}

      {/* Main Content */}
      <div className="main-container relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Greeting */}
          <h1 className="heading-primary mb-6">
            Hey, I&apos;m {siteConfig.author.name}
          </h1>

          {/* Typewriter Effect - Isolated component to prevent re-renders */}
          <Typewriter />

          {/* Description */}
          <p className="max-w-[80rem] mx-auto mb-16 text-[2rem] leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.7 }}>
            A Full Stack Developer building and managing the Front-end and Back-end of Websites
            and Web Applications that leads to the success of the overall product. Check out my
            work below.
          </p>

          {/* CTA Button */}
          <div style={{ marginTop: "4rem" }}>
            <Link 
              href="#projects" 
              className="btn btn--bg"
              style={{ backgroundColor: '#4285F4', color: 'white' }}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2">
        <div className="mouse" />
      </div>
    </section>
  );
}

