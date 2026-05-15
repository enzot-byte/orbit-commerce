"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthProvider";

async function handleSignOut() {
  try {
    if (supabase) await supabase.auth.signOut();
  } catch (e) {
    console.warn("[signOut] error:", e);
  }
  window.location.href = "/login";
}

const navItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Meus Cursos", href: "/dashboard/cursos", icon: BookOpen },
  { label: "Ferramentas", href: "/dashboard/ferramentas", icon: Wrench },
  { label: "Comunidade", href: "/dashboard/comunidade", icon: Users },
  { label: "Meu Plano", href: "/dashboard/plano", icon: CreditCard },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
];

const planVariant: Record<string, "primary" | "accent" | "success"> = {
  Grátis: "primary",
  Pro: "accent",
  Premium: "success",
};

/**
 * Collapsible text wrapper — CSS-only replacement for the framer-motion
 * AnimatePresence + animated width that previously fronted every label here.
 * Width is `0` when collapsed and `auto` (capped by max-width) when expanded;
 * opacity fades in sync.
 */
function CollapseText({
  collapsed,
  children,
  className,
}: {
  collapsed: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden={collapsed}
      className={cn(
        "inline-block overflow-hidden whitespace-nowrap transition-all duration-200 ease-out",
        collapsed
          ? "opacity-0 max-w-0"
          : "opacity-100 max-w-[200px]",
        className
      )}
    >
      {children}
    </span>
  );
}

function UserAvatar({
  name,
  plan,
  collapsed,
}: {
  name: string;
  plan: string;
  collapsed: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 border-b border-white/10",
        collapsed && "justify-center px-2"
      )}
    >
      <div className="w-9 h-9 rounded-full bg-orbit-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
        {initials}
      </div>
      <CollapseText collapsed={collapsed} className="min-w-0">
        <span className="block text-sm font-semibold text-white truncate">
          {name}
        </span>
        <Badge variant={planVariant[plan] ?? "primary"} size="sm">
          {plan}
        </Badge>
      </CollapseText>
    </div>
  );
}

function NavItem({
  item,
  collapsed,
  active,
}: {
  item: (typeof navItems)[0];
  collapsed: boolean;
  active: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 transition-all duration-200 group relative",
        active
          ? "bg-orbit-600 text-white shadow-[0_0_12px_rgba(24,95,165,0.4)]"
          : "text-white/60 hover:bg-white/10 hover:text-white",
        collapsed && "justify-center px-2 mx-1"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon
        size={20}
        className={cn(
          "shrink-0 transition-colors",
          active ? "text-white" : "text-white/60 group-hover:text-white"
        )}
      />
      <CollapseText collapsed={collapsed} className="text-sm font-medium">
        {item.label}
      </CollapseText>
      {collapsed && active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-400 rounded-r-full" />
      )}
    </Link>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const displayName = user?.name ?? "Usuário";
  const displayPlan = user?.plan ?? "Grátis";

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      // Width transitions via plain CSS — previously this was `motion.aside`
      // with a spring animation. The eye barely distinguishes the spring from
      // a 200ms ease-out at this scale, and we drop the framer-motion runtime
      // for this entire surface.
      style={{ width: collapsed ? 64 : 256 }}
      className="hidden lg:flex flex-col h-screen bg-dark-surface border-r border-white/10 shrink-0 overflow-hidden relative transition-[width] duration-200 ease-out"
    >
      {/* Logo — uses the canonical OrbitIcon mark; previously had a hardcoded
          "OC" badge that was a leftover from the orbit-commerce naming and
          gave a wrong impression of the brand. */}
      <Link
        href="/dashboard"
        aria-label="Sellerverse — voltar para o dashboard"
        className={cn(
          "flex items-center gap-2 px-4 py-4 border-b border-white/10 hover:bg-white/[0.02] transition-colors",
          collapsed && "justify-center px-2"
        )}
      >
        <Logo size="sm" variant="icon" />
        <CollapseText collapsed={collapsed} className="text-white font-bold text-base">
          Sellerverse
        </CollapseText>
      </Link>

      {/* User section */}
      <UserAvatar name={displayName} plan={displayPlan} collapsed={collapsed} />

      {/* Navigation */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            active={isActive(item.href)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className={cn("px-2 py-3 border-t border-white/10")}>
        <button
          onClick={handleSignOut}
          type="button"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-white/50 hover:bg-white/10 hover:text-red-400 transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          <CollapseText collapsed={collapsed} className="text-sm font-medium">
            Sair
          </CollapseText>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-10 w-6 h-6 rounded-full bg-dark-surface border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
