import { supabase } from '../lib/supabase';
import type { Setting, TableUpdate } from '../types/database';

export async function getSettings(): Promise<Setting | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
  return data;
}

export async function updateSettings(updates: TableUpdate<'settings'>): Promise<Setting> {
  const { data, error } = await supabase
    .from('settings')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
}
