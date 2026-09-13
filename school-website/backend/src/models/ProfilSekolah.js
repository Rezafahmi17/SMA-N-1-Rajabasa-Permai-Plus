const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Disimpan sebagai 1 baris data (singleton) yang bisa diedit admin.
const ProfilSekolah = sequelize.define('ProfilSekolah', {
  namaSekolah: { type: DataTypes.STRING, defaultValue: '' },
  npsn: { type: DataTypes.STRING, defaultValue: '' },
  akreditasi: { type: DataTypes.STRING, defaultValue: '' },
  alamat: { type: DataTypes.STRING, defaultValue: '' },
  kepalaSekolah: { type: DataTypes.STRING, defaultValue: '' },
  tahunBerdiri: { type: DataTypes.STRING, defaultValue: '' },
  kontak: { type: DataTypes.STRING, defaultValue: '' },
  visi: { type: DataTypes.TEXT, defaultValue: '' },
  misi: { type: DataTypes.TEXT, defaultValue: '' },
  sejarah: { type: DataTypes.TEXT, defaultValue: '' },
});

module.exports = ProfilSekolah;
