import Link from "next/link";

import { createSupabasePublicClient } from "@/lib/supabase/public";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeProductSlider } from "@/components/home/HomeProductSlider";
import { UsageIconMarquee } from "@/components/home/UsageIconMarquee";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StorefrontHomePage() {
  const supabase = createSupabasePublicClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name_tr, slug, price, stock, image_url, gallery_urls, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false, nullsFirst: false })
    .order("id", { ascending: false })
    .limit(12);

  const featured = (products ?? []).slice(0, 8);

  return (
    <main>
      <HeroSection />

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="nc-slide-up">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#F7941D]">
                NEDEN NITRO CLEAN
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Maksimum performans için geliştirildi
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Günlük profesyonel kullanımda en yüksek standartları karşılayan Türk
                yapımı formül.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Profesyonel Formül",
                desc: "Zorlu kir ve yağları hızlı çözer",
              },
              { title: "Türk Üretimi", desc: "Yerli üretim, güçlü içerik" },
              { title: "Hızlı Kargo", desc: "15:00'e kadar aynı gün" },
              { title: "Güvenli Ödeme", desc: "Ödeme altyapısı yakında" },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-[#F5F5F5] text-xs font-bold text-[#1A2B5C]">
                  {x.title.split(" ")[0].slice(0, 2).toUpperCase()}
                </div>
                <div className="mt-4 text-sm font-semibold text-slate-900">{x.title}</div>
                <div className="mt-1 text-sm text-slate-600">{x.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">Ürünler</div>
                <div className="mt-1 text-sm text-slate-600">
                  Kaydırarak inceleyin
                </div>
              </div>
              <Link href="/products" className="text-sm font-semibold text-[#1A2B5C]">
                Tüm ürünler →
              </Link>
            </div>

            <HomeProductSlider products={featured as any} />
          </div>

          <UsageIconMarquee />

          {/* Reviews Section */}
          <section className="mt-16">
            <div className="text-center">
              <div className="text-xs font-semibold tracking-widest text-[#F7941D]">
                MÜŞTERİ DENEYİMLERİ
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Kullanıcılarımız ne diyor?
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "Mehmet K.",
                  role: "Oto Tamircisi",
                  text: "Balata temizliğinde çok başarılı. Kalıntı bırakmadı, işimi hızlandırdı.",
                  score: 5,
                },
                {
                  name: "Ayşe T.",
                  role: "Araç Sahibi",
                  text: "Motor temizliğinde hızlı etki. Kokusu rahatsız etmedi, sonuç mükemmel.",
                  score: 5,
                },
                {
                  name: "Ali R.",
                  role: "Servis Yöneticisi",
                  text: "Profesyonel kullanım için ideal. Müşterilerimiz de memnun kaldı.",
                  score: 5,
                },
              ].map((r) => (
                <div
                  key={r.name}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#F7941D]/5" />
                  <div className="relative">
                    <div className="flex items-center gap-1">
                      {[...Array(r.score)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-[#F7941D]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">&ldquo;{r.text}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2B5C] text-sm font-semibold text-white">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{r.name}</div>
                        <div className="text-xs text-slate-500">{r.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="text-xs font-semibold tracking-widest text-[#F7941D]">
                  SIK SORULAN SORULAR
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Merak ettikleriniz
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Ürünlerimiz ve hizmetlerimiz hakkında en çok sorulan sorulara hızlı cevaplar.
                </p>

                <div className="mt-8 flex-1 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#F7941D]/5 to-transparent p-6">
                  <div className="text-sm font-semibold text-slate-900">Yardıma mı ihtiyacınız var?</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Sorularınız için bizimle iletişime geçebilirsiniz.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="h-4 w-4 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      info@nitroclean.com.tr
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="h-4 w-4 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +90 555 123 4567
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#1A2B5C] px-5 text-sm font-semibold text-white transition hover:bg-[#0f1a3a]"
                >
                  İletişime Geç →
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Siparişim ne zaman kargoya verilir?",
                    a: "Hafta içi saat 15:00'e kadar verilen siparişler aynı gün kargoya teslim edilir.",
                    icon: "📦",
                  },
                  {
                    q: "Ürün yüzeye zarar verir mi?",
                    a: "Hassas yüzeylerde önce küçük bir alanda test etmenizi öneririz. Genel kullanımda güvenlidir.",
                    icon: "🛡️",
                  },
                  {
                    q: "İade politikanız nedir?",
                    a: "İade süreci yakında aktif edilecek. Şimdilik destek için bizimle iletişime geçebilirsiniz.",
                    icon: "↩️",
                  },
                  {
                    q: "Toptan satış yapıyor musunuz?",
                    a: "Evet, toptan siparişler için lütfen iletişim sayfamızdan bize ulaşın.",
                    icon: "🏪",
                  },
                ].map((x) => (
                  <div
                    key={x.q}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#F7941D]/30 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7941D]/10 text-lg">
                        {x.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{x.q}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{x.a}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 overflow-hidden rounded-3xl bg-[#0b1220] p-8 md:p-12">
            <div className="relative">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#F7941D]/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#0077B6]/20 blur-3xl" />
              <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                <div>
                  <div className="text-sm font-semibold text-[#F7941D]">Hazır mısınız?</div>
                  <div className="mt-2 text-2xl font-bold text-white md:text-3xl">
                    Nitro Clean ile şimdi tanışın
                  </div>
                  <p className="mt-3 max-w-md text-sm text-white/70">
                    Profesyonel temizlik ürünleriyle aracınıza hak ettiği bakımı verin.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#F7941D] px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#e8850f]"
                >
                  Hemen Satın Al →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
