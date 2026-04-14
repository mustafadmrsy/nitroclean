import { NextResponse } from "next/server";

import { z } from "zod";

import { calculateShipping } from "@/domain/shipping";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1),
  customer: z.object({
    email: z.string().email(),
    phone: z.string().min(7),
  }),
  shippingAddress: z.object({
    full_name: z.string().min(2),
    phone: z.string().min(7),
    address_line: z.string().min(5),
    city: z.string().min(2),
    district: z.string().min(2),
    postal_code: z.string().optional(),
  }),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  const slugs = parsed.data.items.map((i) => i.slug);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, name_tr, sku, price, stock, is_active")
    .in("slug", slugs)
    .eq("is_active", true);

  if (productsError) {
    return NextResponse.json({ error: "products_fetch_failed" }, { status: 500 });
  }

  const productBySlug = new Map(products?.map((p) => [p.slug, p]));

  const resolvedItems = parsed.data.items.map((i) => {
    const p = productBySlug.get(i.slug);
    return { input: i, product: p };
  });

  if (resolvedItems.some((x) => !x.product)) {
    return NextResponse.json({ error: "product_not_found" }, { status: 400 });
  }

  if (
    resolvedItems.some(
      (x) => (x.product?.stock ?? 0) < x.input.quantity
    )
  ) {
    return NextResponse.json({ error: "insufficient_stock" }, { status: 400 });
  }

  const subtotal = resolvedItems.reduce(
    (sum, x) => sum + Number(x.product!.price) * x.input.quantity,
    0
  );

  const shippingFee = calculateShipping(subtotal);
  const total = subtotal + shippingFee;

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: null,
      customer_email: parsed.data.customer.email,
      customer_phone: parsed.data.customer.phone,
      subtotal,
      shipping_fee: shippingFee,
      total,
      shipping_address: parsed.data.shippingAddress,
    })
    .select("id, order_number, total, public_token")
    .single();

  if (orderError) {
    return NextResponse.json({ error: "order_create_failed" }, { status: 500 });
  }

  const orderItemsPayload = resolvedItems.map((x) => {
    const unitPrice = Number(x.product!.price);
    const qty = x.input.quantity;

    return {
      order_id: orderRow.id,
      product_id: x.product!.id,
      product_name: x.product!.name_tr,
      product_sku: x.product!.sku,
      quantity: qty,
      unit_price: unitPrice,
      total_price: unitPrice * qty,
    };
  });

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItemsPayload);

  if (orderItemsError) {
    return NextResponse.json({ error: "order_items_create_failed" }, { status: 500 });
  }

  return NextResponse.json({
    id: orderRow.id,
    orderNumber: orderRow.order_number,
    total: orderRow.total,
    publicToken: orderRow.public_token,
  });
}
