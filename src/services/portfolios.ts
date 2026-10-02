import { supabase } from '../lib/supabase';
import type { Portfolio, TableInsert, TableUpdate } from '../types/database';

export async function getPortfolios(onlyActive = true): Promise<Portfolio[]> {
  let query = supabase
    .from('portfolios')
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

export async function createPortfolio(portfolio: TableInsert<'portfolios'>): Promise<Portfolio> {
  const { data, error } = await supabase
    .from('portfolios')
    .insert(portfolio)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePortfolio(id: number, updates: TableUpdate<'portfolios'>): Promise<Portfolio> {
  const { data, error } = await supabase
    .from('portfolios')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePortfolio(id: number): Promise<void> {
  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
