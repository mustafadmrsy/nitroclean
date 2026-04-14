import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { ProductCreateModal } from "@/components/admin/ProductCreateModal";
import { AdminProductActions } from "@/components/admin/AdminProductActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  const supabase = createSupabaseAdminClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name_tr, price, stock, is_active, created_at, image_url")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main className="space-y-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Ürünler</h1>
          <p className="mt-1 text-sm text-slate-600">Ürün ekleyin ve güncelleyin</p>
        </div>
        <ProductCreateModal />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(products ?? []).map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full bg-[#F5F5F5]">
              {p.image_url ? (
                // Using plain img here to avoid remotePatterns mismatch for admins that didn't restart.
                // Storefront uses next/image for optimized rendering.
                <img
                  src={p.image_url}
                  alt={p.name_tr}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500">
                  Görsel yok
                </div>
              )}

              <div className="absolute left-3 top-3 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                {p.is_active ? "Aktif" : "Pasif"}
              </div>
            </div>

            <div className="p-5">
              <div className="text-xs font-semibold tracking-widest text-[#1969bc]">NITRO CLEAN</div>
              <div className="mt-2 text-base font-semibold text-slate-900">{p.name_tr}</div>
              <div className="mt-1 text-xs text-slate-500">{p.slug}</div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{Number(p.price).toFixed(2)} ₺</div>
                  <div className="mt-1 text-xs font-semibold text-slate-700">Stok: {p.stock ?? 0}</div>
                </div>

                <div
                  className={
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                    (p.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700")
                  }
                >
                  {p.is_active ? "Yayında" : "Kapalı"}
                </div>
              </div>

              <div className="mt-4">
                <AdminProductActions id={p.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
