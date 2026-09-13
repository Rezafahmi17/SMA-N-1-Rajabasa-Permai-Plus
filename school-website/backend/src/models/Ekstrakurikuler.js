const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ekstrakurikuler = sequelize.define('Ekstrakurikuler', {
  nama: { type: DataTypes.STRING, allowNull: false },
  deskripsi: { type: DataTypes.TEXT },
  pembina: { type: DataTypes.STRING },
  foto: { type: DataTypes.STRING },
});

module.exports = Ekstrakurikuler;
