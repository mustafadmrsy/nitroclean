"use client";

import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";

type Props = {
  slug: string;
  name: string;
  unitPrice: number;
};

export function AddToBasketButton({ slug, name, unitPrice }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const open = useCartUiStore((s) => s.open);

  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-md bg-[#1A2B5C] px-5 text-sm font-semibold text-white"
      onClick={() => {
        addItem({ slug, name, unitPrice }, 1);
        open();
      }}
    >
      Sepete Ekle
    </button>
  );
}
