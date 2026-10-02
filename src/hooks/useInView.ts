import { useState, useEffect, useRef } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once visible, can unobserve if only trigger once
        observer.unobserve(el);
      }
    }, {
      threshold: 0.15,
      ...options,
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref: elementRef, isInView };
}
