import { NextResponse } from "next/server";

import { z } from "zod";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  orderNumber: z.string().min(5),
  phone: z.string().min(7),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, total, created_at, cargo_company, cargo_tracking, invoice_url"
    )
    .eq("order_number", parsed.data.orderNumber)
    .eq("customer_phone", parsed.data.phone)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    total: order.total,
    createdAt: order.created_at,
    cargoCompany: order.cargo_company,
    cargoTracking: order.cargo_tracking,
    invoiceUrl: order.invoice_url,
  });
}
