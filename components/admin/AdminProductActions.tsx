"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

export function AdminProductActions({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (loading) return;
    const ok = window.confirm("Ürünü silmek istiyor musun? (Siparişlerde kullanıldıysa pasif yapılır)");
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        window.alert(data.error ?? "Silinemedi");
        setLoading(false);
        return;
      }

      if (data.soft_deleted) {
        window.alert("Ürün siparişlerde kullanıldığı için silinemedi. Pasif yapıldı.");
      }

      router.refresh();
      setLoading(false);
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Silinemedi");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${id}`}
        className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        Düzenle
      </Link>
      <button
        type="button"
        onClick={onDelete}
        disabled={loading}
        className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-red-600 hover:bg-red-50"
      >
        {loading ? "..." : "Sil"}
      </button>
    </div>
  );
}
