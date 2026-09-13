require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const ekstrakurikulerRoutes = require('./routes/ekstrakurikulerRoutes');
const galeriRoutes = require('./routes/galeriRoutes');
const profilSekolahRoutes = require('./routes/profilSekolahRoutes');
const statistikRoutes = require('./routes/statistikRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder foto yang diupload bisa diakses langsung lewat /uploads/nama-file.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'School Website API aktif', data: null });
});

app.use('/api/auth', authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/ekstrakurikuler', ekstrakurikulerRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/profil-sekolah', profilSekolahRoutes);
app.use('/api/statistik', statistikRoutes);

// Handler untuk route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan', data: null });
});

// Handler error umum (termasuk error dari multer)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || 'Terjadi kesalahan server', data: null });
});

module.exports = app;
