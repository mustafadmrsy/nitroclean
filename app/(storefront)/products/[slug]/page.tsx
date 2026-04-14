import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToBasketButton } from "@/components/product/AddToBasketButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { createSupabasePublicClient } from "@/lib/supabase/public";

function fallbackGallery(slug: string) {
  if (slug === "fren-balata-temizleme-spreyi") {
    return [{ src: "/fren balata ürün.jpg", alt: "Fren Balata Temizleme Spreyi" }];
  }
  if (slug === "susuz-motor-yikama-spreyi") {
    return [{ src: "/product/nitroclean%20susuz%20motor_page.jpg", alt: "Susuz Motor" }];
  }
  return [{ src: "/fren balata ürün.jpg", alt: "Nitro Clean" }];
}

type PageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage({ params }: PageProps) {
  const supabase = createSupabasePublicClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, slug, name_tr, name_en, description_tr, price, compare_price, stock, sku, volume_ml, weight_g, image_url, gallery_urls"
    )
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    notFound();
  }

  const price = Number(product.price);
  const compare = product.compare_price ? Number(product.compare_price) : null;
  const inStock = (product.stock ?? 0) > 0;
  const discountPct = compare && compare > 0 ? Math.round(((compare - price) / compare) * 100) : null;

  const galleryUrls: string[] = Array.isArray((product as any).gallery_urls)
    ? ((product as any).gallery_urls as string[])
    : [];
  const primary = (product as any).image_url ? [(product as any).image_url as string] : [];
  const combined = [...primary, ...galleryUrls].filter(Boolean);
  const gallery = combined.length
    ? combined.map((src, idx) => ({ src, alt: idx === 0 ? product.name_tr : `${product.name_tr} ${idx + 1}` }))
    : fallbackGallery(product.slug);

  const { data: similarProducts } = await supabase
    .from("products")
    .select("id, slug, name_tr, price, compare_price, stock")
    .eq("is_active", true)
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <Link href="/products" className="text-sm font-semibold text-[#141e33]">
          ← Ürünlere dön
        </Link>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery images={gallery} />

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold tracking-widest text-[#1969bc]">NITRO CLEAN</div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{product.name_tr}</h1>
            {product.name_en ? <div className="mt-1 text-sm text-slate-600">{product.name_en}</div> : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-slate-200 bg-[#F5F5F5] px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                500ml
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                Profesyonel Formül
              </div>
              <div
                className={
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                  (inStock ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700")
                }
              >
                {inStock ? "Stokta" : "Tükendi"}
              </div>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="text-3xl font-semibold text-slate-900">{price.toFixed(2)} ₺</div>
              {compare ? <div className="text-base text-slate-500 line-through">{compare.toFixed(2)} ₺</div> : null}
              {discountPct !== null && discountPct > 0 ? (
                <div className="rounded-full bg-[#f59412] px-2.5 py-1 text-[11px] font-bold text-[#141e33]">
                  %{discountPct} indirim
                </div>
              ) : null}
            </div>

            <div className="mt-2 text-xs text-slate-600">Kargo: 15:00'e kadar aynı gün</div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AddToBasketButton slug={product.slug} name={product.name_tr} unitPrice={price} />
              <Link
                href="/payment"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#f59412] px-5 text-sm font-semibold text-[#141e33]"
              >
                Hemen Al
              </Link>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-[#F5F5F5] p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Satıcı</div>
              <div className="mt-1">Nitro Clean (Resmi Satıcı)</div>
              <div className="mt-2 text-xs text-slate-600">Puan: 4.8 • 200+ değerlendirme</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Ürün Özellikleri</div>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Marka</dt>
                <dd className="font-semibold text-slate-900">Nitro Clean</dd>
              </div>
              {product.sku ? (
                <div className="flex items-center justify-between">
                  <dt className="text-slate-600">SKU</dt>
                  <dd className="font-semibold text-slate-900">{product.sku}</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Hacim</dt>
                <dd className="font-semibold text-slate-900">{product.volume_ml ?? 500} ml</dd>
              </div>
              {product.weight_g ? (
                <div className="flex items-center justify-between">
                  <dt className="text-slate-600">Ağırlık</dt>
                  <dd className="font-semibold text-slate-900">{product.weight_g} g</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Kullanım Alanı</dt>
                <dd className="font-semibold text-slate-900">Oto bakım</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="text-sm font-semibold text-slate-900">Detaylı Açıklama</div>
          <div className="mt-3 space-y-4 text-sm leading-7 text-slate-700">
            {product.description_tr ? <p>{product.description_tr}</p> : null}
            <div>
              <div className="font-semibold text-slate-900">Öne çıkanlar</div>
              <ul className="mt-2 list-disc pl-5">
                <li>Hızlı buharlaşan formül</li>
                <li>Yüzeyde kalıntı bırakmaz</li>
                <li>Pratik uygulama</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Kullanım</div>
              <ul className="mt-2 list-disc pl-5">
                <li>Yüzeyi kir/tozdan arındırın.</li>
                <li>25-30 cm mesafeden uygulayın.</li>
                <li>Kurumaya bırakın, gerekirse tekrar uygulayın.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Teslimat & Güven</div>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#f59412]" />
                <div>
                  <div className="font-semibold text-slate-900">Hızlı kargo</div>
                  <div className="text-slate-600">15:00'e kadar aynı gün çıkış</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#f59412]" />
                <div>
                  <div className="font-semibold text-slate-900">İade / değişim</div>
                  <div className="text-slate-600">Kolay süreç (yakında)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#f59412]" />
                <div>
                  <div className="font-semibold text-slate-900">Güvenli ödeme</div>
                  <div className="text-slate-600">Ödeme altyapısı yakında</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Yorumlar</div>
            <div className="mt-3 text-sm text-slate-600">
              Yakında kullanıcı yorumları burada görünecek.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Benzer Ürünler</div>
            <div className="mt-1 text-sm text-slate-600">Bunu alanlar bunları da inceledi</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(similarProducts ?? []).map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-xs font-semibold tracking-widest text-[#1969bc]">NITRO CLEAN</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{p.name_tr}</div>
              <div className="mt-3 text-lg font-semibold text-slate-900">{Number(p.price).toFixed(2)} ₺</div>
              <div className="mt-3 text-sm font-semibold text-[#141e33]">İncele →</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
