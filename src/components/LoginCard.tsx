"use client";

import React, { useState } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // IMPORTANT: on tape l'API /api/login, PAS /login
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, pwd }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // pas grave
    }

    const ok =
      res.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      data.ok === true;

    if (!ok) {
      setError("Invalid credentials");
      return;
    }

    // succès -> le cookie httpOnly est posé par le serveur
    // on va sur le dashboard
    window.location.href = "/dashboard";
  }

  return (
    <div
      className="w-full max-w-sm p-6 shadow-lg border border-white/10"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderRadius: "var(--radius-card)",
      }}
    >
      {/* Logo / titre */}
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-12 w-12 flex items-center justify-center font-bold text-lg"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg-card)",
            borderRadius: "9999px",
          }}
        >
          B
        </div>

        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-text-main)" }}
        >
          Burgerito Admin
        </h1>

        <p className="text-sm mt-1 text-gray-400">
          Please sign in to continue
        </p>
      </div>

      {/* Form */}
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 text-sm border outline-none border-gray-700 bg-black/40 text-white rounded-md focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
            placeholder="admin@burgerito.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300" htmlFor="pwd">
            Password
          </label>
          <input
            id="pwd"
            type="password"
            className="w-full px-3 py-2 text-sm border outline-none border-gray-700 bg-black/40 text-white rounded-md focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 text-sm font-semibold rounded-md hover:opacity-90 transition"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg-card)",
          }}
        >
          Sign in
        </button>
      </form>

      <p className="text-[10px] text-center mt-6 text-gray-500">
        Internal use only. Unauthorized access is prohibited.
      </p>
    </div>
  );
}
