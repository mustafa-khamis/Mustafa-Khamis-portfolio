// Category, template, and tech-stack data for the Start a Project planner.
// Tech logos are pulled from the public devicon / simple-icons CDNs so they
// stay accurate and up to date instead of shipping stale local assets.

const DEVICON = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

const SIMPLE_ICON = (slug) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`;

export const CATEGORIES = [
  {
    id: "website",
    name: "Websites & Web Apps",
    description: "Marketing sites, dashboards, SaaS products and e-commerce.",
    icon: "globe",
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    description: "Native-feel iOS & Android apps, cross-platform builds.",
    icon: "device",
  },
  {
    id: "automation",
    name: "Automation & Integrations",
    description: "Workflow automation, internal tools, API integrations.",
    icon: "gears",
  },
  {
    id: "ai",
    name: "AI Agents & LLM Products",
    description: "Chat assistants, RAG systems, autonomous agents.",
    icon: "spark",
  },
  {
    id: "other",
    name: "Something Else",
    description: "Custom systems, or you're not sure yet — let's talk.",
    icon: "layers",
  },
];

export const TEMPLATES = {
  website: [
    {
      id: "saas-landing",
      name: "SaaS Landing Page",
      desc: "Conversion-focused marketing site with pricing & signup flow.",
      stack: ["React", "Next.js", "TailwindCSS"],
    },
    {
      id: "ecommerce",
      name: "E-Commerce Store",
      desc: "Full storefront with cart, checkout and inventory management.",
      stack: ["Next.js", "Stripe", "PostgreSQL"],
    },
    {
      id: "corporate",
      name: "Corporate / Agency Site",
      desc: "Multi-page brand presence with CMS-driven content.",
      stack: ["React", "WordPress", "TailwindCSS"],
    },
    {
      id: "portfolio",
      name: "Portfolio / Personal Brand",
      desc: "A polished personal site to showcase work and win clients.",
      stack: ["React", "Figma", "TailwindCSS"],
    },
    {
      id: "webapp",
      name: "Web App / Admin Dashboard",
      desc: "Data-heavy interface with auth, roles and real-time views.",
      stack: ["React", "Node.js", "PostgreSQL"],
    },
    {
      id: "custom-web",
      name: "Custom Web Platform",
      desc: "Something bespoke — describe it in the next steps.",
      stack: ["React", "Node.js"],
    },
  ],
  mobile: [
    {
      id: "cross-platform",
      name: "iOS + Android (React Native)",
      desc: "One codebase shipping to both app stores.",
      stack: ["React", "Firebase"],
    },
    {
      id: "flutter",
      name: "Flutter Cross-Platform App",
      desc: "High-performance native rendering on every device.",
      stack: ["Flutter", "Firebase"],
    },
    {
      id: "marketplace",
      name: "On-Demand / Marketplace App",
      desc: "Bookings, listings, payments and live order tracking.",
      stack: ["Flutter", "Node.js", "Stripe"],
    },
    {
      id: "internal-app",
      name: "Internal Business App",
      desc: "Field teams & operations tooling on mobile.",
      stack: ["React", "Firebase"],
    },
  ],
  automation: [
    {
      id: "workflow",
      name: "Workflow Automation",
      desc: "Connect your tools and remove manual busywork.",
      stack: ["Zapier", "Make", "n8n"],
    },
    {
      id: "data-pipeline",
      name: "Data Pipeline & ETL",
      desc: "Move and transform data reliably between systems.",
      stack: ["Python", "PostgreSQL", "Docker"],
    },
    {
      id: "internal-bot",
      name: "Internal Tooling Bot",
      desc: "Slack/WhatsApp bots that automate team workflows.",
      stack: ["Node.js", "WhatsApp", "n8n"],
    },
    {
      id: "api-hub",
      name: "API Integrations Hub",
      desc: "A custom middle layer connecting your existing stack.",
      stack: ["Node.js", "Docker", "AWS"],
    },
  ],
  ai: [
    {
      id: "support-agent",
      name: "AI Customer Support Agent",
      desc: "Handles tickets and FAQs with human hand-off.",
      stack: ["OpenAI", "LangChain", "Node.js"],
    },
    {
      id: "website-chatbot",
      name: "Website AI Chatbot",
      desc: "An assistant trained on your product, embedded on-site.",
      stack: ["OpenAI", "Anthropic", "React"],
    },
    {
      id: "rag-assistant",
      name: "RAG Knowledge Assistant",
      desc: "Answers grounded in your docs, wiki or knowledge base.",
      stack: ["LangChain", "PostgreSQL", "OpenAI"],
    },
    {
      id: "autonomous-agent",
      name: "Autonomous Task Agent",
      desc: "Plans and executes multi-step workflows on its own.",
      stack: ["Anthropic", "Python", "n8n"],
    },
  ],
  other: [
    {
      id: "enterprise",
      name: "Custom Enterprise System",
      desc: "Bespoke software tailored to a specific business process.",
      stack: ["Node.js", "PostgreSQL", "AWS"],
    },
    {
      id: "not-sure",
      name: "Not Sure Yet",
      desc: "Skip templates — we'll scope it together on a call.",
      stack: [],
    },
  ],
};

export const TECH_GROUPS = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: DEVICON("react") },
      { name: "Next.js", icon: DEVICON("nextjs") },
      { name: "Vue.js", icon: DEVICON("vuejs") },
      { name: "Angular", icon: DEVICON("angularjs") },
      { name: "TypeScript", icon: DEVICON("typescript") },
      { name: "TailwindCSS", icon: DEVICON("tailwindcss") },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Flutter", icon: DEVICON("flutter") },
      { name: "Swift", icon: DEVICON("swift") },
      { name: "Kotlin", icon: DEVICON("kotlin") },
    ],
  },
  {
    label: "Backend & Database",
    items: [
      { name: "Node.js", icon: DEVICON("nodejs") },
      { name: "Express", icon: DEVICON("express") },
      { name: "Django", icon: DEVICON("django", "plain") },
      { name: "Python", icon: DEVICON("python") },
      { name: "MongoDB", icon: DEVICON("mongodb") },
      { name: "PostgreSQL", icon: DEVICON("postgresql") },
      { name: "MySQL", icon: DEVICON("mysql") },
      { name: "Redis", icon: DEVICON("redis") },
      { name: "Firebase", icon: DEVICON("firebase", "plain") },
      { name: "Supabase", icon: DEVICON("supabase") },
    ],
  },
  {
    label: "Cloud & Commerce",
    items: [
      { name: "Docker", icon: DEVICON("docker") },
      { name: "AWS", icon: DEVICON("amazonwebservices", "original-wordmark") },
      { name: "Stripe", icon: SIMPLE_ICON("stripe") },
      { name: "Shopify", icon: SIMPLE_ICON("shopify") },
      { name: "WordPress", icon: SIMPLE_ICON("wordpress") },
      { name: "Webflow", icon: SIMPLE_ICON("webflow") },
    ],
  },
  {
    label: "AI & Automation",
    items: [
      { name: "OpenAI", icon: SIMPLE_ICON("openai") },
      { name: "Anthropic", icon: SIMPLE_ICON("anthropic") },
      { name: "Gemini", icon: SIMPLE_ICON("googlegemini") },
      { name: "LangChain", icon: SIMPLE_ICON("langchain") },
      { name: "TensorFlow", icon: DEVICON("tensorflow") },
      { name: "Zapier", icon: SIMPLE_ICON("zapier") },
      { name: "n8n", icon: SIMPLE_ICON("n8n") },
      { name: "Make", icon: SIMPLE_ICON("make") },
      { name: "WhatsApp", icon: SIMPLE_ICON("whatsapp") },
    ],
  },
];

export const FEATURES = [
  { id: "auth", name: "User Authentication", tech: "Firebase" },
  { id: "payments", name: "Payment Integration", tech: "Stripe" },
  { id: "admin", name: "Admin Dashboard", tech: "React" },
  { id: "analytics", name: "Analytics & Reporting", tech: "PostgreSQL" },
  { id: "cms", name: "Content Management", tech: "WordPress" },
  { id: "api", name: "Custom API & Integrations", tech: "Node.js" },
  { id: "booking", name: "Booking / Scheduling", tech: "Node.js" },
  { id: "ecommerce", name: "E-Commerce Logic", tech: "Stripe" },
  { id: "realtime", name: "Real-time Features", tech: "Firebase" },
  { id: "ai", name: "AI / LLM Integration", tech: "OpenAI" },
  { id: "seo", name: "Advanced SEO", tech: "Next.js" },
  { id: "multilingual", name: "Multi-lingual Support", tech: "React" },
];

const TECH_ICON_MAP = TECH_GROUPS.flatMap((g) => g.items).reduce((acc, t) => {
  acc[t.name] = t.icon;
  return acc;
}, {});

export function iconFor(techName) {
  return TECH_ICON_MAP[techName];
}

export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export const URGENCY_OPTIONS = ["Flexible", "Medium", "Urgent"];

export const STYLE_OPTIONS = ["Minimal", "Modern", "Futuristic", "Luxury", "Playful", "Corporate"];

export const THEME_OPTIONS = ["Dark", "Light", "System / Either"];
