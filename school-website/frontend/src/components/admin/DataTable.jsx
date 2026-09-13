import { useState } from 'react';

export default function DataTable({ columns, data, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = data.filter((row) =>
    columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <input
        type="text"
        placeholder="Cari..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 w-full max-w-xs rounded-md border border-navy-100 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
      />

      <div className="overflow-x-auto rounded-lg border border-navy-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium text-navy-700">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 font-medium text-navy-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-navy-400">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr key={row.id} className="border-t border-navy-100">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-navy-400">
                      {col.render ? col.render(row) : String(row[col.key] ?? '-')}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3">
                    <button onClick={() => onEdit(row)} className="mr-3 text-sm font-medium text-navy-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => onDelete(row)} className="text-sm font-medium text-red-600 hover:underline">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border border-navy-100 px-3 py-1 disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="text-navy-400">
            Halaman {page} dari {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-navy-100 px-3 py-1 disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
