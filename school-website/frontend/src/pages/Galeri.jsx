import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GaleriGrid from '../components/GaleriGrid.jsx';
import api from '../services/api';

export default function Galeri() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/galeri').then((res) => {
      setItems(res.data.data);
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
                <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid4)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-semibold text-gold-300 tracking-wider uppercase">Dokumentasi</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Galeri Sekolah</h1>
            <p className="mt-3 max-w-2xl text-navy-200 leading-relaxed">
              Dokumentasi kegiatan dan momen berharga di lingkungan SMA N 1 RAJABASA PERMAI PLUS.
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="aspect-square skeleton rounded-xl" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-50 mb-4 text-navy-300">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-700 mb-2">Belum Ada Foto</h3>
              <p className="text-sm text-navy-400">Galeri foto sedang dalam proses penambahan.</p>
            </div>
          ) : (
            <GaleriGrid items={items} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
