"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { animations } from "@/lib/constants";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

/**
 * Fade In Animation Component
 * Scroll-triggered fade-in with optional directional movement
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  className,
}: FadeInProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: animations.fadeIn.duration,
        delay,
        ease: "easeOut",
      }}
      style={{ width: fullWidth ? "100%" : "auto" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
