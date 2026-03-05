import React, { useEffect, useRef } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useSoundPreference } from "../../hooks/useSoundPreference";
import { playKeyClick } from "../../utils/sound";

interface TypewriterEffectProps {
  lines: string[];
  charDelay?: number;
  lineDelay?: number;
  startDelay?: number;
  onComplete?: () => void;
}

/**
 * Componente que renderiza linhas com efeito typewriter.
 * Toca um som de tecla a cada caractere (se o som estiver habilitado).
 */
export default function TypewriterEffect({
  lines,
  charDelay = 25,
  lineDelay = 80,
  startDelay = 600,
}: TypewriterEffectProps) {
  const { displayedLines, isComplete, skip } = useTypewriter(
    lines,
    charDelay,
    lineDelay,
    startDelay,
  );
  const { enabled: soundEnabled } = useSoundPreference();

  // Total de caracteres visíveis — toca som ao aumentar
  const totalChars = displayedLines.reduce((acc, l) => acc + l.length, 0);
  const prevTotalRef = useRef(0);

  useEffect(() => {
    if (soundEnabled && totalChars > prevTotalRef.current) {
      playKeyClick();
    }
    prevTotalRef.current = totalChars;
  }, [totalChars, soundEnabled]);

  function colorize(line: string): React.ReactNode {
    if (line.includes("[OK]")) {
      const parts = line.split("[OK]");
      return (
        <>
          {parts[0]}
          <span className="text-accent-green font-bold">[OK]</span>
          {parts[1]}
        </>
      );
    }
    if (line.includes("████")) {
      return <span className="text-accent-blue">{line}</span>;
    }
    if (line.includes("system.status")) {
      return <span className="text-accent-green">{line}</span>;
    }
    if (line.includes("mission:")) {
      return <span className="text-accent-yellow">{line}</span>;
    }
    if (line.startsWith(">")) {
      return (
        <>
          <span className="text-text-secondary">&gt;</span>
          {line.slice(1)}
        </>
      );
    }
    return <>{line}</>;
  }

  return (
    <div
      className="space-y-0.5 cursor-pointer"
      onClick={skip}
      role="button"
      tabIndex={0}
      aria-label="Click to skip animation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") skip();
      }}
    >
      {displayedLines.map((line, i) => (
        <div key={i} className="min-h-5">
          {colorize(line)}
        </div>
      ))}

      {!isComplete && (
        <span className="inline-block w-2.5 h-5 bg-accent-green animate-pulse ml-0.5 align-middle" />
      )}
      {isComplete && (
        <div className="min-h-5">
          <span className="text-text-secondary">&gt;</span>{" "}
          <span className="inline-block w-2.5 h-5 bg-accent-green animate-pulse align-middle" />
        </div>
      )}
    </div>
  );
}
