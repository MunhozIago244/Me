import { useInView } from "../../hooks/useInView";
import { recentActivity } from "../../data/metadata";
import { useTranslation } from "react-i18next";

/**
 * Seção About — "System Architecture Overview"
 * Layout 2 colunas: texto técnico + painel de métricas.
 */
export default function AboutSystem() {
  const [ref, isInView] = useInView<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24"
      aria-label={t("about.aria_label")}
    >
      {/* ── Section Title ── */}
      <h2 className="text-xl md:text-2xl font-mono mb-12">
        <span className="text-accent-green">##</span> {t("about.section_title")}
        <span className="text-text-secondary ml-4 text-sm">
          {t("about.section_subtitle")}
        </span>
      </h2>

      <div
        className={`grid grid-cols-1 lg:grid-cols-5 gap-12 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Coluna Esquerda — Texto ── */}
        <div className="lg:col-span-3 space-y-6 font-mono text-sm md:text-base">
          {/* Code block object */}
          <div className="text-text-primary leading-relaxed bg-bg-secondary border border-grid rounded-lg p-5">
            <span className="text-accent-blue">const</span>{" "}
            <span className="text-accent-green">iagoMunhoz</span> = {"{"}
            <div className="ml-4 mt-1 space-y-0.5">
              <div>
                <span className="text-text-primary">role:</span>{" "}
                <span className="text-accent-yellow">{`"${t("about.code.roleValue")}"`}</span>
                ,
              </div>
              <div>
                <span className="text-text-primary">experience:</span>{" "}
                <span className="text-accent-green">
                  {t("about.code.experienceValue")}
                </span>{" "}
                <span className="text-text-secondary">
                  {t("about.years_label")}
                </span>
                ,
              </div>
              <div>
                <span className="text-text-primary">passion:</span> [
                <span className="text-accent-yellow">{`"${t("about.passion.cloud")}"`}</span>
                ,{" "}
                <span className="text-accent-yellow">{`"${t("about.passion.backend")}"`}</span>
                ,{" "}
                <span className="text-accent-yellow">{`"${t("about.passion.data")}"`}</span>
                ,{" "}
                <span className="text-accent-yellow">{`"${t("about.passion.security")}"`}</span>
                ],
              </div>
              <div>
                <span className="text-text-primary">currentFocus:</span>{" "}
                <span className="text-accent-yellow">{`"${t("about.code.currentFocus")}"`}</span>
              </div>
            </div>
            {"}"};
          </div>

          <p className="text-text-primary leading-relaxed">
            {t("about.paragraph_1_part1")}{" "}
            <span className="text-accent-green font-bold">Java</span>{" "}
            {t("about.paragraph_1_part2")}{" "}
            <strong className="text-text-primary">
              {t("about.paragraph_1_emphasis")}
            </strong>
            . {t("about.paragraph_1_part3")}{" "}
            <span className="text-accent-yellow">
              {t("about.paragraph_1_highlight")}
            </span>
            .
          </p>

          <blockquote className="text-text-secondary italic border-l-2 border-accent-green pl-4">
            {`"${t("about.blockquote")}"`}
          </blockquote>
        </div>

        {/* ── Coluna Direita — Metrics Panel ── */}
        <div className="lg:col-span-2 bg-bg-secondary border border-grid rounded-lg p-6 font-mono h-fit">
          <div className="space-y-5">
            <MetricRow
              label={t("about.metrics.years")}
              value={t("about.code.experienceValue")}
              color="#50fa7b"
            />
            <MetricRow
              label={t("about.metrics.projects")}
              value="30+"
              color="#8be9fd"
            />
            <MetricRow
              label={t("about.metrics.coffee")}
              value="∞"
              color="#f1fa8c"
            />
            <MetricRow
              label={t("about.metrics.bugs")}
              value="9999+"
              color="#ff5555"
            />
          </div>

          {/* ── Activity Log ── */}
          <div className="mt-6 pt-6 border-t border-grid">
            <p className="text-xs text-text-secondary mb-3">
              {t("about.recent_activity")}
            </p>
            <div className="space-y-2 text-xs">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={getColorClass(item.color)}>
                    {item.icon} {item.text}
                  </span>
                  <span className="text-text-secondary">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-componente de linha de métrica ── */
function MetricRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-sm">{label}</span>
      <span className={`text-2xl font-bold ${getColorClass(color)}`}>
        {value}
      </span>
    </div>
  );
}

// Mapeia cores hex conhecidas para classes Tailwind do projeto
function getColorClass(hex: string) {
  switch ((hex || "").toLowerCase()) {
    case "#50fa7b":
      return "text-accent-green";
    case "#8be9fd":
      return "text-accent-blue";
    case "#f1fa8c":
      return "text-accent-yellow";
    case "#ff5555":
      return "text-accent-red";
    default:
      return "text-text-primary";
  }
}
