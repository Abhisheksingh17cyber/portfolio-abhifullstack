// ============================================================
// 📁 PORTFOLIO MAP DATA
// ============================================================
// Edit ALL your content here. Each "pin" is a point on the
// interactive map that opens a detail panel when clicked.
// ============================================================

export interface PinLink {
  label: string;
  url: string;
  style?: "primary" | "outline";
}

export interface PinData {
  id: string;
  label: string;        // Label shown below the pin on the map
  x: number;           // Horizontal position on map (0–100 %)
  y: number;           // Vertical position on map (0–100 %)
  panelTitle: string;  // Title shown in the panel header bar
  image: string;       // Hero image inside the panel
  heading: string;     // Large serif heading inside panel body
  body: string;        // Main descriptive paragraph
  details?: string[];  // Bullet list of highlights (optional)
  links?: PinLink[];   // CTA buttons at bottom of panel (optional)
  tags?: string[];     // Small tag/badge chips (optional)
}

// ─── YOUR NAME & PERSONAL INFO ──────────────────────────────
// Shown in the top-center header of the map
export const ownerInfo = {
  initials: "AS",
  name: "Abhishek Singh",
  subtitle: "Full Stack Developer",
  contactEmail: "abhishek@example.com",
  resumeUrl: "#",
};

// ─── MAP BACKGROUNDS ────────────────────────────────────────
// Aerial top-down forest image — season change is handled via CSS filters
// in App.tsx (single image approach with hue-rotate + sepia for fall)
export const mapBackground =
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=2400&q=85";

// Legacy — kept for compatibility but no longer used in single-image approach
export const mapBackgroundFall =
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=2400&q=85";

// ─── MAP PINS ────────────────────────────────────────────────
// Each pin = one section of your portfolio.
// Adjust x/y (percentage) to reposition pins on the map.
// ✏️ ADD / REMOVE / EDIT pins freely below!
export const mapPins: PinData[] = [

  // ── ABOUT ME ──────────────────────────────────────────────
  {
    id: "about",
    label: "About Me",
    x: 22,
    y: 27,
    panelTitle: "About Me",
    image:
      "https://images.unsplash.com/photo-1765248148309-69d900a5bc17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNvbmZpZGVudCUyMHBlcnNvbiUyMGhlYWRzaG90JTIwc3R1ZGlvfGVufDF8fHx8MTc3MTc3NDE0NXww&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Alex Johnson",
    body: "I'm a passionate full-stack developer with 4+ years of experience building scalable web applications and intuitive interfaces. I believe in creating digital experiences that are fast, accessible, and beautiful. Based in San Francisco, I work with startups and enterprises to bring ambitious ideas to life.",
    details: [
      "4+ years of professional development experience",
      "50+ projects delivered across 3 continents",
      "Open to freelance & full-time opportunities",
    ],
    links: [
      { label: "Download CV", url: "#", style: "primary" },
      { label: "View LinkedIn", url: "https://linkedin.com", style: "outline" },
    ],
  },

  // ── SKILLS & EXPERTISE ────────────────────────────────────
  {
    id: "skills",
    label: "Skills",
    x: 54,
    y: 17,
    panelTitle: "Skills & Expertise",
    image:
      "https://images.unsplash.com/photo-1767817099805-d79e31fb968c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBzY3JlZW4lMjBkYXJrJTIwbW9uaXRvcnxlbnwxfHx8fDE3NzE3NzQxNDF8MA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Skills & Expertise",
    body: "With a deep command of modern web technologies, I craft end-to-end solutions from pixel-perfect UIs to performant back-end services. I'm always learning, always experimenting with new tools that push the craft forward.",
    tags: [
      "React", "TypeScript", "Next.js", "Node.js", "Python",
      "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma",
      "Tailwind CSS", "GraphQL", "Redis", "Git",
    ],
    details: [
      "Frontend: React, TypeScript, Next.js, Tailwind CSS, Vue.js",
      "Backend: Node.js, Express, Python, Django, GraphQL",
      "Databases: PostgreSQL, MongoDB, Redis",
      "DevOps: Docker, AWS, CI/CD, Vercel, Nginx",
      "Design: Figma, Adobe XD, UI/UX principles",
    ],
  },

  // ── WORK EXPERIENCE ───────────────────────────────────────
  {
    id: "experience",
    label: "Experience",
    x: 13,
    y: 52,
    panelTitle: "Work Experience",
    image:
      "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3JraW5nJTIwbGFwdG9wJTIwZGVzayUyMHdhcm0lMjBsaWdodHxlbnwxfHx8fDE3NzE3NzQxNDB8MA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Work Experience",
    body: "A career shaped by curiosity and collaboration — from fast-moving startups to large enterprises, I've always built with care and shipped with confidence.",
    details: [
      "Senior Full Stack Developer — TechVision Inc. (2023–Present)",
      "Frontend Developer — CreativeAgency Co. (2021–2022)",
      "Junior Developer — Startup Hub (2020–2021)",
    ],
    links: [
      { label: "Full Resume", url: "#", style: "primary" },
    ],
  },

  // ── PROJECT: E-COMMERCE ───────────────────────────────────
  {
    id: "project-ecommerce",
    label: "E-Commerce Platform",
    x: 44,
    y: 48,
    panelTitle: "Featured Project",
    image:
      "https://images.unsplash.com/photo-1644984875410-e11486d2b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMHdlYnNpdGUlMjBkYXNoYm9hcmQlMjBwcm9kdWN0fGVufDF8fHx8MTc3MTc3NDE0Nnww&ixlib=rb-4.1.0&q=80&w=800",
    heading: "E-Commerce Platform",
    body: "A full-featured online store with product management, shopping cart, real-time inventory tracking, and a Stripe-powered checkout. Built for scale with a microservices architecture serving 10,000+ daily users.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    details: [
      "10,000+ daily active users at peak",
      "Integrated Stripe payment gateway",
      "Real-time inventory & order management",
      "Mobile-first responsive design",
    ],
    links: [
      { label: "Live Demo", url: "#", style: "primary" },
      { label: "GitHub", url: "#", style: "outline" },
    ],
  },

  // ── PROJECT: TASK MANAGER ─────────────────────────────────
  {
    id: "project-tasks",
    label: "Task Manager",
    x: 70,
    y: 35,
    panelTitle: "Featured Project",
    image:
      "https://images.unsplash.com/photo-1748801583975-720cb5e4985e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwcm90b3R5cGUlMjB1aSUyMG1vY2t1cHxlbnwxfHx8fDE3NzE3NzQxNDF8MA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Task Manager App",
    body: "A Kanban-style productivity app with drag-and-drop boards, real-time collaboration via WebSockets, team workspaces, and deep notification integrations. Used daily by 3 product teams.",
    tags: ["React", "TypeScript", "Firebase", "DnD Kit"],
    details: [
      "Drag-and-drop Kanban boards",
      "Real-time multi-user collaboration",
      "Push notifications & email digests",
      "Dark mode & keyboard shortcuts",
    ],
    links: [
      { label: "Live Demo", url: "#", style: "primary" },
      { label: "GitHub", url: "#", style: "outline" },
    ],
  },

  // ── PROJECT: AI CHAT ──────────────────────────────────────
  {
    id: "project-ai",
    label: "AI Chat Interface",
    x: 32,
    y: 67,
    panelTitle: "Featured Project",
    image:
      "https://images.unsplash.com/photo-1760004617365-767f60e483f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwZm9yZXN0JTIwcml2ZXIlMjB2YWxsZXklMjBiaXJkcyUyMGV5ZXxlbnwxfHx8fDE3NzE3NzQxMzV8MA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "AI Chat Interface",
    body: "A conversational AI interface powered by GPT-4 API, with markdown rendering, syntax-highlighted code blocks, conversation history, and seamless export. Deployed on Vercel with a serverless backend.",
    tags: ["Next.js", "OpenAI API", "PostgreSQL", "Prisma"],
    details: [
      "GPT-4 powered intelligent responses",
      "Syntax-highlighted code block rendering",
      "Conversation history & cloud sync",
      "Export chats as Markdown or PDF",
    ],
    links: [
      { label: "Live Demo", url: "#", style: "primary" },
      { label: "GitHub", url: "#", style: "outline" },
    ],
  },

  // ── CERTIFICATES ──────────────────────────────────────────
  // ✏️ UPDATE YOUR CERTIFICATES HERE
  {
    id: "certificates",
    label: "Certificates",
    x: 79,
    y: 60,
    panelTitle: "Certifications",
    image:
      "https://images.unsplash.com/photo-1638636241638-aef5120c5153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGRpcGxvbWElMjBhd2FyZCUyMGFjaGlldmVtZW50JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzcxNzc0MTQ1fDA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Certifications",
    body: "A commitment to continuous learning and validated expertise across AI, web development, SEO, cybersecurity, and design. Each certification represents real-world applied knowledge.",
    details: [
      "AI for Beginners",
      "AI Power Market",
      "AI Power Shopping Ads",
      "Canva 50 Design",
      "Introduction to Career Skills in Software Development",
      "Cybersecurity",
      "Excel in an Hour",
      "Excel",
      "Introduction to Generative AI",
      "Prompt Engineering",
      "React JS",
      "SEO (Advanced)",
      "SEO",
      "Web Development",
    ],
    links: [
      { label: "View All Credentials", url: "#", style: "primary" },
    ],
  },

  // ── EDUCATION ─────────────────────────────────────────────
  {
    id: "education",
    label: "Education",
    x: 59,
    y: 73,
    panelTitle: "Education",
    image:
      "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3JraW5nJTIwbGFwdG9wJTIwZGVzayUyMHdhcm0lMjBsaWdodHxlbnwxfHx8fDE3NzE3NzQxNDB8MA&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Education",
    body: "A strong academic foundation in computer science combined with a relentless drive to learn outside the classroom — through open source contributions, hackathons, and self-directed projects.",
    details: [
      "B.Sc. Computer Science — UC Berkeley (2016–2020) · GPA 3.8",
      "Dean's List all four years",
      "Best Senior Project — AI Study Scheduler",
      "Regional Hackathon Winner 2018",
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────
  {
    id: "contact",
    label: "Contact",
    x: 19,
    y: 74,
    panelTitle: "Get In Touch",
    image:
      "https://images.unsplash.com/photo-1765248148309-69d900a5bc17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNvbmZpZGVudCUyMHBlcnNvbiUyMGhlYWRzaG90JTIwc3R1ZGlvfGVufDF8fHx8MTc3MTc3NDE0NXww&ixlib=rb-4.1.0&q=80&w=800",
    heading: "Let's Build Something",
    body: "Whether you have a project in mind, a role to fill, or just want to say hello — I'm always open to a conversation. Reach out and let's make something great together.",
    details: [
      "✉  alex@example.com",
      "📞  +1 (555) 123-4567",
      "📍  San Francisco, CA",
      "🌐  Available worldwide (remote)",
    ],
    links: [
      { label: "Send Email", url: "mailto:alex@example.com", style: "primary" },
      { label: "LinkedIn", url: "https://linkedin.com", style: "outline" },
    ],
  },
];
