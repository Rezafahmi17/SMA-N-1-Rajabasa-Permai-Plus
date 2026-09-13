import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Beranda',         to: '/' },
  { label: 'Profil Sekolah',  to: '/profil-sekolah' },
  { label: 'Ekstrakurikuler', to: '/ekstrakurikuler' },
  { label: 'Galeri',          to: '/galeri' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
      isActive
        ? 'text-navy-900 bg-gold-400/90 shadow-sm'
        : 'text-navy-100 hover:text-white hover:bg-white/10'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-gold-500 text-navy-900'
        : 'text-navy-100 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-800/95 backdrop-blur-md shadow-lg shadow-navy-900/30'
          : 'bg-navy-700/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-glow-gold font-serif text-lg font-bold text-navy-900 transition-transform duration-200 group-hover:scale-110">
            S
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-base font-semibold text-white leading-tight">SMA N 1 RAJABASA PERMAI PLUS</p>
            <p className="text-[10px] text-navy-200 tracking-widest uppercase">Belajar · Berkarakter · Berprestasi</p>
          </div>
          <p className="sm:hidden font-serif text-sm font-semibold text-white">SMA N 1 RAJABASA</p>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menu.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.to === '/'} className={linkClass}>
              {m.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="flex md:hidden h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-1 border-t border-white/10 animate-slide-down">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.to === '/'}
              onClick={() => setOpen(false)}
              className={mobileLinkClass}
            >
              {m.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
