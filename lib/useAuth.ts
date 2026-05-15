// Thin re-export shim — the implementation moved to `lib/AuthProvider.tsx`
// so we can share a single Supabase subscription across the dashboard tree.
// Keeping this file means existing call sites like
//   import { useAuth, type AuthUser } from "@/lib/useAuth"
// don't need to be touched.
export { useAuth, type AuthUser } from "@/lib/AuthProvider";
