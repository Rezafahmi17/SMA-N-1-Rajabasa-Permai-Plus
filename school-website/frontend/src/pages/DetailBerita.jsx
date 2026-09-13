import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../services/api";
import { getImageUrl } from "../utils/imageUrl";

export default function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/berita/${id}`)
      .then((res) => setBerita(res.data.data))
      .catch(() => setError("Berita tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors mb-8"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Beranda
          </Link>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-32 bg-navy-100 rounded-full" />
              <div className="h-8 w-3/4 bg-navy-100 rounded-lg" />
              <div className="h-8 w-1/2 bg-navy-100 rounded-lg" />
              <div className="aspect-[16/9] w-full bg-navy-100 rounded-2xl" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-navy-100 rounded-md" />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-4">
                <svg
                  className="h-10 w-10 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-700 mb-2">
                Berita Tidak Ditemukan
              </h3>
              <p className="text-sm text-navy-400">{error}</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          )}

          {/* Article */}
          {berita && (
            <article className="animate-fade-up">
              {/* Meta */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gold-300/50" />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
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
                <div className="h-px flex-1 bg-gold-300/50" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-6">
                {berita.judul}
              </h1>

              {berita.foto && (
                <div className="relative mb-8 overflow-hidden rounded-2xl shadow-card">
                  <img
                    src={getImageUrl(berita.foto)}
                    alt={berita.judul}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent" />
                </div>
              )}

              <div className="prose-content">
                <p className="text-base text-navy-500 leading-[1.9] whitespace-pre-line">
                  {berita.isi}
                </p>
              </div>

              {/* Footer share */}
              <div className="mt-10 flex items-center gap-4 border-t border-navy-100 pt-6">
                <span className="text-sm font-semibold text-navy-600">
                  Bagikan:
                </span>
                <div className="flex gap-2">
                  {[
                    {
                      name: "Copy",
                      icon: (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                    },
                    {
                      name: "Twitter",
                      icon: (
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Facebook",
                      icon: (
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                    },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      title={btn.name}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy-400 transition-all hover:bg-navy-100 hover:text-navy-600 hover:-translate-y-0.5"
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
