import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const menu = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Kelola Berita', to: '/admin/berita' },
  { label: 'Kelola Ekstrakurikuler', to: '/admin/ekstrakurikuler' },
  { label: 'Kelola Galeri', to: '/admin/galeri' },
  { label: 'Kelola Profil Sekolah', to: '/admin/profil-sekolah' },
  { label: 'Kelola Statistik', to: '/admin/statistik' },
];

export default function SidebarAdmin() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-navy-100 bg-navy-900 text-cream">
      <div className="px-6 py-6">
        <p className="font-serif text-lg font-semibold">Admin Panel</p>
        <p className="mt-1 text-xs text-navy-100">Masuk sebagai {admin?.username}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            end={m.to === '/admin'}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-gold-500 text-navy-900' : 'text-navy-100 hover:bg-navy-700'
              }`
            }
          >
            {m.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-navy-100/30 px-3 py-2 text-sm font-medium text-navy-100 hover:bg-navy-700"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
