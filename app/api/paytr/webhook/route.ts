import { NextResponse } from "next/server";

import { verifyPaytrWebhookHash } from "@/lib/paytr";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.formData();

  const status = String(body.get("status") ?? "");
  const merchantOid = String(body.get("merchant_oid") ?? "");
  const totalAmount = String(body.get("total_amount") ?? "");
  const hash = String(body.get("hash") ?? "");

  const ok = verifyPaytrWebhookHash({
    merchantOid,
    status,
    totalAmountKurus: totalAmount,
    hash,
  });

  if (!ok) {
    return new NextResponse("PAYTR notification failed: bad hash", { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const nextStatus = status === "success" ? "paid" : "cancelled";

  await supabase
    .from("orders")
    .update({
      status: nextStatus,
      paytr_status: status,
    })
    .eq("order_number", merchantOid);

  return new NextResponse("OK", { status: 200 });
}
