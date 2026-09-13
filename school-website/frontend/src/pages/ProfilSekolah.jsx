import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import TabelProfilSekolah from '../components/TabelProfilSekolah.jsx';
import api from '../services/api';

function PageHeader({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-600 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl animate-pulse-slow" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-xs font-semibold text-gold-300 tracking-wider uppercase">SMA N 1 RAJABASA PERMAI PLUS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold">{title}</h1>
        <p className="mt-3 max-w-2xl text-navy-200 leading-relaxed">{subtitle}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 32" xmlns="http://www.w3.org/2000/svg" className="w-full fill-cream">
          <path d="M0,16 C360,32 1080,0 1440,16 L1440,32 L0,32 Z" />
        </svg>
      </div>
    </section>
  );
}

export default function ProfilSekolah() {
  const [profil,  setProfil]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/profil-sekolah').then((res) => {
      setProfil(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Profil Sekolah"
          subtitle="Mengenal lebih dekat visi, misi, sejarah, dan data resmi sekolah kami."
        />

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          {loading || !profil ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-40 skeleton rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Left: Visi, Misi, Sejarah */}
              <div className="space-y-6">
                {[
                  { label: 'Visi',    value: profil.visi,    color: 'from-gold-400/20 to-gold-500/5' },
                  { label: 'Misi',    value: profil.misi,    color: 'from-navy-400/20 to-navy-500/5' },
                  { label: 'Sejarah', value: profil.sejarah, color: 'from-navy-300/20 to-navy-400/5' },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`rounded-2xl bg-gradient-to-br ${color} border border-navy-100 p-6 shadow-card`}>
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-serif text-xl font-bold text-navy-700">{label}</h2>
                    </div>
                    <p className="text-sm text-navy-500 leading-relaxed">{value || '-'}</p>
                  </div>
                ))}
              </div>

              {/* Right: Tabel */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-serif text-xl font-bold text-navy-700">Informasi Profil Sekolah</h2>
                </div>
                <TabelProfilSekolah profil={profil} />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
