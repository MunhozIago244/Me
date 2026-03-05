import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook que simula efeito typewriter linha por linha.
 * Retorna as linhas visíveis e se a animação terminou.
 */
export function useTypewriter(
  lines: string[],
  charDelay = 30,
  lineDelay = 120,
  startDelay = 600,
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const isComplete = started && currentLineIndex >= lines.length;

  // Delay inicial
  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(id);
  }, [startDelay]);

  useEffect(() => {
    if (!started || isComplete) return;

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = currentLine.slice(0, currentCharIndex);
          return next;
        });
        setCurrentCharIndex((c) => c + 1);
      }, charDelay);
    } else {
      // Linha concluída, avança para a próxima
      timeoutRef.current = window.setTimeout(() => {
        setCurrentLineIndex((l) => l + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [
    started,
    currentLineIndex,
    currentCharIndex,
    lines,
    charDelay,
    lineDelay,
    isComplete,
  ]);

  /** Pula direto para o fim (skip animation) */
  const skip = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setDisplayedLines([...lines]);
    setCurrentLineIndex(lines.length);
  }, [lines]);

  return { displayedLines, isComplete, skip };
}
