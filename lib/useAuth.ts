"use client";

import { useState, useEffect } from "react";
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

function parseUser(user: User): AuthUser {
  const userMeta = user.user_metadata ?? {};
  // app_metadata is server-side only (user can NOT write to it via SDK).
  // We read `plan` from there for gating — Enzo edits it manually in
  // Supabase Studio after Pix confirmation. Falls back to user_metadata
  // only for legacy/dev convenience; production source of truth is app_metadata.
  const appMeta = (user.app_metadata ?? {}) as Record<string, unknown>;
  // Support both old single `marketplace` string and new `marketplaces` array
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
    name: userMeta.full_name ?? userMeta.name ?? user.email?.split("@")[0] ?? "Usuário",
    marketplaces,
    whatsapp: userMeta.whatsapp ?? "",
    plan,
    createdAt: user.created_at ?? "",
  };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(parseUser(data.user));
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(parseUser(session.user));
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (updates: Partial<Pick<AuthUser, "name" | "marketplaces" | "whatsapp">>) => {
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
  };

  const updatePassword = async (newPassword: string) => {
    if (!supabase) return { error: "Supabase não configurado" };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error?.message ?? null };
  };

  return { user, loading, updateProfile, updatePassword };
}
