import { useState, useEffect, useRef, type RefObject } from "react";

/**
 * Hook de Intersection Observer — detecta quando um elemento entra na viewport.
 * Útil para animações de entrada de seções.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Uma vez visível, desconecta (anima só 1x)
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
