"use client";

import { useState } from "react";
import { X } from "lucide-react";
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
  highlights: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "Microsoft",
    companyKey: "microsoft",
    role: "Software Engineer",
    duration: "2023 - Present",
    description: "Building scalable cloud solutions and developing enterprise applications using Azure services and modern web technologies.",
    highlights: [
      "Led development of cloud-native applications serving 10M+ users",
      "Architected microservices infrastructure reducing latency by 40%",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines improving deployment frequency by 3x",
    ],
    technologies: ["Azure", "TypeScript", "React", "Node.js", "Kubernetes", "GraphQL"],
  },
  {
    company: "Amazon",
    companyKey: "amazon",
    role: "Software Development Engineer",
    duration: "2021 - 2023",
    description: "Developed high-performance distributed systems and contributed to AWS services serving millions of customers.",
    highlights: [
      "Built distributed systems handling 100K+ requests per second",
      "Optimized database queries reducing response time by 60%",
      "Designed and implemented RESTful APIs for internal tools",
      "Contributed to AWS Lambda performance improvements",
    ],
    technologies: ["AWS", "Java", "Python", "DynamoDB", "Lambda", "S3"],
  },
];

/**
 * Experience Section Component
 * Showcases work experience with two Lanyard animations
 */
export function Experience() {
  const [openCard, setOpenCard] = useState<string | null>(null);

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

                {/* Detail Card Overlay */}
                <div
                  className={`absolute z-20 bg-card border border-border/50 shadow-xl rounded-2xl transition-all duration-300 ease-out ${
                    openCard === exp.companyKey
                      ? "opacity-100 pointer-events-auto scale-100"
                      : "opacity-0 pointer-events-none scale-95"
                  }`}
                  style={{ top: '16px', left: '16px', right: '16px', bottom: '16px' }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setOpenCard(null)}
                    className="absolute rounded-full bg-muted hover:bg-border transition-colors z-30 group"
                    style={{ top: '24px', right: '24px', padding: '12px' }}
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5 text-secondary group-hover:text-foreground transition-colors" />
                  </button>

                  {/* Scrollable Content */}
                  <div 
                    className="h-full overflow-y-auto"
                    style={{ padding: '40px 36px' }}
                  >
                    {/* Header */}
                    <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                      <h3 style={{ fontSize: '2.4rem', fontWeight: 600, marginBottom: '8px', color: 'var(--foreground)' }}>
                        {exp.company}
                      </h3>
                      <p style={{ fontSize: '1.6rem', fontWeight: 500, color: 'var(--accent)' }}>
                        {exp.role}
                      </p>
                      <p style={{ fontSize: '1.3rem', color: 'var(--secondary)', marginTop: '8px' }}>
                        {exp.duration}
                      </p>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '1.5rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <div style={{ marginBottom: '40px' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--foreground)', opacity: 0.6, marginBottom: '20px' }}>
                        Key Achievements
                      </h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {exp.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            style={{ fontSize: '1.4rem', color: 'var(--secondary)', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                          >
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '6px' }}>●</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--foreground)', opacity: 0.6, marginBottom: '20px' }}>
                        Technologies
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            style={{ fontSize: '1.2rem', padding: '8px 16px', background: 'var(--muted)', color: 'var(--foreground)', borderRadius: '8px', fontWeight: 500 }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Footer - Company Name, Tenure, Read More */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-[2.2rem] font-bold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="text-[1.4rem] text-secondary font-medium">
                    {exp.duration}
                  </span>
                </div>
                <button
                  onClick={() => setOpenCard(exp.companyKey)}
                  className="text-[1.4rem] font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                >
                  Read More
                  <span className="text-[1.2rem]">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
