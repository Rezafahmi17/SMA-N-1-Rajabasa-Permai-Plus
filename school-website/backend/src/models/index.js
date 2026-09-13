const sequelize = require('../config/database');
const Admin = require('./Admin');
const Berita = require('./Berita');
const Ekstrakurikuler = require('./Ekstrakurikuler');
const Galeri = require('./Galeri');
const ProfilSekolah = require('./ProfilSekolah');
const Statistik = require('./Statistik');

module.exports = {
  sequelize,
  Admin,
  Berita,
  Ekstrakurikuler,
  Galeri,
  ProfilSekolah,
  Statistik,
};
