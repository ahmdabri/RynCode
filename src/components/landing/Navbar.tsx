import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const { data: settings } = useSettings();
  const { info } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Beranda' },
    { id: 'feature-overview', label: 'Fitur' },
    { id: 'services', label: 'Layanan' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'partners', label: 'Partner' },
    { id: 'testimonials', label: 'Testimoni' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    onNavigate('contact');
    info('Silakan isi formulir atau hubungi kami langsung via WhatsApp.');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#030712]/90 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {settings?.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings.name || 'RynCode'}
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/logo.png';
                }}
              />
            ) : (
              <img
                src="/images/logo.png"
                alt="RynCode"
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            )}
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
              {settings?.name || 'RynCode'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Desa Digital · SIAKAD · UMKM
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`transition-colors duration-150 py-1 hover:text-emerald-500 dark:hover:text-emerald-400 ${
                  isActive ? 'text-emerald-500 dark:text-emerald-400 font-semibold' : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA and controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-300/80 bg-white/80 text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* CTA Diskusi Kebutuhan */}
          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm hover:bg-emerald-500/20 transition dark:border-emerald-500/80 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25"
          >
            <span>Diskusi Kebutuhan</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Admin Login link */}
          <Link
            to="/admin/login"
            className="hidden md:inline-flex items-center text-[11px] font-medium text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 px-2 py-1 rounded-md transition"
            title="Panel Admin"
          >
            Admin
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 text-xs shadow-sm hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-[#030712]/95 px-4 py-3 flex flex-col gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className={`py-2 px-2 rounded-lg flex items-center justify-between transition ${
                activeSection === link.id
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              <span>{link.label}</span>
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link
              to="/admin/login"
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 py-1"
            >
              Masuk Panel Admin →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
