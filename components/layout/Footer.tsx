import Link from "next/link";

import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Logo size="large" />
          <p className="text-sm text-slate-600">
            Profesyonel oto bakım spreyleri. Güvenli ödeme, hızlı kargo.
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">Hızlı Linkler</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/products" className="text-slate-600 hover:text-slate-900">
              Ürünler
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900">
              İletişim
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">Yasal</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/kvkk" className="text-slate-600 hover:text-slate-900">
              KVKK
            </Link>
            <Link
              href="/mesafeli-satis"
              className="text-slate-600 hover:text-slate-900"
            >
              Mesafeli Satış
            </Link>
            <Link
              href="/iade-politikasi"
              className="text-slate-600 hover:text-slate-900"
            >
              İade Politikası
            </Link>
            <Link
              href="/cerez-politikasi"
              className="text-slate-600 hover:text-slate-900"
            >
              Çerez Politikası
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">İletişim</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>Fatih Özcan Oto San. Tic. Ltd. Şti.</div>
            <div>
              Dokuzkavaklar Mah. 2111/11 Sok. No:13, Pamukkale / DENİZLİ
            </div>
            <div>Tel: 0533 415 34 87</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-[#F5F5F5]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-600">
          <div>© 2026 Nitro Clean</div>
          <div>PayTR + SSL</div>
        </div>
      </div>
    </footer>
  );
}
