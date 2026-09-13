const { Galeri } = require("../models");
const { uploadImage } = require("../utils/storage");

exports.getAll = async (req, res) => {
  try {
    const list = await Galeri.findAll({ order: [["id", "DESC"]] });
    res.json({ success: true, message: "OK", data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Foto wajib diupload",
        data: null,
      });
    }

    const { judul } = req.body;

    const foto = await uploadImage(req.file, "galeri");

    const item = await Galeri.create({
      judul: judul || "",
      foto,
    });

    res.status(201).json({
      success: true,
      message: "Foto berhasil ditambahkan",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Galeri.findByPk(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Foto tidak ditemukan", data: null });
    await item.destroy();
    res.json({ success: true, message: "Foto berhasil dihapus", data: null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
