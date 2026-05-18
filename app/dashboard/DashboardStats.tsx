"use client";

import { BookOpen, Sparkles, Wrench, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/AuthProvider";

/**
 * Dashboard stats row. Numbers are honest for MVP: tudo zero exceto
 * "Dias na plataforma" que é calculado real a partir do user.createdAt.
 *
 * Quando enrollments + lesson_completion existirem em DB (Sprint 2 do
 * ROADMAP), trocar os zeros por counts reais via fetch ou prop.
 */
function daysSince(iso: string | undefined): number {
  if (!iso) return 0;
  const created = new Date(iso).getTime();
  if (Number.isNaN(created)) return 0;
  const diffMs = Date.now() - created;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

export function DashboardStats() {
  const { user } = useAuth();
  const daysOnPlatform = daysSince(user?.createdAt);

  const stats = [
    {
      label: "Cursos em andamento",
      value: "0",
      icon: BookOpen,
      color: "text-orbit-400",
      bg: "bg-orbit-900/30",
    },
    {
      label: "Lições concluídas",
      value: "0",
      icon: Sparkles,
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Ferramentas usadas",
      value: "0",
      icon: Wrench,
      color: "text-accent-400",
      bg: "bg-accent-800/20",
    },
    {
      label: "Dias na plataforma",
      value: String(daysOnPlatform),
      icon: Calendar,
      color: "text-purple-400",
      bg: "bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            variant="dark"
            padding="md"
            className="flex flex-col gap-3"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}
            >
              <Icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-display">
                {stat.value}
              </p>
              <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
