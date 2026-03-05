export interface Experience {
  id: number;
  commitHash: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "full-time" | "freelance" | "contract";
  description: string;
  highlights: string[];
  tech: string[];
}

/**
 * Histórico profissional — atualize com suas experiências reais.
 */
export const experiences: Experience[] = [
  {
    id: 1,
    commitHash: "f4a1b3c",
    company: "Freelance / Open Source",
    role: "Full Stack Architect",
    period: "2022 — Present",
    location: "Remote",
    type: "freelance",
    description:
      "Desenvolvimento de soluções enterprise para clientes nacionais e internacionais. Arquitetura de sistemas distribuídos, APIs REST/GraphQL e aplicações React de alta performance.",
    highlights: [
      "30+ projetos entregues com 99.9% uptime",
      "Redução de 40% no custo de infra com otimização de queries e cache",
      "Pipelines CI/CD que reduziram o deploy time em 60%",
    ],
    tech: ["React", "Node.js", "Java", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: 2,
    commitHash: "a2e9d47",
    company: "Bosch",
    role: "Software Engineer",
    period: "2020 — 2022",
    location: "Brasil",
    type: "full-time",
    description:
      "Desenvolvimento e manutenção de sistemas críticos para a indústria automotiva. Foco em backend Java com Spring Boot, integrações com sistemas legados e otimização de performance em ambiente de alta criticidade.",
    highlights: [
      "Migração de sistema monolítico para microsserviços — 3x mais throughput",
      "Dashboard de métricas de produção em tempo real (WebSocket + React)",
      "Redução de 70% no tempo de processamento de relatórios críticos",
    ],
    tech: ["Java", "Spring Boot", "Oracle DB", "Kafka", "Docker", "Jenkins"],
  },
  {
    id: 3,
    commitHash: "c7b3e91",
    company: "Early Career & Projetos Acadêmicos",
    role: "Full Stack Developer",
    period: "2018 — 2020",
    location: "Brasil",
    type: "freelance",
    description:
      "Início da jornada em desenvolvimento: primeiros projetos full-stack, APIs REST e interfaces React. Base sólida construída com projetos reais, aprendizado intensivo e muita curiosidade.",
    highlights: [
      "10+ aplicações web desenvolvidas do zero",
      "Primeiro contato com cloud (AWS) e containerização (Docker)",
      "Aprendizado profundo de arquitetura de software e boas práticas",
    ],
    tech: ["JavaScript", "React", "Node.js", "MySQL", "HTML/CSS"],
  },
];
