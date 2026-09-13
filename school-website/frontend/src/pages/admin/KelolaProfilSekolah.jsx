import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import Toast from '../../components/admin/Toast.jsx';
import api from '../../services/api';

const fields = [
  { key: 'namaSekolah', label: 'Nama Sekolah' },
  { key: 'npsn', label: 'NPSN' },
  { key: 'akreditasi', label: 'Akreditasi' },
  { key: 'alamat', label: 'Alamat' },
  { key: 'kepalaSekolah', label: 'Kepala Sekolah' },
  { key: 'tahunBerdiri', label: 'Tahun Berdiri' },
  { key: 'kontak', label: 'Kontak' },
];

const textAreaFields = [
  { key: 'visi', label: 'Visi' },
  { key: 'misi', label: 'Misi' },
  { key: 'sejarah', label: 'Sejarah' },
];

export default function KelolaProfilSekolah() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    api.get('/profil-sekolah').then((res) => {
      setForm(res.data.data);
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profil-sekolah', form);
      showToast('Profil sekolah berhasil diperbarui');
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan profil sekolah', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Kelola Profil Sekolah" />
        <main className="p-8">
          {loading || !form ? (
            <p className="text-sm text-navy-400">Memuat data...</p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-lg border border-navy-100 bg-white p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-navy-700">{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {textAreaFields.map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-navy-700">{f.label}</label>
                  <textarea
                    rows={3}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="mt-1 w-full rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
                  />
                </div>
              ))}

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
