"use client";

import { useMemo } from "react";

type Item = {
  title: string;
  src: string;
};

export function UsageIconMarquee() {
  const items = useMemo<Item[]>(
    () => [
      { title: "İyi havalandırın", src: "/icon/well-ventilated.svg" },
      { title: "Eldiven kullanın", src: "/icon/glove.svg" },
      { title: "Ateşten uzak", src: "/icon/fire.svg" },
      { title: "Çocuklardan uzak", src: "/icon/children.svg" },
      { title: "+18 Kullanım", src: "/icon/%2B18.svg" },
    ],
    []
  );

  const doubled = [...items, ...items];

  return (
    <section className="mt-10 overflow-hidden rounded-2xl bg-[#0b1220] shadow-sm">
      <div className="relative p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2B5C] via-[#0b1220] to-[#0077B6] opacity-95" />
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#F7941D]/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="text-center">
            <div className="text-xs font-semibold tracking-widest text-white/70">GÜVENLİ KULLANIM</div>
            <div className="mt-2 text-2xl font-semibold text-white">Uyarılar & İpuçları</div>
            <div className="mt-2 text-sm text-white/70">Etiket talimatlarına uygun kullan.</div>
          </div>

          <div className="mt-6 -mx-8 overflow-hidden">
            <div className="nc-marquee gap-6 px-8 py-3">
          {doubled.map((x, idx) => (
            <div
              key={x.title + idx}
              className="w-[240px] shrink-0 rounded-2xl border border-white/10 bg-white/10 p-6 text-center text-white shadow-sm backdrop-blur"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <img
                  src={x.src}
                  alt={x.title}
                  className="h-10 w-10 [filter:invert(1)]"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-sm font-semibold text-white">{x.title}</div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
