"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.17, 0.67, 0.83, 0.67],
      }}
    >
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Project Image Placeholder */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-accent/20 to-accent/5">
          <div className="absolute inset-0 flex items-center justify-center text-secondary">
            <span className="text-sm">Project Image</span>
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            
            <p className="text-secondary text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" size="sm" className="w-full group/btn">
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  View Project
                </Button>
              </Link>
            )}
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="group/btn">
                  <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
