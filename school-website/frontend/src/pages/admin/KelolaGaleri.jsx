import { useEffect, useRef, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import Toast from '../../components/admin/Toast.jsx';
import api from '../../services/api';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function KelolaGaleri() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [judul, setJudul] = useState('');
  const [toast, setToast] = useState(null);
  const fileRef = useRef(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await api.get('/galeri');
    setItems(res.data.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    if (!file) {
      showToast('Pilih foto terlebih dahulu', 'error');
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('foto', file);
      fd.append('judul', judul);
      await api.post('/galeri', fd);
      showToast('Foto berhasil ditambahkan');
      setJudul('');
      fileRef.current.value = '';
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal mengupload foto', 'error');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm('Hapus foto ini?')) return;
    try {
      await api.delete(`/galeri/${item.id}`);
      showToast('Foto berhasil dihapus');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menghapus foto', 'error');
    }
  }

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Kelola Galeri" />
        <main className="p-8">
          <form onSubmit={handleUpload} className="mb-8 flex flex-wrap items-end gap-3 rounded-lg border border-navy-100 bg-white p-4">
            <div>
              <label className="text-sm font-medium text-navy-700">Judul (opsional)</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="mt-1 block rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700">Foto</label>
              <input ref={fileRef} type="file" accept="image/*" className="mt-1 block text-sm" />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-cream hover:bg-navy-700 disabled:opacity-50"
            >
              {uploading ? 'Mengupload...' : 'Upload Foto'}
            </button>
          </form>

          {loading ? (
            <p className="text-sm text-navy-400">Memuat galeri...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-navy-400">Belum ada foto.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-lg border border-navy-100 bg-white">
                  <div className="aspect-square w-full overflow-hidden">
                    <img src={`${API_ORIGIN}${item.foto}`} alt={item.judul || 'Galeri'} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <p className="truncate text-xs text-navy-400">{item.judul || '-'}</p>
                    <button onClick={() => handleDelete(item)} className="text-xs font-medium text-red-600 hover:underline">
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
