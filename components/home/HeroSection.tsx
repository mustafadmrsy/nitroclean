"use client";

import Link from "next/link";
import { useRef } from "react";
import { HeroImageCarousel, HeroCarouselRef } from "./HeroImageCarousel";

const slides = [
  {
    src: "/image/image.png",
    title: "Derin temizlik, anında etki",
    subtitle: "Profesyonel formül ile yağ ve kiri hızlıca çözer. Kalıntı bırakmaz.",
  },
  {
    src: "/image/image2.png",
    title: "Motor bakımında premium sonuç",
    subtitle: "Güvenli uygulama, güçlü performans. Nitro Clean ile kontrol sende.",
  },
];

export function HeroSection() {
  const carouselRef = useRef<HeroCarouselRef>(null);

  return (
    <section className="relative overflow-hidden bg-[#0b1220]">
      {/* Background carousel */}
      <div className="absolute inset-0">
        <HeroImageCarousel ref={carouselRef} variant="background" slides={slides} hideOverlay />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="nc-slide-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#F7941D]" />
              NITRO CLEAN
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Profesyonel güç,
              <span className="text-[#F7941D]"> temiz motor.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg">
              Fren balata ve motor yüzeylerinde endüstri standardı temizlik. Hızlı, güçlü, güvenli.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#F7941D] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#e8850f]"
              >
                Hemen Satın Al →
              </Link>
              <Link
                href="/track-order"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Sipariş Takibi
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Aynı gün kargo
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Türk üretimi
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Profesyonel formül
              </div>
            </div>
          </div>

          {/* Right: Empty space for image visibility */}
          <div className="hidden lg:block" />
        </div>

        {/* Carousel controls - bottom corners (desktop) */}
        <button
          type="button"
          onClick={() => carouselRef.current?.prev()}
          className="absolute bottom-6 left-6 z-10 hidden items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 lg:inline-flex lg:h-12 lg:w-12"
          aria-label="Önceki görsel"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => carouselRef.current?.next()}
          className="absolute bottom-6 right-6 z-10 hidden items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 lg:inline-flex lg:h-12 lg:w-12"
          aria-label="Sonraki görsel"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Mobile carousel controls */}
        <div className="mt-8 flex items-center justify-between px-4 lg:hidden">
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Önceki görsel"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Sonraki görsel"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
