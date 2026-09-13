export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 font-serif text-lg font-bold text-navy-900">
                S
              </div>
              <p className="font-serif text-lg font-semibold text-white">
                SMA N 1 RAJABASA PERMAI PLUS
              </p>
            </div>
            <p className="mt-4 text-sm text-navy-200 leading-relaxed max-w-xs">
              Membentuk generasi yang berkarakter, berprestasi, dan siap
              menghadapi tantangan masa depan.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { id: "facebook", url: "https://web.facebook.com/profile.php?id=61568666822464" },
                { id: "instagram", url: "https://www.instagram.com/rezafmdni?stkn=MXNxbzdkbmQxdHU2cQ%3D%3D&utm_source=qr" },
                { id: "tiktok", url: "https://www.tiktok.com/@alkhamdaniii?_r=1&_t=ZS-99hodzleHKR" },
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.id}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-navy-200 transition-all duration-200 hover:bg-gold-500/20 hover:text-gold-400 hover:-translate-y-0.5"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {s.id === "facebook" && (
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    )}
                    {s.id === "instagram" && (
                      <path d="M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6zm4 14a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8zm-8-9a5 5 0 100 10A5 5 0 0012 7zm0 8a3 3 0 110-6 3 3 0 010 6zm5.5-8.5a1 1 0 100-2 1 1 0 000 2z" />
                    )}
                    {s.id === "tiktok" && (
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              Navigasi
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Beranda", href: "/" },
                { label: "Profil Sekolah", href: "/profil-sekolah" },
                { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
                { label: "Galeri", href: "/galeri" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-navy-200 transition-all duration-200 hover:text-gold-400 hover:translate-x-1"
                  >
                    <span className="h-px w-3 bg-gold-500/50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              Kontak
            </p>
            <ul className="space-y-3">
              {[
                {
                  text: "Jl. Cemara, Gang 5, Perumahan Rajabasa Permai, Kelurahan Rajabasa, Kecamatan Rajabasa, Kota Bandar Lampung, Provinsi Lampung, Kode Pos 35142",
                },
                { text: "info@sman1rajabasapermaiplus.sch.id" },
                { text: "(+62) 81278734115" },
              ].map(({ text }) => (
                <li
                  key={text}
                  className="flex items-start gap-2.5 text-sm text-navy-200"
                >
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-400 text-center">
            © {year} SMA N 1 RAJABASA PERMAI PLUS. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-navy-400">
            Didedikasikan untuk pendidikan
          </p>
        </div>
      </div>
    </footer>
  );
}
