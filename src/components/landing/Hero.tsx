import React, { useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { EcosystemSnapshot } from './EcosystemSnapshot';
import { useCounter } from '../../hooks/useCounter';
import { useInView } from '../../hooks/useInView';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [persona, setPersona] = useState<'desa' | 'sekolah' | 'umkm'>('desa');
  const { ref: statsRef, isInView } = useInView<HTMLDListElement>({ threshold: 0.2 });

  const desaCount = useCounter(10, isInView, 1200);
  const jenjangCount = useCounter(4, isInView, 900);
  const umkmCount = useCounter(50, isInView, 1400);

  const personaCopy = {
    desa: 'RynCode membantu pemerintah desa mengelola data warga, layanan administrasi, dan transparansi pembangunan secara modern dan akuntabel.',
    sekolah: 'RynCode membantu sekolah dasar hingga SMA/SMK mengelola akademik, penilaian kurikulum, dan komunikasi orang tua dalam satu sistem terpadu.',
    umkm: 'RynCode membantu pelaku UMKM desa mengelola katalog produk, stok, dan pesanan secara online dalam satu portal terhubung.',
  };

  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative">
        {/* Left Column: Value Proposition & Persona Switcher */}
        <div className="space-y-6">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Platform digital untuk desa, sekolah, dan UMKM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
            Menghubungkan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              Desa Digital
            </span>
            ,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              SIAKAD
            </span>
            , dan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              UMKM
            </span>{' '}
            dalam satu ekosistem.
          </h1>

          {/* Persona Switcher Tabs */}
          <div className="inline-flex rounded-full border border-slate-200 bg-white/90 p-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setPersona('desa')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                persona === 'desa'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Desa
            </button>
            <button
              type="button"
              onClick={() => setPersona('sekolah')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                persona === 'sekolah'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Sekolah
            </button>
            <button
              type="button"
              onClick={() => setPersona('umkm')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                persona === 'umkm'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              UMKM
            </button>
          </div>

          {/* Dynamic description */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl transition-all duration-300 min-h-[50px]">
            {personaCopy[persona]}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('services');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:shadow-emerald-500/30 transition-all duration-150 transform hover:-translate-y-0.5"
            >
              <span>Jelajahi Layanan</span>
              <Sparkles className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 dark:bg-slate-900/60 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:border-emerald-400 hover:text-emerald-600 transition dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300 backdrop-blur-sm"
            >
              Jadwalkan Demo
            </a>
          </div>

          {/* Counter Animation Statistics */}
          <dl
            ref={statsRef}
            className="grid grid-cols-3 gap-4 max-w-md pt-5 border-t border-slate-200 mt-4 dark:border-slate-800"
          >
            <div>
              <dt className="text-[11px] text-slate-500 dark:text-slate-400">Implementasi</dt>
              <dd className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                <span className="text-emerald-500 dark:text-emerald-400">{desaCount}+</span> Desa
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-slate-500 dark:text-slate-400">Unit Pendidikan</dt>
              <dd className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                <span className="text-emerald-500 dark:text-emerald-400">{jenjangCount}</span> Jenjang
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-slate-500 dark:text-slate-400">UMKM Terbantu</dt>
              <dd className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                <span className="text-emerald-500 dark:text-emerald-400">{umkmCount}+</span> Pelaku
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Terminal Snapshot */}
        <div className="relative">
          <EcosystemSnapshot persona={persona} />
        </div>
      </div>

      {/* Bounce scroll hint */}
      <div className="hidden sm:flex justify-center pb-4">
        <button
          type="button"
          onClick={() => onNavigate('feature-overview')}
          className="inline-flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition animate-bounce py-1 px-3 rounded-full"
        >
          <span>Lihat ringkasan fitur</span>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700">
            <ArrowDown className="h-3 w-3" />
          </span>
        </button>
      </div>
    </section>
  );
};
