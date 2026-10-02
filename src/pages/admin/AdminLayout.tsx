import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareQuote,
  Handshake,
  FolderGit2,
  HelpCircle,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../../services/messages';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { data: siteSettings } = useSettings();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Unread messages counter
  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
    refetchInterval: 15000,
  });
  const unreadCount = messages.filter((m) => !m.is_read).length;

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimoni' },
    { to: '/admin/partners', icon: Handshake, label: 'Partner' },
    { to: '/admin/portfolios', icon: FolderGit2, label: 'Portofolio' },
    { to: '/admin/faqs', icon: HelpCircle, label: 'FAQ' },
    {
      to: '/admin/messages',
      icon: Mail,
      label: 'Pesan Masuk',
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { to: '/admin/settings', icon: Settings, label: 'Pengaturan' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#030712] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center overflow-hidden">
                {siteSettings?.logo_url ? (
                  <img
                    src={siteSettings.logo_url}
                    alt="Logo"
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold text-emerald-500">RC</span>
                )}
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">
                  {siteSettings?.name || 'RynCode'} Admin
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Control Center
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? 'text-slate-950' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                            isActive
                              ? 'bg-slate-950 text-emerald-400'
                              : 'bg-emerald-500 text-slate-950'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {user?.email || 'admin@ryncode.id'}
          </div>

          <div className="flex items-center gap-2 px-1">
            <Link
              to="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Lihat Web</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-rose-500 hover:bg-rose-500/10 transition"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition"
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
