import type { NavItem, ActivityLine } from "../types/portfolio.types";

/**
 * URL do currículo — substitua pelo link real (Google Drive, Dropbox, etc.)
 * Exemplo: "https://drive.google.com/file/d/.../view"
 */
export const RESUME_URL = "/resume.pdf";

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
  { icon: "✓", text: "Deployed to prod", time: "2h ago", color: "#50fa7b" },
  { icon: "→", text: "Code review", time: "5h ago", color: "#8be9fd" },
  { icon: "⚡", text: "Optimized query", time: "1d ago", color: "#f1fa8c" },
  { icon: "🔒", text: "Security patch", time: "2d ago", color: "#ff5555" },
];

/** Linhas de boot do terminal hero */
export const bootSequence = [
  "> initializing system_boot.sh",
  "> loading professional_modules...",
  ">",
  "> [████████████████████] 100%",
  ">",
  "> [OK] Full Stack Architecture Loaded",
  "> [OK] Backend Systems (Java | Node | Python)",
  "> [OK] Frontend Engineering (React | TypeScript)",
  "> [OK] Data Pipeline & Analytics",
  "> [OK] Security & DevOps Protocols",
  "> [OK] Cloud Infrastructure (AWS | Azure)",
  ">",
  "> ⚡ system.status: OPERATIONAL",
  "> 🎯 mission: Build scalable, elegant software",
  "> 📍 location: BR > World",
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
