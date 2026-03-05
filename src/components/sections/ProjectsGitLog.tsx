import ProjectCard from "../ui/ProjectCard";
import { useInView } from "../../hooks/useInView";
import useGithubRepos from "../../hooks/useGithubRepos";
import { useTranslation } from "react-i18next";

/**
 * Seção de Projetos — estilo "Git Log View".
 * Busca repositórios reais do GitHub com fallback para dados locais.
 */
export default function ProjectsGitLog() {
  const [ref, isInView] = useInView<HTMLElement>();
  const { repos, loading } = useGithubRepos("MunhozIago244", 6);
  const { t } = useTranslation();

  const projectList = repos ?? [];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24"
      aria-label="Projects section"
    >
      {/* ── Section Title ── */}
      <h2 className="text-xl md:text-2xl font-mono mb-2">
        <span className="text-accent-yellow">##</span>{" "}
        {t("projects.section_title")}
      </h2>
      <p className="text-text-secondary text-sm font-mono mb-12 flex items-center gap-2">
        {loading ? (
          <>
            <span className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
            {t("projects.loading")}
          </>
        ) : (
          t("projects.section_subtitle", { count: projectList.length })
        )}
      </p>

      {/* ── Skeleton loading ── */}
      {loading && (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-grid rounded-lg bg-bg-secondary p-6 animate-pulse"
            >
              <div className="flex gap-3 mb-4">
                <div className="h-4 w-16 bg-grid rounded" />
                <div className="h-4 w-24 bg-grid rounded" />
              </div>
              <div className="h-6 w-48 bg-grid rounded mb-3" />
              <div className="h-4 w-full bg-grid rounded mb-2" />
              <div className="h-4 w-3/4 bg-grid rounded" />
            </div>
          ))}
        </div>
      )}

      {/* ── Git log timeline ── */}
      {!loading && (
        <div className="relative">
          {/* Linha vertical */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-grid hidden lg:block"
            aria-hidden="true"
          />

          <div className="space-y-8 lg:pl-12">
            {projectList.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Timeline dot — delay via Tailwind classes */}
                <div
                  className={`absolute -left-8 top-6 w-3 h-3 rounded-full border-2 border-accent-green bg-bg-base hidden lg:block transition-all duration-500 ${
                    isInView ? "scale-100" : "scale-0"
                  } ${
                    index === 0
                      ? "delay-0"
                      : index === 1
                        ? "delay-200"
                        : index === 2
                          ? "delay-300"
                          : index === 3
                            ? "delay-500"
                            : "delay-700"
                  }`}
                  aria-hidden="true"
                />

                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
