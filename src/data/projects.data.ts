import type { Project } from "../types/portfolio.types";

export const projects: Project[] = [
  {
    id: 1,
    hash: "a3f5c21",
    name: "CycloFIT",
    icon: "🚴",
    date: "2024-11",
    description:
      "Plataforma de gestão de treinos de ciclismo com análise de performance em tempo real e integração com dispositivos IoT.",
    problemSolved:
      "Ciclistas profissionais precisavam de uma forma centralizada de acompanhar métricas, integrar com sensores e receber planos de treino personalizados.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets", "TensorFlow"],
    metrics: [
      { label: "Users", value: "2.5k+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Response", value: "<50ms" },
    ],
    linesAdded: 15420,
    linesRemoved: 3200,
    repoUrl: "#",
    liveUrl: "#",
    diffPreview: `diff --git a/src/services/analytics.ts b/src/services/analytics.ts
+ import { StreamProcessor } from '@core/stream';
+ export class RealTimeAnalytics {
+   private processor: StreamProcessor;
+   async ingest(metric: BikeMetric) {
+     return this.processor.push(metric);
+   }
+ }
- // legacy polling removed`,
  },
  {
    id: 2,
    hash: "b7e2d44",
    name: "SecureVault API",
    icon: "🔐",
    date: "2024-08",
    description:
      "API de gerenciamento de credenciais enterprise com criptografia end-to-end, rotação automática de chaves e auditoria completa.",
    problemSolved:
      "Empresas precisavam armazenar e rotacionar credenciais de forma segura com audit trail completo e zero-trust architecture.",
    tech: ["Java", "Spring Boot", "AWS KMS", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Secrets Managed", value: "50k+" },
      { label: "Latency", value: "<15ms" },
      { label: "Zero Breaches", value: "✓" },
    ],
    linesAdded: 22340,
    linesRemoved: 5100,
    repoUrl: "#",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/crypto/vault.java b/src/crypto/vault.java
+ @Service
+ public class VaultService {
+   @Autowired private KmsClient kms;
+   public EncryptedSecret rotate(String secretId) {
+     var newKey = kms.generateDataKey();
+     return encrypt(secretId, newKey);
+   }
+ }`,
  },
  {
    id: 3,
    hash: "c9a1f78",
    name: "DataFlow Pipeline",
    icon: "📊",
    date: "2024-05",
    description:
      "Pipeline de dados em tempo real para processamento de eventos com Apache Kafka, transformação com dbt e visualização em dashboards customizados.",
    problemSolved:
      "Necessidade de processar +1M eventos/dia com latência < 2s para dashboards de business intelligence em tempo real.",
    tech: ["Python", "Apache Kafka", "dbt", "Airflow", "Grafana"],
    metrics: [
      { label: "Events/day", value: "1.2M+" },
      { label: "Latency", value: "<2s" },
      { label: "Cost Saved", value: "40%" },
    ],
    linesAdded: 8750,
    linesRemoved: 1980,
    repoUrl: "#",
    liveUrl: "#",
    diffPreview: `diff --git a/dags/etl_pipeline.py b/dags/etl_pipeline.py
+ @dag(schedule='@hourly', catchup=False)
+ def realtime_etl():
+     extract = KafkaConsumerOp(topic='events')
+     transform = DbtRunOp(models=['staging', 'marts'])
+     load = GrafanaPushOp(dashboard='bizops')
+     extract >> transform >> load`,
  },
];
