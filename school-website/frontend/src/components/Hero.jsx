export default function Hero({ jumlahGuru, jumlahSiswa }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-600 text-white">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl animate-pulse-slow delay-300" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/5 blur-2xl" />
        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 py-16 sm:py-20 md:grid-cols-2 md:items-center md:py-28">
        {/* Text Column */}
        <div className="animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-semibold text-gold-300 tracking-wider uppercase">Terakreditasi A</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.15] sm:text-5xl md:text-5xl lg:text-6xl">
            Belajar hari ini,{' '}
            <span className="text-gradient-gold">memimpin</span>{' '}
            masa depan.
          </h1>

          <p className="mt-5 max-w-md text-base text-navy-200 leading-relaxed">
            SMA N 1 RAJABASA PERMAI PLUS hadir sebagai pusat keunggulan pendidikan yang memadukan kurikulum inovatif dengan pembinaan karakter yang kuat. Kami berdedikasi untuk mencetak generasi cerdas, beretika, dan tangguh untuk masa depan yang gemilang.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/profil-sekolah"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-bold text-navy-900 shadow-glow-gold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Kenali Sekolah Kami
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/ekstrakurikuler"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Lihat Kegiatan
            </a>
          </div>
        </div>

        {/* Stats Column */}
        <div className="grid grid-cols-2 gap-4 animate-fade-up delay-200">
          {/* Guru card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-3xl bg-gold-400/10" />
            <p className="font-serif text-4xl font-bold text-gradient-gold">{jumlahGuru ?? '—'}</p>
            <p className="mt-2 text-sm font-medium text-navy-200">Tenaga Pendidik</p>
            <p className="mt-1 text-xs text-navy-300">Profesional & berpengalaman</p>
          </div>

          {/* Siswa card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-3xl bg-gold-400/10" />
            <p className="font-serif text-4xl font-bold text-gradient-gold">{jumlahSiswa ?? '—'}</p>
            <p className="mt-2 text-sm font-medium text-navy-200">Siswa Aktif</p>
            <p className="mt-1 text-xs text-navy-300">Generasi masa depan</p>
          </div>

          {/* Akreditasi */}
          <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 font-serif text-2xl font-bold text-navy-900 shadow-glow-gold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-white">Akreditasi A</p>
              <p className="text-xs text-navy-200">Komitmen mutu pendidikan yang terus dijaga setiap tahun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full fill-cream">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
