const path = require("path");
const crypto = require("crypto");
const supabase = require("../config/supabase");

const BUCKET = process.env.SUPABASE_BUCKET || "school-images";

async function uploadImage(file, folder) {
  if (!file) return null;

  const ext = path.extname(file.originalname).toLowerCase() || ".jpg";

  const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload foto gagal: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

  return data.publicUrl;
}

module.exports = {
  uploadImage,
};
