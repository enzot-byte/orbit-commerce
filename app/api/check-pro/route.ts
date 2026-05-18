import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * Cross-product plan check endpoint.
 *
 * Use case: Sellertrack (Sellerspy extensão) backend roda em Supabase
 * DIFERENTE do Sellerverse — `auth.users` separados. Quando user Pro do
 * Sellerverse instalar Sellerspy, a extensão pode chamar este endpoint
 * pra descobrir o plano do user *sem* ter acesso direto ao Supabase do
 * Sellerverse.
 *
 *   GET /api/check-pro?email=foo@bar.com
 *   → 200 { exists: true,  plan: "Pro" }
 *   → 200 { exists: false, plan: null }
 *
 * Trade-offs aceitos pra MVP:
 *   - Endpoint público (sem auth). Vaza "esse email tem conta?" — privacidade
 *     baixíssima. Quando crescer (>100 users), adiciona shared secret header.
 *   - Rate limit em memória (não distribuído). OK em Vercel serverless: cada
 *     instance tem o próprio Map, ataque distribuído contornaria. Pra MVP é
 *     suficiente. Upstash Redis quando precisar.
 *   - `listUsers()` pagina por 50 — escala até ~5K users sem ficar lento.
 *     Acima disso, criar tabela mirror `public.user_plans` ou usar SQL RPC.
 *
 * Requer env var no servidor (NÃO `NEXT_PUBLIC_`):
 *   SUPABASE_SERVICE_ROLE_KEY — pega em Supabase Studio → Settings → API →
 *   "service_role secret". Coloca em Vercel env vars (escopo Production +
 *   Preview) e em `.env.local` pra dev.
 *
 * Decisão registrada em Brain/projects/sellerverse/decisions/ (TODO criar
 * 2026-05-18-sellerspy-cross-check.md).
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => t > now - RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return timestamps.length <= RATE_LIMIT_MAX;
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawEmail = url.searchParams.get("email");
  const email = rawEmail?.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "invalid_email" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: corsHeaders() }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("[check-pro] missing SUPABASE_SERVICE_ROLE_KEY env var");
    return NextResponse.json(
      { error: "server_not_configured" },
      { status: 500, headers: corsHeaders() }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // listUsers() pagina por padrão em 50. Pra MVP escala até ~5K users
  // sem latência perceptível. Acima disso, criar uma view/table mirror.
  // TODO: quando >1K users, migrar pra SQL RPC ou cache layer.
  try {
    let foundUser: { app_metadata?: Record<string, unknown> } | null = null;
    let page = 1;
    const perPage = 200;
    const MAX_PAGES = 20; // safety net: 4000 users max varredos

    while (page <= MAX_PAGES) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage,
      });
      if (error) {
        console.error("[check-pro] listUsers failed:", error.message);
        return NextResponse.json(
          { error: "lookup_failed" },
          { status: 500, headers: corsHeaders() }
        );
      }

      const match = data.users.find(
        (u) => u.email?.toLowerCase() === email
      );
      if (match) {
        foundUser = match;
        break;
      }
      if (data.users.length < perPage) break; // last page
      page += 1;
    }

    if (!foundUser) {
      return NextResponse.json(
        { exists: false, plan: null },
        { status: 200, headers: corsHeaders() }
      );
    }

    const appMeta = (foundUser.app_metadata ?? {}) as Record<string, unknown>;
    const plan = (appMeta.plan as string) ?? "Grátis";

    return NextResponse.json(
      { exists: true, plan },
      { status: 200, headers: corsHeaders() }
    );
  } catch (err) {
    console.error("[check-pro] unexpected error:", err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
