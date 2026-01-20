"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { siteConfig } from "@/lib/constants";

const HERO_ROLES = [
  "build things for the web",
  "craft clean, modern UI",
  "ship full-stack products",
  "solve complex problems",
];

/**
 * Hero Section Component
 * Landing section with animated heading and CTA buttons
 */
export function Hero() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center py-20"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-secondary text-base md:text-lg mb-6 tracking-wide"
          >
            Hi, my name is
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-bold mb-8 w-full"
          >
            <span className="block text-foreground text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight">
              {siteConfig.author.name}
            </span>
            <span className="block text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              I&nbsp;
              <span className="inline-flex items-center">
                {typedText}
                <span className="ml-1 inline-block h-[1em] w-[2px] bg-accent animate-pulse" />
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I'm a full-stack developer specializing in building exceptional
            digital experiences. Currently focused on creating accessible,
            human-centered products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link href="/projects" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto min-w-[160px]">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[160px]">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-secondary" />
      </motion.div>
    </section>
  );
}

