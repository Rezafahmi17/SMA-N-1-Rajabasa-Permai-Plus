const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Galeri = sequelize.define('Galeri', {
  judul: { type: DataTypes.STRING },
  foto: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Galeri;
