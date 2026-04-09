"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  Users,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cursos", href: "/dashboard/cursos", icon: BookOpen },
  { label: "Ferramentas", href: "/dashboard/ferramentas", icon: Wrench },
  { label: "Comunidade", href: "/dashboard/comunidade", icon: Users },
  { label: "Plano", href: "/dashboard/plano", icon: CreditCard },
];

export function DashboardMobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-surface border-t border-white/10 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0",
                active
                  ? "text-accent-400"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <Icon
                size={22}
                className={cn(
                  "shrink-0 transition-all",
                  active && "drop-shadow-[0_0_6px_rgba(239,159,39,0.6)]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium truncate",
                  active ? "text-accent-400" : "text-white/50"
                )}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute -top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
