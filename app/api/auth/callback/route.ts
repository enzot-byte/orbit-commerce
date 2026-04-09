import { NextResponse } from "next/server";

/**
 * OAuth callback — Supabase redirects here after a successful
 * third-party sign-in (Google, etc). The access token is delivered
 * via URL hash which Supabase JS client picks up on the next page load,
 * so we just bounce the user to the dashboard.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = url.searchParams.get("next") || "/dashboard";
  return NextResponse.redirect(new URL(next, url.origin));
}
