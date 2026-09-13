const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api\/?$/, "");

export function getImageUrl(foto) {
  if (!foto) return "";

  // Kalau sudah URL lengkap dari Supabase
  if (foto.startsWith("http://") || foto.startsWith("https://")) {
    return foto;
  }

  // Kalau masih /uploads/... dari backend lokal
  return `${API_ORIGIN}${foto}`;
}
