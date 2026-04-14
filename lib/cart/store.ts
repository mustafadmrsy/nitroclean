"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
          return;
        }
        set({ items: [...get().items, { ...item, quantity }] });
      },
      removeItem: (slug) => set({ items: get().items.filter((i) => i.slug !== slug) }),
      setQuantity: (slug, quantity) => {
        const q = Math.max(1, Math.floor(quantity));
        set({
          items: get().items.map((i) => (i.slug === slug ? { ...i, quantity: q } : i)),
        });
      },
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    {
      name: "nc_cart_v1",
      version: 1,
    }
  )
);
