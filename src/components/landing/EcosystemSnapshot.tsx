import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

interface EcosystemSnapshotProps {
  persona: 'desa' | 'sekolah' | 'umkm';
}

const personaLines: Record<'desa' | 'sekolah' | 'umkm', string[]> = {
  desa: [
    'Panel Desa Digital · Dashboard layanan online · Administrasi surat & penduduk · Inventaris & aset desa · Integrasi website desa',
    'Modul Kependudukan · Cetak surat pengantar otomatis · Validasi NIK warga real-time · Rekap bansos & bantuan tepat sasaran',
    'Transparansi APBDes · Publikasi anggaran & progres pembangunan desa · Pelaporan digital siap audit',
  ],
  sekolah: [
    'SIAKAD SD–SMA/SMK · Akademik terpusat · Data siswa & guru · Penilaian & rapor kurikulum merdeka · Absensi kehadiran',
    'Portal Rapor Digital · Perhitungan nilai otomatis · Cetak lembar rapor PDF resmi dalam sekali klik',
    'Integrasi Orang Tua · Notifikasi kehadiran harian siswa · Jadwal ujian & kalender akademik terpadu',
  ],
  umkm: [
    'UMKM & Marketplace Lokal · Katalog produk desa · Kelola produk, stok, dan pesanan UMKM dalam satu portal · Terhubung dengan sistem desa & sekolah',
    'Etalase Digital Produk Unggulan · Foto beresolusi tinggi · Checkout pesanan terhubung langsung ke WhatsApp penjual',
    'Laporan Omset & Penjualan · Pembukuan harian praktis untuk pelaku usaha mikro & kelompok tani desa',
  ],
};

export const EcosystemSnapshot: React.FC<EcosystemSnapshotProps> = ({ persona }) => {
  const currentLines = personaLines[persona];
  const typedText = useTypewriter(currentLines, 45, 20, 2200);

  return (
    <div className="relative group">
      {/* Background glow effect */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/15 via-emerald-400/10 to-transparent blur-2xl rounded-3xl opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Snapshot Card */}
      <div className="relative rounded-2xl border border-slate-200/90 bg-white/80 dark:border-slate-800 dark:bg-[#0b1329]/90 backdrop-blur-md p-5 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-emerald-500/10 hover:border-emerald-500/40 flex flex-col gap-3.5 text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 ml-2">
              Snapshot Ekosistem
            </span>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Real-time
          </span>
        </div>

        {/* Terminal Screen Monospace */}
        <div className="rounded-xl border border-slate-900/60 bg-[#030712] text-emerald-100 p-4 font-mono text-[11px] leading-relaxed shadow-inner min-h-[140px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] text-emerald-400/90 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                mesin ketik ekosistem [mode: <span className="text-white font-bold">{persona.toUpperCase()}</span>]
              </span>
            </div>
            <div className="whitespace-pre-wrap break-words text-slate-200">
              <span className="text-emerald-400 mr-2 select-none">&gt;</span>
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 translate-y-0.5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <span>Fitur berganti otomatis sesuai persona aktif.</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Terhubung</span>
          </div>
        </div>
      </div>
    </div>
  );
};
