export const metadata = {
  title: "Çerez Politikası | Nitro Clean",
  description: "Nitro Clean Çerez (Cookie) Politikası",
};

export default function CerezPolitikasiPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-widest text-[#F7941D]">YASAL</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Çerez Politikası</h1>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold text-slate-900">1. Çerez Nedir?</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Çerezler, web sitelerinin bilgisayarınıza veya mobil cihazınıza yerleştirdiği küçük metin dosyalarıdır. Bu dosyalar, web sitesinin düzgün çalışmasını sağlamak, güvenliği artırmak, daha iyi bir kullanıcı deneyimi sunmak ve siteyi analiz etmek için kullanılır.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">2. Kullandığımız Çerez Türleri</h2>
          
          <h3 className="mt-6 text-lg font-semibold text-slate-900">Zorunlu Çerezler</h3>
          <p className="mt-2 text-slate-600 leading-7">
            Web sitesinin temel işlevlerini yerine getirmesi için gereklidir. Sepet bilgileri, oturum yönetimi gibi işlevler bu çerezler sayesinde çalışır.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Performans Çerezleri</h3>
          <p className="mt-2 text-slate-600 leading-7">
            Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur. Hangi sayfaların en çok ziyaret edildiği, hata mesajları gibi bilgileri toplar.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">İşlevsellik Çerezleri</h3>
          <p className="mt-2 text-slate-600 leading-7">
            Tercihlerinizi hatırlamamızı sağlar. Dil tercihi, bölge seçimi gibi ayarlarınız bu çerezler sayesinde saklanır.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hedefleme/Reklam Çerezleri</h3>
          <p className="mt-2 text-slate-600 leading-7">
            Size ilgi alanlarınıza uygun reklamlar göstermek için kullanılır. Şu anda sitemizde reklam çerezleri kullanılmamaktadır.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Ancak çerezleri devre dışı bırakmanız durumunda web sitesinin bazı özellikleri düzgün çalışmayabilir.
          </p>
          <ul className="mt-4 list-disc pl-6 text-slate-600 space-y-2">
            <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
            <li><strong>Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
            <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
            <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">4. Üçüncü Taraf Çerezleri</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Web sitemizde analiz ve ödeme işlemleri için üçüncü taraf hizmetleri kullanılabilir. Bu hizmetler kendi çerez politikalarına sahiptir.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">5. Politika Güncellemeleri</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Bu çerez politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayınlanacaktır.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">6. İletişim</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Çerez politikamız hakkında sorularınız için info@nitroclean.com.tr adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
