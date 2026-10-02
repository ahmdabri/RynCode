import { supabase } from '../lib/supabase';
import type { Testimonial, TableInsert, TableUpdate } from '../types/database';

export async function getTestimonials(onlyActive = true): Promise<Testimonial[]> {
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (onlyActive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createTestimonial(testimonial: TableInsert<'testimonials'>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: number, updates: TableUpdate<'testimonials'>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: number): Promise<void> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
