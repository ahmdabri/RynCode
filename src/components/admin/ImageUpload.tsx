import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../../services/storage';

interface ImageUploadProps {
  bucket: 'partners' | 'settings';
  currentUrl?: string | null;
  onUploadSuccess: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  helperText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket,
  currentUrl,
  onUploadSuccess,
  onRemove,
  label = 'Upload Logo / Gambar',
  helperText = 'Format JPG, PNG, WebP, atau SVG. Maks 2 MB.',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsUploading(true);

    try {
      const publicUrl = await uploadImage(bucket, file);
      onUploadSuccess(publicUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Gagal mengunggah gambar.');
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        {/* Preview Container */}
        <div className="relative h-20 w-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
          {currentUrl ? (
            <img
              src={currentUrl}
              alt="Preview"
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-400" />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-emerald-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-500 transition"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>{currentUrl ? 'Ganti File' : 'Pilih Gambar'}</span>
            </button>

            {currentUrl && onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition"
              >
                <X className="h-3.5 w-3.5" />
                <span>Hapus</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />

          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {helperText}
          </span>
          {errorMsg && (
            <span className="text-[11px] text-rose-500 font-medium">
              {errorMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
