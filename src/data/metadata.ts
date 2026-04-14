import type { NavItem, ActivityLine } from "../types/portfolio.types";

/**
 * URLs dos currículos por idioma
 */
export const RESUME_URLS = {
  en: "/resume-en.pdf",
  "pt-BR": "/resume-pt-br.pdf",
} as const;

/** Helper para obter URL do currículo pelo idioma */
export function getResumeUrl(lang: string): string {
  return lang === "pt-BR" ? RESUME_URLS["pt-BR"] : RESUME_URLS.en;
}

/** Disponibilidade para novas oportunidades */
export const availableForWork = true;

/** Links de navegação */
export const navItems: NavItem[] = [
  { label: "_sobre", href: "#about", color: "#50fa7b" },
  { label: "_exp", href: "#experience", color: "#bd93f9" },
  { label: "_stack", href: "#stack", color: "#8be9fd" },
  { label: "_projetos", href: "#projects", color: "#f1fa8c" },
  { label: "_metrics", href: "#metrics", color: "#ff5555" },
  { label: "_api", href: "#contact", color: "#8be9fd" },
];

/** Atividades recentes (mock) */
export const recentActivity: ActivityLine[] = [
  { icon: "✓", text: "Nobello deployed to prod", time: "2h ago", color: "#50fa7b" },
  { icon: "→", text: "MCP Server Trello: new tool", time: "5h ago", color: "#8be9fd" },
  { icon: "⚡", text: "Finance.AI: Claude API integration", time: "1d ago", color: "#f1fa8c" },
  { icon: "📚", text: "Aula de Back-End ministrada", time: "2d ago", color: "#bd93f9" },
];

/** Linhas de boot do terminal hero */
export const bootSequence = [
  "> initializing system_boot.sh",
  "> loading professional_modules...",
  ">",
  "> [████████████████████] 100%",
  ">",
  "> [OK] Full Stack Dev Loaded (Next.js | React | TypeScript)",
  "> [OK] Backend Systems (Node.js | Python | Supabase)",
  "> [OK] AI Integration (Claude API | MCP Protocol)",
  "> [OK] Payments & Commerce (Stripe | PostgreSQL RLS)",
  "> [OK] Mobile (Kotlin | Android)",
  "> [OK] Education Mode (Professor Técnico — SEDUC-SP)",
  ">",
  "> ⚡ system.status: OPEN_TO_WORK",
  "> 🎯 mission: Build real products with real AI",
  "> 📍 location: Campinas, SP → Remote",
  ">",
  "> type 'help' for available commands...",
];

/** Mensagens do console (easter egg) */
export function printConsoleEasterEggs(): void {
  console.log(
    "%c🚀 Olá, dev curioso!",
    "color: #50fa7b; font-size: 20px; font-weight: bold;",
  );
  console.log(
    "%cGostou do código? Me chama para trocar ideia!",
    "color: #8be9fd; font-size: 14px;",
  );
  console.log(
    "%c💼 Contratar: iagomunhoz48@gmail.com",
    "color: #f1fa8c; font-weight: bold; font-size: 14px;",
  );
  console.log(
    "%c⚠️  Ctrl+K abre a Command Palette 😉",
    "color: #ff5555; font-size: 12px;",
  );
}
