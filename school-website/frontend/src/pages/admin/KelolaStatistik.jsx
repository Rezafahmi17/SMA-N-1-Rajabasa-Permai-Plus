import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import Toast from '../../components/admin/Toast.jsx';
import api from '../../services/api';

export default function KelolaStatistik() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    api.get('/statistik').then((res) => {
      setForm(res.data.data);
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/statistik', form);
      showToast('Statistik berhasil diperbarui');
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan statistik', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Kelola Statistik" />
        <main className="p-8">
          {loading || !form ? (
            <p className="text-sm text-navy-400">Memuat data...</p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-sm space-y-4 rounded-lg border border-navy-100 bg-white p-6">
              <div>
                <label className="text-sm font-medium text-navy-700">Jumlah Guru</label>
                <input
                  type="number"
                  min="0"
                  value={form.jumlahGuru}
                  onChange={(e) => setForm({ ...form, jumlahGuru: Number(e.target.value) })}
                  className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-700">Jumlah Siswa</label>
                <input
                  type="number"
                  min="0"
                  value={form.jumlahSiswa}
                  onChange={(e) => setForm({ ...form, jumlahSiswa: Number(e.target.value) })}
                  className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-navy-600 px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy-700 disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
