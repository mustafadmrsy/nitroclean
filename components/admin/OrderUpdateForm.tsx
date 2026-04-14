"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  status: string;
  cargo_company: string | null;
  cargo_tracking: string | null;
};

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "Yeni", label: "Yeni" },
  { value: "Hazırlanıyor", label: "Hazırlanıyor" },
  { value: "Kargoya Verildi", label: "Kargoya Verildi" },
  { value: "Teslim Edildi", label: "Teslim Edildi" },
  { value: "İptal", label: "İptal" },
];

export function OrderUpdateForm({ id, status, cargo_company, cargo_tracking }: Props) {
  const router = useRouter();

  const [nextStatus, setNextStatus] = useState(status);
  const [cargoCompany, setCargoCompany] = useState(cargo_company ?? "");
  const [cargoTracking, setCargoTracking] = useState(cargo_tracking ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setOk(false);

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          cargo_company: cargoCompany || null,
          cargo_tracking: cargoTracking || null,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        setError(data.error ?? "Güncellenemedi");
        setLoading(false);
        return;
      }

      setOk(true);
      setLoading(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Güncellenemedi");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">Sipariş İşlemleri</div>
        <div className="mt-1 text-xs text-slate-600">Durumu ve kargo bilgisini güncelle</div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700">Sipariş durumu</label>
        <select
          className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
          value={nextStatus}
          onChange={(e) => setNextStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          {!STATUS_OPTIONS.some((o) => o.value === nextStatus) ? (
            <option value={nextStatus}>{nextStatus}</option>
          ) : null}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-700">Kargo firması</label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={cargoCompany}
            onChange={(e) => setCargoCompany(e.target.value)}
            placeholder="örn: Yurtiçi Kargo"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Takip numarası</label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={cargoTracking}
            onChange={(e) => setCargoTracking(e.target.value)}
            placeholder="örn: 123456789"
          />
        </div>
      </div>

      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#141e33] text-sm font-semibold text-white"
        disabled={loading}
      >
        {loading ? "Kaydediliyor..." : "Güncelle"}
      </button>

      {ok ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Güncellendi.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}
    </form>
  );
}
