export default function HomePage() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Burgerito Admin</h1>
      <p className="text-sm mt-2 text-gray-400">Tailwind v4 OK ✅</p>

      <div
        className="mt-6 inline-block p-4 shadow border border-white/10 rounded-lg"
        style={{ backgroundColor: "var(--color-bg-card)" }}
      >
        <button
          className="mt-2 px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90 transition"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg-card)" }}
        >
          Test button
        </button>
      </div>
    </main>
  );
}
