"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/domain/shipping";
import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";

function BagIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M16 10a4 4 0 0 1-8 0" />
      <path d="M3.103 6.034h17.794" />
      <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
    </svg>
  );
}

function XIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function TruckIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

export function CartDrawer() {
  const isOpen = useCartUiStore((s) => s.isOpen);
  const close = useCartUiStore((s) => s.close);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const subtotal = useCartStore((s) => s.subtotal());

  const safeItems = hydrated ? items : [];
  const safeSubtotal = hydrated ? subtotal : 0;

  const itemCount = safeItems.reduce((sum, i) => sum + i.quantity, 0);
  const freeShipping = safeSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - safeSubtotal);

  return (
    <div
      className={
        "fixed inset-0 z-[200] " +
        (isOpen ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!isOpen}
    >
      <div
        className={
          "absolute inset-0 bg-black/35 transition-opacity duration-300 " +
          (isOpen ? "opacity-100" : "opacity-0")
        }
        onClick={close}
      />

      <aside
        className={
          "absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
        role="dialog"
        aria-label="Sepet"
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <BagIcon className="h-5 w-5" />
            Sepetim ({itemCount})
          </div>
          <button
            type="button"
            className="rounded-full p-1 transition-colors hover:bg-slate-100"
            onClick={close}
            aria-label="Sepeti kapat"
          >
            <XIcon className="h-5 w-5 text-slate-800" />
          </button>
        </div>

        <div className="border-b border-slate-200 bg-[#F5F5F5] p-4">
          {freeShipping ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <TruckIcon className="h-4 w-4" />
              Ücretsiz kargo kazandınız!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <TruckIcon className="h-4 w-4" />
              Ücretsiz kargo için {remaining.toFixed(2)} ₺ daha ekleyin
              <span className="text-xs text-slate-500">(Kargo {SHIPPING_FEE.toFixed(2)} ₺)</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!hydrated ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
              Sepet yükleniyor...
            </div>
          ) : safeItems.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
              Sepetiniz boş.
            </div>
          ) : (
            <div className="space-y-3">
              {safeItems.map((i) => (
                <div
                  key={i.slug}
                  className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      {i.name}
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#0077B6]">
                      {i.unitPrice.toFixed(2)} ₺
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-1">
                    <button
                      type="button"
                      className="rounded p-1 text-slate-700 hover:bg-slate-100"
                      aria-label="Miktarı azalt"
                      onClick={() => setQuantity(i.slug, i.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-slate-900">
                      {i.quantity}
                    </span>
                    <button
                      type="button"
                      className="rounded p-1 text-slate-700 hover:bg-slate-100"
                      aria-label="Miktarı artır"
                      onClick={() => setQuantity(i.slug, i.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-red-600"
                    onClick={() => removeItem(i.slug)}
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Ara toplam</span>
            <span className="font-semibold text-slate-900">{safeSubtotal.toFixed(2)} ₺</span>
          </div>

          <Link
            href="/payment"
            className={
              "mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1A2B5C] text-sm font-semibold text-white " +
              (!hydrated || safeItems.length === 0
                ? "pointer-events-none opacity-50"
                : "")
            }
            onClick={close}
          >
            Ödemeye Geç
          </Link>

          <Link
            href="/basket"
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-200 text-sm font-semibold text-slate-900"
            onClick={close}
          >
            Sepete Git
          </Link>
        </div>
      </aside>
    </div>
  );
}
