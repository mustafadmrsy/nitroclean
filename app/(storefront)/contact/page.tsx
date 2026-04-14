import Link from "next/link";

export const metadata = {
  title: "İletişim | Nitro Clean",
  description: "Nitro Clean ile iletişime geçin.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-widest text-[#F7941D]">İLETİŞİM</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Bize Ulaşın</h1>
        <p className="mt-4 text-slate-600">
          Sorularınız, önerileriniz veya toptan satış talepleriniz için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7941D]/10">
                <svg className="h-6 w-6 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">E-posta</div>
                <div className="mt-1 text-sm text-slate-600">info@nitroclean.com.tr</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7941D]/10">
                <svg className="h-6 w-6 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Telefon</div>
                <div className="mt-1 text-sm text-slate-600">+90 555 123 4567</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7941D]/10">
                <svg className="h-6 w-6 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Adres</div>
                <div className="mt-1 text-sm text-slate-600">İstanbul, Türkiye</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7941D]/10">
                <svg className="h-6 w-6 text-[#F7941D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Çalışma Saatleri</div>
                <div className="mt-1 text-sm text-slate-600">Pazartesi - Cuma: 09:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">Mesaj Gönderin</div>
          <p className="mt-1 text-sm text-slate-600">En kısa sürede size dönüş yapacağız.</p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Ad Soyad</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#F7941D] focus:outline-none focus:ring-1 focus:ring-[#F7941D]"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">E-posta</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#F7941D] focus:outline-none focus:ring-1 focus:ring-[#F7941D]"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Konu</label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#F7941D] focus:outline-none focus:ring-1 focus:ring-[#F7941D]">
                <option>Genel Soru</option>
                <option>Toptan Satış</option>
                <option>Sipariş Hakkında</option>
                <option>İade/Değişim</option>
                <option>Diğer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mesajınız</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#F7941D] focus:outline-none focus:ring-1 focus:ring-[#F7941D]"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#1A2B5C] py-3 text-sm font-semibold text-white transition hover:bg-[#0f1a3a]"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
