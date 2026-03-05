import { useEffect, useCallback, useRef } from "react";

/**
 * Hook que escuta sequências de teclas (ex.: Konami Code)
 * e também atalhos simples como Ctrl+K.
 */
export function useKeyPress(
  targetKey: string,
  callback: () => void,
  modifiers?: { ctrl?: boolean; meta?: boolean; shift?: boolean },
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (modifiers?.ctrl && !e.ctrlKey && !e.metaKey) return;
      if (modifiers?.meta && !e.metaKey) return;
      if (modifiers?.shift && !e.shiftKey) return;

      if (e.key.toLowerCase() === targetKey.toLowerCase()) {
        e.preventDefault();
        callbackRef.current();
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [targetKey, modifiers]);
}

/**
 * Hook para o Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
 */
export function useKonamiCode(callback: () => void) {
  const sequence = useRef<string[]>([]);
  const konamiCode = useRef([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const code = konamiCode.current;
      sequence.current.push(e.key);
      // Mantém apenas os últimos N caracteres
      if (sequence.current.length > code.length) {
        sequence.current = sequence.current.slice(-code.length);
      }
      if (
        sequence.current.length === code.length &&
        sequence.current.every((k, i) => k === code[i])
      ) {
        callback();
        sequence.current = [];
      }
    },
    [callback],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}
