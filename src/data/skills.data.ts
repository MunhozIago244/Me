import type { Skill } from "../types/portfolio.types";

export const skills: Skill[] = [
  // Backend Core
  {
    category: "Backend_Core",
    technology: "Java (Spring Boot)",
    proficiency: "EXPERT",
    years: "4+",
  },
  {
    category: "Backend_Core",
    technology: "Node.js (Express/Nest)",
    proficiency: "EXPERT",
    years: "4+",
  },
  {
    category: "Backend_Core",
    technology: "Python (Django/FastAPI)",
    proficiency: "ADVANCED",
    years: "3+",
  },

  // Frontend
  {
    category: "Frontend_UI",
    technology: "React + TypeScript",
    proficiency: "EXPERT",
    years: "4+",
  },
  {
    category: "Frontend_UI",
    technology: "Next.js",
    proficiency: "ADVANCED",
    years: "2+",
  },
  {
    category: "Frontend_UI",
    technology: "Tailwind CSS",
    proficiency: "EXPERT",
    years: "3+",
  },

  // Data Layer
  {
    category: "Data_Layer",
    technology: "PostgreSQL / MySQL",
    proficiency: "EXPERT",
    years: "5+",
  },
  {
    category: "Data_Layer",
    technology: "MongoDB / Redis",
    proficiency: "ADVANCED",
    years: "3+",
  },
  {
    category: "Data_Layer",
    technology: "Apache Kafka",
    proficiency: "INTERMEDIATE",
    years: "2+",
  },

  // DevOps & Cloud
  {
    category: "DevOps_Cloud",
    technology: "Docker / Kubernetes",
    proficiency: "ADVANCED",
    years: "3+",
  },
  {
    category: "DevOps_Cloud",
    technology: "AWS / Azure",
    proficiency: "ADVANCED",
    years: "3+",
  },
  {
    category: "DevOps_Cloud",
    technology: "GitHub Actions / Jenkins",
    proficiency: "ADVANCED",
    years: "3+",
  },

  // Security
  {
    category: "Security",
    technology: "OAuth 2.0 / JWT / SSO",
    proficiency: "EXPERT",
    years: "4+",
  },
  {
    category: "Security",
    technology: "OWASP Top 10 / Pen Testing",
    proficiency: "ADVANCED",
    years: "3+",
  },
];

/** JSON tree alternativo para a seção */
export const techTreeJSON = {
  backend_core: {
    languages: ["Java", "Node.js", "Python"],
    frameworks: ["Spring Boot", "Express", "NestJS", "FastAPI"],
    apis: ["REST", "GraphQL", "gRPC"],
  },
  frontend_interface: {
    core: ["React", "TypeScript", "Next.js"],
    styling: ["Tailwind CSS", "Styled Components"],
    state: ["Redux", "Zustand", "React Query"],
  },
  data_infrastructure: {
    sql: ["PostgreSQL", "MySQL", "SQL Server"],
    nosql: ["MongoDB", "Redis", "Cassandra"],
    etl: ["Apache Airflow", "dbt"],
  },
  devops_cloud: {
    containers: ["Docker", "Kubernetes"],
    cloud: ["AWS", "Azure", "GCP"],
    ci_cd: ["GitHub Actions", "Jenkins", "ArgoCD"],
  },
  security_focus: {
    auth: ["OAuth 2.0", "JWT", "SSO"],
    encryption: ["AES", "RSA"],
    practices: ["OWASP Top 10", "Penetration Testing"],
  },
};
