"use client";

import { useMemo, useState } from "react";

import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";

type Props = {
  slug: string;
  name: string;
  unitPrice: number;
  disabled?: boolean;
};

export function ProductCardActions({ slug, name, unitPrice, disabled }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const openCart = useCartUiStore((s) => s.open);

  const item = useCartStore((s) => s.items.find((i) => i.slug === slug));
  const inCartQty = item?.quantity ?? 0;

  const [draftQty, setDraftQty] = useState(1);

  const shownQty = useMemo(() => {
    if (inCartQty > 0) return inCartQty;
    return Math.max(1, Math.floor(draftQty || 1));
  }, [draftQty, inCartQty]);

  function dec() {
    if (disabled) return;
    if (inCartQty > 1) {
      setQuantity(slug, inCartQty - 1);
      return;
    }
    if (inCartQty === 1) {
      removeItem(slug);
      return;
    }
    setDraftQty((q) => Math.max(1, q - 1));
  }

  function inc() {
    if (disabled) return;
    if (inCartQty > 0) {
      setQuantity(slug, inCartQty + 1);
      return;
    }
    setDraftQty((q) => Math.min(99, q + 1));
  }

  function add() {
    if (disabled) return;
    if (inCartQty > 0) {
      openCart();
      return;
    }
    addItem({ slug, name, unitPrice }, shownQty);
    openCart();
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <div
        className={
          "flex items-center gap-1 rounded-md border border-slate-200 bg-white p-1 " +
          (disabled ? "opacity-50" : "")
        }
      >
        <button
          type="button"
          className="rounded p-1 text-slate-700 hover:bg-slate-100"
          aria-label="Miktarı azalt"
          onClick={dec}
          disabled={!!disabled}
        >
          -
        </button>
        <span className="w-7 text-center text-sm font-semibold text-slate-900">{shownQty}</span>
        <button
          type="button"
          className="rounded p-1 text-slate-700 hover:bg-slate-100"
          aria-label="Miktarı artır"
          onClick={inc}
          disabled={!!disabled}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={add}
        disabled={!!disabled}
        className={
          "inline-flex h-10 flex-1 items-center justify-center rounded-md px-4 text-sm font-semibold transition " +
          (disabled
            ? "bg-slate-200 text-slate-500"
            : inCartQty > 0
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-[#1A2B5C] text-white hover:bg-[#141e33]")
        }
      >
        {disabled ? "Tükendi" : inCartQty > 0 ? "Sepette" : "Sepete Ekle"}
      </button>
    </div>
  );
}
