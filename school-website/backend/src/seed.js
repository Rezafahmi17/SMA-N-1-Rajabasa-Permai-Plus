require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, Admin, ProfilSekolah, Statistik, Berita, Ekstrakurikuler } = require('./models');

async function seed() {
  await sequelize.sync();

  const username = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await Admin.findOne({ where: { username } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashed, nama: 'Administrator' });
    console.log(`Admin default dibuat -> username: ${username} | password: ${password}`);
  } else {
    console.log('Admin default sudah ada, dilewati.');
  }

  const existingProfil = await ProfilSekolah.findOne();
  if (!existingProfil) {
    await ProfilSekolah.create({
      namaSekolah: 'SMA Negeri Contoh',
      npsn: '12345678',
      akreditasi: 'A',
      alamat: 'Jl. Pendidikan No. 1, Kota Contoh',
      kepalaSekolah: 'Dr. Nama Kepala Sekolah, M.Pd.',
      tahunBerdiri: '1985',
      kontak: 'info@smacontoh.sch.id | (021) 1234567',
      visi: 'Menjadi sekolah unggul yang berkarakter, berprestasi, dan berwawasan global.',
      misi: 'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan untuk seluruh siswa.',
      sejarah: 'Sekolah ini berdiri sejak tahun 1985 dan telah meluluskan ribuan siswa berprestasi.',
    });
    console.log('Data profil sekolah default dibuat.');
  }

  const existingStatistik = await Statistik.findOne();
  if (!existingStatistik) {
    await Statistik.create({ jumlahGuru: 45, jumlahSiswa: 620 });
    console.log('Data statistik default dibuat.');
  }

  const beritaCount = await Berita.count();
  if (beritaCount === 0) {
    await Berita.bulkCreate([
      {
        judul: 'Penerimaan Peserta Didik Baru Tahun Ajaran Baru',
        isi: 'Sekolah membuka pendaftaran peserta didik baru. Pendaftaran dapat dilakukan secara online melalui website sekolah.',
        tanggal: new Date(),
      },
      {
        judul: 'Juara 1 Lomba Cerdas Cermat Tingkat Kabupaten',
        isi: 'Tim cerdas cermat sekolah berhasil meraih juara 1 pada lomba tingkat kabupaten yang diselenggarakan bulan ini.',
        tanggal: new Date(),
      },
    ]);
    console.log('Data berita contoh dibuat.');
  }

  const ekskulCount = await Ekstrakurikuler.count();
  if (ekskulCount === 0) {
    await Ekstrakurikuler.bulkCreate([
      { nama: 'Pramuka', deskripsi: 'Kegiatan kepanduan untuk melatih kemandirian dan kedisiplinan siswa.', pembina: 'Bpk. Andi' },
      { nama: 'Basket', deskripsi: 'Latihan rutin setiap hari Sabtu di lapangan sekolah.', pembina: 'Bpk. Rudi' },
      { nama: 'Paduan Suara', deskripsi: 'Mengasah bakat seni suara siswa untuk acara-acara sekolah.', pembina: 'Ibu Sari' },
    ]);
    console.log('Data ekstrakurikuler contoh dibuat.');
  }

  console.log('Seeding selesai.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Gagal seeding:', err);
  process.exit(1);
});
