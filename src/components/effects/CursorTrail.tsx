import { useEffect, useRef, useState } from "react";

/**
 * Trail sutil de pixels verdes que segue o cursor.
 * Cada ponto faz fade-out rapidamente para efeito "hacker".
 * Respeita prefers-reduced-motion para acessibilidade.
 */
export default function CursorTrail() {
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

    // Desabilitar em telas touch
    if ("ontouchstart" in window) return;

    let animationId: number;

    interface Dot {
      x: number;
      y: number;
      alpha: number;
      size: number;
    }

    const dots: Dot[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      dots.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.6,
        size: 2 + Math.random() * 2,
      });
      // Limitar quantidade
      if (dots.length > 30) dots.shift();
    }
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 250, 123, ${dot.alpha})`;
        ctx.fill();

        dot.alpha -= 0.02;
        dot.size *= 0.98;

        if (dot.alpha <= 0) {
          dots.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [prefersReducedMotion]);

  // Don't render anything if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-60"
      aria-hidden="true"
    />
  );
}
