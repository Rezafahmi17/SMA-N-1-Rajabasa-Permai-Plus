const { Statistik } = require('../models');

async function getSingleton() {
  let item = await Statistik.findOne();
  if (!item) item = await Statistik.create({});
  return item;
}

exports.get = async (req, res) => {
  try {
    const item = await getSingleton();
    res.json({ success: true, message: 'OK', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await getSingleton();
    const { jumlahGuru, jumlahSiswa } = req.body;
    if (jumlahGuru !== undefined) item.jumlahGuru = jumlahGuru;
    if (jumlahSiswa !== undefined) item.jumlahSiswa = jumlahSiswa;
    await item.save();
    res.json({ success: true, message: 'Statistik berhasil diperbarui', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
