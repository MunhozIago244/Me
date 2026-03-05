/* ========================================================================
 * portfolio.types.ts — Tipagens centrais do portfólio
 * Todas as interfaces e types compartilhados vivem aqui.
 * ======================================================================== */

/** Métrica de impacto exibida nos cards de projeto */
export interface ProjectMetric {
  label: string;
  value: string;
}

/** Projeto exibido na seção Git Log */
export interface Project {
  id: number;
  hash: string;
  name: string;
  icon: string;
  date: string;
  description: string;
  problemSolved: string;
  tech: string[];
  metrics: ProjectMetric[];
  linesAdded: number;
  linesRemoved: number;
  repoUrl: string;
  liveUrl?: string;
  diffPreview?: string;
  lastCommit?: {
    sha: string;
    message: string;
    date: string;
    url: string;
  };
}

/** Skill row na tabela SQL */
export interface Skill {
  category: string;
  technology: string;
  proficiency: "EXPERT" | "ADVANCED" | "INTERMEDIATE";
  years: string;
}

/** Nível de proficiência → cor */
export const proficiencyColor: Record<Skill["proficiency"], string> = {
  EXPERT: "bg-accent-green text-bg-base",
  ADVANCED: "bg-accent-blue text-bg-base",
  INTERMEDIATE: "bg-accent-yellow text-bg-base",
};

/** Item do nav */
export interface NavItem {
  label: string;
  href: string;
  color: string;
}

/** Comando da Command Palette */
export interface PaletteCommand {
  icon: string;
  label: string;
  shortcut: string;
  action: () => void;
}

/** Linha de atividade recente */
export interface ActivityLine {
  icon: string;
  text: string;
  time: string;
  color: string;
}

/** Seção de contato — intent */
export type ContactIntent = "hiring" | "project" | "collaboration" | "other";

/** Payload do formulário de contato */
export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  intent: ContactIntent;
}

/** Typewriter step */
export interface TypewriterStep {
  text: string;
  /** ms entre cada caractere */
  charDelay?: number;
  /** ms de pausa após a linha completa */
  lineDelay?: number;
}
