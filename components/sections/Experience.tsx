"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/animations/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="text-secondary text-[1.6rem]">Loading...</div>
    </div>
  ),
});

interface Experience {
  company: string;
  companyKey: "microsoft" | "amazon";
  role: string;
  duration: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: "Microsoft",
    companyKey: "microsoft",
    role: "Software Engineer",
    duration: "2023 - Present",
    description: "Building scalable cloud solutions and developing enterprise applications using Azure services and modern web technologies.",
  },
  {
    company: "Amazon",
    companyKey: "amazon",
    role: "Software Development Engineer",
    duration: "2021 - 2023",
    description: "Developed high-performance distributed systems and contributed to AWS services serving millions of customers.",
  },
];

/**
 * Experience Section Component
 * Showcases work experience with two Lanyard animations
 */
export function Experience() {
  return (
    <section id="experience" className="sec-pad bg-background">
      <div className="main-container">
        {/* Section Heading */}
        <div style={{ marginBottom: "11rem" }}>
          <h2 className="heading-sec__main">Experience</h2>
          <p className="heading-sec__sub">
            Here you will find details about my professional journey and the
            companies I&apos;ve had the privilege to work with
          </p>
        </div>

        {/* Two Lanyards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {experiences.map((exp) => (
            <div key={exp.companyKey} className="relative">
              {/* Lanyard Container with Background Text */}
              <div className="relative bg-muted rounded-2xl overflow-hidden border border-border">
                {/* Background Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none select-none z-0">
                  <h3 className="text-[3rem] md:text-[4rem] font-bold text-foreground/40 dark:text-foreground/30 uppercase tracking-wider">
                    {exp.company}
                  </h3>
                  <p className="text-[1.6rem] text-foreground/30 dark:text-foreground/25 mt-2">
                    {exp.role}
                  </p>
                  <p className="text-[1.4rem] text-foreground/25 dark:text-foreground/20 mt-1">
                    {exp.duration}
                  </p>
                </div>

                {/* Lanyard */}
                <div className="relative z-10">
                  <Lanyard
                    company={exp.companyKey}
                    position={[0, 0, 12]}
                    gravity={[0, -40, 0]}
                  />
                </div>
              </div>

              {/* Experience Details Below */}
              <div className="mt-6 p-6 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[2rem] font-bold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="text-[1.3rem] text-accent font-medium px-3 py-1 bg-accent/10 rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <h4 className="text-[1.6rem] font-semibold text-accent mb-3">
                  {exp.role}
                </h4>
                <p className="text-[1.5rem] text-secondary leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
