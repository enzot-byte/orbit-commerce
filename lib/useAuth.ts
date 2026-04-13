"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  marketplace: string;
  whatsapp: string;
  plan: "Grátis" | "Pro" | "Premium";
  createdAt: string;
}

function parseUser(user: User): AuthUser {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? "",
    name: meta.full_name ?? meta.name ?? user.email?.split("@")[0] ?? "Usuário",
    marketplace: meta.marketplace ?? "",
    whatsapp: meta.whatsapp ?? "",
    plan: (meta.plan as AuthUser["plan"]) ?? "Grátis",
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

  const updateProfile = async (updates: Partial<Pick<AuthUser, "name" | "marketplace" | "whatsapp">>) => {
    if (!supabase) return { error: "Supabase não configurado" };
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: updates.name,
        marketplace: updates.marketplace,
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
