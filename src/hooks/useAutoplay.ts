import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoplay(itemCount: number, intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    if (itemCount <= 0) return;
    setIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    if (itemCount <= 0) return;
    setIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (isPaused || itemCount <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % itemCount);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, itemCount, intervalMs]);

  return {
    index,
    next,
    prev,
    goTo,
    pause,
    resume,
    hoverProps: {
      onMouseEnter: pause,
      onMouseLeave: resume,
    },
  };
}
