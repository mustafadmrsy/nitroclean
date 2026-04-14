import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const { supabase, res } = createSupabaseMiddlewareClient(req);
  const { data } = await supabase.auth.getUser();

  const role = (data.user?.app_metadata as any)?.role;
  if (!data.user || role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
