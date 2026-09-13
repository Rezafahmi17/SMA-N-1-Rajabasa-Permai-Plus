const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Disimpan sebagai 1 baris data (singleton) yang bisa diedit admin.
const Statistik = sequelize.define('Statistik', {
  jumlahGuru: { type: DataTypes.INTEGER, defaultValue: 0 },
  jumlahSiswa: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Statistik;
