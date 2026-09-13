import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="font-serif text-5xl font-semibold text-navy-700">404</p>
      <p className="mt-3 text-navy-400">Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/" className="mt-6 rounded-md bg-navy-600 px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy-700">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
