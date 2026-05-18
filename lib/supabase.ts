import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client (public, cookie-aware).
 *
 * Uses `@supabase/ssr#createBrowserClient` instead of `supabase-js#createClient`
 * because we need session cookies (not just localStorage) — the `proxy.ts`
 * dashboard guard reads `sb-<ref>-auth-token` cookies before any client JS
 * boots. Without cookie persistence, OAuth + email login both fail silently:
 * login succeeds → user redirects to /dashboard → proxy sees no cookie →
 * bounces to /login.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * on Vercel → Settings → Environment Variables.
 *
 * Fully defensive: an invalid/placeholder URL must NOT crash the
 * production build during static prerender.
 */
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

function isValidHttpUrl(u: string | undefined): u is string {
  if (!u) return false;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

let client: SupabaseClient | null = null;
if (isValidHttpUrl(rawUrl) && anonKey) {
  try {
    client = createBrowserClient(rawUrl, anonKey);
  } catch (err) {
    console.warn("[supabase] failed to init browser client:", err);
    client = null;
  }
}

export const supabase = client;
export const isSupabaseConfigured = client !== null;
