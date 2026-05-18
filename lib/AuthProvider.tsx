"use client";

/**
 * Shared auth state for the dashboard tree.
 *
 * Before this provider: every component that called `useAuth()` (the sidebar,
 * the dashboard home, the settings form, etc.) ran its own `getUser()` and
 * registered its own `onAuthStateChange` subscription on mount. On a fresh
 * dashboard load that meant ~3 redundant Supabase round-trips and ~3 active
 * subscriptions for the same identity.
 *
 * After this provider: one initial `getUser()`, one subscription, broadcast
 * to all consumers via Context. Mutations (`updateProfile`, `updatePassword`)
 * are still per-component but they reuse the singleton client and the
 * subscription handler keeps the cached user in sync.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  marketplaces: string[];
  whatsapp: string;
  plan: "Grátis" | "Pro" | "Premium";
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  updateProfile: (
    updates: Partial<Pick<AuthUser, "name" | "marketplaces" | "whatsapp">>
  ) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
}

function parseUser(user: User): AuthUser {
  const userMeta = user.user_metadata ?? {};
  // app_metadata is server-side only (user can NOT write to it via SDK).
  // We read `plan` from there for gating — Enzo edits it manually in
  // Supabase Studio after Pix confirmation. Falls back to user_metadata
  // only for legacy/dev convenience; production source of truth is app_metadata.
  const appMeta = (user.app_metadata ?? {}) as Record<string, unknown>;
  let marketplaces: string[] = [];
  if (Array.isArray(userMeta.marketplaces)) {
    marketplaces = userMeta.marketplaces;
  } else if (userMeta.marketplace) {
    marketplaces = [userMeta.marketplace];
  }
  const plan =
    (appMeta.plan as AuthUser["plan"]) ??
    (userMeta.plan as AuthUser["plan"]) ??
    "Grátis";
  return {
    id: user.id,
    email: user.email ?? "",
    name:
      userMeta.full_name ?? userMeta.name ?? user.email?.split("@")[0] ?? "Usuário",
    marketplaces,
    whatsapp: userMeta.whatsapp ?? "",
    plan,
    createdAt: user.created_at ?? "",
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Guard against React StrictMode mounting the effect twice in dev — without
  // this, we'd open two subscriptions and fire two getUser() requests.
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!supabase) {
      setLoading(false);
      return;
    }

    let unsubFn: (() => void) | null = null;

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(parseUser(data.user));
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(parseUser(session.user));
      else setUser(null);
    });
    unsubFn = () => data.subscription.unsubscribe();

    return () => {
      if (unsubFn) unsubFn();
      initialized.current = false;
    };
  }, []);

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>(
    async (updates) => {
      if (!supabase) return { error: "Supabase não configurado" };
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          marketplaces: updates.marketplaces,
          whatsapp: updates.whatsapp,
        },
      });
      if (!error && data.user) setUser(parseUser(data.user));
      return { error: error?.message ?? null };
    },
    []
  );

  const updatePassword = useCallback<AuthContextValue["updatePassword"]>(
    async (newPassword) => {
      if (!supabase) return { error: "Supabase não configurado" };
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error: error?.message ?? null };
    },
    []
  );

  const value = useMemo(
    () => ({ user, loading, updateProfile, updatePassword }),
    [user, loading, updateProfile, updatePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Reads the dashboard auth context. Falls back to a fresh local subscription
 * if rendered outside an <AuthProvider> — this keeps the hook usable from
 * any route (e.g. the marketing nav showing a "Logged in" pill) without
 * forcing the whole app under a provider.
 *
 * Inside the dashboard tree we wrap with <AuthProvider> in the layout,
 * so the fallback is never hit and all consumers share one fetch.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  // Standalone fallback — same shape as the provider, but with its own state.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (ctx) return;
    if (initialized.current) return;
    initialized.current = true;
    if (!supabase) {
      setLoading(false);
      return;
    }
    let unsubFn: (() => void) | null = null;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(parseUser(data.user));
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(parseUser(session.user));
      else setUser(null);
    });
    unsubFn = () => data.subscription.unsubscribe();
    return () => {
      if (unsubFn) unsubFn();
      initialized.current = false;
    };
  }, [ctx]);

  const fallbackUpdateProfile = useCallback<AuthContextValue["updateProfile"]>(
    async (updates) => {
      if (!supabase) return { error: "Supabase não configurado" };
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          marketplaces: updates.marketplaces,
          whatsapp: updates.whatsapp,
        },
      });
      if (!error && data.user) setUser(parseUser(data.user));
      return { error: error?.message ?? null };
    },
    []
  );

  const fallbackUpdatePassword = useCallback<
    AuthContextValue["updatePassword"]
  >(async (newPassword) => {
    if (!supabase) return { error: "Supabase não configurado" };
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error: error?.message ?? null };
  }, []);

  if (ctx) return ctx;
  return {
    user,
    loading,
    updateProfile: fallbackUpdateProfile,
    updatePassword: fallbackUpdatePassword,
  };
}
