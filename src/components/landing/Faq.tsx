import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFaqs } from '../../services/faqs';
import { Plus, Minus } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs', 'public'],
    queryFn: () => getFaqs(true),
  });

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>FAQ teknis &amp; implementasi</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Beberapa pertanyaan yang sering muncul dari pemerintah desa, sekolah, dan pelaku UMKM sebelum memulai implementasi RynCode.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 animate-pulse space-y-4">
          <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      )}

      {!isLoading && (
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900/80 divide-y divide-slate-200 dark:divide-slate-800 shadow-sm">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-3 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    {item.category && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {item.category}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <span className="shrink-0 h-6 w-6 inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 pr-8 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}

          {faqs.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
              Belum ada pertanyaan FAQ.
            </div>
          )}
        </div>
      )}
    </section>
  );
};
