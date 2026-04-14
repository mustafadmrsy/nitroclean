import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh bg-[#F5F5F5]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6">
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-6 h-[calc(100dvh-3rem)]">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#141e33] text-white shadow-sm">
              <div className="border-b border-white/10 p-5">
                <div className="text-sm font-semibold tracking-tight">NITRO CLEAN</div>
                <div className="mt-1 text-xs text-white/70">Admin Panel</div>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto p-3 text-sm font-semibold">
                <Link
                  href="/admin"
                  className="block rounded-lg px-3 py-2 text-white/85 hover:bg-white/10 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/orders"
                  className="block rounded-lg px-3 py-2 text-white/85 hover:bg-white/10 hover:text-white"
                >
                  Siparişler
                </Link>
                <Link
                  href="/admin/products"
                  className="block rounded-lg px-3 py-2 text-white/85 hover:bg-white/10 hover:text-white"
                >
                  Ürünler
                </Link>

                <div className="mt-3 rounded-xl bg-white/5 p-3 text-xs text-white/75">
                  İpucu: Ürün görsellerini Storage üzerinden yöneterek performansı artırın.
                </div>
              </nav>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#f59412] text-sm font-semibold text-[#141e33]"
                >
                  Siteyi Gör
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-6 z-40">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Yönetim</div>
                  <div className="mt-1 text-xs text-slate-600">
                    Siparişleri ve ürünleri yönetin
                  </div>
                </div>

                <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
                  <span className="rounded-full bg-slate-100 px-3 py-2">Storage: nitroclean</span>
                  <span className="rounded-full bg-slate-100 px-3 py-2">Role: admin</span>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6 nc-slide-up">{children}</div>
        </div>
      </div>
    </div>
  );
}
