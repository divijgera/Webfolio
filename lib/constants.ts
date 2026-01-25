// Site configuration and constants
export const siteConfig = {
  name: "Divij Gera",
  description: "Software Engineer",
  url: "https://divijgera.com",
  author: {
    name: "Divij Gera",
    email: "",
    github: "https://github.com/divijgera",
    linkedin: "https://linkedin.com/in/divij-gera",
  },
  navigation: [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ],
};

// Social Links for Dopefolio-style sidebars and footers
export const socialLinks = [
  { name: "GitHub", url: siteConfig.author.github },
  { name: "LinkedIn", url: siteConfig.author.linkedin },
];

// Animation configuration
export const animations = {
  pageTransition: {
    duration: 0.3,
    ease: [0.17, 0.67, 0.83, 0.67] as const,
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    duration: 0.5,
  },
  stagger: {
    delayChildren: 0.1,
    staggerChildren: 0.1,
  },
};
