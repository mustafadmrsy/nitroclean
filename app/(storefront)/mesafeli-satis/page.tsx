export const metadata = {
  title: "Mesafeli Satış Sözleşmesi | Nitro Clean",
  description: "Nitro Clean Mesafeli Satış Sözleşmesi",
};

export default function MesafeliSatisPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-widest text-[#F7941D]">YASAL</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Mesafeli Satış Sözleşmesi</h1>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold text-slate-900">Madde 1 - Taraflar</h2>
          <p className="mt-4 text-slate-600 leading-7">
            <strong>SATICI:</strong><br />
            Ünvan: Nitro Clean<br />
            Adres: İstanbul, Türkiye<br />
            E-posta: info@nitroclean.com.tr<br />
            Telefon: +90 555 123 4567
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            <strong>ALICI:</strong><br />
            Sipariş sırasında belirtilen ad, soyad ve adres bilgileri.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 2 - Sözleşmenin Konusu</h2>
          <p className="mt-4 text-slate-600 leading-7">
            İşbu sözleşmenin konusu, ALICI&apos;nın SATICI&apos;ya ait web sitesinden elektronik ortamda siparişini yaptığı ürünlerin satışı ve teslimidir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 3 - Sözleşme Konusu Ürün</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Ürünün türü, miktarı, marka/modeli, rengi, adedi, satış bedeli ve ödeme şekli sipariş sayfasında belirtildiği gibidir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 4 - Genel Hükümler</h2>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>ALICI, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin tüm ön bilgileri okuyup bilgi sahibi olduğunu kabul eder.</li>
            <li>Ürün, eksiksiz ve siparişte belirtilen niteliklere uygun teslim edilecektir.</li>
            <li>SATICI, sözleşme konusu ürünü 30 gün içinde teslim edecektir.</li>
            <li>Ürün, ALICI&apos;dan başka bir kişiye teslim edilecek ise, teslim edilecek kişinin teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 5 - Cayma Hakkı</h2>
          <p className="mt-4 text-slate-600 leading-7">
            ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişiye tesliminden itibaren 14 gün içinde cayma hakkını kullanabilir. Cayma hakkının kullanılması için bu süre içinde SATICI&apos;ya yazılı bildirimde bulunulması gerekmektedir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 6 - Cayma Hakkı Kullanılamayacak Ürünler</h2>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>Tüketici&apos;nin istekleri veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan ürünler</li>
            <li>Çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler</li>
            <li>Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış ürünler</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Madde 7 - Yetkili Mahkeme</h2>
          <p className="mt-4 text-slate-600 leading-7">
            İşbu sözleşmeden doğan uyuşmazlıklarda Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
          </p>
        </div>
      </div>
    </main>
  );
}
