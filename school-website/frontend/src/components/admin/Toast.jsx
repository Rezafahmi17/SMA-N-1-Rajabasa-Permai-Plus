export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-md px-4 py-3 text-sm text-white shadow-lg ${
        toast.type === 'error' ? 'bg-red-600' : 'bg-navy-600'
      }`}
    >
      {toast.message}
    </div>
  );
}
