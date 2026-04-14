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

export const experiences: Experience[] = [
  {
    id: 1,
    commitHash: "f1a2b3c",
    company: "EE Tenista Maria Esther Bueno — SEDUC-SP",
    role: "Full Stack Developer & Professor Técnico",
    period: "2025 — Presente",
    location: "Campinas, SP",
    type: "full-time",
    description:
      "Leciono disciplinas do curso técnico de Desenvolvimento de Sistemas: Back-End (Python/Node.js), Mobile, Redes e Lógica de Programação. Desenvolvo soluções reais para a escola, como extensões e ferramentas de automação para a plataforma SEDUC.",
    highlights: [
      "Docência em Back-End (Python/Node.js), Mobile e Lógica de Programação",
      "Criação da extensão seduc-notas — automatiza lançamento de notas no Moodle da SEDUC-SP",
      "Desenvolvimento de ferramentas internas para automação de processos educacionais",
    ],
    tech: ["Python", "Node.js", "JavaScript", "Chrome Extension", "Moodle"],
  },
  {
    id: 2,
    commitHash: "e9d8c7b",
    company: "SESI Indaiatuba",
    role: "FabLab Laboratory Instructor / Técnico",
    period: "Fev 2025 — Ago 2025",
    location: "Indaiatuba, SP",
    type: "full-time",
    description:
      "Instrutor técnico no laboratório FabLab do SESI Indaiatuba. Orientei alunos em projetos de fabricação digital, prototipagem e tecnologia aplicada à indústria.",
    highlights: [
      "Suporte técnico e instrução em projetos de fabricação digital e prototipagem",
      "Orientação em projetos práticos com tecnologia industrial",
    ],
    tech: ["Fabricação Digital", "Prototipagem", "IoT"],
  },
  {
    id: 3,
    commitHash: "d4e5f6a",
    company: "Microcamp Valinhos",
    role: "Coordenador de Cursos de Tecnologia",
    period: "Nov 2024 — Fev 2025",
    location: "Valinhos, SP",
    type: "full-time",
    description:
      "Coordenação de cursos de tecnologia e programação, gestão de instrutores e acompanhamento pedagógico de alunos em trilhas de desenvolvimento de software.",
    highlights: [
      "Coordenação de cursos de programação e tecnologia",
      "Gestão de instrutores e acompanhamento pedagógico",
    ],
    tech: ["Gestão Educacional", "Programação", "Liderança"],
  },
  {
    id: 4,
    commitHash: "a7b8c9d",
    company: "Bosch Campinas",
    role: "Estagiário — Comércio Exterior / Importação",
    period: "Jul 2023 — Nov 2024",
    location: "Campinas, SP",
    type: "contract",
    description:
      "Estágio na área de Comércio Exterior com foco em importação. Utilização intensiva de SAP para controle de processos logísticos, macros Excel para automação de relatórios e comunicação técnica em inglês com parceiros internacionais.",
    highlights: [
      "Operação de SAP para controle de processos de importação e logística",
      "Automação de relatórios com macros Excel, reduzindo tempo de processos manuais",
      "Comunicação técnica diária em inglês com fornecedores e parceiros internacionais",
    ],
    tech: ["SAP", "Excel (Macros)", "Inglês Técnico", "Logística Internacional"],
  },
];
