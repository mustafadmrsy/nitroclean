import Link from "next/link";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrdersPage() {
  const supabase = createSupabaseAdminClient();

  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, total, created_at, customer_email, customer_phone"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Siparişler</h1>
          <p className="mt-1 text-sm text-slate-600">Son 100 sipariş</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {(orders ?? []).map((o) => (
            <Link
              key={o.id}
              href={`/admin/orders/${o.id}`}
              className="grid grid-cols-1 gap-2 p-4 hover:bg-slate-50 md:grid-cols-5 md:items-center"
            >
              <div className="md:col-span-2">
                <div className="text-sm font-semibold text-slate-900">{o.order_number}</div>
                <div className="mt-1 text-xs text-slate-500">{new Date(o.created_at).toLocaleString("tr-TR")}</div>
              </div>
              <div className="text-xs text-slate-600">
                {o.customer_email ?? "-"}
                <div>{o.customer_phone ?? ""}</div>
              </div>
              <div className="text-sm font-semibold text-slate-900">{Number(o.total).toFixed(2)} ₺</div>
              <div className="text-xs font-semibold text-slate-700">{o.status}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
