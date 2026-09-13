export default function TabelProfilSekolah({ profil }) {
  const rows = [
    ['Nama Sekolah',   profil.namaSekolah],
    ['NPSN',           profil.npsn],
    ['Akreditasi',     profil.akreditasi],
    ['Alamat',         profil.alamat],
    ['Kepala Sekolah', profil.kepalaSekolah],
    ['Tahun Berdiri',  profil.tahunBerdiri],
    ['Kontak',         profil.kontak],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-card">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([label, value], idx) => (
            <tr
              key={label}
              className={`border-b border-navy-50 transition-colors hover:bg-gold-300/10 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-cream'
              }`}
            >
              <th className="w-44 px-4 py-3 font-semibold text-navy-600">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm">{label}</span>
                </div>
              </th>
              <td className="px-4 py-3 text-navy-500 text-xs sm:text-sm">{value || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
