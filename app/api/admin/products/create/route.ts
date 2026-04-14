import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

function toNumber(value: FormDataEntryValue | null) {
  if (value === null) return null;
  const s = typeof value === "string" ? value : "";
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function cleanSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const role = (data.user?.app_metadata as any)?.role;
  if (!data.user || role !== "admin") {
    return { ok: false as const, userId: null };
  }
  return { ok: true as const, userId: data.user.id };
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: "missing_supabase_url" }, { status: 500 });
  }

  const fd = await req.formData();

  const slugRaw = String(fd.get("slug") ?? "");
  const slug = cleanSlug(slugRaw);
  const name_tr = String(fd.get("name_tr") ?? "").trim();
  const name_en = String(fd.get("name_en") ?? "").trim() || null;
  const description_tr = String(fd.get("description_tr") ?? "").trim() || null;

  const price = toNumber(fd.get("price"));
  const compare_price = toNumber(fd.get("compare_price"));
  const stock = toNumber(fd.get("stock")) ?? 0;
  const sku = String(fd.get("sku") ?? "").trim() || null;
  const volume_ml = toNumber(fd.get("volume_ml"));
  const weight_g = toNumber(fd.get("weight_g"));
  const is_active = String(fd.get("is_active") ?? "1") === "1";

  if (!slug || !name_tr || price === null) {
    return NextResponse.json(
      { error: "validation_error" },
      { status: 400 }
    );
  }

  const mainImage = fd.get("main_image");
  const gallery = fd.getAll("gallery_images");

  const supabaseAdmin = createSupabaseAdminClient();
  const bucket = "nitroclean";

  async function upload(file: File, kind: "main" | "gallery") {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const safeExt = ext.replace(/[^a-z0-9]/g, "") || "jpg";

    const path = `products/${slug}/${kind}-${Date.now()}-${randomId()}.${safeExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  }

  let image_url: string | null = null;
  const gallery_urls: string[] = [];

  try {
    if (mainImage && typeof mainImage !== "string") {
      image_url = await upload(mainImage, "main");
    }

    for (const entry of gallery) {
      if (entry && typeof entry !== "string") {
        const u = await upload(entry, "gallery");
        gallery_urls.push(u);
      }
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("products")
      .insert({
        slug,
        name_tr,
        name_en,
        description_tr,
        price,
        compare_price: compare_price || null,
        stock,
        sku,
        volume_ml: volume_ml || null,
        weight_g: weight_g || null,
        is_active,
        image_url,
        gallery_urls: gallery_urls.length ? gallery_urls : null,
        created_at: new Date().toISOString(),
      })
      .select("id, slug")
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ id: inserted.id, slug: inserted.slug });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "upload_failed" },
      { status: 500 }
    );
  }
}
