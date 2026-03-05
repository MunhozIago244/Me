import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../../types/portfolio.types";
import { useInView } from "../../hooks/useInView";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Card de projeto estilizado como um commit git.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [showDiff, setShowDiff] = useState(false);
  const [ref, isInView] = useInView<HTMLDivElement>();

  const delayClass =
    index === 0
      ? "delay-0"
      : index === 1
        ? "delay-150"
        : index === 2
          ? "delay-300"
          : "delay-500";

  return (
    <div
      ref={ref}
      className={`border border-grid rounded-lg bg-bg-secondary p-6 transition-all duration-700 hover:border-text-secondary ${delayClass} ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* ── Commit Header ── */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-accent-yellow font-mono">{project.hash}</span>
        <span className="text-text-secondary">•</span>
        <span className="text-text-secondary">{project.date}</span>
        <span className="text-text-secondary">•</span>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 bg-accent-green/20 text-accent-green rounded text-xs font-mono">
            +{project.linesAdded.toLocaleString()}
          </span>
          <span className="px-2 py-0.5 bg-accent-red/20 text-accent-red rounded text-xs font-mono">
            -{project.linesRemoved.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <h3 className="text-xl md:text-2xl font-mono text-accent-blue mt-4 mb-2">
        {project.icon} {project.name}
      </h3>

      {/* ── Description ── */}
      <p className="text-text-primary leading-relaxed mb-4">
        {project.description}
      </p>

      {/* ── Problem Solved ── */}
      <div className="bg-bg-base border-l-4 border-accent-yellow p-4 mb-4 rounded-r">
        <p className="text-sm text-text-primary">
          <span className="text-accent-yellow font-bold">Problem Solved: </span>
          {project.problemSolved}
        </p>
      </div>

      {/* ── Tech Tags ── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-code border border-text-secondary text-accent-blue text-xs font-mono rounded hover:border-accent-blue transition-colors"
          >
            #{tech}
          </span>
        ))}
      </div>

      {/* ── Metrics Grid ── */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-2xl font-bold text-accent-green">
              {metric.value}
            </div>
            <div className="text-xs text-text-secondary">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-code border border-text-secondary text-text-primary font-mono text-sm hover:border-accent-green hover:text-accent-green transition-colors rounded"
          aria-label={`View ${project.name} source code on GitHub`}
        >
          <Github size={16} />
          <span>git clone</span>
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-base font-mono text-sm hover:bg-accent-blue transition-colors rounded font-bold"
            aria-label={`View ${project.name} live`}
          >
            <ExternalLink size={16} />
            <span>view live</span>
          </a>
        )}
      </div>

      {/* ── Last Commit (if available) ── */}
      {project.lastCommit && (
        <div className="mt-4 text-sm text-text-secondary">
          <a
            href={project.lastCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 hover:text-accent-blue"
            aria-label={`Open last commit ${project.lastCommit.sha}`}
          >
            <span className="font-mono text-xs text-text-secondary">
              {project.lastCommit.sha}
            </span>
            <span className="truncate">{project.lastCommit.message}</span>
            <span className="text-xs text-text-secondary ml-2">
              ({new Date(project.lastCommit.date).toLocaleDateString()})
            </span>
          </a>
        </div>
      )}

      {/* ── Diff Preview (collapsible) ── */}
      {project.diffPreview && (
        <div className="mt-4 border-t border-grid pt-4">
          <button
            className="text-xs text-text-secondary hover:text-accent-blue font-mono transition-colors"
            onClick={() => setShowDiff(!showDiff)}
          >
            {showDiff
              ? "↓ hide diff"
              : `→ show diff (+${project.linesAdded} -${project.linesRemoved})`}
          </button>

          {showDiff && (
            <pre className="mt-3 p-4 bg-code rounded text-xs font-mono overflow-x-auto border border-grid">
              {project.diffPreview.split("\n").map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("+")
                      ? "text-accent-green"
                      : line.startsWith("-")
                        ? "text-accent-red"
                        : line.startsWith("diff")
                          ? "text-accent-blue font-bold"
                          : "text-text-secondary"
                  }
                >
                  {line}
                </div>
              ))}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
