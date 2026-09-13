import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../../components/admin/NavbarAdmin.jsx';
import api from '../../services/api';

export default function DashboardHome() {
  const [stats, setStats] = useState({ berita: 0, ekstrakurikuler: 0, galeri: 0, guru: 0, siswa: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [berita, ekskul, galeri, statistik] = await Promise.all([
        api.get('/berita'),
        api.get('/ekstrakurikuler'),
        api.get('/galeri'),
        api.get('/statistik'),
      ]);
      setStats({
        berita: berita.data.data.length,
        ekstrakurikuler: ekskul.data.data.length,
        galeri: galeri.data.data.length,
        guru: statistik.data.data.jumlahGuru,
        siswa: statistik.data.data.jumlahSiswa,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Berita', value: stats.berita },
    { label: 'Ekstrakurikuler', value: stats.ekstrakurikuler },
    { label: 'Foto Galeri', value: stats.galeri },
    { label: 'Tenaga Pendidik', value: stats.guru },
    { label: 'Siswa Aktif', value: stats.siswa },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin title="Dashboard" />
        <main className="p-8">
          {loading ? (
            <p className="text-sm text-navy-400">Memuat ringkasan data...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {cards.map((c) => (
                <div key={c.label} className="rounded-lg border border-navy-100 bg-white p-5">
                  <p className="font-serif text-3xl font-semibold text-navy-700">{c.value}</p>
                  <p className="mt-1 text-sm text-navy-400">{c.label}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
