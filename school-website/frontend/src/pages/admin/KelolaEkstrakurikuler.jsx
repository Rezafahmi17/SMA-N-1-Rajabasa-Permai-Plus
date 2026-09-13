import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import FormModal from '../../components/admin/FormModal.jsx';
import Toast from '../../components/admin/Toast.jsx';
import api from '../../services/api';

const emptyForm = { nama: '', deskripsi: '', pembina: '', foto: null };

export default function KelolaEkstrakurikuler() {
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
    const res = await api.get('/ekstrakurikuler');
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
    setForm({ nama: row.nama, deskripsi: row.deskripsi || '', pembina: row.pembina || '', foto: null });
    setModalOpen(true);
  }

  async function handleDelete(row) {
    if (!confirm(`Hapus ekstrakurikuler "${row.nama}"?`)) return;
    try {
      await api.delete(`/ekstrakurikuler/${row.id}`);
      showToast('Ekstrakurikuler berhasil dihapus');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menghapus data', 'error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('nama', form.nama);
      fd.append('deskripsi', form.deskripsi);
      fd.append('pembina', form.pembina);
      if (form.foto) fd.append('foto', form.foto);

      if (editing) {
        await api.put(`/ekstrakurikuler/${editing.id}`, fd);
        showToast('Ekstrakurikuler berhasil diperbarui');
      } else {
        await api.post('/ekstrakurikuler', fd);
        showToast('Ekstrakurikuler berhasil ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan data', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  const columns = [
    { key: 'nama', label: 'Nama' },
    { key: 'pembina', label: 'Pembina' },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Kelola Ekstrakurikuler" />
        <main className="p-8">
          <div className="mb-4 flex justify-end">
            <button onClick={openCreate} className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-cream hover:bg-navy-700">
              + Tambah Ekstrakurikuler
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
          title={editing ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          submitting={submitting}
        >
          <div>
            <label className="text-sm font-medium text-navy-700">Nama</label>
            <input
              type="text"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700">Pembina</label>
            <input
              type="text"
              value={form.pembina}
              onChange={(e) => setForm({ ...form, pembina: e.target.value })}
              className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700">Deskripsi</label>
            <textarea
              rows={4}
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
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
