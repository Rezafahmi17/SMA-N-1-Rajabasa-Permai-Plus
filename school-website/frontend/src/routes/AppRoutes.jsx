import { Routes, Route } from 'react-router-dom';

import Beranda from '../pages/Beranda.jsx';
import ProfilSekolah from '../pages/ProfilSekolah.jsx';
import Ekstrakurikuler from '../pages/Ekstrakurikuler.jsx';
import Galeri from '../pages/Galeri.jsx';
import DetailBerita from '../pages/DetailBerita.jsx';
import NotFound from '../pages/NotFound.jsx';

import LoginAdmin from '../pages/admin/LoginAdmin.jsx';
import DashboardHome from '../pages/admin/DashboardHome.jsx';
import KelolaBerita from '../pages/admin/KelolaBerita.jsx';
import KelolaEkstrakurikuler from '../pages/admin/KelolaEkstrakurikuler.jsx';
import KelolaGaleri from '../pages/admin/KelolaGaleri.jsx';
import KelolaProfilSekolah from '../pages/admin/KelolaProfilSekolah.jsx';
import KelolaStatistik from '../pages/admin/KelolaStatistik.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Website Publik */}
      <Route path="/" element={<Beranda />} />
      <Route path="/profil-sekolah" element={<ProfilSekolah />} />
      <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
      <Route path="/galeri" element={<Galeri />} />
      <Route path="/berita/:id" element={<DetailBerita />} />

      {/* Admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/berita"
        element={
          <ProtectedRoute>
            <KelolaBerita />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ekstrakurikuler"
        element={
          <ProtectedRoute>
            <KelolaEkstrakurikuler />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/galeri"
        element={
          <ProtectedRoute>
            <KelolaGaleri />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profil-sekolah"
        element={
          <ProtectedRoute>
            <KelolaProfilSekolah />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/statistik"
        element={
          <ProtectedRoute>
            <KelolaStatistik />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
