import { useEffect, useState } from "react";
import type { Project } from "../types/portfolio.types";
import { projects as localProjects } from "../data/projects.data";

type Repo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  homepage?: string | null;
  updated_at: string;
  stargazers_count?: number;
  forks_count?: number;
};

function languageToEmoji(lang?: string | null) {
  if (!lang) return "📦";
  const key = lang.toLowerCase();
  if (key.includes("js") || key === "javascript" || key === "typescript")
    return "⚛️";
  if (key === "python") return "🐍";
  if (key === "java") return "☕";
  if (key === "go") return "🐹";
  if (key === "rust") return "🦀";
  if (key === "sql") return "🗄️";
  return "📦";
}

export default function useGithubRepos(username = "MunhozIago244", limit = 5) {
  const [repos, setRepos] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setLoading(true);
      try {
        // optional token from Vite env: VITE_GITHUB_TOKEN
        const token = (import.meta as any)?.env?.VITE_GITHUB_TOKEN || null;
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
        };
        if (token) headers["Authorization"] = `token ${token}`;

        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${limit}&sort=updated`,
          { headers },
        );
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data: Repo[] = await res.json();

        const mapped: Project[] = data.map((r, i) => ({
          id: i + 1,
          hash: (r.node_id || String(r.id)).slice(0, 7),
          name: r.name,
          icon: languageToEmoji(r.language),
          date: r.updated_at.split("T")[0],
          description: r.description || "",
          problemSolved: "",
          tech:
            r.topics && r.topics.length > 0
              ? r.topics
              : r.language
                ? [r.language]
                : [],
          metrics: [
            { label: "Stars", value: String(r.stargazers_count || 0) },
            { label: "Forks", value: String(r.forks_count || 0) },
            {
              label: "Updated",
              value: new Date(r.updated_at).toLocaleDateString(),
            },
          ],
          linesAdded: 0,
          linesRemoved: 0,
          repoUrl: r.html_url,
          liveUrl: r.homepage || undefined,
          diffPreview: undefined,
        }));

        // try to fetch last commit for each repo (best-effort)
        const withCommits = await Promise.all(
          mapped.map(async (m) => {
            try {
              const cr = await fetch(
                `https://api.github.com/repos/${username}/${m.name}/commits?per_page=1`,
                { headers },
              );
              if (!cr.ok) return m;
              const cdata = await cr.json();
              const c = cdata && cdata[0];
              if (c) {
                m.lastCommit = {
                  sha: (c.sha || "").slice(0, 7),
                  message: c.commit?.message?.split("\n")[0] || "",
                  date: c.commit?.author?.date || "",
                  url: c.html_url || `${m.repoUrl}/commit/${c.sha}`,
                };
              }
            } catch (e) {
              // ignore per-repo errors
            }
            return m;
          }),
        );

        if (!cancelled) setRepos(withCommits);
      } catch (err) {
        // fallback para projetos locais se a API falhar
        if (!cancelled) setRepos(localProjects.slice(0, limit));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, limit]);

  return { repos, loading } as const;
}
