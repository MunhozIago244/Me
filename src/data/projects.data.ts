import type { Project } from "../types/portfolio.types";

export const projects: Project[] = [
  {
    id: 1,
    hash: "a1b2c3d",
    name: "Nobello",
    icon: "🛍️",
    date: "2025-01",
    description:
      "E-commerce de moda com CRM próprio: pipeline kanban de pedidos, gestão de fornecedores, alertas de retenção de clientes e dashboard de relatórios.",
    problemSolved:
      "Lojistas precisavam de uma plataforma unificada que integrasse vendas online com gestão operacional, sem depender de ferramentas externas de CRM.",
    tech: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "TypeScript"],
    metrics: [
      { label: "Tabelas RLS", value: "6" },
      { label: "Pipeline", value: "Kanban" },
      { label: "Pagamentos", value: "Stripe" },
    ],
    linesAdded: 12800,
    linesRemoved: 1200,
    repoUrl: "#",
    liveUrl: "https://nobello.com.br",
    diffPreview: `diff --git a/src/lib/crm/pipeline.ts b/src/lib/crm/pipeline.ts
+ import { createClient } from '@supabase/supabase-js';
+ export async function moveCard(orderId: string, stage: Stage) {
+   return supabase
+     .from('pipeline_cards')
+     .update({ stage, updated_at: new Date() })
+     .eq('order_id', orderId);
+ }
- // gestão manual por planilha removida`,
  },
  {
    id: 2,
    hash: "b3c4d5e",
    name: "Finance.AI",
    icon: "📈",
    date: "2025-02",
    description:
      "Plataforma de análise financeira com dados de mercado em tempo real via brapi.dev, simulador de portfólio e análise de investimentos com IA (Claude API).",
    problemSolved:
      "Investidores iniciantes precisavam de uma ferramenta acessível que combinasse dados reais do mercado com insights de IA para tomada de decisão.",
    tech: ["React", "TypeScript", "Claude API", "brapi.dev"],
    metrics: [
      { label: "Dados", value: "Real-time" },
      { label: "IA", value: "Claude" },
      { label: "Simulador", value: "Portfólio" },
    ],
    linesAdded: 8400,
    linesRemoved: 600,
    repoUrl: "#",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/services/ai-analysis.ts b/src/services/ai-analysis.ts
+ import Anthropic from '@anthropic-ai/sdk';
+ export async function analyzeStock(ticker: string, data: MarketData) {
+   const client = new Anthropic();
+   const msg = await client.messages.create({
+     model: 'claude-opus-4-5',
+     messages: [{ role: 'user', content: buildPrompt(ticker, data) }],
+   });
+   return msg.content[0].text;
+ }`,
  },
  {
    id: 3,
    hash: "c5d6e7f",
    name: "MCP Server Trello",
    icon: "🔌",
    date: "2025-03",
    description:
      "Servidor MCP com 17 tools para integração nativa do Claude com o Trello — criar cards, mover entre listas, adicionar membros e comentários via linguagem natural.",
    problemSolved:
      "Usuários do Claude precisavam gerenciar projetos no Trello sem sair do chat, usando o protocolo MCP para integração direta com a API oficial.",
    tech: ["TypeScript", "MCP Protocol", "Trello API"],
    metrics: [
      { label: "Tools", value: "17" },
      { label: "Protocolo", value: "MCP" },
      { label: "Status", value: "Publicado" },
    ],
    linesAdded: 3200,
    linesRemoved: 0,
    repoUrl: "https://github.com/MunhozIago244",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/tools/cards.ts b/src/tools/cards.ts
+ export const createCardTool: Tool = {
+   name: 'trello_create_card',
+   description: 'Creates a card in a Trello list',
+   inputSchema: { type: 'object', properties: {
+     listId: { type: 'string' },
+     name: { type: 'string' },
+     desc: { type: 'string' },
+   }},
+ };`,
  },
  {
    id: 4,
    hash: "d6e7f8a",
    name: "MCP Server Windows",
    icon: "🖥️",
    date: "2025-03",
    description:
      "Servidor MCP com 10 tools para automação de desktop via IA — cliques, digitação, screenshots e controle de janelas usando nut-js e screenshot-desktop.",
    problemSolved:
      "Automatizar tarefas repetitivas no Windows usando o Claude como orquestrador, sem precisar de scripts específicos por aplicação.",
    tech: ["TypeScript", "MCP Protocol", "nut-js", "screenshot-desktop"],
    metrics: [
      { label: "Tools", value: "10" },
      { label: "Automação", value: "Desktop" },
      { label: "Plataforma", value: "Windows" },
    ],
    linesAdded: 2100,
    linesRemoved: 0,
    repoUrl: "https://github.com/MunhozIago244",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/tools/mouse.ts b/src/tools/mouse.ts
+ export const clickTool: Tool = {
+   name: 'windows_click',
+   description: 'Clicks at given screen coordinates',
+   inputSchema: { type: 'object',
+     properties: { x: { type: 'number' }, y: { type: 'number' } },
+   },
+ };`,
  },
  {
    id: 5,
    hash: "e7f8a9b",
    name: "Nexo Público",
    icon: "🔍",
    date: "2025-04",
    description:
      "Plataforma de inteligência política que correlaciona dados do TSE, Câmara, Portal da Transparência, Receita Federal e ICIJ Offshore Leaks para mapear conexões candidato-empresa-dinheiro antes das eleições 2026.",
    problemSolved:
      "Jornalistas e cidadãos precisavam de uma ferramenta que cruzasse automaticamente dados públicos dispersos para expor redes de influência política.",
    tech: ["Next.js", "Supabase", "pgvector", "FastAPI", "Celery", "Mistral OCR", "Sigma.js"],
    metrics: [
      { label: "Fontes", value: "5+ APIs" },
      { label: "Grafo", value: "Sigma.js" },
      { label: "OCR", value: "Mistral" },
    ],
    linesAdded: 0,
    linesRemoved: 0,
    repoUrl: "#",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/pipeline/correlate.py b/src/pipeline/correlate.py
+ @celery.task
+ async def correlate_candidate(candidate_id: str):
+     tse = await fetch_tse_donations(candidate_id)
+     cnpj_links = await cross_ref_receita(tse.donors)
+     offshore = await check_icij(cnpj_links)
+     await build_graph(candidate_id, tse, cnpj_links, offshore)`,
  },
  {
    id: 6,
    hash: "f8a9b0c",
    name: "gupy-hunter",
    icon: "🎯",
    date: "2024-12",
    description:
      "Scraper de vagas da Gupy com rankeamento automático por IA (Claude API) e geração de dashboard HTML com as melhores oportunidades filtradas.",
    problemSolved:
      "Buscar vagas manualmente em dezenas de empresas na Gupy era ineficiente — a IA rankeia e filtra automaticamente com base no perfil do candidato.",
    tech: ["Python", "Claude API", "BeautifulSoup", "HTML"],
    metrics: [
      { label: "Ranking", value: "IA" },
      { label: "Output", value: "Dashboard" },
      { label: "Fonte", value: "Gupy" },
    ],
    linesAdded: 1800,
    linesRemoved: 0,
    repoUrl: "https://github.com/MunhozIago244",
    liveUrl: undefined,
    diffPreview: `diff --git a/hunter.py b/hunter.py
+ async def rank_jobs(jobs: list[Job], profile: str) -> list[RankedJob]:
+     prompt = build_ranking_prompt(jobs, profile)
+     response = await claude.messages.create(
+         model='claude-haiku-4-5-20251001',
+         messages=[{'role': 'user', 'content': prompt}],
+     )
+     return parse_rankings(response.content[0].text)`,
  },
  {
    id: 7,
    hash: "a9b0c1d",
    name: "seduc-notas",
    icon: "📚",
    date: "2024-11",
    description:
      "Extensão Chrome que automatiza o lançamento de notas no Moodle da SEDUC-SP, com modo automático (lança tudo de uma vez) e modo manual (célula a célula).",
    problemSolved:
      "Professores da rede estadual perdiam horas semanais lançando notas manualmente no Moodle — a extensão automatiza o processo inteiro.",
    tech: ["Chrome Extension", "JavaScript", "Moodle"],
    metrics: [
      { label: "Modos", value: "Auto + Manual" },
      { label: "Plataforma", value: "Moodle" },
      { label: "Público", value: "SEDUC-SP" },
    ],
    linesAdded: 900,
    linesRemoved: 0,
    repoUrl: "https://github.com/MunhozIago244",
    liveUrl: undefined,
    diffPreview: `diff --git a/content.js b/content.js
+ function autoLaunchGrades(grades) {
+   const inputs = document.querySelectorAll('input[data-grade]');
+   inputs.forEach((input, i) => {
+     input.value = grades[i] ?? '';
+     input.dispatchEvent(new Event('change', { bubbles: true }));
+   });
+   document.querySelector('#save-grades')?.click();
+ }`,
  },
  {
    id: 8,
    hash: "b0c1d2e",
    name: "Finance PJ vs CLT",
    icon: "💰",
    date: "2024-10",
    description:
      "Calculadora interativa que compara remuneração líquida entre regimes PJ e CLT, considerando impostos, benefícios, FGTS, INSS e pró-labore.",
    problemSolved:
      "Desenvolvedores brasileiros precisavam de uma ferramenta clara para comparar ofertas CLT vs PJ sem depender de planilhas genéricas.",
    tech: ["React", "TypeScript"],
    metrics: [
      { label: "Regimes", value: "PJ + CLT" },
      { label: "Cálculo", value: "Líquido" },
      { label: "Impostos", value: "Reais" },
    ],
    linesAdded: 1200,
    linesRemoved: 0,
    repoUrl: "https://github.com/MunhozIago244",
    liveUrl: undefined,
    diffPreview: `diff --git a/src/calc/pj-vs-clt.ts b/src/calc/pj-vs-clt.ts
+ export function calcPJ(gross: number): NetResult {
+   const simples = gross * 0.06;
+   const inss = Math.min(gross * 0.11, 908.86);
+   return { net: gross - simples - inss, regime: 'PJ' };
+ }
+ export function calcCLT(gross: number): NetResult {
+   const inss = calcINSS(gross);
+   const ir = calcIR(gross - inss);
+   return { net: gross - inss - ir, regime: 'CLT' };
+ }`,
  },
];
