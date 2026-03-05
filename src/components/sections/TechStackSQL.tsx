import { useState, useMemo } from "react";
import { skills, techTreeJSON } from "../../data/skills.data";
import { proficiencyColor } from "../../types/portfolio.types";
import { useInView } from "../../hooks/useInView";
import CodeBlock from "../ui/CodeBlock";
import { useTranslation } from "react-i18next";

/**
 * Seção Tech Stack — exibida como tabela SQL + alternativa JSON tree.
 */
export default function TechStackSQL() {
  const { t } = useTranslation();
  const [view, setView] = useState<"sql" | "json">("sql");
  const [ref, isInView] = useInView<HTMLElement>();
  const [copyMsg, setCopyMsg] = useState("");

  /* SQL Table View (moved inside to access `t`) */
  function SQLTable() {
    const rows = useMemo(
      () =>
        skills.map((skill) => (
          <tr
            key={skill.technology}
            className="border-b border-grid hover:bg-bg-base/50 transition-colors"
          >
            <td className="py-3 px-4 text-accent-blue">{skill.category}</td>
            <td className="py-3 px-4 text-text-primary">{skill.technology}</td>
            <td className="py-3 px-4">
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  proficiencyColor[skill.proficiency]
                }`}
              >
                {skill.proficiency}
              </span>
            </td>
            <td className="py-3 px-4 text-text-secondary">{skill.years}</td>
          </tr>
        )),
      [],
    );

    return (
      <div className="overflow-x-auto rounded-lg border border-grid bg-bg-secondary">
        <table className="w-full font-mono text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-accent-green">
              <th className="text-left py-3 px-4 text-accent-green font-bold">
                {t("stack.table.category")}
              </th>
              <th className="text-left py-3 px-4 text-accent-green font-bold">
                {t("stack.table.technology")}
              </th>
              <th className="text-left py-3 px-4 text-accent-green font-bold">
                {t("stack.table.proficiency")}
              </th>
              <th className="text-left py-3 px-4 text-accent-green font-bold">
                {t("stack.table.years")}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        {/* Query footer */}
        <div className="px-4 py-3 text-xs text-text-secondary font-mono border-t border-grid">
          {t("stack.query_footer", { count: skills.length })}
        </div>
      </div>
    );
  }

  /* JSON Tree View (moved inside to access `t` if needed) */
  function JSONTree() {
    return (
      <CodeBlock language="json" showLineNumbers>
        {JSON.stringify(techTreeJSON, null, 2)}
      </CodeBlock>
    );
  }

  return (
    <section
      id="stack"
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24"
      aria-label="Tech stack section"
    >
      {/* ── Section Title ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <h2 className="text-xl md:text-2xl font-mono">
          <span className="text-accent-blue">##</span>{" "}
          {t("stack.section_title")}
          <span className="text-text-secondary ml-4 text-sm hidden sm:inline">
            {t("stack.section_subtitle")}
          </span>
        </h2>

        {/* View toggle + actions */}
        <div className="flex items-center gap-2">
          <div
            role="tablist"
            aria-label={t("stack.view_tablist")}
            className="flex gap-2 font-mono text-xs"
          >
            {view === "sql" ? (
              <div
                id="tab-stack-sql"
                role="tab"
                tabIndex={0}
                aria-selected="true"
                className="px-3 py-1.5 rounded border transition-colors cursor-pointer select-none border-accent-green text-accent-green bg-accent-green/10"
                onClick={() => setView("sql")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setView("sql");
                  }
                }}
              >
                {t("stack.view.sql")}
              </div>
            ) : (
              <div
                id="tab-stack-sql"
                role="tab"
                tabIndex={-1}
                aria-selected="false"
                className="px-3 py-1.5 rounded border transition-colors cursor-pointer select-none border-grid text-text-secondary hover:border-text-secondary"
                onClick={() => setView("sql")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setView("sql");
                  }
                }}
              >
                {t("stack.view.sql")}
              </div>
            )}
            {view === "json" ? (
              <div
                id="tab-stack-json"
                role="tab"
                tabIndex={0}
                aria-selected="true"
                className="px-3 py-1.5 rounded border transition-colors cursor-pointer select-none border-accent-blue text-accent-blue bg-accent-blue/10"
                onClick={() => setView("json")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setView("json");
                  }
                }}
              >
                {t("stack.view.json")}
              </div>
            ) : (
              <div
                id="tab-stack-json"
                role="tab"
                tabIndex={-1}
                aria-selected="false"
                className="px-3 py-1.5 rounded border transition-colors cursor-pointer select-none border-grid text-text-secondary hover:border-text-secondary"
                onClick={() => setView("json")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setView("json");
                  }
                }}
              >
                {t("stack.view.json")}
              </div>
            )}
          </div>

          <div className="ml-2 flex items-center">
            <button
              className="px-3 py-1.5 rounded border transition-colors text-xs"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    JSON.stringify(techTreeJSON, null, 2),
                  );
                  setCopyMsg(t("stack.copy_success"));
                  setTimeout(() => setCopyMsg(""), 2000);
                } catch {
                  setCopyMsg(t("stack.copy_fail"));
                  setTimeout(() => setCopyMsg(""), 2000);
                }
              }}
            >
              {t("stack.copy_json")}
            </button>
            {copyMsg && (
              <span className="text-xs text-accent-green ml-2">{copyMsg}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        id={view === "sql" ? "stack-sql" : "stack-json"}
        role="tabpanel"
        aria-labelledby={view === "sql" ? "tab-stack-sql" : "tab-stack-json"}
        className={`transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {view === "sql" ? <SQLTable /> : <JSONTree />}
      </div>
    </section>
  );
}
