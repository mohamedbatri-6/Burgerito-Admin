export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text-main)" }}>
        Dashboard
      </h1>

      <p className="text-gray-400 text-sm mt-2">(visible seulement si connecté)</p>

      <section className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <div
          className="p-6 shadow border border-white/10"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <p className="text-sm text-gray-300">Orders today</p>
          <p className="text-3xl font-bold" style={{ color: "var(--color-accent)" }}>
            12
          </p>
        </div>

        <div
          className="p-6 shadow border border-white/10"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <p className="text-sm text-gray-300">Open tickets</p>
          <p className="text-3xl font-bold" style={{ color: "var(--color-accent)" }}>
            3
          </p>
        </div>

        <div
          className="p-6 shadow border border-white/10"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <p className="text-sm text-gray-300">Revenue (€)</p>
          <p className="text-3xl font-bold" style={{ color: "var(--color-accent)" }}>
            248
          </p>
        </div>
      </section>
    </>
  );
}
