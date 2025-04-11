import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect routes
  if (
    (req.nextUrl.pathname.startsWith("/plan") ||
      req.nextUrl.pathname === "/" && req.nextUrl.searchParams.has("generate")) &&
    !session
  ) {
    const redirectUrl = req.nextUrl.origin + "/auth";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/plan/:path*"],
}; 