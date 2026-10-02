import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../../../services/partners';
import type { Partner } from '../../../types/database';
import { useToast } from '../../../context/ToastContext';
import { SearchInput } from '../../../components/admin/SearchInput';
import { Pagination } from '../../../components/admin/Pagination';
import { StatusBadge } from '../../../components/admin/StatusBadge';
import { ConfirmDeleteModal } from '../../../components/admin/ConfirmDeleteModal';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const PartnersList: React.FC = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [type, setType] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners', 'admin'],
    queryFn: () => getPartners(false),
  });

  const filtered = partners.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.type && p.type.toLowerCase().includes(q)) ||
      (p.short_description && p.short_description.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setLabel('');
    setType('');
    setShortDescription('');
    setLogoUrl(null);
    setSortOrder(partners.length + 1);
    setIsActive(true);
    setIsFormOpen(true);
  };

  const openEditModal = (p: Partner) => {
    setEditingItem(p);
    setName(p.name);
    setLabel(p.label || '');
    setType(p.type || '');
    setShortDescription(p.short_description || '');
    setLogoUrl(p.logo_url || null);
    setSortOrder(p.sort_order);
    setIsActive(p.is_active);
    setIsFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingItem) {
        return updatePartner(editingItem.id, {
          name,
          label,
          type,
          short_description: shortDescription,
          logo_url: logoUrl,
          sort_order: sortOrder,
          is_active: isActive,
        });
      } else {
        return createPartner({
          name,
          label,
          type,
          short_description: shortDescription,
          logo_url: logoUrl,
          sort_order: sortOrder,
          is_active: isActive,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      success(editingItem ? 'Data partner diperbarui.' : 'Partner baru berhasil disimpan.');
      setIsFormOpen(false);
    },
    onError: () => error('Gagal menyimpan partner.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteTarget) return;
      await deletePartner(deleteTarget.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      success('Partner berhasil dihapus.');
      setDeleteTarget(null);
    },
    onError: () => error('Gagal menghapus partner.'),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error('Nama partner wajib diisi.');
      return;
    }
    saveMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Manajemen Partner &amp; Integrasi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Daftar mitra instansi, penyedia payment, cloud, dan tech partner.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Tambah Partner</span>
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
          placeholder="Cari partner / tipe..."
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Urutan</th>
                <th className="py-3 px-4">Logo</th>
                <th className="py-3 px-4">Nama Partner</th>
                <th className="py-3 px-4">Tipe</th>
                <th className="py-3 px-4">Deskripsi</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Memuat data partner...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada partner yang ditemukan.
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
                      <div className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                        {item.logo_url ? (
                          <img
                            src={item.logo_url}
                            alt={item.name}
                            className="h-7 w-7 object-contain"
                          />
                        ) : item.name.toLowerCase().includes('ryzz') ? (
                          <img
                            src="/images/ryzzbe.jpg"
                            alt="RYZZ BE"
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">
                            {item.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                      {item.type || '-'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {item.short_description || '-'}
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
        title={editingItem ? 'Edit Partner' : 'Tambah Partner'}
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <ImageUpload
            bucket="partners"
            currentUrl={logoUrl}
            onUploadSuccess={(url) => setLogoUrl(url)}
            onRemove={() => setLogoUrl(null)}
            label="Logo Partner"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nama Partner"
              placeholder="Contoh: Bank Daerah / RYZZ BE"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Tipe / Kategori"
              placeholder="Pemerintah / Cloud / Payment / Tech"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <Input
            label="Label Singkat"
            placeholder="Label badge partner (opsional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <Textarea
            label="Deskripsi Singkat Kemitraan"
            placeholder="Deskripsi singkat fungsi kemitraan..."
            rows={3}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
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
                  Aktif (tampil di slider)
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
        title="Hapus Partner"
        message={`Apakah Anda yakin ingin menghapus data partner "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
