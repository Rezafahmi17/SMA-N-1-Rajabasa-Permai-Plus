const { Berita } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const list = await Berita.findAll({ order: [['tanggal', 'DESC'], ['id', 'DESC']] });
    res.json({ success: true, message: 'OK', data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Berita.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan', data: null });
    res.json({ success: true, message: 'OK', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, isi, tanggal } = req.body;
    if (!judul || !isi) {
      return res.status(400).json({ success: false, message: 'Judul dan isi wajib diisi', data: null });
    }
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    const item = await Berita.create({ judul, isi, tanggal: tanggal || undefined, foto });
    res.status(201).json({ success: true, message: 'Berita berhasil ditambahkan', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Berita.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan', data: null });

    const { judul, isi, tanggal } = req.body;
    if (req.file) item.foto = `/uploads/${req.file.filename}`;
    if (judul) item.judul = judul;
    if (isi) item.isi = isi;
    if (tanggal) item.tanggal = tanggal;
    await item.save();

    res.json({ success: true, message: 'Berita berhasil diperbarui', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Berita.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan', data: null });
    await item.destroy();
    res.json({ success: true, message: 'Berita berhasil dihapus', data: null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
