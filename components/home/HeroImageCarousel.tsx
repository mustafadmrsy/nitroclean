"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useMemo, useState, forwardRef } from "react";

type Slide = {
  src: string;
  title: string;
  subtitle: string;
};

type Props = {
  slides: Slide[];
  variant?: "card" | "background";
  hideOverlay?: boolean;
};

export type HeroCarouselRef = {
  prev: () => void;
  next: () => void;
  setIdx: (i: number) => void;
  idx: number;
  count: number;
};

export const HeroImageCarousel = forwardRef<HeroCarouselRef, Props>(function HeroImageCarousel(
  { slides, variant = "card", hideOverlay = false },
  ref
) {
  const safeSlides = useMemo(() => (slides.length ? slides : []), [slides]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % safeSlides.length);
    }, 6500);
    return () => window.clearInterval(t);
  }, [safeSlides.length]);

  const active = safeSlides[idx];

  function prev() {
    setIdx((i) => (i - 1 + safeSlides.length) % safeSlides.length);
  }

  function next() {
    setIdx((i) => (i + 1) % safeSlides.length);
  }

  useImperativeHandle(ref, () => ({
    prev,
    next,
    setIdx,
    idx,
    count: safeSlides.length,
  }));

  if (!active) return null;

  const isBackground = variant === "background";

  return (
    <div
      className={
        "relative overflow-hidden " +
        (isBackground
          ? "h-full w-full"
          : "rounded-3xl border border-white/10 bg-white/5 shadow-sm")
      }
    >
      <div className="absolute inset-0">
        <Image
          src={active.src}
          alt={active.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        {isBackground ? null : <div className="absolute inset-0 ring-1 ring-white/10" />}
      </div>

      {!hideOverlay && !isBackground && (
        <div className="relative flex min-h-[340px] flex-col justify-end p-6 md:min-h-[420px]">
          <div className="max-w-sm">
            <div className="text-xs font-semibold tracking-widest text-white/70">NITRO CLEAN</div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-3xl">{active.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/75">{active.subtitle}</div>
          </div>

          {safeSlides.length > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {safeSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={
                      "h-2.5 w-2.5 rounded-full transition " +
                      (i === idx ? "bg-white" : "bg-white/35 hover:bg-white/60")
                    }
                    aria-label={`Görsel ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15"
                  aria-label="Önceki"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15"
                  aria-label="Sonraki"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
