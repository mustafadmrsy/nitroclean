export const metadata = {
  title: "İade Politikası | Nitro Clean",
  description: "Nitro Clean İade ve Değişim Politikası",
};

export default function IadePolitikasiPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-widest text-[#F7941D]">YASAL</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">İade Politikası</h1>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="prose prose-slate max-w-none">
          <div className="rounded-xl bg-[#F7941D]/10 p-4 text-sm text-slate-700">
            <strong>Not:</strong> İade süreci şu anda aktif değildir. Yakında hizmetinize sunulacaktır. Sorularınız için lütfen bizimle iletişime geçin.
          </div>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">1. Cayma Hakkı</h2>
          <p className="mt-4 text-slate-600 leading-7">
            6502 sayılı Tüketicinin Korunması Hakkında Kanun gereğince, tüketici ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkına sahiptir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">2. İade Şartları</h2>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
            <li>Ürün etiketi ve koruyucu bandı açılmamış olmalıdır</li>
            <li>Fatura veya sipariş numarası ile birlikte iade talebi oluşturulmalıdır</li>
            <li>İade kargo ücreti alıcıya aittir (hatalı/hasarlı ürün hariç)</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">3. İade Edilemeyecek Ürünler</h2>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>Ambalajı açılmış, kullanılmış veya hasar görmüş ürünler</li>
            <li>Hijyen açısından iade edilemeyecek ürünler</li>
            <li>Özel sipariş üzerine hazırlanan ürünler</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">4. İade Süreci</h2>
          <ol className="mt-4 list-decimal pl-6 text-slate-600 space-y-2">
            <li>İade talebinizi info@nitroclean.com.tr adresine iletin</li>
            <li>Onay aldıktan sonra ürünü belirtilen adrese gönderin</li>
            <li>Ürün tarafımıza ulaştıktan sonra kontrol edilecektir</li>
            <li>Onaylanan iadeler 10 iş günü içinde hesabınıza yatırılacaktır</li>
          </ol>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">5. Hasarlı/Hatalı Ürün</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Kargo sırasında hasar görmüş veya hatalı gönderilmiş ürünler için teslimat anında tutanak tutturmanızı öneririz. Bu durumda kargo ücreti tarafımızca karşılanacaktır.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">6. İletişim</h2>
          <p className="mt-4 text-slate-600 leading-7">
            İade ve değişim talepleriniz için:<br />
            E-posta: info@nitroclean.com.tr<br />
            Telefon: +90 555 123 4567
          </p>
        </div>
      </div>
    </main>
  );
}
