import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSettings } from '../../hooks/useSettings';
import { createMessage } from '../../services/messages';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  message: z.string().min(1, 'Pesan wajib diisi'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const { data: settings } = useSettings();
  const { success, error } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setIsSubmitted(true);
      reset();
      success('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    } catch (err: unknown) {
      console.error('Error sending message:', err);
      error('Gagal mengirim pesan. Silakan coba kembali.');
    }
  };

  const email = settings?.email || 'ahmadambari044@gmail.com';
  const wa = settings?.wa || '+62-8129-2711-935';
  const cleanWa = wa.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl border border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 p-6 sm:p-10 flex flex-col gap-8 shadow-xl transition-all duration-300 hover:border-emerald-500/80 dark:border-emerald-500/40 dark:from-emerald-950/20 dark:via-slate-900/90 dark:to-slate-950">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-emerald-500/20 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Siap memulai transformasi digital?
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Kami siap mendampingi dari tahap asesmen, konfigurasi modul, hingga pelatihan dan implementasi di lapangan.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-950/60 p-4 rounded-2xl border border-emerald-500/30 shrink-0">
            <div className="font-bold text-slate-900 dark:text-white">Kontak Langsung:</div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-emerald-500" />
              <span>Email: </span>
              <a
                href={`mailto:${email}`}
                className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-emerald-500" />
              <span>WhatsApp: </span>
              <a
                href={`https://wa.me/${cleanWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {wa}
              </a>
            </div>
          </div>
        </div>

        {/* Form and Notes */}
        <div className="grid sm:grid-cols-12 gap-8 text-xs">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="sm:col-span-7 space-y-4"
          >
            <div>
              <label
                htmlFor="contact_name"
                className="block mb-1 font-semibold text-slate-800 dark:text-slate-200"
              >
                Nama Lengkap
              </label>
              <input
                id="contact_name"
                type="text"
                placeholder="Contoh: Budi Santoso"
                {...register('name')}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 ${
                  errors.name ? 'border-rose-500' : ''
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-rose-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact_email"
                className="block mb-1 font-semibold text-slate-800 dark:text-slate-200"
              >
                Email
              </label>
              <input
                id="contact_email"
                type="email"
                placeholder="budi@desa.id atau email@sekolah.sch.id"
                {...register('email')}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 ${
                  errors.email ? 'border-rose-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-rose-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact_message"
                className="block mb-1 font-semibold text-slate-800 dark:text-slate-200"
              >
                Pesan / Kebutuhan
              </label>
              <textarea
                id="contact_message"
                rows={4}
                placeholder="Ceritakan singkat kebutuhan sistem desa, sekolah, atau UMKM Anda..."
                {...register('message')}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 ${
                  errors.message ? 'border-rose-500' : ''
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-rose-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-emerald-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengirim pesan...</span>
                </>
              ) : (
                <>
                  <span>Kirim Pertanyaan</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>

            {isSubmitted && (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium pt-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Terima kasih! Pesan Anda telah tersimpan dan tim kami akan segera menghubungi Anda.</span>
              </div>
            )}
          </form>

          {/* Right info side */}
          <div className="sm:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/60 dark:border-slate-800 dark:bg-slate-950/40 p-5 leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Catatan Implementasi
              </div>
              <p className="text-xs">
                Form ini terhubung langsung ke basis data pengembang kami. Semua pertanyaan akan kami respon dalam 1×24 jam kerja.
              </p>
              <p className="text-xs">
                Untuk presentasi langsung atau diskusi mendesak di kantor pemerintahan desa / sekolah, Anda dapat langsung mengirim chat WhatsApp ke nomor yang tertera.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Privasi data dan kerahasiaan informasi desa / instansi pendidikan Anda terjamin.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
