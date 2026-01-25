"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

/**
 * Projects Section Component - Dopefolio Style
 * Row-based layout with alternating image/content positions
 */
export function Projects() {
  return (
    <section id="projects" className="sec-pad bg-muted">
      <div className="main-container">
        {/* Section Heading */}
        <div className="mb-24">
          <h2 className="heading-sec__main">Projects</h2>
          <p className="heading-sec__sub">
            Here you will find some of the personal and clients projects that I
            created with each project containing its own case study
          </p>
        </div>

        {/* Project Rows */}
        <div style={{ marginTop: "5rem" }}>
          {projects.map((project, index) => (
            <div key={project.id} className="projects-row">
              {/* Project Image */}
              <div className="projects-row__img-cont">
                <Image
                  src={project.image || "/images/placeholder.svg"}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="projects-row__img"
                />
              </div>

              {/* Project Content */}
              <div className="projects-row__content">
                <h3 className="projects-row__content-title">{project.title}</h3>
                <p className="projects-row__content-desc">{project.description}</p>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--med inline-block"
                    style={{ backgroundColor: '#4285F4', color: 'white' }}
                  >
                    Case Study
                  </a>
                ) : project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--med inline-block"
                    style={{ backgroundColor: '#4285F4', color: 'white' }}
                  >
                    View Code
                  </a>
                ) : (
                  <Link 
                    href={`/projects#${project.id}`} 
                    className="btn btn--med inline-block"
                    style={{ backgroundColor: '#4285F4', color: 'white' }}
                  >
                    Case Study
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
