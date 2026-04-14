import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Body = {
  status?: string;
  cargo_company?: string | null;
  cargo_tracking?: string | null;
};

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const role = (data.user?.app_metadata as any)?.role;
  if (!data.user || role !== "admin") {
    return { ok: false as const };
  }
  return { ok: true as const };
}

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Body;

  const status = typeof body.status === "string" ? body.status.trim() : null;
  const cargo_company = body.cargo_company ?? null;
  const cargo_tracking = body.cargo_tracking ?? null;

  if (!status) {
    return NextResponse.json({ error: "validation_error" }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdminClient();

  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      status,
      cargo_company,
      cargo_tracking,
    })
    .eq("id", ctx.params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
