import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Rastreia a posição do mouse na viewport.
 * Usado para efeitos de cursor trail e parallax sutil.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    function handler(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return position;
}
