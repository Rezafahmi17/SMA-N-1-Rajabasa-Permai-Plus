const { ProfilSekolah } = require('../models');

async function getSingleton() {
  let item = await ProfilSekolah.findOne();
  if (!item) item = await ProfilSekolah.create({});
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
    const fields = [
      'namaSekolah', 'npsn', 'akreditasi', 'alamat', 'kepalaSekolah',
      'tahunBerdiri', 'kontak', 'visi', 'misi', 'sejarah',
    ];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) item[f] = req.body[f];
    });
    await item.save();
    res.json({ success: true, message: 'Profil sekolah berhasil diperbarui', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
