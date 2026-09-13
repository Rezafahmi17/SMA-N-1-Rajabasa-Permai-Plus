const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function CardEkstrakurikuler({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-50">
        {item.foto ? (
          <img
            src={`${API_ORIGIN}${item.foto}`}
            alt={item.nama}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-600 to-navy-800 text-white">
            <svg className="h-10 w-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-navy-700 group-hover:text-navy-600 transition-colors">{item.nama}</h3>
        {item.pembina && (
          <div className="mt-2 flex items-center gap-1.5">
            <svg className="h-3 w-3 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-semibold text-gold-600">Pembina: {item.pembina}</p>
          </div>
        )}
        {item.deskripsi && (
          <p className="mt-2 text-sm text-navy-400 leading-relaxed line-clamp-3">{item.deskripsi}</p>
        )}
      </div>
    </div>
  );
}
