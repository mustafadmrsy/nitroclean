"use client";

import { useEffect, useState } from "react";

import { ProductCreateForm } from "@/components/admin/ProductCreateForm";

export function ProductCreateModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-md bg-[#141e33] px-4 text-sm font-semibold text-white"
      >
        Ürün Ekle
      </button>

      {open ? (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-center px-3 pt-0 md:px-6 md:pt-0">
            <div className="w-full max-w-2xl -translate-y-6 overflow-hidden rounded-2xl bg-white shadow-2xl md:-translate-y-10">
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Ürün Ekle</div>
                  <div className="mt-1 text-xs text-slate-600">Bilgileri doldurun</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
                  aria-label="Kapat"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto p-5">
                <ProductCreateForm onSuccess={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
