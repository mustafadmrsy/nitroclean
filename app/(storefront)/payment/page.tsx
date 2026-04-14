"use client";

import { useState } from "react";

import Link from "next/link";

import { useCartStore } from "@/lib/cart/store";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  async function createOrder() {
    if (loading) return;
    setLoading(true);
    setStatus("Sipariş oluşturuluyor...");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        customer: {
          email,
          phone,
        },
        shippingAddress: {
          full_name: fullName,
          phone,
          address_line: addressLine,
          city,
          district,
          postal_code: postalCode || undefined,
        },
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(`Hata: ${data.error ?? "unknown"}`);
      setLoading(false);
      return;
    }

    setOrderNumber(data.orderNumber);
    setOrderTotal(Number(data.total));
    setStatus("Siparişiniz alındı. Ödeme altyapısı (PayTR) yakında aktif edilecek.");
    setLoading(false);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Ödeme</h1>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        {items.length === 0 ? (
          <div className="mb-4 rounded-lg border border-slate-200 bg-[#F5F5F5] p-3 text-sm text-slate-700">
            Sepetiniz boş. Ödeme yapabilmek için önce ürün ekleyin.
            <Link href="/products" className="ml-2 font-semibold text-[#1A2B5C]">
              Ürünlere git
            </Link>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-900">İletişim</div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Telefon</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05xxxxxxxxx"
              required
            />
          </div>

          <div className="md:col-span-2">
            <div className="mt-2 text-sm font-semibold text-slate-900">Adres</div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Ad Soyad</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Açık Adres</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">İl</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">İlçe</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Posta Kodu</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <div className="text-sm text-slate-600">Ara toplam</div>
        <div className="mt-1 text-lg font-semibold text-slate-900">
          {subtotal.toFixed(2)} ₺
        </div>

        {orderNumber ? (
          <div className="mt-6 rounded-lg border border-slate-200 bg-[#F5F5F5] p-4 text-sm text-slate-800">
            <div>
              <span className="font-semibold">Sipariş Numaranız:</span> {orderNumber}
            </div>
            {orderTotal !== null ? (
              <div className="mt-1">
                <span className="font-semibold">Toplam:</span> {orderTotal.toFixed(2)} ₺
              </div>
            ) : null}
            <div className="mt-3">
              <Link href="/track-order" className="font-semibold text-[#1A2B5C]">
                Siparişimi takip et
              </Link>
            </div>
          </div>
        ) : (
          <button
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#F7941D] text-sm font-semibold text-[#1A2B5C]"
            onClick={createOrder}
            disabled={items.length === 0 || loading}
          >
            {loading ? "İşleniyor..." : "Siparişi Oluştur"}
          </button>
        )}

        {status ? (
          <div className="mt-4 text-sm text-slate-700">{status}</div>
        ) : null}
      </div>
    </main>
  );
}
