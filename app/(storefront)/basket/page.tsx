"use client";

import Link from "next/link";

import { useCartStore } from "@/lib/cart/store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Sepet</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-6 text-slate-600 shadow-sm">
          Sepetin boş.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white shadow-sm">
              <div className="divide-y divide-slate-100">
                {items.map((i) => (
                  <div key={i.slug} className="flex items-center gap-4 p-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900">
                        {i.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {i.unitPrice.toFixed(2)} ₺
                      </div>
                    </div>

                    <input
                      className="h-10 w-20 rounded-md border border-slate-200 px-3 text-sm"
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) => setQuantity(i.slug, Number(e.target.value))}
                    />

                    <button
                      className="text-sm font-semibold text-red-600"
                      onClick={() => removeItem(i.slug)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Ara toplam</span>
              <span className="font-semibold text-slate-900">
                {subtotal.toFixed(2)} ₺
              </span>
            </div>
            <Link
              href="/payment"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1A2B5C] text-sm font-semibold text-white"
            >
              Ödemeye Geç
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
