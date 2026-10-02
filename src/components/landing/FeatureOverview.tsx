import React from 'react';
import { Home, GraduationCap, ShoppingBag, Cpu } from 'lucide-react';

export const FeatureOverview: React.FC = () => {
  const features = [
    {
      title: 'Desa Digital',
      icon: Home,
      items: [
        'Dashboard layanan administrasi & kependudukan.',
        'Inventaris aset desa & program bantuan.',
        'Integrasi dengan website resmi desa.',
      ],
    },
    {
      title: 'SIAKAD SD SMA/SMK',
      icon: GraduationCap,
      items: [
        'Data siswa, guru, dan rombel terpusat.',
        'Input nilai & rapor digital siap unduh.',
        'Rekap absensi dan analitik sederhana.',
      ],
    },
    {
      title: 'Portal UMKM',
      icon: ShoppingBag,
      items: [
        'Katalog produk desa dengan foto & harga.',
        'Pencatatan pesanan & status pengiriman.',
        'Laporan penjualan sederhana per pelaku.',
      ],
    },
    {
      title: 'Integrasi & support',
      icon: Cpu,
      items: [
        'Integrasi dengan sistem & domain yang sudah ada.',
        'Backup berkala dan monitoring kesehatan sistem.',
        'Support jarak jauh dan pendampingan on-site.',
      ],
    },
  ];

  return (
    <section id="feature-overview" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Ringkasan fitur utama
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Sekilas gambaran tiga pilar solusi dan dukungan teknis RynCode untuk desa, sekolah, dan pelaku UMKM.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 text-xs">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/40 hover:ring-1 hover:ring-emerald-500/20"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {feature.title}
                </div>
              </div>
              <ul className="mt-1 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 list-disc list-inside">
                {feature.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
