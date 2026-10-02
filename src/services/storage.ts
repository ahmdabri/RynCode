import { supabase } from '../lib/supabase';

export async function uploadImage(
  bucket: 'partners' | 'settings',
  file: File
): Promise<string> {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Hanya file gambar (JPG, PNG, WebP, SVG) yang diperbolehkan.');
  }

  const maxSize = 2 * 1024 * 1024; // 2 MB
  if (file.size > maxSize) {
    throw new Error('Ukuran file maksimal 2 MB.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteImage(
  bucket: 'partners' | 'settings',
  publicUrl: string
): Promise<void> {
  try {
    const urlParts = publicUrl.split(`/${bucket}/`);
    if (urlParts.length > 1) {
      const filePath = urlParts[1].split('?')[0];
      await supabase.storage.from(bucket).remove([filePath]);
    }
  } catch (err) {
    console.error('Failed to remove image from storage:', err);
  }
}
