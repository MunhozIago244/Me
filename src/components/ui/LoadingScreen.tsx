import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> booting portfolio_os v2.0.1...",
  "> checking dependencies...",
  "> [████████████████████] 100%",
  "> [OK] React 19 Engine Loaded",
  "> [OK] Tailwind CSS v4 Compiled",
  "> [OK] TypeScript Transpiled",
  "> [OK] GitHub API Connected",
  "> [OK] i18n Initialized (EN | PT-BR)",
  ">",
  "> ⚡ Welcome — Iago Munhoz's Portfolio",
];

interface LoadingScreenProps {
  onDone: () => void;
}

/**
 * Tela de carregamento estilo terminal boot.
 * Desaparece após a animação completar.
 */
export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFading(true);
          setTimeout(onDone, 500);
        }, 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onDone]);

  function colorize(line: string) {
    if (line.includes("[OK]")) {
      const [before, after] = line.split("[OK]");
      return (
        <>
          {before}
          <span className="text-accent-green font-bold">[OK]</span>
          {after}
        </>
      );
    }
    if (line.includes("████")) return <span className="text-accent-blue">{line}</span>;
    if (line.includes("Welcome")) return <span className="text-accent-yellow font-bold">{line}</span>;
    if (line.startsWith("> [OK]")) return <span className="text-accent-green">{line}</span>;
    return <span className="text-text-secondary">{line}</span>;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-bg-base flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      {/* Grid background sutil */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#1e2440 1px, transparent 1px), linear-gradient(90deg, #1e2440 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-lg px-8 font-mono text-sm">
        {/* Header do terminal */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-accent-red" />
          <div className="w-3 h-3 rounded-full bg-accent-yellow" />
          <div className="w-3 h-3 rounded-full bg-accent-green" />
          <span className="ml-4 text-text-secondary text-xs">bash — portfolio_os</span>
        </div>

        <div className="space-y-1">
          {lines.map((line, i) => (
            <div key={i}>{colorize(line)}</div>
          ))}

          {lines.length < BOOT_LINES.length && (
            <span className="inline-block w-2.5 h-4 bg-accent-green animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
