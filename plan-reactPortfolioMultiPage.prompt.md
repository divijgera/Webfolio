# Plan: Multi-Page React Portfolio with Smooth Transitions

Build a professional, multi-page portfolio using Next.js 14 App Router, with Framer Motion page transitions (300ms fade), Tailwind CSS for responsive styling, and extensible architecture for future content additions. Includes hybrid design (minimalist base + strategic project visuals), dark/light mode, smooth scrolling with Lenis, and Web3Forms integration for contact.

## Implementation Tasks

### **Phase 1: Project Foundation & Setup**

1. **Initialize Next.js 14 project with TypeScript** — Run \`npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-directory\`, configure [tailwind.config.ts](tailwind.config.ts) with custom color tokens (monochromatic palette inspired by Olaolu.dev: white/dark backgrounds, subtle accent), set up dark mode with \`class\` strategy, and configure font optimization with \`next/font\`.

2. **Install core dependencies** — Add \`framer-motion\` (page transitions), \`@studio-freight/lenis\` (smooth scroll), \`next-themes\` (dark mode state), \`react-hook-form\` + \`zod\` (form validation), \`lucide-react\` or \`react-icons\` (icon library), and configure TypeScript paths for clean imports (\`@/components/*\`, \`@/lib/*\`).

3. **Create foundational folder structure** — Set up [app](app) routes (\`/\`, \`/about\`, \`/projects\`, \`/contact\`), [components/ui](components/ui) for reusable atoms, [components/sections](components/sections) for page sections, [components/layout](components/layout) for navigation/footer, [lib/utils.ts](lib/utils.ts) for helpers, [data](data) for dummy content, [types](types) for TypeScript interfaces.

### **Phase 2: Layout & Navigation System**

4. **Build root layout with theme provider** — Create [app/layout.tsx](app/layout.tsx) with \`ThemeProvider\` wrapper, implement global metadata (SEO tags, Open Graph), add Google Fonts configuration, wrap children with \`AnimatePresence\` for page transitions, and set up CSS custom properties for theme colors.

5. **Implement responsive navigation header** — Create [components/layout/Header.tsx](components/layout/Header.tsx) with logo, nav links (\`/\`, \`/about\`, \`/projects\`, \`/contact\`), mobile hamburger menu (slide-in drawer on mobile using Framer Motion), active route highlighting, and theme toggle button with smooth icon transition.

6. **Create page transition wrapper** — Build [components/animations/PageTransition.tsx](components/animations/PageTransition.tsx) implementing Framer Motion's fade + slight y-movement pattern (\`initial={{ opacity: 0, y: 10 }}\`, \`animate={{ opacity: 1, y: 0 }}\`, duration 300ms, easing \`[0.17, 0.67, 0.83, 0.67]\`), wrap in \`AnimatePresence mode="wait"\`.

7. **Build footer with social sidebar** — Create [components/layout/Footer.tsx](components/layout/Footer.tsx) with copyright, social links (LinkedIn, GitHub, Twitter dummy URLs), and [components/layout/SocialSidebar.tsx](components/layout/SocialSidebar.tsx) as fixed vertical bar on desktop with icon links, hidden on mobile.

### **Phase 3: Reusable UI Components**

8. **Create base UI component library** — Build [components/ui/Button.tsx](components/ui/Button.tsx) with variants (primary, secondary, ghost), [components/ui/Card.tsx](components/ui/Card.tsx) with hover effects, [components/ui/Badge.tsx](components/ui/Badge.tsx) for skill tags, [components/ui/Input.tsx](components/ui/Input.tsx) and [components/ui/Textarea.tsx](components/ui/Textarea.tsx) with focus states—all with dark mode support and accessibility attributes.

9. **Implement theme toggle component** — Create [components/ui/ThemeToggle.tsx](components/ui/ThemeToggle.tsx) using \`useTheme\` hook from \`next-themes\`, smooth icon transition between sun/moon icons, persist preference to localStorage, prevent flash of unstyled content with proper mounting check.

10. **Build container and section wrappers** — Create [components/layout/Container.tsx](components/layout/Container.tsx) for max-width content centering, [components/layout/Section.tsx](components/layout/Section.tsx) with configurable padding/spacing, both with responsive breakpoint handling.

### **Phase 4: Home Page & Hero Section**

11. **Create home page with hero section** — Build [app/page.tsx](app/page.tsx) with [components/sections/Hero.tsx](components/sections/Hero.tsx) featuring large heading with staggered letter/word animation, tagline, CTA buttons ("View Projects", "Contact Me"), and subtle background pattern or gradient.

12. **Add scroll-triggered fade-in animations** — Implement [components/animations/FadeIn.tsx](components/animations/FadeIn.tsx) wrapper using Framer Motion's \`whileInView={{ opacity: 1, y: 0 }}\`, \`viewport={{ once: true, amount: 0.3 }}\`, apply to sections below fold for progressive reveal effect.

### **Phase 5: About Page**

13. **Build about page with two-column layout** — Create [app/about/page.tsx](app/about/page.tsx) with [components/sections/About.tsx](components/sections/About.tsx) featuring bio/introduction (left column, dummy text about experience and passion), profile image with border radius, responsive stack on mobile.

14. **Create skills section with badge grid** — Build [components/sections/Skills.tsx](components/sections/Skills.tsx) (right column on desktop) displaying skill badges (React, TypeScript, Next.js, Tailwind, etc. dummy list) in responsive grid with staggered entrance animation, each badge with tech-specific color accent.

### **Phase 6: Projects Page**

15. **Implement projects showcase page** — Create [app/projects/page.tsx](app/projects/page.tsx) with [components/sections/Projects.tsx](components/sections/Projects.tsx) displaying grid of project cards (responsive: 1 column mobile, 2 tablet, 3 desktop), create [data/projects.ts](data/projects.ts) with dummy project data (title, description, tech stack, image, link).

16. **Build interactive project cards** — Create [components/ui/ProjectCard.tsx](components/ui/ProjectCard.tsx) with featured image, title, description, tech badges, hover effects (subtle lift, shadow increase), smooth transitions on image zoom, "View Project" link with external icon.

### **Phase 7: Contact Page & Form**

17. **Create contact page layout** — Build [app/contact/page.tsx](app/contact/page.tsx) with heading, intro text ("Let's connect"), two-column layout (form left, contact info/social links right on desktop, stacked mobile).

18. **Implement contact form with validation** — Build [components/sections/ContactForm.tsx](components/sections/ContactForm.tsx) using React Hook Form + Zod schema (name, email, message fields), integrate Web3Forms API (deferred implementation: use form structure now, add access key later), loading states, success/error messages, accessibility labels.

### **Phase 8: Smooth Scrolling & Advanced Animations**

19. **Integrate Lenis smooth scrolling** — Create [lib/lenis.ts](lib/lenis.ts) initializing Lenis with 1.2s duration and custom easing, integrate with App Router using client component wrapper, add \`requestAnimationFrame\` loop, ensure compatibility with Framer Motion scroll animations.

20. **Add staggered animations for lists** — Create [components/animations/StaggerChildren.tsx](components/animations/StaggerChildren.tsx) wrapper with Framer Motion stagger container variants, apply to project grid cards and skill badges with 0.1s delay between children.

21. **Implement micro-interactions** — Add hover/focus states: button scale (1.05), card lift with shadow, link underline slide-in animation, smooth color transitions on theme toggle, ensure \`transform\` and \`opacity\` only for 60fps performance.

### **Phase 9: Responsive Design & Optimization**

22. **Mobile responsiveness audit** — Test all pages at breakpoints (375px, 768px, 1024px, 1440px), adjust navigation (hamburger menu on mobile), grid layouts (single column mobile), font sizes (fluid typography with \`clamp()\`), touch targets (min 44px), and image sizes with Next.js Image component.

23. **Optimize performance** — Lazy load below-fold components with \`dynamic()\`, optimize images (WebP format, responsive sizes), minimize Framer Motion usage to essential animations, implement loading states with [app/loading.tsx](app/loading.tsx), add prefetch to navigation links.

24. **Accessibility improvements** — Add semantic HTML (\`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`, \`<section>\`), proper heading hierarchy (h1 → h2 → h3), ARIA labels for icon buttons, keyboard navigation support (focus visible rings), \`prefers-reduced-motion\` media query to disable animations, color contrast validation (WCAG AA: 4.5:1).

### **Phase 10: Content & Final Polish**

25. **Populate with dummy content** — Create comprehensive dummy data in [data/projects.ts](data/projects.ts) (3-6 projects), [data/skills.ts](data/skills.ts) (15-20 skills), [data/social.ts](data/social.ts) (LinkedIn, GitHub, Twitter URLs as placeholders), write placeholder bio text for about section.

26. **Configure SEO metadata** — Add metadata to each route ([app/about/layout.tsx](app/about/layout.tsx), etc.) with titles, descriptions, Open Graph images, Twitter cards, implement [app/sitemap.ts](app/sitemap.ts) and [app/robots.ts](app/robots.ts) for better crawlability.

27. **Cross-browser testing** — Test in Chrome, Firefox, Safari on macOS, verify dark mode in all browsers, test mobile on iOS/Android, validate smooth scrolling behavior, check animation performance (60fps target), fix any visual inconsistencies.

### **Phase 11: Deployment Preparation**

28. **Create deployment configuration** — Add build scripts to [package.json](package.json), configure environment variables structure ([.env.example](.env.example) for future Web3Forms key), optimize production build with \`next.config.js\` settings (image optimization, compression), create deployment documentation in [README.md](README.md).

29. **Set up extensibility structure** — Document component patterns in README, create placeholder files for future sections ([components/sections/Timeline.tsx](components/sections/Timeline.tsx), [components/sections/Testimonials.tsx](components/sections/Testimonials.tsx)), add comments for extension points, structure data files for easy content updates.

30. **Final QA and documentation** — Run Lighthouse audit (target: 90+ all metrics), fix any accessibility warnings, validate responsive breakpoints, test all navigation flows, document setup instructions, note Web3Forms integration steps for later.

## Further Considerations

1. **Loading states strategy?** Use Next.js \`loading.tsx\` with skeleton screens or simple spinner? **Recommendation:** Skeleton screens maintain layout, feel faster—use [components/ui/Skeleton.tsx](components/ui/Skeleton.tsx).

2. **Animation library bundle size?** Framer Motion (~3.8KB) + Lenis (~4KB) = ~8KB total. Acceptable or prefer lighter approach? **Recommendation:** Acceptable for polish level you want, tree-shakeable.

3. **Project page structure?** Individual project detail pages (\`/projects/[slug]\`) or external links only? **Recommendation:** Start with external links, add detail pages in content phase if needed.

4. **Navigation style?** Traditional header bar, center-aligned, or split layout (logo left, links right)? **Recommendation:** Split layout (industry standard), center-aligned mobile.

5. **Experience/Timeline section priority?** Add to initial About page or defer to content phase? **Recommendation:** Add basic structure in About, populate during content phase to avoid blocking launch.

## Key Design Decisions

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with custom color tokens
- **Animations:** Framer Motion (page transitions, scroll animations)
- **Smooth Scroll:** Lenis
- **Dark Mode:** next-themes
- **Forms:** React Hook Form + Zod
- **Icons:** lucide-react
- **Contact:** Web3Forms (free tier, 250 submissions/month)

### Color Palette (Inspired by Olaolu.dev)
- **Light Mode:** White background (#FFFFFF), dark text (#1a1a1a), subtle accent
- **Dark Mode:** Dark background (#0a0a0a), light text (#e5e5e5), accent adjustment
- **Approach:** Monochromatic with one accent color for links/CTAs

### Animation Strategy
- **Page Transitions:** 300ms fade + slight y-movement (10px)
- **Scroll Animations:** \`whileInView\` with \`viewport={{ once: true }}\`
- **Stagger Delays:** 0.1s between children
- **Easing:** Custom bezier \`[0.17, 0.67, 0.83, 0.67]\`
- **Performance:** Only animate \`transform\` and \`opacity\`

### Responsive Breakpoints
- **Mobile:** 320px - 640px (single column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** 1024px+ (3 columns, full features)

### Project Structure
\`\`\`
portfolio/
├── app/
│   ├── layout.tsx (root with providers)
│   ├── page.tsx (home/hero)
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── contact/page.tsx
│   ├── loading.tsx
│   ├── globals.css
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── SocialSidebar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── ContactForm.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Skeleton.tsx
│   │   └── ProjectCard.tsx
│   └── animations/
│       ├── PageTransition.tsx
│       ├── FadeIn.tsx
│       └── StaggerChildren.tsx
├── lib/
│   ├── utils.ts
│   ├── lenis.ts
│   └── constants.ts
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── social.ts
├── types/
│   └── index.ts
└── public/
    └── images/
\`\`\`

## Implementation Timeline

- **Week 1:** Foundation, layout, navigation (Tasks 1-7)
- **Week 2:** UI components, home/about pages (Tasks 8-14)
- **Week 3:** Projects, contact, animations (Tasks 15-21)
- **Week 4:** Responsive design, optimization, polish (Tasks 22-27)
- **Week 5:** Deployment prep, documentation (Tasks 28-30)

## Success Metrics

- **Performance:** Lighthouse score 90+ (all metrics)
- **Accessibility:** WCAG AA compliance
- **Mobile:** Fully responsive 320px - 2560px
- **Animations:** Smooth 60fps transitions
- **SEO:** Proper meta tags, sitemap, robots.txt
- **Extensibility:** Easy to add new sections/content
