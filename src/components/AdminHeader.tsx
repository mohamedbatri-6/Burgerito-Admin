"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    // On appelle l'API logout pour supprimer le cookie d'admin
    await fetch("/api/logout", {
      method: "POST",
    });

    // Puis on renvoie l'admin vers la page de login
    router.push("/login");
  }

  return (
    <header
      className="w-full border-b border-white/10"
      style={{
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Gauche : Branding + Navigation */}
        <div className="flex items-center gap-8">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg-card)",
                borderRadius: "9999px",
              }}
            >
              B
            </div>

            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-main)" }}
            >
              Burgerito Admin
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="/dashboard"
              className="text-gray-300 hover:text-[var(--color-accent)] transition"
            >
              Dashboard
            </a>

            <a
              href="/orders"
              className="text-gray-300 hover:text-[var(--color-accent)] transition"
            >
              Orders
            </a>

            <a
              href="/support"
              className="text-gray-300 hover:text-[var(--color-accent)] transition"
            >
              Support
            </a>
          </nav>
        </div>

        {/* Droite : Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="text-sm font-medium rounded-md px-3 py-1.5 transition hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg-card)",
          }}
        >
          {loading ? "…" : "Logout"}
        </button>
      </div>
    </header>
  );
}
