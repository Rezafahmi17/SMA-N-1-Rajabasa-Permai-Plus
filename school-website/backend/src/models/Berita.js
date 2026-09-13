const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Berita = sequelize.define('Berita', {
  judul: { type: DataTypes.STRING, allowNull: false },
  isi: { type: DataTypes.TEXT, allowNull: false },
  foto: { type: DataTypes.STRING }, // path file
  tanggal: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
});

module.exports = Berita;
