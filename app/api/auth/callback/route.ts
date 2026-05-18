import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * OAuth callback — Supabase redirects here after a successful third-party
 * sign-in (Google, etc) with `?code=<pkce_code>` in the query string.
 *
 * We exchange the code for a session here on the server using
 * `@supabase/ssr#createServerClient`, which sets the `sb-<ref>-auth-token`
 * cookie via Next's `cookies()` API. That cookie is what `proxy.ts` reads
 * to gate /dashboard/* — without this exchange, the dashboard guard sees
 * no cookie and bounces the user back to /login.
 *
 * Why this route (and not the client-side hash-token path):
 *   Default Supabase OAuth flow is PKCE (since 2024). With PKCE the code
 *   comes via query string and must be exchanged server-side. The legacy
 *   "implicit" flow returned a hash token that the client picked up on
 *   load — that's gone.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next") || "/dashboard";

  // Same-origin only — never trust a redirect target from the query string.
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";

  if (!code) {
    // Nothing to exchange — most likely the user hit /api/auth/callback
    // directly or the provider returned an error.
    return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(
      new URL("/login?error=supabase_not_configured", url.origin)
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // cookies().set() may throw in route handlers during streamed
          // responses — safe to ignore; the redirect below carries the
          // Set-Cookie headers already attached.
        }
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.warn("[auth/callback] exchangeCodeForSession failed:", error.message);
    return NextResponse.redirect(
      new URL(`/login?error=exchange_failed&next=${encodeURIComponent(next)}`, url.origin)
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
