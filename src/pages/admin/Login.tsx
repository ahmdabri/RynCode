import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: settings } = useSettings();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authLoading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authErr) throw authErr;

      if (data.session) {
        success('Berhasil masuk ke panel admin.');
        navigate('/admin/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message === 'Invalid login credentials' ? 'Email atau kata sandi salah.' : err.message);
      } else {
        setErrorMsg('Gagal masuk. Periksa koneksi internet Anda.');
      }
      error('Gagal login ke akun admin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-sm">
        {/* Brand Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center mx-auto overflow-hidden">
              {settings?.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.name || 'RynCode'}
                  className="h-9 w-9 object-contain"
                />
              ) : (
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Admin {settings?.name || 'RynCode'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masuk untuk mengelola konten dan sistem
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@ryncode.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Kata Sandi"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              className="w-full mt-2"
            >
              Masuk ke Dashboard
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-800">
            <a
              href="/"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
