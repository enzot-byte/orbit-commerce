"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

const mockUser = {
  name: "Pedro Alves",
  email: "pedro@exemplo.com",
  plan: "Pro" as "Grátis" | "Pro" | "Premium",
  avatar: null,
};

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

function UserAvatar({ name, collapsed }: { name: string; collapsed: boolean }) {
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
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden min-w-0"
          >
            <p className="text-sm font-semibold text-white truncate">{name}</p>
            <Badge variant="accent" size="sm">
              {mockUser.plan}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
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
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {collapsed && active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-400 rounded-r-full" />
      )}
    </Link>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col h-screen bg-dark-surface border-r border-white/10 shrink-0 overflow-hidden relative"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-4 border-b border-white/10",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-orbit-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">OC</span>
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-base whitespace-nowrap overflow-hidden"
            >
              Orbit Commerce
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User section */}
      <UserAvatar name={mockUser.name} collapsed={collapsed} />

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
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-white/50 hover:bg-white/10 hover:text-red-400 transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Sair
              </motion.span>
            )}
          </AnimatePresence>
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
    </motion.aside>
  );
}
