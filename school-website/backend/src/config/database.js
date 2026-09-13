const { Sequelize } = require('sequelize');
const path = require('path');

// Pakai SQLite supaya tidak perlu install server database terpisah.
// Kalau mau pindah ke MySQL, ganti dialect jadi 'mysql' dan isi host/user/password/database.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
