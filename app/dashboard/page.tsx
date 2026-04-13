"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Wrench,
  Calendar,
  Play,
  Zap,
  ArrowRight,
  Bell,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useAuth } from "@/lib/useAuth";

const stats = [
  { label: "Cursos em andamento", value: "2", icon: BookOpen, color: "text-orbit-400", bg: "bg-orbit-900/30" },
  { label: "Lições concluídas", value: "34", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-900/20" },
  { label: "Ferramentas usadas", value: "7", icon: Wrench, color: "text-accent-400", bg: "bg-accent-800/20" },
  { label: "Dias na plataforma", value: "45", icon: Calendar, color: "text-purple-400", bg: "bg-purple-900/20" },
];

const continueCourses = [
  { slug: "marketplace-do-zero", title: "Marketplace do Zero ao Avançado", instructor: "Rafael Moura", progress: 68, lastLesson: "Aula 14: Estratégia de Precificação", gradient: "from-orbit-800 to-orbit-600" },
  { slug: "trafego-pago-sellers", title: "Tráfego Pago para Sellers", instructor: "Camila Santos", progress: 32, lastLesson: "Aula 7: Campanhas no Google Shopping", gradient: "from-purple-900 to-orbit-800" },
];

const recentTools = [
  { slug: "calculadora-margem", name: "Calculadora de Margem", desc: "Calcule sua margem de lucro real", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-900/20" },
  { slug: "gerador-titulos-seo", name: "Gerador de Títulos SEO", desc: "Títulos otimizados para marketplaces", icon: Zap, color: "text-accent-400", bg: "bg-accent-800/20" },
  { slug: "simulador-frete", name: "Simulador de Frete", desc: "Compare fretes e economize", icon: Clock, color: "text-orbit-400", bg: "bg-orbit-900/30" },
];

const upcomingLives = [
  { date: "10 Abr", time: "20h", topic: "Como escalar no Mercado Livre em 2025", host: "Felipe Torres" },
  { date: "15 Abr", time: "19h30", topic: "Gestão de estoque inteligente com planilhas", host: "Ana Lima" },
  { date: "22 Abr", time: "20h", topic: "Amazon FBA — vale a pena em 2025?", host: "Bruno Costa" },
];

const updates = [
  { date: "05 Abr", title: "Nova ferramenta: Monitor de Preços", desc: "Agora você pode monitorar preços dos concorrentes em tempo real. Disponível no plano Premium." },
  { date: "01 Abr", title: "Curso atualizado: Marketplace do Zero", desc: "Adicionamos 3 novas aulas sobre algoritmos de busca do Mercado Livre." },
  { date: "25 Mar", title: "Comunidade no Discord aberta!", desc: "O servidor exclusivo para membros Pro e Premium já está no ar. Acesse em Comunidade." },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = (user?.name ?? "").split(" ")[0] || "Seller";
  const plan = user?.plan ?? "Grátis";
  const isPro = plan === "Pro";
  const isGratis = plan === "Grátis";
  const showUpgradeBanner = isPro || isGratis;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <ScrollReveal direction="up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
              Olá, {firstName}! 🚀 Pronto para vender mais hoje?
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              Aqui está um resumo da sua jornada na plataforma.
            </p>
          </div>
          <Badge variant="accent" size="lg">
            Plano {plan}
          </Badge>
        </div>
      </ScrollReveal>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <ScrollReveal key={stat.label} direction="up" index={i} delay={0.1}>
              <Card variant="dark" padding="md" className="flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-display">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Continue from where you left off */}
      <ScrollReveal direction="up" delay={0.15}>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-display">Continue de onde parou</h2>
            <Link href="/dashboard/cursos" className="text-orbit-400 text-sm hover:text-orbit-200 transition-colors flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {continueCourses.map((course) => (
              <Card key={course.slug} variant="dark" padding="none" hover className="overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-400 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-1">{course.title}</h3>
                  <p className="text-white/50 text-xs mb-1">{course.instructor}</p>
                  <p className="text-white/40 text-xs mb-3 truncate">{course.lastLesson}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-400 text-xs font-semibold">{course.progress}% concluído</span>
                    <Link href={`/dashboard/cursos/${course.slug}`}>
                      <Button size="sm" variant="primary">Continuar</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Recent tools */}
      <ScrollReveal direction="up" delay={0.1}>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-display">Ferramentas recentes</h2>
            <Link href="/dashboard/ferramentas" className="text-orbit-400 text-sm hover:text-orbit-200 transition-colors flex items-center gap-1">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.slug} href={`/dashboard/ferramentas/${tool.slug}`}>
                  <Card variant="dark" padding="md" hover className="flex items-start gap-3 cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tool.bg}`}>
                      <Icon size={20} className={tool.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm leading-snug">{tool.name}</p>
                      <p className="text-white/50 text-xs mt-0.5 leading-snug">{tool.desc}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Upcoming lives */}
      <ScrollReveal direction="up" delay={0.1}>
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-white font-display">Próximas lives</h2>
            <Badge variant="accent" dot>Ao vivo</Badge>
          </div>
          <div className="space-y-3">
            {upcomingLives.map((live, i) => (
              <Card key={i} variant="dark" padding="md">
                <div className="flex items-center gap-4">
                  <div className="text-center shrink-0 w-14">
                    <p className="text-accent-400 font-bold text-sm">{live.date}</p>
                    <p className="text-white/50 text-xs">{live.time}</p>
                  </div>
                  <div className="w-px h-10 bg-white/10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium text-sm leading-snug">{live.topic}</p>
                    <p className="text-white/50 text-xs mt-0.5">com {live.host}</p>
                  </div>
                  <Bell size={16} className="text-white/30 shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Upgrade banner */}
      {showUpgradeBanner && (
        <ScrollReveal direction="up" delay={0.1}>
          <Card variant="glass" padding="lg" className="bg-gradient-to-br from-orbit-900/60 to-accent-800/20 border border-accent-400/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,159,39,0.15),transparent_60%)]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <Badge variant="accent" size="sm" className="mb-2">
                  {isPro ? "Upgrade disponível" : "Desbloqueie tudo"}
                </Badge>
                <h3 className="text-white font-bold text-lg font-display">
                  {isPro ? "Upgrade para Premium e acesse tudo" : "Faça upgrade para Pro e acelere suas vendas"}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {isPro ? "Monitor de preços, kit de templates, suporte prioritário e muito mais." : "Ferramentas avançadas, comunidade exclusiva e mais de 20 cursos."}
                </p>
              </div>
              <Link href="/dashboard/plano">
                <Button variant="accent" size="lg">
                  Upgrade para {isPro ? "Premium" : "Pro"}
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      )}

      {/* Platform updates */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="pb-8">
          <h2 className="text-lg font-bold text-white font-display mb-4">Novidades da plataforma</h2>
          <div className="space-y-3">
            {updates.map((update, i) => (
              <Card key={i} variant="dark" padding="md">
                <div className="flex gap-4">
                  <div className="shrink-0 text-right w-14">
                    <span className="text-xs text-white/40">{update.date}</span>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">{update.title}</p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{update.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
