"use client";

import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden">
      {/* Project Image Placeholder - replace with actual image */}
      <div className="absolute inset-0 flex items-center justify-center text-secondary">
        <div className="text-center">
          <span className="text-lg font-medium">{project.title}</span>
          <p className="text-sm mt-2 opacity-70">Project Screenshot</p>
        </div>
      </div>
      {/* If you have an actual image, use this: */}
      {/* <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover"
        loading="lazy"
      /> */}
    </div>
  );
}
