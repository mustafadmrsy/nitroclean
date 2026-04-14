import Link from "next/link";

import { OrderUpdateForm } from "@/components/admin/OrderUpdateForm";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type PageProps = { params: { id: string } };

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const supabase = createSupabaseAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, subtotal, shipping_fee, total, created_at, customer_email, customer_phone, shipping_address, cargo_company, cargo_tracking"
    )
    .eq("id", params.id)
    .single();

  const { data: items } = await supabase
    .from("order_items")
    .select("id, product_name, quantity, unit_price, total_price")
    .eq("order_id", params.id);

  if (!order) {
    return (
      <main>
        <Link href="/admin/orders" className="text-sm font-semibold text-[#1A2B5C]">
          Siparişlere dön
        </Link>
        <div className="mt-6 rounded-xl bg-white p-6 text-sm text-slate-700 shadow-sm">
          Sipariş bulunamadı.
        </div>
      </main>
    );
  }

  const addr = order.shipping_address as any;

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/orders" className="text-sm font-semibold text-[#1A2B5C]">
          Siparişlere dön
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm md:col-span-2">
          <div className="text-sm text-slate-600">Sipariş No</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{order.order_number}</div>

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <div className="text-slate-600">Durum</div>
              <div className="mt-1 font-semibold text-slate-900">{order.status}</div>
            </div>
            <div>
              <div className="text-slate-600">Tarih</div>
              <div className="mt-1 font-semibold text-slate-900">
                {new Date(order.created_at).toLocaleString("tr-TR")}
              </div>
            </div>
            <div>
              <div className="text-slate-600">Toplam</div>
              <div className="mt-1 font-semibold text-slate-900">{Number(order.total).toFixed(2)} ₺</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-slate-900">Ürünler</div>
            <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200">
              {(items ?? []).map((i) => (
                <div key={i.id} className="flex items-center justify-between p-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-slate-900">{i.product_name}</div>
                    <div className="mt-1 text-xs text-slate-500">Adet: {i.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{Number(i.total_price).toFixed(2)} ₺</div>
                    <div className="mt-1 text-xs text-slate-500">{Number(i.unit_price).toFixed(2)} ₺/adet</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <OrderUpdateForm
              id={order.id}
              status={order.status}
              cargo_company={order.cargo_company}
              cargo_tracking={order.cargo_tracking}
            />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Müşteri</div>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <div>{order.customer_email ?? "-"}</div>
              <div>{order.customer_phone ?? "-"}</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Teslimat Adresi</div>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <div className="font-semibold">{addr?.full_name ?? "-"}</div>
              <div>{addr?.phone ?? "-"}</div>
              <div>{addr?.address_line ?? "-"}</div>
              <div>
                {(addr?.district ?? "").toString()} / {(addr?.city ?? "").toString()}
              </div>
              {addr?.postal_code ? <div>{addr.postal_code}</div> : null}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Kargo</div>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <div>Firma: {order.cargo_company ?? "-"}</div>
              <div>Takip: {order.cargo_tracking ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
