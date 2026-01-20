# Checkpoint

## Progress
- Fixed header alignment and ensured inner pages offset below fixed header.
- Centered About, Skills/Technologies, Projects, and Contact sections with consistent 95% width.
- Reworked social sidebar: left-edge tab with overlay on inner pages; always visible on Home.
- Added hero typewriter effect under the name with slower timing.

## Phases & Detailed Todo Status
### Phase 1 — Foundation & Setup
- ✅ Next.js app structure in place (App Router + Tailwind + TS)
- ✅ Core dependencies installed (framer-motion, next-themes, lucide-react)
- ⏳ Verify remaining plan deps (Lenis, react-hook-form, zod)

### Phase 2 — Layout & Navigation System
- ✅ Root layout with theme provider and metadata
- ✅ Header with nav links and theme toggle
- ✅ Footer and SocialSidebar placement
- ⏳ Page transition wrapper (AnimatePresence + 300ms fade)
- ⏳ Mobile nav drawer (hamburger menu + motion)

### Phase 3 — Reusable UI Components
- ✅ Button, Card, Badge, Input, Textarea
- ✅ ThemeToggle mounted safely
- ✅ Section wrapper in place
- ⏳ Container wrapper alignment audit (ensure consistent usage)

### Phase 4 — Home Page & Hero
- ✅ Hero headline and CTA layout
- ✅ Typewriter effect (infinite loop)
- ⏳ Staggered letter/word animation for hero title (if still desired)
- ⏳ Scroll-triggered FadeIn wrapper applied below fold

### Phase 5 — About Page
- ✅ About section two-column layout
- ✅ Skills/Technologies badge grid
- ⏳ Replace profile image placeholder
- ⏳ Add/confirm about copy accuracy

### Phase 6 — Projects Page
- ✅ Projects grid and ProjectCard component
- ✅ Dummy project data in data/projects.ts
- ⏳ Add project images + real links
- ⏳ Confirm card hover micro-interactions

### Phase 7 — Contact Page & Form
- ✅ Contact layout and form UI
- ⏳ React Hook Form + Zod validation
- ⏳ Web3Forms integration (access key + submission handler)
- ⏳ Success/error states and accessibility messages

### Phase 8 — Smooth Scrolling & Advanced Animations
- ⏳ Lenis smooth scrolling integration
- ⏳ StaggerChildren wrapper for lists (skills/projects)
- ⏳ Micro-interactions (hover scale, link underline, motion preferences)

### Phase 9 — Responsive Design & Optimization
- ⏳ Mobile/tablet/desktop layout audit (375/768/1024/1440)
- ⏳ Touch target sizing and fluid typography with clamp()
- ⏳ Next/Image usage + responsive sizes
- ⏳ Loading state (app/loading.tsx)

### Phase 10 — Accessibility & SEO
- ⏳ Semantic landmark audit (header/nav/main/footer/section)
- ⏳ Keyboard navigation + focus rings
- ⏳ prefers-reduced-motion handling
- ⏳ Per-route metadata + sitemap + robots

### Phase 11 — Content & Final Polish
- ⏳ Replace placeholders (skills/projects/social/profile image)
- ⏳ Color/contrast pass (WCAG AA)
- ⏳ Cross-browser QA (Chrome/Firefox/Safari)
- ⏳ Performance/Lighthouse pass (90+ target)
- ⏳ README deployment notes + .env.example

## Beautification Ideas (Exploration)
- ⏳ Replace static profile image with a 3D “planetary” sidebar concept
- ⏳ Click-to-expand “solar system of my life” panel (planets = milestones/roles)
- ⏳ Research feasible implementation (CSS 3D vs. Three.js vs. react-three-fiber)
- ⏳ Define content model for planets (title, year, description, link)
- ⏳ Prototype interaction flow (hover orbit, click zoom, close state)
