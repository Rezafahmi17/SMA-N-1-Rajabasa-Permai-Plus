import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CardEkstrakurikuler from '../components/CardEkstrakurikuler.jsx';
import api from '../services/api';

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white shadow-card overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 skeleton rounded-md" />
        <div className="h-3 w-1/2 skeleton rounded-full" />
        <div className="h-4 w-full skeleton rounded-md" />
        <div className="h-4 w-2/3 skeleton rounded-md" />
      </div>
    </div>
  );
}

export default function Ekstrakurikuler() {
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ekstrakurikuler').then((res) => {
      setList(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-600 py-16 text-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl animate-pulse-slow" />
            <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid3)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-semibold text-gold-300 tracking-wider uppercase">Kegiatan Siswa</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Ekstrakurikuler</h1>
            <p className="mt-3 max-w-2xl text-navy-200 leading-relaxed">
              Beragam kegiatan untuk mengembangkan minat dan bakat siswa di luar jam pelajaran.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
            <svg viewBox="0 0 1440 32" xmlns="http://www.w3.org/2000/svg" className="w-full fill-cream">
              <path d="M0,16 C360,32 1080,0 1440,16 L1440,32 L0,32 Z" />
            </svg>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-50 mb-4 text-navy-300">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-700 mb-2">Belum Ada Ekstrakurikuler</h3>
              <p className="text-sm text-navy-400">Data ekstrakurikuler sedang dalam proses penambahan.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {list.map((item) => (
                <CardEkstrakurikuler key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
