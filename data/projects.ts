import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern web technologies for optimal performance.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: "/images/projects/ecommerce.jpg",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "AI Content Generator",
    description:
      "An intelligent content generation tool powered by OpenAI's GPT models. Features include custom templates, tone adjustment, and multi-language support for marketers and content creators.",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB", "Express"],
    image: "/images/projects/ai-generator.jpg",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "Real-Time Collaboration Tool",
    description:
      "A collaborative workspace application with real-time editing, video conferencing, and task management. Designed for remote teams to work seamlessly together.",
    tags: ["Next.js", "Socket.io", "WebRTC", "Redis", "Prisma"],
    image: "/images/projects/collab-tool.jpg",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "Fitness Tracking App",
    description:
      "A mobile-responsive fitness application with workout tracking, nutrition logging, and progress visualization. Includes social features to connect with workout partners.",
    tags: ["React Native", "Firebase", "Chart.js", "Tailwind CSS"],
    image: "/images/projects/fitness-app.jpg",
    liveUrl: "https://github.com",
    featured: false,
  },
  {
    id: "5",
    title: "Portfolio CMS",
    description:
      "A headless CMS specifically designed for creative professionals to showcase their work. Features drag-and-drop page builder and custom theme support.",
    tags: ["Next.js", "Sanity.io", "TypeScript", "Framer Motion"],
    image: "/images/projects/portfolio-cms.jpg",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "6",
    title: "Weather Dashboard",
    description:
      "A comprehensive weather application with forecasts, severe weather alerts, and historical data visualization. Includes location-based recommendations.",
    tags: ["Vue.js", "OpenWeather API", "D3.js", "Tailwind CSS"],
    image: "/images/projects/weather-dashboard.jpg",
    liveUrl: "https://github.com",
    featured: false,
  },
];
