"use client";

import Link from "next/link";
import { skills } from "@/data/skills";

/**
 * About Section Component - Dopefolio Style
 * Two-column layout: "Get to know me" + "My Skills"
 */
export function About() {
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
            <h3 className="text-[2.8rem] font-bold text-primary" style={{ marginBottom: '3rem' }}>
              Get to know me!
            </h3>
            <div className="text-secondary text-[1.8rem] leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p>
                I&apos;m a <strong className="text-foreground">Full Stack Web Developer</strong> building 
                and managing the Front-end and Back-end of Websites and Web Applications that leads 
                to the success of the overall product. Check out some of my work in the{" "}
                <strong className="text-foreground">Projects</strong> section.
              </p>
              <p>
                I also like sharing content related to the stuff that I have learned over the years 
                in <strong className="text-foreground">Web Development</strong> so it can help 
                other people of the Dev Community. Feel free to Connect or Follow me on my{" "}
                <a href="https://linkedin.com" className="text-accent underline" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>{" "}
                where I post useful content related to Web Development and Programming.
              </p>
              <p>
                I&apos;m open to <strong className="text-foreground">Job</strong> opportunities 
                where I can contribute, learn and grow. If you have a good opportunity that matches 
                my skills and experience then don&apos;t hesitate to{" "}
                <strong className="text-foreground">contact</strong> me.
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
            <h3 className="text-[2.8rem] font-bold text-primary" style={{ marginBottom: '3rem' }}>
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
}
