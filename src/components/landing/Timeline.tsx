import React, { useState } from 'react';

export const Timeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Konsultasi',
      subtitle: 'Memahami konteks mitra',
      detail:
        'Sesi konsultasi (online/offline) dengan perangkat desa, kepala sekolah, dan pelaku UMKM untuk memetakan kondisi awal, infrastruktur yang tersedia, dan prioritas masalah.',
    },
    {
      title: 'Analisis kebutuhan',
      subtitle: 'Menyusun solusi yang pas',
      detail:
        'Workshop kecil di kantor desa atau sekolah untuk menggambar alur kerja harian, jenis data yang dicatat, dan penyesuaian dengan regulasi daerah serta kurikulum nasional.',
    },
    {
      title: 'Implementasi',
      subtitle: 'Konfigurasi & peluncuran',
      detail:
        'Pemasangan sistem di server/lokal, input data awal, dan uji coba terbatas (pilot) di beberapa kelas atau unit layanan desa sebelum digunakan secara penuh oleh seluruh stakeholder.',
    },
    {
      title: 'Pendampingan',
      subtitle: 'Pelatihan & support',
      detail:
        'Sesi pelatihan intensif pengguna, simulasi penggunaan untuk layanan nyata, serta pendampingan on-site dan kanal support daring selama periode awal pemakaian.',
    },
  ];

  return (
    <section id="implementation-timeline" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Alur implementasi
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Proses terstruktur dari konsultasi hingga pendampingan berkelanjutan, memastikan mitra merasa ditemani di setiap langkah.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Step buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group rounded-2xl border p-4 flex flex-col items-start gap-1.5 text-left transition-all duration-200 ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/80 shadow-lg shadow-emerald-500/10 dark:border-emerald-400/80 dark:bg-slate-900'
                    : 'border-slate-200/90 bg-white hover:border-emerald-400/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900/60'
                }`}
              >
                <div className="inline-flex items-center gap-2">
                  <div
                    className={`h-6 w-6 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    {step.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed step box */}
        <div className="relative rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900/80 p-5 sm:p-6 text-xs text-slate-800 dark:text-slate-100 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400 mb-2">
            Langkah {activeStep + 1} dari {steps.length}
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {steps[activeStep].title} —{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {steps[activeStep].subtitle}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {steps[activeStep].detail}
          </p>
        </div>
      </div>
    </section>
  );
};
