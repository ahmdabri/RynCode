import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPortfolios } from '../../services/portfolios';
import { Badge } from '../ui/Badge';
import { Layers } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: portfolios = [], isLoading, isError } = useQuery({
    queryKey: ['portfolios', 'public'],
    queryFn: () => getPortfolios(true),
  });

  const categories = ['all', 'Desa Digital', 'SIAKAD', 'UMKM', 'Backend & Cloud'];

  const filteredPortfolios =
    selectedCategory === 'all'
      ? portfolios
      : portfolios.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="portfolio" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Portofolio Implementasi
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Beberapa contoh implementasi nyata RynCode di instansi pemerintah desa, institusi pendidikan, dan jejaring UMKM.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-5 space-y-3 animate-pulse"
            >
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="p-8 text-center text-xs text-rose-500 bg-rose-500/10 rounded-2xl border border-rose-500/20">
          Gagal memuat data portofolio dari database.
        </div>
      )}

      {/* Grid of portfolios */}
      {!isLoading && !isError && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {filteredPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col gap-2.5 dark:border-slate-800 dark:bg-slate-900/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between">
                {portfolio.category && (
                  <Badge variant="emerald">{portfolio.category}</Badge>
                )}
                <Layers className="h-4 w-4 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {portfolio.title}
              </h3>
              {portfolio.summary && (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                  {portfolio.summary}
                </p>
              )}
            </div>
          ))}

          {filteredPortfolios.length === 0 && (
            <div className="col-span-full p-8 text-center text-xs text-slate-500 dark:text-slate-400">
              Belum ada portofolio untuk kategori ini.
            </div>
          )}
        </div>
      )}
    </section>
  );
};
