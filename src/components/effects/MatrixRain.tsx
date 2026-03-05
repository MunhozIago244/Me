import { useEffect, useRef, useState } from "react";

/**
 * Chuva de caracteres Matrix — versão sutil como background.
 * Pausa automaticamente quando o documento está oculto (performance).
 * Respeita prefers-reduced-motion para acessibilidade.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let paused = false;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Pausa quando a aba fica em background (economiza CPU)
    function onVisibilityChange() {
      paused = document.hidden;
      if (!paused) draw();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    const chars = "01アイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.random() * -100);

    function draw() {
      if (paused || !ctx || !canvas) return;

      ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#50fa7b";
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = 0.04;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [prefersReducedMotion]);

  // Don't render anything if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
