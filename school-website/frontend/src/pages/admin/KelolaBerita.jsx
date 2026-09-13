import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import FormModal from '../../components/admin/FormModal.jsx';
import Toast from '../../components/admin/Toast.jsx';
import api from '../../services/api';

const emptyForm = { judul: '', isi: '', tanggal: '', foto: null };

export default function KelolaBerita() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await api.get('/berita');
    setList(res.data.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row) {
    setEditing(row);
    setForm({ judul: row.judul, isi: row.isi, tanggal: row.tanggal, foto: null });
    setModalOpen(true);
  }

  async function handleDelete(row) {
    if (!confirm(`Hapus berita "${row.judul}"?`)) return;
    try {
      await api.delete(`/berita/${row.id}`);
      showToast('Berita berhasil dihapus');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menghapus berita', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('judul', form.judul);
      fd.append('isi', form.isi);
      if (form.tanggal) fd.append('tanggal', form.tanggal);
      if (form.foto) fd.append('foto', form.foto);

      if (editing) {
        await api.put(`/berita/${editing.id}`, fd);
        showToast('Berita berhasil diperbarui');
      } else {
        await api.post('/berita', fd);
        showToast('Berita berhasil ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan berita', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  const columns = [
    { key: 'judul', label: 'Judul' },
    { key: 'tanggal', label: 'Tanggal' },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Kelola Berita" />
        <main className="p-8">
          <div className="mb-4 flex justify-end">
            <button onClick={openCreate} className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-cream hover:bg-navy-700">
              + Tambah Berita
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-navy-400">Memuat data...</p>
          ) : (
            <DataTable columns={columns} data={list} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </main>
      </div>

      {modalOpen && (
        <FormModal
          title={editing ? 'Edit Berita' : 'Tambah Berita'}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          submitting={submitting}
        >
          <div>
            <label className="text-sm font-medium text-navy-700">Judul</label>
            <input
              type="text"
              required
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700">Tanggal</label>
            <input
              type="date"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700">Isi Berita</label>
            <textarea
              required
              rows={5}
              value={form.isi}
              onChange={(e) => setForm({ ...form, isi: e.target.value })}
              className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700">Foto {editing && '(kosongkan jika tidak diubah)'}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, foto: e.target.files[0] })}
              className="mt-1 w-full text-sm"
            />
          </div>
        </FormModal>
      )}

      <Toast toast={toast} />
    </div>
  );
}
