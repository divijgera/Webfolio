"use client";

import { memo } from "react";
import Link from "next/link";
import { skills } from "@/data/skills";

/**
 * About Section Component - Dopefolio Style
 * Two-column layout: "Get to know me" + "My Skills"
 */
export const About = memo(function About() {
  return (
    <section id="about" className="sec-pad bg-muted">
      <div className="main-container">
        {/* Section Heading */}
        <div style={{ marginBottom: '11rem' }}>
          <h2 className="heading-sec__main">About Me</h2>
          <p className="heading-sec__sub">
            Here you will find more information about me, what I do, and my
            current skills mostly in terms of programming and technology
          </p>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '10rem' }}>
          {/* Get to know me */}
          <div>
            <h3 className="text-[2.8rem] font-bold text-foreground" style={{ marginBottom: '3rem' }}>
              Get to know me!
            </h3>
            <div className="text-secondary text-[1.8rem] leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p>
                I&apos;m a <strong className="text-foreground">Software Engineer</strong> currently 
                working at <strong className="text-foreground">Microsoft</strong> on the Azure Resource 
                Notifications team, building pub-sub services handling hundreds of billions of notifications daily.
              </p>
              <p>
                Previously at <strong className="text-foreground">Amazon</strong>, I contributed to Lumos, 
                a cloud-based payment solution handling $2B+ transactions. I have extensive experience with 
                <strong className="text-foreground"> AWS cloud technologies</strong>, microservices architecture, 
                and building scalable distributed systems.
              </p>
              <p>
                I&apos;m also passionate about <strong className="text-foreground">Deep Learning</strong> and 
                <strong className="text-foreground"> Computer Vision</strong>, with a published paper at 
                IEEE ICME 2023 on adversarial robustness in neural networks.
              </p>
            </div>
            <Link
              href="#contact"
              className="btn btn--med inline-block"
              style={{ backgroundColor: '#4285F4', color: 'white', marginTop: '4rem' }}
            >
              Contact
            </Link>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-[2.8rem] font-bold text-foreground" style={{ marginBottom: '3rem' }}>
              My Skills
            </h3>
            <div className="flex flex-wrap">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="skills__skill"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
