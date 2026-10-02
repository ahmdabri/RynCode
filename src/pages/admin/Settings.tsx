import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../../services/settings';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  const [name, setName] = useState('');
  const [wa, setWa] = useState('');
  const [email, setEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setName(settings.name || 'RynCode');
      setWa(settings.wa || '');
      setEmail(settings.email || '');
      setLogoUrl(settings.logo_url || null);
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      success('Pengaturan umum berhasil disimpan.');
    },
    onError: (err: unknown) => {
      console.error(err);
      error('Gagal memperbarui pengaturan.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      wa,
      email,
      logo_url: logoUrl,
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-slate-500">Memuat pengaturan...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Pengaturan Umum Situs
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Kelola identitas situs, logo, dan kontak resmi yang tampil di landing page.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <ImageUpload
          bucket="settings"
          currentUrl={logoUrl}
          onUploadSuccess={(url) => setLogoUrl(url)}
          onRemove={() => setLogoUrl(null)}
          label="Logo Utama Situs"
          helperText="Tampil di navbar header, footer, dan favicon. Format PNG/WebP transparan disarankan."
        />

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Input
            label="Nama Situs / Brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="RynCode"
            required
          />

          <Input
            label="Nomor WhatsApp"
            value={wa}
            onChange={(e) => setWa(e.target.value)}
            placeholder="+62-8129-2711-935"
            helperText="Nomor untuk tombol floating WA dan kontak langsung."
          />

          <Input
            label="Email Resmi"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kontak@ryncode.id"
            helperText="Alamat email korespondensi yang ditampilkan kepada calon mitra."
          />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            loading={mutation.isPending}
            className="px-6"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
