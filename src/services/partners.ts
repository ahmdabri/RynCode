import { supabase } from '../lib/supabase';
import type { Partner, TableInsert, TableUpdate } from '../types/database';

export async function getPartners(onlyActive = true): Promise<Partner[]> {
  let query = supabase
    .from('partners')
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

export async function createPartner(partner: TableInsert<'partners'>): Promise<Partner> {
  const { data, error } = await supabase
    .from('partners')
    .insert(partner)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePartner(id: number, updates: TableUpdate<'partners'>): Promise<Partner> {
  const { data, error } = await supabase
    .from('partners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePartner(id: number): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
