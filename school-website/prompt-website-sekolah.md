# Prompt Project: Website Sekolah (JavaScript Fullstack)

Gunakan prompt ini untuk mengimplementasikan project (misalnya di Claude Code, Cursor, atau AI coding assistant lain). Prompt dipecah jadi 3 bagian: **Frontend (Public)**, **Backend (API)**, dan **Admin Dashboard**, sesuai skenario tugas: user interface interaktif, menu utama (Beranda, Profil Sekolah, Ekstrakurikuler, Galeri), berita kegiatan, galeri, info jumlah guru & siswa, tiap menu punya halaman sendiri, dan tabel profil sekolah.

---

## 🎯 Konteks Umum (sertakan di awal prompt AI)

```
Saya ingin membuat Website Sekolah menggunakan JavaScript (fullstack).
Arsitektur: pisahkan folder frontend dan backend (bukan monolith).
Frontend: React.js (Vite) + Tailwind CSS, routing dengan React Router.
Backend: Node.js + Express.js, database MySQL (via Sequelize) atau MongoDB (via Mongoose) — pilih salah satu.
Komunikasi frontend-backend via REST API (JSON), fetch pakai Axios.
Website terdiri dari 2 bagian: (1) Website publik untuk pengunjung, (2) Dashboard Admin untuk mengelola konten.
Buatkan struktur folder lengkap, kode dasar tiap komponen/halaman, routing, model database, dan koneksi API-nya.
```

---

## 1️⃣ PROMPT — FRONTEND (Website Publik)

```
Buatkan frontend Website Sekolah menggunakan React.js (Vite) + Tailwind CSS + React Router.

Struktur folder frontend:
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── CardBerita.jsx
│   │   ├── CardEkstrakurikuler.jsx
│   │   ├── GaleriGrid.jsx
│   │   └── TabelProfilSekolah.jsx
│   ├── pages/
│   │   ├── Beranda.jsx
│   │   ├── ProfilSekolah.jsx
│   │   ├── Ekstrakurikuler.jsx
│   │   ├── Galeri.jsx
│   │   ├── DetailBerita.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── api.js         // konfigurasi axios ke backend
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js

Ketentuan tiap halaman:
1. Navbar interaktif (menu: Beranda, Profil Sekolah, Ekstrakurikuler, Galeri, Berita), responsive (hamburger menu di mobile), dengan efek active-link.
2. Beranda.jsx:
   - Hero section dengan nama sekolah, foto/banner.
   - Section "Berita & Kegiatan Terbaru" — ambil data dari API GET /api/berita, tampilkan dalam card grid, klik card menuju DetailBerita.
   - Section ringkasan jumlah guru & siswa (ambil dari API GET /api/statistik) ditampilkan sebagai counter/angka besar.
   - Preview galeri (4-6 foto terbaru) dengan link "Lihat semua" ke halaman Galeri.
3. ProfilSekolah.jsx:
   - Deskripsi visi, misi, sejarah sekolah.
   - Tabel Informasi Profil Sekolah (ambil dari API GET /api/profil-sekolah) berisi: Nama Sekolah, NPSN, Akreditasi, Alamat, Kepala Sekolah, Tahun Berdiri, Jumlah Guru, Jumlah Siswa, Kontak — render sebagai <table> rapi dengan Tailwind.
4. Ekstrakurikuler.jsx:
   - Grid/list kegiatan ekstrakurikuler dari API GET /api/ekstrakurikuler (nama, foto, deskripsi, pembina).
5. Galeri.jsx:
   - Grid foto kegiatan sekolah dari API GET /api/galeri, dengan lightbox/modal saat foto diklik.
6. DetailBerita.jsx:
   - Ambil 1 berita dari API GET /api/berita/:id, tampilkan judul, tanggal, isi lengkap, foto.
7. Footer dengan info kontak & sosial media sekolah.
8. Semua data diambil secara dinamis dari backend (jangan hardcode), gunakan loading state & error handling saat fetch API.
```

---

## 2️⃣ PROMPT — BACKEND (REST API)

```
Buatkan backend REST API untuk Website Sekolah menggunakan Node.js + Express.js + Sequelize (MySQL) atau Mongoose (MongoDB).

Struktur folder backend:
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Berita.js
│   │   ├── Ekstrakurikuler.js
│   │   ├── Galeri.js
│   │   ├── ProfilSekolah.js
│   │   ├── Statistik.js       // jumlah guru & siswa
│   │   └── Admin.js           // user login admin
│   ├── controllers/
│   │   ├── beritaController.js
│   │   ├── ekstrakurikulerController.js
│   │   ├── galeriController.js
│   │   ├── profilSekolahController.js
│   │   ├── statistikController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── beritaRoutes.js
│   │   ├── ekstrakurikulerRoutes.js
│   │   ├── galeriRoutes.js
│   │   ├── profilSekolahRoutes.js
│   │   ├── statistikRoutes.js
│   │   └── authRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js   // verifikasi JWT untuk endpoint admin
│   │   └── uploadMiddleware.js // multer untuk upload foto
│   ├── uploads/                // folder penyimpanan gambar
│   └── app.js
├── server.js
├── .env
└── package.json

Ketentuan endpoint (public, tanpa login):
- GET /api/berita, GET /api/berita/:id
- GET /api/ekstrakurikuler, GET /api/ekstrakurikuler/:id
- GET /api/galeri
- GET /api/profil-sekolah
- GET /api/statistik  (jumlah guru & siswa)

Ketentuan endpoint (khusus admin, wajib JWT via authMiddleware):
- POST /api/auth/login  → return JWT token
- POST/PUT/DELETE /api/berita
- POST/PUT/DELETE /api/ekstrakurikuler
- POST/DELETE /api/galeri (upload foto pakai multer)
- PUT /api/profil-sekolah
- PUT /api/statistik

Ketentuan tambahan:
- Gunakan CORS agar bisa diakses dari frontend.
- Validasi input di tiap controller.
- Password admin di-hash pakai bcrypt.
- File .env untuk simpan kredensial database & JWT secret.
- Struktur response JSON konsisten: { success, message, data }.
```

---

## 3️⃣ PROMPT — DASHBOARD ADMIN (mengatur data website)

```
Buatkan Dashboard Admin (masih di frontend React, folder terpisah atau route terproteksi) untuk mengelola seluruh data Website Sekolah di atas.

Struktur tambahan di frontend:
frontend/src/
├── pages/admin/
│   ├── LoginAdmin.jsx
│   ├── DashboardHome.jsx        // ringkasan statistik (jumlah berita, galeri, ekstrakurikuler)
│   ├── KelolaBerita.jsx         // tabel + form tambah/edit/hapus berita
│   ├── KelolaEkstrakurikuler.jsx
│   ├── KelolaGaleri.jsx         // upload & hapus foto
│   ├── KelolaProfilSekolah.jsx  // form edit tabel profil sekolah
│   └── KelolaStatistik.jsx      // update jumlah guru & siswa
├── components/admin/
│   ├── SidebarAdmin.jsx
│   ├── NavbarAdmin.jsx
│   ├── DataTable.jsx            // komponen tabel reusable (search, pagination)
│   └── FormModal.jsx            // modal reusable untuk create/edit
├── context/
│   └── AuthContext.jsx          // simpan JWT & status login admin
└── routes/
    └── ProtectedRoute.jsx       // redirect ke LoginAdmin jika belum login

Ketentuan:
1. LoginAdmin.jsx: form login (username, password) → panggil POST /api/auth/login, simpan token JWT di localStorage/context.
2. Semua route /admin/* dibungkus ProtectedRoute — redirect ke login jika token tidak ada/expired.
3. Sidebar admin: menu Dashboard, Kelola Berita, Kelola Ekstrakurikuler, Kelola Galeri, Kelola Profil Sekolah, Kelola Statistik, Logout.
4. DashboardHome.jsx: tampilkan ringkasan angka (total berita, total foto galeri, total ekstrakurikuler, jumlah guru & siswa) dalam bentuk card statistik.
5. KelolaBerita.jsx: tabel daftar berita (judul, tanggal, aksi edit/hapus) + tombol "Tambah Berita" membuka form (judul, isi, upload foto) → CRUD ke /api/berita.
6. KelolaEkstrakurikuler.jsx: sama polanya, CRUD ke /api/ekstrakurikuler.
7. KelolaGaleri.jsx: grid foto + tombol upload (multiple) & hapus per foto, CRUD ke /api/galeri.
8. KelolaProfilSekolah.jsx: form untuk update data Tabel Profil Sekolah (Nama, NPSN, Akreditasi, Alamat, Kepala Sekolah, dll) → PUT /api/profil-sekolah.
9. KelolaStatistik.jsx: form update jumlah guru & siswa → PUT /api/statistik.
10. Semua request dari admin menyertakan header Authorization: Bearer <token>.
11. Tampilkan notifikasi (toast) sukses/gagal setiap aksi CRUD.
12. Desain dashboard clean & fungsional (sidebar + topbar layout), gunakan Tailwind, tabel dengan fitur search & pagination sederhana.
```

---

## 💡 Cara Pakai
1. Copy bagian **Konteks Umum** dulu ke chat AI coding tool kamu.
2. Lanjutkan dengan prompt **Frontend**, minta AI generate strukturnya dulu.
3. Setelah itu jalankan prompt **Backend** di sesi/folder terpisah.
4. Terakhir jalankan prompt **Dashboard Admin** — ini akan menyambungkan ke endpoint admin yang sudah dibuat di backend.
5. Sesuaikan pilihan database (MySQL/MongoDB) sesuai yang paling kamu kuasai sebelum mulai generate kode.
