"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { ContactFormData } from "@/types";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: "success",
        message: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-16 md:py-24 flex justify-center scroll-mt-24">
      <div className="w-[95%] max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Get In Touch
            </h1>
            <p className="text-secondary text-lg mb-8">
              Have a question or want to work together? Feel free to reach out!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows={6}
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:pl-12"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Let&apos;s Connect
                </h2>
                <p className="text-secondary">
                  I&apos;m always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, I&apos;ll do my best
                  to get back to you!
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Connect with me
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:your.email@example.com"
                    className="flex items-center text-secondary hover:text-accent transition-colors"
                  >
                    <span className="mr-3">📧</span>
                    your.email@example.com
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:text-accent transition-colors"
                  >
                    <span className="mr-3">💼</span>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:text-accent transition-colors"
                  >
                    <span className="mr-3">💻</span>
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:text-accent transition-colors"
                  >
                    <span className="mr-3">🐦</span>
                    Twitter
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Response Time
                </h3>
                <p className="text-secondary">
                  I typically respond within 24-48 hours. Looking forward to hearing from you!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
