"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="pt-4 pb-16 md:pb-24 flex justify-center">
      <div className="w-[95%] max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6 w-full lg:flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About Me
            </h2>
            
            <div className="space-y-4 text-secondary text-base md:text-lg leading-relaxed">
              <p>
                Hi! I&apos;m a passionate full-stack developer who loves creating beautiful and functional web applications. My journey in web development started several years ago, and I&apos;ve been hooked ever since.
              </p>
              
              <p>
                I specialize in building modern, responsive applications using cutting-edge technologies. Whether it&apos;s crafting pixel-perfect user interfaces or architecting scalable backend systems, I enjoy every aspect of the development process.
              </p>
              
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with industry trends.
              </p>
              
              <p>
                I&apos;m currently open to new opportunities and collaborations. If you have an interesting project or just want to connect, feel free to reach out!
              </p>
            </div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:flex-1 flex justify-center"
          >
            <div className="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden bg-accent/10 border-2 border-accent/20">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center text-secondary">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent/20" />
                  <p className="text-sm">Add your profile image here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
