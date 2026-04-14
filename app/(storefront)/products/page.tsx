import Link from "next/link";

import Image from "next/image";

import { createSupabasePublicClient } from "@/lib/supabase/public";
import { ProductCardActions } from "@/components/product/ProductCardActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function fallbackProductImage(slug: string) {
  if (slug === "fren-balata-temizleme-spreyi") return "/fren balata ürün.jpg";
  if (slug === "susuz-motor-yikama-spreyi") return "/product/nitroclean%20susuz%20motor_page.jpg";
  return "/fren balata ürün.jpg";
}

export default async function ProductsPage() {
  const supabase = createSupabasePublicClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, name_tr, price, compare_price, stock, image_url, gallery_urls")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Ürünler</h1>
        <div className="mt-6 rounded-xl bg-white p-6 text-sm text-red-600 shadow-sm">
          Ürünler yüklenemedi.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <section className="relative overflow-hidden rounded-3xl bg-[#0b1220] p-8 text-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-[#141e33] via-[#0b1220] to-[#1969bc] opacity-95" />
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#f59412]/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            NITRO CLEAN
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Ürünler
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Profesyonel formül, yüksek performans. Ürünleri inceleyin ve sepetinize
            ekleyin.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/80">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Aynı gün kargo (15:00)
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Güvenli paketleme
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Türk üretimi
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(products ?? []).map((p) => {
          const price = Number(p.price);
          const compare = p.compare_price ? Number(p.compare_price) : null;
          const inStock = (p.stock ?? 0) > 0;
          const discountPct = compare && compare > 0 ? Math.round(((compare - price) / compare) * 100) : null;
          const primaryImage = (p as any).image_url || ((p as any).gallery_urls?.[0] ?? null);
          const imageSrc = primaryImage || fallbackProductImage(p.slug);

          return (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-[4/3] w-full bg-[#F5F5F5]">
                  <Image
                    src={imageSrc}
                    alt={p.name_tr}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <div className="rounded-full border border-white/40 bg-black/20 px-2 py-1 text-[11px] font-semibold text-white">
                      500ml
                    </div>
                    {discountPct !== null && discountPct > 0 ? (
                      <div className="rounded-full bg-[#f59412] px-2 py-1 text-[11px] font-bold text-[#141e33]">
                        %{discountPct}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>

              <div className="p-5">
                <div className="text-xs font-semibold tracking-widest text-[#1969bc]">
                  NITRO CLEAN
                </div>
                <Link href={`/products/${p.slug}`} className="mt-2 block text-lg font-semibold text-slate-900">
                  {p.name_tr}
                </Link>

                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-xl font-semibold text-slate-900">{price.toFixed(2)} ₺</div>
                  {compare ? (
                    <div className="text-sm text-slate-500 line-through">
                      {compare.toFixed(2)} ₺
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div
                    className={
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                      (inStock
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700")
                    }
                  >
                    {inStock ? "Stokta" : "Tükendi"}
                  </div>

                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm font-semibold text-[#141e33] hover:underline"
                  >
                    İncele →
                  </Link>
                </div>

                <ProductCardActions
                  slug={p.slug}
                  name={p.name_tr}
                  unitPrice={price}
                  disabled={!inStock}
                />
              </div>
            </div>
          );
        })}
        </div>
      </section>
    </main>
  );
}
