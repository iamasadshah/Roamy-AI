import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Get the site URL from environment variable or use the request origin
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  // Redirect to the home page of the site
  return NextResponse.redirect(siteUrl);
} 