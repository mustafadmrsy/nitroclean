"use client";

import Image from "next/image";
import { useState } from "react";

import { ProductImageZoom } from "@/components/product/ProductImageZoom";

type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
};

export function ProductGallery({ images }: Props) {
  const safeImages = images.length > 0 ? images : [{ src: "/product/nitroclean%20fren%20balata_page.jpg", alt: "" }];
  const [activeIndex, setActiveIndex] = useState(0);

  const active = safeImages[Math.min(activeIndex, safeImages.length - 1)];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ProductImageZoom src={active.src} alt={active.alt} />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {safeImages.map((img, idx) => (
          <button
            key={img.src + idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white transition " +
              (idx === activeIndex
                ? "border-[#f59412] shadow-sm"
                : "border-slate-200 hover:border-slate-300")
            }
            aria-label={`Görsel ${idx + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="64px"
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
