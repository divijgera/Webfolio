"use client";

import { useState } from "react";

// Google Form configuration
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSeDFp0mteHxzrDnNxk4D2l68HRq_M6nAUOMiLaAphMDeg665Q/formResponse";
const ENTRY_NAME = "entry.789727278";
const ENTRY_EMAIL = "entry.882626626";
const ENTRY_MESSAGE = "entry.1055675233";

/**
 * Contact Section Component - Dopefolio Style
 * Integrated with Google Forms for submissions
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build form data for Google Forms
    const submitData = new FormData();
    submitData.append(ENTRY_NAME, formData.name);
    submitData.append(ENTRY_EMAIL, formData.email);
    submitData.append(ENTRY_MESSAGE, formData.message);

    try {
      // Submit using fetch with no-cors mode (fire and forget)
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: submitData,
      });
    } catch {
      // Errors are expected with no-cors, submission still works
    }

    // Show success state
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="contact sec-pad bg-background">
      <div className="main-container">
        <h2 className="heading heading-sec heading-sec__mb-med">
          <span className="heading-sec__main">Contact</span>
          <span className="heading-sec__sub">
            Feel free to Contact me by submitting the form below and I will get back to you as soon as possible
          </span>
        </h2>
        <div className="contact__form-container">
          {isSubmitted ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-500/10">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[2.4rem] font-bold text-black mb-3">Thank you!</h3>
              <p className="text-[1.8rem] text-gray-600" style={{ marginBottom: "4rem" }}>
                Your message has been sent successfully. I&apos;ll get back to you soon!
              </p>
              <button
                onClick={handleReset}
                className="btn btn--theme contact__btn"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-field">
                <label className="contact__form-label" htmlFor="name">Name</label>
                <input
                  required
                  placeholder="Enter Your Name"
                  type="text"
                  className="contact__form-input"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="contact__form-field">
                <label className="contact__form-label" htmlFor="email">Email</label>
                <input
                  required
                  placeholder="Enter Your Email"
                  type="email"
                  className="contact__form-input"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="contact__form-field">
                <label className="contact__form-label" htmlFor="message">Message</label>
                <textarea
                  required
                  cols={30}
                  rows={10}
                  className="contact__form-input"
                  placeholder="Enter Your Message"
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn--theme contact__btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
