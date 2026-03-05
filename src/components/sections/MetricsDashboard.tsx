import { useEffect, useState } from "react";
import { Github, Code2, Layers, Zap } from "lucide-react";
import MetricCard from "../ui/MetricCard";
import { useInView } from "../../hooks/useInView";

/**
 * Seção Live Metrics Dashboard — métricas "ao vivo"
 * com animação de contador e mini-gráficos.
 */
export default function MetricsDashboard() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section
      id="metrics"
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24"
      aria-label="Metrics dashboard section"
    >
      {/* ── Section Title ── */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <h2 className="text-xl md:text-2xl font-mono">
          <span className="text-accent-red">##</span> system_metrics.monitoring
        </h2>
        <span className="text-text-secondary text-sm font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          live data
        </span>
      </div>

      {/* ── Metrics Grid ── */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Card 1: GitHub Activity */}
        <MetricCard
          icon={<Github size={18} />}
          title="GitHub Activity"
          value={<AnimatedNumber target={247} run={isInView} />}
          label="contributions this year"
          accentColor="#50fa7b"
        >
          <ContributionGraph />
        </MetricCard>

        {/* Card 2: Code Quality */}
        <MetricCard
          icon={<Code2 size={18} />}
          title="Code Quality"
          value="A+"
          label="avg. maintainability"
          accentColor="#8be9fd"
        >
          <div className="flex gap-1 mt-1">
            {[95, 88, 92, 98].map((score, i) => (
              <div
                key={i}
                className="flex-1 bg-grid rounded-full h-1.5 overflow-hidden"
              >
                <div
                  className="bg-accent-blue h-full rounded-full transition-all duration-1000"
                  style={{
                    width: isInView ? `${score}%` : "0%",
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </MetricCard>

        {/* Card 3: Tech Stack */}
        <MetricCard
          icon={<Layers size={18} />}
          title="Tech Stack"
          value={<AnimatedNumber target={25} run={isInView} suffix="+" />}
          label="technologies mastered"
          accentColor="#f1fa8c"
        >
          <div className="flex flex-wrap gap-1 mt-1">
            {["Java", "React", "Node", "Python", "AWS"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-code text-accent-yellow text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </MetricCard>

        {/* Card 4: Response Time */}
        <MetricCard
          icon={<Zap size={18} />}
          title="Avg Response"
          value={
            <>
              <AnimatedNumber target={42} run={isInView} />
              <span className="text-lg ml-0.5">ms</span>
            </>
          }
          label="API response time"
          accentColor="#50fa7b"
        >
          <div className="text-xs text-text-secondary mt-1">
            ⚡ 99.9% uptime guarantee
          </div>
        </MetricCard>
      </div>
    </section>
  );
}

/* ── AnimatedNumber — Contagem progressiva ── */
function AnimatedNumber({
  target,
  run,
  suffix = "",
}: {
  target: number;
  run: boolean;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [run, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

/* ── Mini contribution graph (últimas 12 semanas) ── */
function ContributionGraph() {
  const weeks = [3, 7, 5, 12, 8, 15, 10, 6, 14, 9, 11, 7];
  const max = Math.max(...weeks);

  return (
    <div className="flex items-end gap-1 h-8 mt-1">
      {weeks.map((count, i) => (
        <div
          key={i}
          className="flex-1 bg-accent-green rounded-t opacity-70 hover:opacity-100 transition-opacity"
          style={{ height: `${(count / max) * 100}%` }}
          title={`${count} contributions`}
        />
      ))}
    </div>
  );
}
