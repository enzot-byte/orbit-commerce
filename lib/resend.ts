import { Resend } from "resend";

/**
 * Server-only Resend client. Lazy-initialized to avoid build-time crashes
 * when the env var is missing in preview or local development.
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
  if (client) return client;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client = new Resend(key);
  return client;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Orbit Commerce <onboarding@resend.dev>";
