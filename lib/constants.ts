// Site configuration and constants
export const siteConfig = {
  name: "Divij Gera",
  description: "Full Stack Developer | Designer | Problem Solver",
  url: "https://yoursite.com",
  author: {
    name: "Divij Gera",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
  navigation: [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ],
};

// Animation configuration
export const animations = {
  pageTransition: {
    duration: 0.3,
    ease: [0.17, 0.67, 0.83, 0.67],
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
