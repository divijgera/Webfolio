"use client";

import Link from "next/link";
import { ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps extends ComponentProps<typeof Link> {
  className?: string;
  underline?: boolean;
}

/**
 * Animated Link Component
 * Link with smooth underline animation
 */
export function AnimatedLink({
  className,
  underline = true,
  children,
  ...props
}: AnimatedLinkProps) {
  return (
    <Link
      className={cn(
        "relative inline-flex items-center transition-colors duration-200",
        "hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
      {underline && (
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </Link>
  );
}
