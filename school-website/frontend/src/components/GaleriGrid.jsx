import { useState, useEffect } from "react";
import { getImageUrl } from "../utils/imageUrl";

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace("/api", "");

export default function GaleriGrid({ items }) {
  const [selected, setSelected] = useState(null);

  // Keyboard ESC to close lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`group relative overflow-hidden rounded-xl border border-navy-100 bg-navy-50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 ${
              idx % 7 === 0 ? "col-span-2 row-span-2" : ""
            }`}
            style={{ aspectRatio: idx % 7 === 0 ? "auto" : "1/1" }}
          >
            <div
              className={
                idx % 7 === 0 ? "h-full min-h-[200px]" : "aspect-square"
              }
            >
              <img
                src={getImageUrl(item.foto)}
                alt={item.judul || "Galeri sekolah"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-navy-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
            {/* Caption */}
            {item.judul && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-navy-900/90 to-transparent px-3 py-2 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-medium text-white line-clamp-1">
                  {item.judul}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-full max-w-4xl w-full animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Tutup"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={`${API_ORIGIN}${selected.foto}`}
              alt={selected.judul || "Galeri sekolah"}
              className="max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            {selected.judul && (
              <div className="mt-4 text-center">
                <p className="text-base font-medium text-white">
                  {selected.judul}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
