"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Giriş yapılamadı");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-14">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Admin Girişi</h1>
        <p className="mt-2 text-sm text-slate-600">
          Bu alan sadece satıcı hesabı içindir.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Şifre</label>
            <input
              className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1A2B5C] text-sm font-semibold text-white"
            disabled={loading}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginInner />
    </Suspense>
  );
}
