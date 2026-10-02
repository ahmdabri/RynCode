import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../../services/testimonials';
import type { Testimonial } from '../../../types/database';
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

export const TestimonialsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials', 'admin'],
    queryFn: () => getTestimonials(false),
  });

  const filtered = testimonials.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      (t.role && t.role.toLowerCase().includes(q)) ||
      t.quote.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setRole('');
    setQuote('');
    setSortOrder(testimonials.length + 1);
    setIsActive(true);
    setIsFormOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingItem(t);
    setName(t.name);
    setRole(t.role || '');
    setQuote(t.quote);
    setSortOrder(t.sort_order);
    setIsActive(t.is_active);
    setIsFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingItem) {
        return updateTestimonial(editingItem.id, {
          name,
          role,
          quote,
          sort_order: sortOrder,
          is_active: isActive,
        });
      } else {
        return createTestimonial({
          name,
          role,
          quote,
          sort_order: sortOrder,
          is_active: isActive,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      success(editingItem ? 'Testimoni diperbarui.' : 'Testimoni berhasil ditambahkan.');
      setIsFormOpen(false);
    },
    onError: () => error('Gagal menyimpan testimoni.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteTarget) return;
      await deleteTestimonial(deleteTarget.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      success('Testimoni berhasil dihapus.');
      setDeleteTarget(null);
    },
    onError: () => error('Gagal menghapus testimoni.'),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      error('Nama dan kutipan testimoni wajib diisi.');
      return;
    }
    saveMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Manajemen Testimoni
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ulasan dan kata mitra yang ditampilkan pada landing page.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Tambah Testimoni</span>
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
          placeholder="Cari mitra / peran / kutipan..."
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Urutan</th>
                <th className="py-3 px-4">Nama Mitra</th>
                <th className="py-3 px-4">Peran / Instansi</th>
                <th className="py-3 px-4">Kutipan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Memuat data testimoni...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada testimoni yang ditemukan.
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
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {item.role || '-'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      "{item.quote}"
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
        title={editingItem ? 'Edit Testimoni' : 'Tambah Testimoni'}
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <Input
            label="Nama Mitra / Lembaga"
            placeholder="Contoh: Desa Sukorejo / SMPN 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Peran / Jabatan"
            placeholder="Contoh: Sekretaris Desa / Kepala Sekolah"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <Textarea
            label="Kutipan Testimoni"
            placeholder="Tuliskan ulasan atau pengalaman mitra..."
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
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
                  Aktif (tampil di landing page)
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
        title="Hapus Testimoni"
        message={`Apakah Anda yakin ingin menghapus ulasan dari "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
