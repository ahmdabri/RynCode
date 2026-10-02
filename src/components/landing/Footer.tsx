import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { data: settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-[#030712] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            {settings?.name || 'RynCode'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Mengakar di desa, bertumbuh bersama sekolah dan UMKM.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <div>
            &copy; {currentYear} {settings?.name || 'RynCode'}. All rights reserved.
          </div>
          <Link
            to="/admin/login"
            className="hover:text-emerald-500 dark:hover:text-emerald-400 transition"
          >
            Akses Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};
