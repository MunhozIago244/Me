import { useEffect, useState } from "react";

/**
 * Barra de progresso de scroll — verde no topo da página.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) return;
      setProgress((scrollTop / scrollHeight) * 100);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 bg-accent-green transition-[width] duration-100"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Progresso de scroll"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
