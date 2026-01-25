"use client";

import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider Component
 * Uses native smooth scrolling like Dopefolio - clean and simple
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <>{children}</>;
}
