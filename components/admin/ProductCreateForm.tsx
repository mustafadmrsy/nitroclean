"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type CreateResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

type Props = {
  onSuccess?: () => void;
};

export function ProductCreateForm({ onSuccess }: Props) {
  const router = useRouter();

  const [slug, setSlug] = useState("");
  const [nameTr, setNameTr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionTr, setDescriptionTr] = useState("");
  const [price, setPrice] = useState<string>("");
  const [comparePrice, setComparePrice] = useState<string>("");
  const [stock, setStock] = useState<string>("0");
  const [sku, setSku] = useState("");
  const [volumeMl, setVolumeMl] = useState<string>("");
  const [weightG, setWeightG] = useState<string>("");
  const [isActive, setIsActive] = useState(true);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateResult | null>(null);

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

  function removeGalleryAt(index: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setResult(null);

    try {
      const fd = new FormData();
      fd.set("slug", slug.trim());
      fd.set("name_tr", nameTr.trim());
      fd.set("name_en", nameEn.trim());
      fd.set("description_tr", descriptionTr.trim());
      fd.set("price", price);
      fd.set("compare_price", comparePrice);
      fd.set("stock", stock);
      fd.set("sku", sku.trim());
      fd.set("volume_ml", volumeMl);
      fd.set("weight_g", weightG);
      fd.set("is_active", isActive ? "1" : "0");

      if (mainImage) fd.set("main_image", mainImage);
      for (const f of galleryImages) fd.append("gallery_images", f);

      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        body: fd,
      });

      const data = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        setResult({ ok: false, error: data.error ?? "Ürün eklenemedi" });
        setLoading(false);
        return;
      }

      setResult({ ok: true, id: data.id, slug: data.slug });
      setLoading(false);
      router.refresh();

      setSlug("");
      setNameTr("");
      setNameEn("");
      setDescriptionTr("");
      setPrice("");
      setComparePrice("");
      setStock("0");
      setSku("");
      setVolumeMl("");
      setWeightG("");
      setIsActive(true);
      setMainImage(null);
      setGalleryImages([]);

      onSuccess?.();
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : "Ürün eklenemedi" });
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-sm font-semibold text-slate-900">Ürün Bilgileri</div>
      <div className="mt-1 text-xs text-slate-600">
        Görseller Supabase Storage (nitroclean) bucketına yüklenir.
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700">Ürün linki (slug)</label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ornek: fren-balata-temizleme-spreyi"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Ürün adı (TR)</label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={nameTr}
            onChange={(e) => setNameTr(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Ürün adı (EN)</label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Kısa açıklama</label>
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
            value={descriptionTr}
            onChange={(e) => setDescriptionTr(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Fiyat (₺)</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="199.90"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Eski fiyat (varsa)</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
              placeholder="249.90"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Stok adedi</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="20"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Ürün kodu (SKU)</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="NC-FBS-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Hacim (ml)</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={volumeMl}
              onChange={(e) => setVolumeMl(e.target.value)}
              placeholder="500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Ağırlık (g)</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400"
              value={weightG}
              onChange={(e) => setWeightG(e.target.value)}
              placeholder="450"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
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
            ) : (
              <div className="mt-3 text-xs text-slate-500">Henüz seçilmedi</div>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-700">Galeri görselleri</div>
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
                  Tümünü sil
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

            {galleryPreviews.length ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {galleryPreviews.map((src, idx) => (
                  <div
                    key={src + idx}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                  >
                    <div className="relative">
                      <img src={src} alt={`Galeri ${idx + 1}`} className="h-20 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryAt(idx)}
                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white"
                        aria-label="Görseli sil"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-xs text-slate-500">Henüz seçilmedi</div>
            )}
          </div>
        </div>

        <button
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#141e33] text-sm font-semibold text-white"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Ürünü Kaydet"}
        </button>

        {result?.ok ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            Ürün eklendi: {result.slug}
          </div>
        ) : null}

        {result && !result.ok ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {result.error}
          </div>
        ) : null}
      </form>
    </div>
  );
}
