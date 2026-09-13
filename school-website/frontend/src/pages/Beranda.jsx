import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import CardBerita from '../components/CardBerita.jsx';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

function SectionHeader({ title, linkLabel, linkTo }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1">Terbaru</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-700">{title}</h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
        >
          {linkLabel}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white shadow-card overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-24 skeleton rounded-full" />
        <div className="h-5 w-full skeleton rounded-md" />
        <div className="h-5 w-3/4 skeleton rounded-md" />
        <div className="h-4 w-full skeleton rounded-md" />
        <div className="h-4 w-2/3 skeleton rounded-md" />
      </div>
    </div>
  );
}

export default function Beranda() {
  const [berita,    setBerita]    = useState([]);
  const [statistik, setStatistik] = useState(null);
  const [galeri,    setGaleri]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [beritaRes, statistikRes, galeriRes] = await Promise.all([
          api.get('/berita'),
          api.get('/statistik'),
          api.get('/galeri'),
        ]);
        setBerita(beritaRes.data.data.slice(0, 3));
        setStatistik(statistikRes.data.data);
        setGaleri(galeriRes.data.data.slice(0, 6));
      } catch {
        setError('Gagal memuat data dari server. Pastikan backend berjalan.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <Hero jumlahGuru={statistik?.jumlahGuru} jumlahSiswa={statistik?.jumlahSiswa} />

      <main className="flex-1">
        {/* Error Banner */}
        {error && (
          <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
            <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-5 py-3 text-sm text-red-600">
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Berita Section */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <SectionHeader title="Berita & Kegiatan Terbaru" linkLabel="Semua berita" linkTo="/" />

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : berita.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 mb-4">
                <svg className="h-8 w-8 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-sm text-navy-400">Belum ada berita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {berita.map((b) => <CardBerita key={b.id} berita={b} />)}
            </div>
          )}
        </section>

        {/* CTA Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy-700 to-navy-900 py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-navy-500/30 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">Bergabunglah Bersama Kami</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Temukan potensi terbaik putra-putri Anda
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm text-navy-200 leading-relaxed">
              Dengan lebih dari ratusan siswa berprestasi dan puluhan kegiatan ekstrakurikuler, SMA N 1 RAJABASA PERMAI PLUS adalah tempat yang tepat untuk berkembang.
            </p>
            <a
              href="/profil-sekolah"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3 text-sm font-bold text-navy-900 shadow-glow-gold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Pelajari Profil Sekolah →
            </a>
          </div>
        </section>

        {/* Galeri Section */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <SectionHeader title="Galeri Kegiatan" linkLabel="Lihat semua" linkTo="/galeri" />

          {galeri.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-navy-400">Belum ada foto galeri.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {galeri.map((g, idx) => (
                <div
                  key={g.id}
                  className={`group overflow-hidden rounded-xl border border-navy-100 bg-navy-50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
                    idx === 0 ? 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2' : ''
                  }`}
                  style={{ aspectRatio: idx === 0 ? 'auto' : '1/1' }}
                >
                  <div className={idx === 0 ? 'h-full min-h-[160px] sm:min-h-[200px]' : 'aspect-square'}>
                    <img
                      src={`${API_ORIGIN}${g.foto}`}
                      alt={g.judul || 'Galeri'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
