import { experiences, type Experience } from "../../data/experiences.data";
import { useInView } from "../../hooks/useInView";
import { useTranslation } from "react-i18next";

/**
 * Seção de Experiência Profissional — estilo "git blame".
 * Timeline com cada cargo como um commit.
 */
export default function ExperienceSection() {
  const [ref, isInView] = useInView<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24"
      aria-label="Experience section"
    >
      {/* ── Section Title ── */}
      <h2 className="text-xl md:text-2xl font-mono mb-2">
        <span className="text-[#bd93f9]">##</span>{" "}
        {t("experience.section_title")}
      </h2>
      <p className="text-text-secondary text-sm font-mono mb-12">
        {t("experience.section_subtitle")}
      </p>

      {/* ── Timeline ── */}
      <div className="relative">
        {/* Linha vertical */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px bg-grid hidden lg:block"
          aria-hidden="true"
        />

        <div className="space-y-8 lg:pl-12">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              parentInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
  index,
  parentInView,
}: {
  experience: Experience;
  index: number;
  parentInView: boolean;
}) {
  const [ref, cardInView] = useInView<HTMLDivElement>();
  const { t } = useTranslation();
  const isVisible = parentInView || cardInView;

  const typeLabel = t(`experience.type.${exp.type}`, { defaultValue: exp.type });

  return (
    <div className="relative" ref={ref}>
      {/* Dot na timeline */}
      <div
        className={`absolute -left-8 top-6 w-3 h-3 rounded-full border-2 border-[#bd93f9] bg-bg-base hidden lg:block transition-all duration-500 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
        aria-hidden="true"
      />

      <div
        className={`border border-grid rounded-lg bg-bg-secondary p-6 transition-all duration-700 hover:border-[#bd93f9]/40 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {/* Commit header */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-mono mb-3">
          <span className="text-[#bd93f9]">{exp.commitHash}</span>
          <span className="text-text-secondary">•</span>
          <span className="text-text-secondary">{exp.period}</span>
          <span className="text-text-secondary">•</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold ${
              exp.type === "full-time"
                ? "bg-accent-green/20 text-accent-green"
                : "bg-accent-blue/20 text-accent-blue"
            }`}
          >
            {typeLabel}
          </span>
        </div>

        {/* Role + Company */}
        <div className="mb-4">
          <h3 className="text-xl font-mono text-accent-blue">{exp.role}</h3>
          <p className="text-[#bd93f9] font-mono text-sm mt-0.5">
            @ {exp.company}
            <span className="text-text-secondary ml-2">— {exp.location}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-text-primary leading-relaxed mb-4 text-sm">
          {exp.description}
        </p>

        {/* Highlights */}
        <div className="bg-bg-base border-l-4 border-[#bd93f9] p-4 mb-4 rounded-r space-y-1.5">
          {exp.highlights.map((h, i) => (
            <p key={i} className="text-sm text-text-primary font-mono">
              <span className="text-[#bd93f9]">→</span> {h}
            </p>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-code border border-text-secondary text-[#bd93f9] text-xs font-mono rounded hover:border-[#bd93f9] transition-colors"
            >
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
