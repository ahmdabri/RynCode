import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  MessageSquareQuote,
  Handshake,
  FolderGit2,
  HelpCircle,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { getTestimonials } from '../../services/testimonials';
import { getPartners } from '../../services/partners';
import { getPortfolios } from '../../services/portfolios';
import { getFaqs } from '../../services/faqs';
import { getMessages } from '../../services/messages';

export const Dashboard: React.FC = () => {
  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials', 'admin'],
    queryFn: () => getTestimonials(false),
  });

  const { data: partners = [] } = useQuery({
    queryKey: ['partners', 'admin'],
    queryFn: () => getPartners(false),
  });

  const { data: portfolios = [] } = useQuery({
    queryKey: ['portfolios', 'admin'],
    queryFn: () => getPortfolios(false),
  });

  const { data: faqs = [] } = useQuery({
    queryKey: ['faqs', 'admin'],
    queryFn: () => getFaqs(false),
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });

  const unreadMessages = messages.filter((m) => !m.is_read);

  const stats = [
    {
      title: 'Total Testimoni',
      count: testimonials.length,
      icon: MessageSquareQuote,
      to: '/admin/testimonials',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Total Partner',
      count: partners.length,
      icon: Handshake,
      to: '/admin/partners',
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
    },
    {
      title: 'Total Portofolio',
      count: portfolios.length,
      icon: FolderGit2,
      to: '/admin/portfolios',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: 'Total FAQ',
      count: faqs.length,
      icon: HelpCircle,
      to: '/admin/faqs',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      title: 'Pesan Masuk',
      count: messages.length,
      unread: unreadMessages.length,
      icon: Mail,
      to: '/admin/messages',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Ringkasan Statistik
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pantau seluruh modul dan pesan masuk secara terpusat.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.to}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`h-9 w-9 rounded-xl border flex items-center justify-center ${s.color}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                {s.unread !== undefined && s.unread > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                    {s.unread} baru
                  </span>
                )}
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {s.count}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 group-hover:text-emerald-500 transition-colors">
                  {s.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Messages Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Pesan Masuk Terbaru
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pertanyaan dari pengunjung form kontak
            </p>
          </div>
          <Link
            to="/admin/messages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Lihat Semua Pesan</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
            Belum ada pesan masuk dari pengunjung.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                      {m.name}
                    </span>
                    {!m.is_read && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" title="Belum dibaca" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {m.email}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs truncate max-w-lg mt-1">
                    {m.message}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 whitespace-nowrap">
                  {m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID') : '-'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
