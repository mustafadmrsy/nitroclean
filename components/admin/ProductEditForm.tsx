"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  slug: string;
  name_tr: string;
  name_en: string | null;
  description_tr: string | null;
  price: number;
  compare_price: number | null;
  stock: number | null;
  sku: string | null;
  volume_ml: number | null;
  weight_g: number | null;
  is_active: boolean;
  image_url: string | null;
  gallery_urls: unknown;
};

type Props = {
  product: Product;
};

export function ProductEditForm({ product }: Props) {
  const router = useRouter();

  const [slug, setSlug] = useState(product.slug);
  const [nameTr, setNameTr] = useState(product.name_tr);
  const [nameEn, setNameEn] = useState(product.name_en ?? "");
  const [descriptionTr, setDescriptionTr] = useState(product.description_tr ?? "");
  const [price, setPrice] = useState(String(product.price ?? ""));
  const [comparePrice, setComparePrice] = useState(product.compare_price ? String(product.compare_price) : "");
  const [stock, setStock] = useState(String(product.stock ?? 0));
  const [sku, setSku] = useState(product.sku ?? "");
  const [volumeMl, setVolumeMl] = useState(product.volume_ml ? String(product.volume_ml) : "");
  const [weightG, setWeightG] = useState(product.weight_g ? String(product.weight_g) : "");
  const [isActive, setIsActive] = useState(!!product.is_active);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const [existingGallery, setExistingGallery] = useState<string[]>(
    Array.isArray(product.gallery_urls) ? (product.gallery_urls as string[]) : []
  );
  const [removedExisting, setRemovedExisting] = useState<string[]>([]);

  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const mainPreview = useMemo(() => (mainImage ? URL.createObjectURL(mainImage) : null), [mainImage]);
  const galleryPreviews = useMemo(() => galleryImages.map((f) => URL.createObjectURL(f)), [galleryImages]);

  useEffect(() => {
    return () => {
      if (mainPreview) URL.revokeObjectURL(mainPreview);
      for (const p of galleryPreviews) URL.revokeObjectURL(p);
    };
  }, [mainPreview, galleryPreviews]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  function removeExisting(url: string) {
    setExistingGallery((prev) => prev.filter((x) => x !== url));
    setRemovedExisting((prev) => [...prev, url]);
  }

  function removeNewAt(index: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setOk(false);

    try {
      const fd = new FormData();
      fd.set("slug", slug);
      fd.set("name_tr", nameTr);
      fd.set("name_en", nameEn);
      fd.set("description_tr", descriptionTr);
      fd.set("price", price);
      fd.set("compare_price", comparePrice);
      fd.set("stock", stock);
      fd.set("sku", sku);
      fd.set("volume_ml", volumeMl);
      fd.set("weight_g", weightG);
      fd.set("is_active", isActive ? "1" : "0");
      fd.set("keep_gallery_urls", JSON.stringify(existingGallery));
      fd.set("removed_gallery_urls", JSON.stringify(removedExisting));

      if (mainImage) fd.set("main_image", mainImage);
      for (const f of galleryImages) fd.append("gallery_images", f);

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        body: fd,
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold text-slate-700">Ürün linki (slug)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Ürün kodu (SKU)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-700">Ürün adı (TR)</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
          value={nameTr}
          onChange={(e) => setNameTr(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-700">Ürün adı (EN)</div>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-700">Kısa açıklama</div>
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
          value={descriptionTr}
          onChange={(e) => setDescriptionTr(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold text-slate-700">Fiyat (₺)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Eski fiyat (varsa)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={comparePrice}
            onChange={(e) => setComparePrice(e.target.value)}
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Stok adedi</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Hacim (ml)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={volumeMl}
            onChange={(e) => setVolumeMl(e.target.value)}
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Ağırlık (g)</div>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={weightG}
            onChange={(e) => setWeightG(e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Aktif
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold text-slate-700">Ana görsel</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => mainInputRef.current?.click()}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Dosya seç
            </button>
            {mainImage ? (
              <button
                type="button"
                onClick={() => {
                  setMainImage(null);
                  if (mainInputRef.current) mainInputRef.current.value = "";
                }}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sil
              </button>
            ) : null}
            <input
              ref={mainInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files?.[0] ?? null)}
            />
          </div>

          {mainPreview ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={mainPreview} alt="Ana görsel önizleme" className="h-40 w-full object-cover" />
            </div>
          ) : product.image_url ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={product.image_url} alt="Mevcut ana görsel" className="h-40 w-full object-cover" />
            </div>
          ) : (
            <div className="mt-3 text-xs text-slate-500">Henüz seçilmedi</div>
          )}
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-700">Galeri</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Görsel ekle
            </button>
            {galleryImages.length ? (
              <button
                type="button"
                onClick={() => {
                  setGalleryImages([]);
                  if (galleryInputRef.current) galleryInputRef.current.value = "";
                }}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Yeni eklenenleri sil
              </button>
            ) : null}

            <input
              ref={galleryInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const next = Array.from(e.target.files ?? []);
                if (!next.length) return;
                setGalleryImages((prev) => [...prev, ...next]);
                e.currentTarget.value = "";
              }}
            />
          </div>

          {existingGallery.length ? (
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-700">Mevcut görseller</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {existingGallery.map((src) => (
                  <div key={src} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <div className="relative">
                      <img src={src} alt="Galeri" className="h-20 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExisting(src)}
                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white"
                        aria-label="Görseli kaldır"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {galleryPreviews.length ? (
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-700">Yeni eklenenler</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {galleryPreviews.map((src, idx) => (
                  <div key={src + idx} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <div className="relative">
                      <img src={src} alt={`Yeni galeri ${idx + 1}`} className="h-20 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewAt(idx)}
                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white"
                        aria-label="Görseli kaldır"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#141e33] text-sm font-semibold text-white"
        disabled={loading}
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>

      {ok ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Kaydedildi.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}
    </form>
  );
}
