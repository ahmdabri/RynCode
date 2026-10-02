import React from 'react';
import { UserCheck, Sliders, WifiOff, Network } from 'lucide-react';

export const WhyRyncode: React.FC = () => {
  const points = [
    {
      title: 'Pendampingan on-site',
      icon: UserCheck,
      description:
        'Tim kami siap mendampingi langsung saat implementasi awal dan pelatihan pengguna di desa atau sekolah.',
    },
    {
      title: 'Fleksibel regulasi',
      icon: Sliders,
      description:
        'Dapat disesuaikan dengan aturan daerah, kurikulum sekolah, dan kebutuhan format laporan yang berbeda-beda.',
    },
    {
      title: 'Online & offline',
      icon: WifiOff,
      description:
        'Tetap bisa digunakan di lingkungan dengan koneksi internet terbatas melalui mekanisme sinkronisasi terencana.',
    },
    {
      title: 'Satu ekosistem',
      icon: Network,
      description:
        'Data desa, sekolah, dan UMKM dapat saling terhubung untuk mendukung kebijakan pembangunan yang lebih tepat sasaran.',
    },
  ];

  return (
    <section id="why-ryncode" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Kenapa memilih RynCode?
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Kami tidak hanya menyediakan aplikasi, tetapi juga pendampingan dan penyesuaian dengan konteks desa, sekolah, dan UMKM di lapangan.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 text-xs">
        {points.map((point, idx) => {
          const Icon = point.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-5 flex flex-col gap-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {point.title}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed mt-1">
                {point.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
