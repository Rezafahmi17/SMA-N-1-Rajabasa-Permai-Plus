# SMA N 1 Rajabasa Permai Plus - Website Sekolah

Repositori ini berisi kode sumber untuk website SMA N 1 Rajabasa Permai Plus. Proyek ini dibangun menggunakan arsitektur Fullstack JavaScript.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:
- `backend/` — REST API menggunakan Node.js, Express, Sequelize, dan SQLite.
- `frontend/` — Website publik dan Dashboard Admin menggunakan React, Vite, dan Tailwind CSS.

## Fitur Utama

- **Halaman Publik**:
  - Beranda dengan berita terbaru, statistik guru dan siswa, serta preview galeri.
  - Profil Sekolah yang mencakup visi, misi, sejarah, dan tabel informasi sekolah.
  - Halaman Ekstrakurikuler dengan daftar dan detail per kegiatan.
  - Galeri foto interaktif.
  - Halaman berita untuk melihat detail informasi terkini.

- **Dashboard Admin**:
  - Sistem login terautentikasi (JWT).
  - Manajemen konten (CRUD) untuk:
    - Berita
    - Ekstrakurikuler
    - Galeri
    - Profil Sekolah
    - Statistik

## Panduan Instalasi dan Penggunaan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### 1. Menjalankan Backend

Buka terminal dan jalankan perintah berikut:

```bash
cd school-website/backend
npm install
npm run seed     # Opsional: membuat akun admin default dan data contoh
npm run dev      # Menjalankan server di http://localhost:5000
```

**Kredensial Admin Default** (Dapat diubah pada file `.env`):
- Username: `admin`
- Password: `admin123`

### 2. Menjalankan Frontend

Buka terminal baru dan jalankan perintah berikut:

```bash
cd school-website/frontend
npm install
npm run dev      # Menjalankan frontend di http://localhost:5173
```

- Buka `http://localhost:5173` untuk melihat website publik.
- Buka `http://localhost:5173/admin/login` untuk masuk ke dashboard admin.

## Catatan Tambahan

- **Database**: Secara default menggunakan SQLite (`backend/src/database.sqlite`). File database ini akan otomatis dibuat saat backend pertama kali dijalankan, sehingga tidak perlu instalasi database server terpisah.
- **Penyimpanan Berkas**: File gambar yang diunggah oleh admin akan disimpan pada folder `backend/src/uploads/` dan dapat diakses melalui `http://localhost:5000/uploads/nama-file.jpg`.
- **Keamanan**: Pastikan untuk mengubah `JWT_SECRET` pada file `backend/.env` sebelum melakukan deployment ke environment production.
