import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../../../services/faqs';
import type { Faq } from '../../../types/database';
import { useToast } from '../../../context/ToastContext';
import { SearchInput } from '../../../components/admin/SearchInput';
import { Pagination } from '../../../components/admin/Pagination';
import { StatusBadge } from '../../../components/admin/StatusBadge';
import { ConfirmDeleteModal } from '../../../components/admin/ConfirmDeleteModal';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const FaqsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Faq | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);

  // Form states
  const [category, setCategory] = useState('Lisensi');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs', 'admin'],
    queryFn: () => getFaqs(false),
  });

  const filtered = faqs.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      (f.category && f.category.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openCreateModal = () => {
    setEditingItem(null);
    setCategory('Lisensi');
    setQuestion('');
    setAnswer('');
    setSortOrder(faqs.length + 1);
    setIsActive(true);
    setIsFormOpen(true);
  };

  const openEditModal = (f: Faq) => {
    setEditingItem(f);
    setCategory(f.category || 'Lisensi');
    setQuestion(f.question);
    setAnswer(f.answer);
    setSortOrder(f.sort_order);
    setIsActive(f.is_active);
    setIsFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingItem) {
        return updateFaq(editingItem.id, {
          category,
          question,
          answer,
          sort_order: sortOrder,
          is_active: isActive,
        });
      } else {
        return createFaq({
          category,
          question,
          answer,
          sort_order: sortOrder,
          is_active: isActive,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      success(editingItem ? 'FAQ diperbarui.' : 'FAQ berhasil ditambahkan.');
      setIsFormOpen(false);
    },
    onError: () => error('Gagal menyimpan FAQ.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteTarget) return;
      await deleteFaq(deleteTarget.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      success('FAQ berhasil dihapus.');
      setDeleteTarget(null);
    },
    onError: () => error('Gagal menghapus FAQ.'),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      error('Pertanyaan dan jawaban FAQ wajib diisi.');
      return;
    }
    saveMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Manajemen FAQ
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pertanyaan teknis dan implementasi untuk mempermudah calon mitra.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Tambah FAQ</span>
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Cari pertanyaan / jawaban..."
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Urutan</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Pertanyaan</th>
                <th className="py-3 px-4">Jawaban</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Memuat data FAQ...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada FAQ yang ditemukan.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-500">
                      {item.sort_order}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                        {item.category || '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {item.question}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-sm truncate">
                      {item.answer}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge isActive={item.is_active} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition"
                          title="Hapus"
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

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? 'Edit FAQ' : 'Tambah FAQ'}
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <Input
            label="Kategori Pertanyaan"
            placeholder="Contoh: Lisensi / Hosting / Biaya"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Input
            label="Pertanyaan"
            placeholder="Tuliskan pertanyaan umum..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <Textarea
            label="Jawaban Lengkap"
            placeholder="Tuliskan penjelasan dan solusi..."
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Urutan Tampil"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />

            <div className="flex flex-col justify-center">
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Status Tampil
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Aktif (tampil di FAQ)
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsFormOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={saveMutation.isPending}
            >
              Simpan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate()}
        title="Hapus FAQ"
        message={`Apakah Anda yakin ingin menghapus pertanyaan "${deleteTarget?.question}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
