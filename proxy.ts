import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic auth proxy (file-convention `proxy.ts` per Next 16 docs:
 * 01-app/02-guides/authentication.md#optimistic-checks-with-proxy-optional).
 *
 * Goal of this guard:
 *   Stop fully-logged-out users from ever seeing the dashboard HTML — they
 *   were previously hitting the page, the client booted up, AuthProvider's
 *   `getUser()` resolved to null, and only then the user was bounced. That
 *   produced the "dashboard flash" the brief flagged.
 *
 * What this check does:
 *   - Looks for ANY Supabase session cookie (`sb-<project-ref>-auth-token`,
 *     with optional `.0`/`.1` chunk suffixes for large tokens).
 *   - If absent on a `/dashboard/*` request, redirect to /login with a
 *     `next` query string so the login page can bounce the user back.
 *
 * What this check does NOT do:
 *   - Cryptographically verify the JWT — that's a server roundtrip per
 *     request and the brief asked for an *optimistic* check. Expired or
 *     forged cookies still pass middleware; AuthProvider then catches them
 *     and signs the user out on the client. The dashboard tree never
 *     calls privileged data from the client, so the worst case is a brief
 *     "loading…" frame and a redirect, no data leak.
 *
 *   - Touch public routes or API routes (the `matcher` below excludes them).
 *
 * If we ever need strict server-side enforcement (e.g. before showing a
 * private course video URL), promote this to use `@supabase/ssr`'s
 * `createServerClient` with a `getUser()` call inside the matched routes.
 * Adds ~30KB to the server runtime; zero client-side cost. Skipped for now
 * because there's no privileged server-fetched data on /dashboard yet.
 */
const SUPABASE_COOKIE = /^sb-.+-auth-token(\.\d+)?$/;

export default function proxy(req: NextRequest) {
  const hasSession = req.cookies
    .getAll()
    .some((c) => SUPABASE_COOKIE.test(c.name) && c.value.length > 0);

  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only guard /dashboard — everything else (home, marketing, login,
  // auth callbacks, API) is public.
  matcher: ["/dashboard/:path*"],
};
