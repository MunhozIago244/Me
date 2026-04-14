import type { Skill } from "../types/portfolio.types";

export const skills: Skill[] = [
  // Frontend & Full Stack
  {
    category: "Frontend_FullStack",
    technology: "Next.js",
    proficiency: "EXPERT",
    years: "2+",
  },
  {
    category: "Frontend_FullStack",
    technology: "React + TypeScript",
    proficiency: "EXPERT",
    years: "3+",
  },
  {
    category: "Frontend_FullStack",
    technology: "Node.js",
    proficiency: "ADVANCED",
    years: "3+",
  },

  // Backend & Infra
  {
    category: "Backend_Infra",
    technology: "Python (FastAPI / Scripts)",
    proficiency: "ADVANCED",
    years: "3+",
  },
  {
    category: "Backend_Infra",
    technology: "Supabase / PostgreSQL",
    proficiency: "EXPERT",
    years: "2+",
  },
  {
    category: "Backend_Infra",
    technology: "Kotlin (Mobile)",
    proficiency: "INTERMEDIATE",
    years: "1+",
  },

  // AI & Protocols
  {
    category: "AI_Protocols",
    technology: "Claude API (Anthropic)",
    proficiency: "EXPERT",
    years: "1+",
  },
  {
    category: "AI_Protocols",
    technology: "MCP Protocol",
    proficiency: "EXPERT",
    years: "1+",
  },
  {
    category: "AI_Protocols",
    technology: "AI Integration (Prod)",
    proficiency: "ADVANCED",
    years: "1+",
  },

  // Payments & Tools
  {
    category: "Payments_Tools",
    technology: "Stripe",
    proficiency: "ADVANCED",
    years: "1+",
  },
  {
    category: "Payments_Tools",
    technology: "SAP (MM/SD)",
    proficiency: "INTERMEDIATE",
    years: "1+",
  },
  {
    category: "Payments_Tools",
    technology: "Git / GitHub",
    proficiency: "EXPERT",
    years: "4+",
  },
];

/** JSON tree alternativo para a seção */
export const techTreeJSON = {
  frontend_fullstack: {
    frameworks: ["Next.js", "React", "TypeScript"],
    runtime: ["Node.js"],
    styling: ["Tailwind CSS"],
  },
  backend_infra: {
    languages: ["Python", "TypeScript", "Kotlin"],
    database: ["Supabase", "PostgreSQL"],
    apis: ["REST", "FastAPI"],
  },
  ai_protocols: {
    llm: ["Claude API (Anthropic)"],
    protocols: ["MCP Protocol"],
    integrations: ["brapi.dev", "Mistral OCR"],
  },
  payments_tools: {
    payments: ["Stripe"],
    erp: ["SAP"],
    devtools: ["Git", "GitHub", "Vercel"],
  },
};
