import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace("/api", "");

export default function CardBerita({ berita }) {
  return (
    <Link
      to={`/berita/${berita.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-50">
        {berita.foto ? (
          <img
            src={getImageUrl(item.foto)}
            alt={berita.judul}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200 text-navy-400">
            <svg
              className="h-10 w-10 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {new Date(berita.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <h3 className="mt-2 font-serif text-lg font-semibold text-navy-700 line-clamp-2 leading-snug group-hover:text-navy-600 transition-colors">
          {berita.judul}
        </h3>
        <p className="mt-2 flex-1 text-sm text-navy-400 line-clamp-3 leading-relaxed">
          {berita.isi}
        </p>
        <div className="mt-4 flex items-center text-xs font-semibold text-gold-600 group-hover:text-gold-500 transition-colors">
          Baca selengkapnya
          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
