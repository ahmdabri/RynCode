import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../../../services/portfolios';
import type { Portfolio } from '../../../types/database';
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

export const PortfoliosList: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Portfolio | null>(null);

  // Form states
  const [category, setCategory] = useState('Desa Digital');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const { data: portfolios = [], isLoading } = useQuery({
    queryKey: ['portfolios', 'admin'],
    queryFn: () => getPortfolios(false),
  });

  const filtered = portfolios.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.summary && p.summary.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openCreateModal = () => {
    setEditingItem(null);
    setCategory('Desa Digital');
    setTitle('');
    setSummary('');
    setSortOrder(portfolios.length + 1);
    setIsActive(true);
    setIsFormOpen(true);
  };

  const openEditModal = (p: Portfolio) => {
    setEditingItem(p);
    setCategory(p.category || 'Desa Digital');
    setTitle(p.title);
    setSummary(p.summary || '');
    setSortOrder(p.sort_order);
    setIsActive(p.is_active);
    setIsFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingItem) {
        return updatePortfolio(editingItem.id, {
          category,
          title,
          summary,
          sort_order: sortOrder,
          is_active: isActive,
        });
      } else {
        return createPortfolio({
          category,
          title,
          summary,
          sort_order: sortOrder,
          is_active: isActive,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      success(editingItem ? 'Portofolio diperbarui.' : 'Portofolio berhasil ditambahkan.');
      setIsFormOpen(false);
    },
    onError: () => error('Gagal menyimpan portofolio.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteTarget) return;
      await deletePortfolio(deleteTarget.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      success('Portofolio berhasil dihapus.');
      setDeleteTarget(null);
    },
    onError: () => error('Gagal menghapus portofolio.'),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      error('Judul portofolio wajib diisi.');
      return;
    }
    saveMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Manajemen Portofolio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showcase implementasi RynCode di desa, sekolah, UMKM, dan infrastruktur backend.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Tambah Portofolio</span>
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
          placeholder="Cari portofolio / kategori..."
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
                <th className="py-3 px-4">Judul Implementasi</th>
                <th className="py-3 px-4">Ringkasan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Memuat data portofolio...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada portofolio yang ditemukan.
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
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {item.summary || '-'}
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
        title={editingItem ? 'Edit Portofolio' : 'Tambah Portofolio'}
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="Desa Digital">Desa Digital</option>
              <option value="SIAKAD">SIAKAD</option>
              <option value="UMKM">UMKM</option>
              <option value="Backend & Cloud">Backend & Cloud</option>
              <option value="Integrasi Lainnya">Integrasi Lainnya</option>
            </select>
          </div>

          <Input
            label="Judul Implementasi / Mitra"
            placeholder="Contoh: Desa Sukorejo / SMPN Harapan Bangsa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Ringkasan Implementasi"
            placeholder="Penjelasan singkat modul yang dipasang dan hasil implementasi..."
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
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
                  Aktif (tampil di portofolio)
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
        title="Hapus Portofolio"
        message={`Apakah Anda yakin ingin menghapus portofolio "${deleteTarget?.title}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
