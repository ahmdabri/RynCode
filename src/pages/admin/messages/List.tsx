import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMessages,
  markMessageRead,
  deleteMessage,
} from '../../../services/messages';
import type { ContactMessage } from '../../../types/database';
import { useToast } from '../../../context/ToastContext';
import { SearchInput } from '../../../components/admin/SearchInput';
import { Pagination } from '../../../components/admin/Pagination';
import { ConfirmDeleteModal } from '../../../components/admin/ConfirmDeleteModal';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react';

export const MessagesList: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const [search, setSearch] = useState('');
  const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected for view & delete
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filterRead === 'unread') return !m.is_read;
    if (filterRead === 'read') return m.is_read;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const markMutation = useMutation({
    mutationFn: async ({ id, is_read }: { id: number; is_read: boolean }) => {
      await markMessageRead(id, is_read);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: () => error('Gagal memperbarui status pesan.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteTarget) return;
      await deleteMessage(deleteTarget.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      success('Pesan berhasil dihapus.');
      setDeleteTarget(null);
    },
    onError: () => error('Gagal menghapus pesan.'),
  });

  const handleOpenDetail = (m: ContactMessage) => {
    setViewingMessage(m);
    if (!m.is_read) {
      markMutation.mutate({ id: m.id, is_read: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Pesan Masuk (Kontak)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pesan dan permohonan konsultasi yang dikirim melalui formulir kontak landing page.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-900 p-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setFilterRead('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full transition ${
              filterRead === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Semua ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterRead('unread');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full transition ${
              filterRead === 'unread'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Belum Dibaca ({messages.filter((m) => !m.is_read).length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterRead('read');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full transition ${
              filterRead === 'read'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Sudah Dibaca
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Cari pengirim / email / isi pesan..."
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pengirim</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Pesan</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Memuat pesan masuk...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada pesan masuk.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                      !item.is_read ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.04]' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      {item.is_read ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                          <MailOpen className="h-3.5 w-3.5" />
                          <span>Dibaca</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Baru</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <a
                        href={`mailto:${item.email}`}
                        className="hover:text-emerald-500 hover:underline"
                      >
                        {item.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {item.message}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          className="p-1 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition"
                          title="Lihat Detail Pesan"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            markMutation.mutate({
                              id: item.id,
                              is_read: !item.is_read,
                            })
                          }
                          className="p-1 rounded-lg text-slate-500 hover:text-sky-500 hover:bg-sky-500/10 transition"
                          title={item.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                        >
                          {item.is_read ? (
                            <Mail className="h-3.5 w-3.5" />
                          ) : (
                            <MailOpen className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition"
                          title="Hapus Pesan"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
        />
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!viewingMessage}
        onClose={() => setViewingMessage(null)}
        title="Detail Pesan Masuk"
        maxWidth="md"
      >
        {viewingMessage && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <div>
                <span className="text-slate-500">Dari: </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {viewingMessage.name}
                </span>{' '}
                <span className="text-slate-400">({viewingMessage.email})</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Waktu:{' '}
                {viewingMessage.created_at
                  ? new Date(viewingMessage.created_at).toLocaleString('id-ID', {
                      dateStyle: 'full',
                      timeStyle: 'medium',
                    })
                  : '-'}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Isi Pesan:
              </label>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {viewingMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${viewingMessage.email}?subject=Balasan RynCode: Permohonan Transformasi Digital`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Balas via Email</span>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingMessage(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate()}
        title="Hapus Pesan"
        message={`Apakah Anda yakin ingin menghapus pesan dari "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
