import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPartners } from '../../services/partners';
import { useAutoplay } from '../../hooks/useAutoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PartnerSlider: React.FC = () => {
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners', 'public'],
    queryFn: () => getPartners(true),
  });

  const { index, next, prev, goTo, hoverProps } = useAutoplay(partners.length, 5000);
  const currentPartner = partners[index];

  const getPartnerLogo = (partner?: typeof partners[0]) => {
    if (!partner) return null;
    if (partner.logo_url) return partner.logo_url;
    if (partner.name.toLowerCase().includes('ryzz')) return '/images/ryzzbe.jpg';
    return null;
  };

  return (
    <section id="partners" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Partner &amp; integrasi
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            RynCode dirancang untuk terhubung dengan ekosistem yang sudah ada: lembaga pendidikan, pemerintah daerah, penyedia payment gateway, dan backend developer services.
          </p>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 dark:border-slate-800 dark:bg-slate-900/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Berputar otomatis · pause saat diarahkan</span>
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 animate-pulse h-32" />
      )}

      {!isLoading && partners.length > 0 && currentPartner && (
        <div {...hoverProps} className="space-y-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-5 flex flex-col gap-3.5 dark:border-slate-800 dark:bg-slate-900/80 shadow-md">
            <div className="flex items-center justify-between gap-4">
              {/* Partner info & logo */}
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden dark:border-slate-700 dark:bg-slate-950 shrink-0">
                  {getPartnerLogo(currentPartner) ? (
                    <img
                      src={getPartnerLogo(currentPartner)!}
                      alt={currentPartner.name}
                      className="h-10 w-10 object-contain rounded-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {currentPartner.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{currentPartner.name}</span>
                    {currentPartner.label && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal">
                        {currentPartner.label}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {currentPartner.type || 'Mitra Strategis'}
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Partner sebelumnya"
                  className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center text-xs hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:border-emerald-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Partner selanjutnya"
                  className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center text-xs hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:border-emerald-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Partner Description */}
            {currentPartner.short_description && (
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {currentPartner.short_description}
              </div>
            )}

            {/* Slider Dots */}
            <div className="flex items-center justify-end gap-1.5 pt-1">
              {partners.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ke slide partner ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === index ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
