import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  const [tab, setTab] = useState<'desa' | 'siakad' | 'umkm'>('desa');

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Layanan RynCode
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mt-1.5">
            Tiga pilar utama yang saling terhubung: desa digital, sistem akademik terintegrasi, dan penguatan ekonomi melalui UMKM.
          </p>
        </div>

        {/* Tab pill */}
        <div className="inline-flex rounded-full bg-slate-100/90 border border-slate-200/90 p-1 text-xs font-semibold text-slate-600 dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-300">
          <button
            type="button"
            onClick={() => setTab('desa')}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              tab === 'desa'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Desa Digital
          </button>
          <button
            type="button"
            onClick={() => setTab('siakad')}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              tab === 'siakad'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            SIAKAD SD–SMA/SMK
          </button>
          <button
            type="button"
            onClick={() => setTab('umkm')}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              tab === 'umkm'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            UMKM
          </button>
        </div>
      </div>

      {/* Tab 1: Desa Digital */}
      {tab === 'desa' && (
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-4 md:gap-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Platform Desa Digital
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Digitalisasi tata kelola desa untuk layanan publik yang lebih cepat, transparan, dan terdokumentasi rapi.
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-700 dark:text-slate-100">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Layanan Administrasi
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Surat keterangan & kependudukan</li>
                  <li>Pelacakan status permohonan warga</li>
                  <li>Pengarsipan dokumen digital aman</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Data & Aset Desa
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Inventaris aset desa terpadu</li>
                  <li>Data penerima program & bantuan</li>
                  <li>Dashboard pelaporan APBDes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/80 p-6 text-xs text-slate-800 dark:bg-emerald-500/10 dark:text-slate-100 flex flex-col justify-center">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Manfaat untuk Pemerintah Desa</span>
            </div>
            <ul className="space-y-2.5 text-slate-700 dark:text-slate-200 text-xs">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Pengambilan keputusan berbasis data real-time kependudukan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Jejak audit layanan publik dan surat permohonan yang jelas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Kepercayaan warga desa meningkat melalui keterbukaan informasi.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: SIAKAD */}
      {tab === 'siakad' && (
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-4 md:gap-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Sistem Informasi Akademik (SIAKAD)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              SIAKAD terintegrasi untuk SD, SMP, SMA, dan SMK dengan alur kerja yang familiar bagi guru dan tenaga kependidikan.
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-700 dark:text-slate-100">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Manajemen Data Sekolah
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Data siswa & orang tua wali</li>
                  <li>Data guru, mata pelajaran & staf</li>
                  <li>Rombongan belajar & jadwal kelas</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Akademik & Rapor
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Input nilai harian, formatif, sumatif</li>
                  <li>Rapor digital & unduh format resmi PDF</li>
                  <li>Rekap absensi & analitik perkembangan siswa</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/80 p-6 text-xs text-slate-800 dark:bg-emerald-500/10 dark:text-slate-100 flex flex-col justify-center">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Manfaat untuk Sekolah & Guru</span>
            </div>
            <ul className="space-y-2.5 text-slate-700 dark:text-slate-200 text-xs">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Pengisian rapor jauh lebih cepat, akurat, dan tanpa stres.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Orang tua dapat memantau capaian belajar anak secara transparan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Data akademik rapi dan siap kapan pun untuk keperluan akreditasi.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: UMKM */}
      {tab === 'umkm' && (
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-4 md:gap-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Portal UMKM & Ekonomi Desa
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Membantu pelaku UMKM desa masuk ke ekosistem digital nasional tanpa mempersulit alur kerja harian.
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-700 dark:text-slate-100">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Manajemen Produk
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Katalog produk digital desa</li>
                  <li>Foto produk, varian harga, dan stok</li>
                  <li>Label produk unggulan desa</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-bold mb-2 text-slate-900 dark:text-slate-100 text-xs">
                  Pesanan & Distribusi
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <li>Pencatatan pesanan & order masuk</li>
                  <li>Terhubung ke kanal WhatsApp toko</li>
                  <li>Laporan penjualan sederhana per pelaku</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/80 p-6 text-xs text-slate-800 dark:bg-emerald-500/10 dark:text-slate-100 flex flex-col justify-center">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Manfaat untuk Pelaku UMKM</span>
            </div>
            <ul className="space-y-2.5 text-slate-700 dark:text-slate-200 text-xs">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Branding dan visibilitas produk desa meningkat signifikan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Jangkauan pasar meluas hingga ke luar daerah dan kota besar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Pembukuan dan rekonsiliasi arus kas harian jauh lebih rapi.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
