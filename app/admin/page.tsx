import Link from "next/link";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const supabase = createSupabaseAdminClient();

  const { count: orderCount } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true });

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Genel görünüm</p>
        </div>
        <Link
          href="/admin/orders"
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#1A2B5C] px-4 text-sm font-semibold text-white"
        >
          Siparişler
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-600">Toplam Sipariş</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{orderCount ?? 0}</div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Son Siparişler</div>
        </div>
        <div className="divide-y divide-slate-100">
          {(recentOrders ?? []).map((o) => (
            <Link
              key={o.id}
              href={`/admin/orders/${o.id}`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{o.order_number}</div>
                <div className="mt-1 text-xs text-slate-500">{new Date(o.created_at).toLocaleString("tr-TR")}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">{Number(o.total).toFixed(2)} ₺</div>
                <div className="mt-1 text-xs text-slate-600">{o.status}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
