"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch("/api/orders/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orderNumber, phone }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? "not_found");
      setLoading(false);
      return;
    }

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Sipariş Takibi</h1>

      <form onSubmit={onSubmit} className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-semibold text-slate-900">
          Sipariş Numarası
        </label>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="NC-2026-00001"
          required
        />

        <label className="mt-4 block text-sm font-semibold text-slate-900">Telefon</label>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05xxxxxxxxx"
          required
        />

        <button
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1A2B5C] text-sm font-semibold text-white"
          disabled={loading}
        >
          {loading ? "Kontrol ediliyor..." : "Sorgula"}
        </button>

        {error ? (
          <div className="mt-4 text-sm text-red-600">{error}</div>
        ) : null}

        {result ? (
          <div className="mt-6 rounded-lg border border-slate-200 p-4 text-sm">
            <div>
              <span className="font-semibold">Durum:</span> {result.status}
            </div>
            <div>
              <span className="font-semibold">Toplam:</span> {Number(result.total).toFixed(2)} ₺
            </div>
            {result.cargoCompany || result.cargoTracking ? (
              <div className="mt-3">
                <div>
                  <span className="font-semibold">Kargo:</span> {result.cargoCompany ?? ""}
                </div>
                <div>
                  <span className="font-semibold">Takip:</span> {result.cargoTracking ?? ""}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </form>
    </main>
  );
}
