import { supabase } from '../lib/supabase';
import type { Faq, TableInsert, TableUpdate } from '../types/database';

export async function getFaqs(onlyActive = true): Promise<Faq[]> {
  let query = supabase
    .from('faqs')
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

export async function createFaq(faq: TableInsert<'faqs'>): Promise<Faq> {
  const { data, error } = await supabase
    .from('faqs')
    .insert(faq)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFaq(id: number, updates: TableUpdate<'faqs'>): Promise<Faq> {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFaq(id: number): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
