import { useState, useCallback } from "react";

const STORAGE_KEY = "portfolio_sound";

/**
 * Gerencia preferência de som — persiste no localStorage.
 */
export function useSoundPreference() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  return { enabled, toggle } as const;
}
