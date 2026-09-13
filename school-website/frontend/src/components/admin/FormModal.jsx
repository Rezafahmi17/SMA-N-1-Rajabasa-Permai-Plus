export default function FormModal({ title, onClose, onSubmit, children, submitting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-navy-700">{title}</h2>
          <button onClick={onClose} className="text-navy-400 hover:text-navy-700">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {children}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-md border border-navy-100 px-4 py-2 text-sm font-medium text-navy-700">
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-cream hover:bg-navy-700 disabled:opacity-50"
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
