import { NextResponse } from "next/server";

import { z } from "zod";

import { createPaytrIframeToken } from "@/lib/paytr";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  orderId: z.string().uuid(),
  publicToken: z.string().uuid(),
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
      "id, order_number, total, customer_email, customer_phone, shipping_address, public_token"
    )
    .eq("id", parsed.data.orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "order_not_found" }, { status: 404 });
  }

  if (order.public_token !== parsed.data.publicToken) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("product_name, unit_price, quantity")
    .eq("order_id", order.id);

  if (itemsError) {
    return NextResponse.json({ error: "order_items_fetch_failed" }, { status: 500 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const userIp = (forwardedFor ? forwardedFor.split(",")[0] : null) ?? "127.0.0.1";

  const shippingAddress = order.shipping_address as any;
  const okUrl = `${env.NEXT_PUBLIC_SITE_URL}/track-order`;
  const failUrl = `${env.NEXT_PUBLIC_SITE_URL}/payment?status=fail`;

  try {
    const token = await createPaytrIframeToken({
      merchantOid: order.order_number,
      userIp,
      email: order.customer_email ?? "guest@nitroclean.com.tr",
      paymentAmountKurus: Math.round(Number(order.total) * 100),
      basket: (items ?? []).map((i) => ({
        name: i.product_name,
        priceTl: Number(i.unit_price),
        quantity: i.quantity,
      })),
      userName: shippingAddress?.full_name ?? "Müşteri",
      userAddress: shippingAddress?.address_line ?? "",
      userPhone: order.customer_phone ?? "",
      okUrl,
      failUrl,
    });

    await supabase
      .from("orders")
      .update({ paytr_merchant_oid: order.order_number })
      .eq("id", order.id);

    return NextResponse.json({ iframeToken: token });
  } catch (e) {
    return NextResponse.json(
      { error: "paytr_token_failed", message: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
