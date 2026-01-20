import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div style={{ paddingTop: "calc(var(--header-height) + 16px)" }}>
      {children}
    </div>
  );
}
