import { supabase } from '../lib/supabase';
import type { ContactMessage, TableInsert } from '../types/database';

export async function getMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createMessage(message: TableInsert<'contact_messages'>): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .insert(message);

  if (error) throw error;
}

export async function markMessageRead(id: number, is_read: boolean): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteMessage(id: number): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
