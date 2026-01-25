"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { skills } from "@/data/skills";

export const Skills = memo(function Skills() {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.17, 0.67, 0.83, 0.67] as const,
      },
    },
  }), []);

  const categories = useMemo(() => ({
    frontend: skills.filter(s => s.category === "frontend"),
    backend: skills.filter(s => s.category === "backend"),
    tools: skills.filter(s => s.category === "tools"),
    other: skills.filter(s => s.category === "other"),
  }), []);

  return (
    <section id="skills" className="min-h-screen py-16 md:py-24 flex justify-center scroll-mt-24">
      <div className="w-[95%] max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-secondary text-lg mb-12 max-w-2xl">
            A collection of technologies and tools I work with to bring ideas to life.
          </p>

          <div className="space-y-8">
            {Object.entries(categories).map(([category, categorySkills]) => (
              categorySkills.length > 0 && (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4 text-foreground/80 capitalize">
                    {category}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-wrap gap-2"
                  >
                    {categorySkills.map((skill) => (
                      <motion.div key={skill.name} variants={itemVariants}>
                        <Badge variant="secondary" className="text-sm">
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
