export const metadata = {
  title: "KVKK Aydınlatma Metni | Nitro Clean",
  description: "Nitro Clean KVKK Aydınlatma Metni",
};

export default function KVKKPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-widest text-[#F7941D]">YASAL</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">KVKK Aydınlatma Metni</h1>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold text-slate-900">1. Veri Sorumlusu</h2>
          <p className="mt-4 text-slate-600 leading-7">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz; veri sorumlusu olarak Nitro Clean tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">2. Kişisel Verilerin İşlenme Amacı</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
          </p>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>Sipariş ve teslimat süreçlerinin yürütülmesi</li>
            <li>Müşteri ilişkileri yönetimi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İletişim faaliyetlerinin yürütülmesi</li>
            <li>Fatura ve ödeme işlemlerinin gerçekleştirilmesi</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">3. Kişisel Verilerin Aktarılması</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; kargo şirketleri, ödeme kuruluşları ve yasal mercilerle paylaşılabilecektir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Kişisel verileriniz, web sitemiz üzerinden elektronik ortamda toplanmaktadır. Bu veriler, sözleşmenin ifası, yasal yükümlülük ve meşru menfaat hukuki sebeplerine dayanılarak işlenmektedir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">5. Veri Sahibinin Hakları</h2>
          <p className="mt-4 text-slate-600 leading-7">
            KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">6. İletişim</h2>
          <p className="mt-4 text-slate-600 leading-7">
            KVKK kapsamındaki taleplerinizi info@nitroclean.com.tr adresine iletebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
