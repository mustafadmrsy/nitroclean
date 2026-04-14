"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";

export function Header() {
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartUiStore((s) => s.open);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[100] isolate">
      <div className="bg-[#0b1220] text-white">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="overflow-hidden py-2">
            <div className="nc-marquee gap-10 text-xs font-semibold tracking-wide text-white/85">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F7941D]" />
                15:00'e kadar verilen siparişler aynı gün kargoda
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F7941D]" />
                Yerli üretim • Profesyonel formül • Güvenli paketleme
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F7941D]" />
                15:00'e kadar verilen siparişler aynı gün kargoda
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F7941D]" />
                Yerli üretim • Profesyonel formül • Güvenli paketleme
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "border-b border-white/10 text-white shadow-lg backdrop-blur transition " +
          (scrolled ? "bg-[#1A2B5C]/70" : "bg-[#1A2B5C]/92")
        }
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center px-4 py-3 md:grid-cols-3">
          <div className="flex items-center">
            <div className="nc-fade-in">
              <Logo size="large" />
            </div>
          </div>

          <nav className="hidden items-center justify-center gap-7 text-sm font-semibold md:flex">
            <Link href="/products" className="text-white/85 hover:text-[#F7941D]">
              Ürünler
            </Link>
            <Link href="/track-order" className="text-white/85 hover:text-[#F7941D]">
              Sipariş Takibi
            </Link>
            <Link href="/contact" className="text-white/85 hover:text-[#F7941D]">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={openCart}
              className={
                "relative hidden h-10 w-10 items-center justify-center rounded-md border transition md:inline-flex " +
                (scrolled
                  ? "border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
                  : "border-white/15 bg-white/5 text-white/95 hover:bg-white/10")
              }
              aria-label="Sepeti aç"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M7.5 9.5h13l-1.2 10a2.2 2.2 0 0 1-2.2 2H9.2a2.2 2.2 0 0 1-2.2-2l-1-10Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9.5V8a3 3 0 0 1 6 0v1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F7941D] px-1 text-[11px] font-bold text-[#1A2B5C]">
                  {itemCount}
                </span>
              ) : null}
            </button>

            <Link
              href="/hesap"
              className={
                "hidden h-10 w-10 items-center justify-center rounded-md border bg-white/5 text-white/90 transition hover:bg-white/10 md:inline-flex " +
                (scrolled ? "border-white/10" : "border-white/15")
              }
              aria-label="Hesap"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 20a8 8 0 0 1 16 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
