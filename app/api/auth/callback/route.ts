import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * OAuth callback — Supabase redirects here after a successful third-party
 * sign-in (Google, etc) with `?code=<pkce_code>` in the query string.
 *
 * We exchange the code for a session here on the server using
 * `@supabase/ssr#createServerClient`. CRUCIAL: in Next 16 Route Handlers,
 * `cookies().set(...)` does NOT propagate to the returned Response. Instead
 * we must attach Set-Cookie on a `NextResponse` instance and return it.
 * That's why `setAll` writes to `response.cookies` (not to `cookieStore`).
 *
 * Without this pattern: exchangeCodeForSession appears to succeed (no error),
 * but no cookies are emitted → proxy.ts sees no session → /dashboard bounces
 * back to /login. Silent failure mode.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next") || "/dashboard";

  // Same-origin only — never trust a redirect target from the query string.
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(
      new URL("/login?error=supabase_not_configured", url.origin)
    );
  }

  // Build the success-path response up-front so we can pin Set-Cookie headers
  // on it inside `setAll`. The redirect target may flip to /login below if
  // the exchange fails, but the cookies will already be attached and that's
  // fine — they're just unused if we redirect to /login.
  const response = NextResponse.redirect(new URL(next, url.origin));
  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Attach Set-Cookie headers to the outgoing redirect Response.
        // (Writing to `cookieStore` here would be a no-op in route handlers.)
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.warn("[auth/callback] exchangeCodeForSession failed:", error.message);
    return NextResponse.redirect(
      new URL(
        `/login?error=exchange_failed&detail=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`,
        url.origin
      )
    );
  }

  return response;
}
