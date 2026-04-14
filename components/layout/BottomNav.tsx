"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";

function NavIcon({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <span className="grid h-6 w-6 place-items-center">{children}</span>;
}

export function BottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartUiStore((s) => s.open);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const base =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold transition";
  const active = "text-[#F7941D]";
  const inactive = "text-white/75 hover:text-white";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[120] border-t border-white/10 bg-[#0b1220]/85 backdrop-blur md:hidden">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-5 px-2">
        <Link href="/" className={`${base} ${isActive("/") ? active : inactive}`}>
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 21v-7A1.5 1.5 0 0 1 11 12.5h2A1.5 1.5 0 0 1 14.5 14v7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </NavIcon>
          Ana Sayfa
        </Link>

        <Link
          href="/products"
          className={`${base} ${isActive("/products") ? active : inactive}`}
        >
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M7 3.5h10A2.5 2.5 0 0 1 19.5 6v14A2.5 2.5 0 0 1 17 22.5H7A2.5 2.5 0 0 1 4.5 20V6A2.5 2.5 0 0 1 7 3.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 8h8M8 12h8M8 16h6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </NavIcon>
          Ürünler
        </Link>

        <button
          type="button"
          onClick={openCart}
          className={`${base} ${inactive} relative`}
          aria-label="Sepeti aç"
        >
          <NavIcon>
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
          </NavIcon>
          Sepet
          {itemCount > 0 ? (
            <span className="absolute right-4 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F7941D] px-1 text-[10px] font-bold text-[#1A2B5C]">
              {itemCount}
            </span>
          ) : null}
        </button>

        <Link
          href="/track-order"
          className={`${base} ${isActive("/track-order") ? active : inactive}`}
        >
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M12 21.5c4.8 0 8.5-3.7 8.5-8.5S16.8 4.5 12 4.5 3.5 8.2 3.5 13 7.2 21.5 12 21.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 8v5l3.2 1.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavIcon>
          Takip
        </Link>

        <Link
          href="/iletisim"
          className={`${base} ${isActive("/iletisim") ? active : inactive}`}
        >
          <NavIcon>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6.5 4.5h11A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V7A2.5 2.5 0 0 1 6.5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M5.5 7.5 12 12l6.5-4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </NavIcon>
          İletişim
        </Link>
      </div>
    </div>
  );
}
