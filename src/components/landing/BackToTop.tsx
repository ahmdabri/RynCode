import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className="fixed bottom-6 right-6 z-40 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/90 text-slate-700 text-xs shadow-lg hover:border-emerald-400 hover:text-emerald-500 hover:scale-105 transition-all dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};
