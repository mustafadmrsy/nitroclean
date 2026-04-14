"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";

type Product = {
  id: string;
  name_tr: string;
  slug: string;
  price: number;
  stock: number;
  image_url?: string | null;
  gallery_urls?: unknown;
};

type Props = {
  products: Product[];
};

export function HomeProductSlider({ products }: Props) {
  const list = useMemo(() => products ?? [], [products]);
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollByPx(px: number) {
    ref.current?.scrollBy({ left: px, behavior: "smooth" });
  }

  return (
    <div className="relative mt-5">
      <button
        type="button"
        onClick={() => scrollByPx(-520)}
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-sm backdrop-blur hover:bg-white md:inline-flex"
        aria-label="Sola kaydır"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollByPx(520)}
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-sm backdrop-blur hover:bg-white md:inline-flex"
        aria-label="Sağa kaydır"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={ref}
        className="-mx-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex min-w-max gap-4">
          {list.map((p) => (
            (() => {
              const gallery = Array.isArray((p as any).gallery_urls)
                ? ((p as any).gallery_urls as string[])
                : [];
              const primary = (p as any).image_url || gallery[0] || null;
              const imageSrc =
                primary ||
                (p.slug === "susuz-motor-yikama-spreyi"
                  ? "/product/nitroclean%20susuz%20motor_page.jpg"
                  : "/fren balata ürün.jpg");

              return (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full bg-[#F5F5F5]">
                <img
                  src={imageSrc}
                  alt={p.name_tr}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{p.name_tr}</div>
                    <div className="mt-1 text-xs text-slate-600">500ml</div>
                  </div>
                  <div
                    className={
                      "rounded-full px-2 py-1 text-[11px] font-semibold " +
                      (p.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700")
                    }
                  >
                    {p.stock > 0 ? "Stokta" : "Tükendi"}
                  </div>
                </div>

                <div className="mt-3 text-lg font-semibold text-slate-900">{Number(p.price).toFixed(2)} ₺</div>
                <div className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1A2B5C] text-sm font-semibold text-white">
                  Ürünü İncele
                </div>
              </div>
            </Link>
              );
            })()
          ))}
        </div>
      </div>
    </div>
  );
}
