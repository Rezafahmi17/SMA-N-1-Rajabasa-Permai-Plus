require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // buat tabel otomatis kalau belum ada
    console.log('Koneksi database berhasil & tabel siap.');

    app.listen(PORT, () => {
      console.log(`Server backend berjalan di http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Gagal menjalankan server:', err);
  }
}

start();
