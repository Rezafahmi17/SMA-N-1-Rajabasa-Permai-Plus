export default function NavbarAdmin({ title }) {
  return (
    <header className="flex h-16 items-center border-b border-navy-100 bg-white px-8">
      <h1 className="font-serif text-lg font-semibold text-navy-700">{title}</h1>
    </header>
  );
}
