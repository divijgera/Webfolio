import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

/**
 * Section component with configurable padding
 * Provides semantic HTML and consistent spacing
 */
export function Section({
  children,
  className,
  id,
  padding = "lg",
}: SectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
    xl: "py-24 sm:py-32",
  };

  return (
    <section
      id={id}
      className={cn("w-full", paddingClasses[padding], className)}
    >
      {children}
    </section>
  );
}
