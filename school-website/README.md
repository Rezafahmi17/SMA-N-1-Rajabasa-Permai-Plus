# Website Sekolah — Fullstack JavaScript

Project ini terdiri dari 2 bagian terpisah:
- `backend/` — REST API (Node.js + Express + Sequelize + SQLite)
- `frontend/` — Website publik + Dashboard Admin (React + Vite + Tailwind CSS)

## Fitur
- Beranda dengan berita terbaru, statistik guru/siswa, dan preview galeri
- Profil Sekolah (visi, misi, sejarah) + Tabel Informasi Profil Sekolah
- Ekstrakurikuler (list + detail per kegiatan)
- Galeri foto dengan lightbox
- Detail berita per halaman
- Dashboard Admin (login JWT) untuk CRUD: Berita, Ekstrakurikuler, Galeri, Profil Sekolah, Statistik

## Cara Menjalankan di VS Code

### 1. Backend
```bash
cd backend
npm install
npm run seed     # membuat akun admin default + data contoh
npm run dev       # jalankan server di http://localhost:5000
```
Akun admin default (bisa diganti di file `.env`):
- Username: `admin`
- Password: `admin123`

### 2. Frontend
Buka terminal baru:
```bash
cd frontend
npm install
npm run dev       # jalankan di http://localhost:5173
```

Buka `http://localhost:5173` untuk website publik, dan `http://localhost:5173/admin/login` untuk masuk ke dashboard admin.

## Catatan
- Database memakai SQLite (file `backend/src/database.sqlite`), otomatis dibuat saat backend pertama kali dijalankan — tidak perlu install MySQL/MongoDB terpisah.
- Ingin pindah ke MySQL? Edit `backend/src/config/database.js`, ganti `dialect` jadi `'mysql'` dan tambahkan host/user/password/database, lalu `npm install mysql2`.
- File foto yang diupload admin disimpan di `backend/src/uploads/` dan diakses lewat `http://localhost:5000/uploads/nama-file.jpg`.
- Ganti `JWT_SECRET` di `backend/.env` sebelum dipakai secara publik/production.
- Struktur folder & endpoint API mengikuti prompt yang dibuat sebelumnya (lihat `prompt-website-sekolah.md`).
