import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type PageProps = {
  params: { id: string };
};

export default async function AdminProductEditPage({ params }: PageProps) {
  const supabase = createSupabaseAdminClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, slug, name_tr, name_en, description_tr, price, compare_price, stock, sku, volume_ml, weight_g, is_active, image_url, gallery_urls"
    )
    .eq("id", params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Ürün Düzenle</h1>
          <p className="mt-1 text-sm text-slate-600">Ürün bilgilerini güncelle</p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Geri
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductEditForm product={product as any} />
      </div>
    </main>
  );
}
