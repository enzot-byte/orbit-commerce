import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Type,
  Package,
  BarChart3,
  Table,
  FileText,
  Lock,
  Monitor,
  Layout,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const mockUser = {
  plan: "Pro" as "Grátis" | "Pro" | "Premium",
};

const availableTools = [
  {
    slug: "calculadora-margem",
    name: "Calculadora de Margem",
    desc: "Calcule sua margem de lucro real considerando taxas, frete e custos operacionais.",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    badge: "Mais usada",
    badgeVariant: "success" as const,
  },
  {
    slug: "gerador-titulos-seo",
    name: "Gerador de Títulos SEO",
    desc: "Crie títulos otimizados para aparecer no topo das buscas dos marketplaces.",
    icon: Type,
    color: "text-orbit-400",
    bg: "bg-orbit-900/30",
    badge: null,
    badgeVariant: null,
  },
  {
    slug: "simulador-frete",
    name: "Simulador de Frete",
    desc: "Compare diferentes opções de frete e encontre a mais econômica para cada pedido.",
    icon: Package,
    color: "text-accent-400",
    bg: "bg-accent-800/20",
    badge: null,
    badgeVariant: null,
  },
  {
    slug: "dashboard-metricas",
    name: "Dashboard de Métricas",
    desc: "Visualize seus KPIs de vendas: conversão, ticket médio, margem e crescimento.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    badge: "Novo",
    badgeVariant: "primary" as const,
  },
  {
    slug: "planilha-estoque",
    name: "Planilha de Estoque",
    desc: "Controle seu estoque com alertas de reposição e histórico de movimentações.",
    icon: Table,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    badge: null,
    badgeVariant: null,
  },
  {
    slug: "gerador-descricao",
    name: "Gerador de Descrição",
    desc: "Gere descrições persuasivas e completas para seus produtos com IA.",
    icon: FileText,
    color: "text-pink-400",
    bg: "bg-pink-900/20",
    badge: "IA",
    badgeVariant: "accent" as const,
  },
];

const lockedTools = [
  {
    slug: "monitor-precos",
    name: "Monitor de Preços",
    desc: "Acompanhe os preços dos concorrentes em tempo real e receba alertas automáticos.",
    icon: Monitor,
    color: "text-red-400",
    bg: "bg-red-900/20",
  },
  {
    slug: "kit-templates",
    name: "Kit de Templates",
    desc: "Mais de 50 templates prontos para fotos, banners, e-mails e posts nas redes sociais.",
    icon: Layout,
    color: "text-orange-400",
    bg: "bg-orange-900/20",
  },
];

export default function FerramentasPage() {
  const isPremium = mockUser.plan === "Premium";

  return (
    <div className="p-6 lg:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
              Ferramentas
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              {availableTools.length} ferramentas disponíveis no seu plano
            </p>
          </div>
          <Badge variant="accent">Plano {mockUser.plan}</Badge>
        </div>
      </ScrollReveal>

      {/* Available tools */}
      <section>
        <ScrollReveal direction="up" delay={0.05}>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
            Suas ferramentas
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <Link href={`/dashboard/ferramentas/${tool.slug}`} className="block h-full">
                  <Card
                    variant="dark"
                    padding="md"
                    hover
                    className="flex flex-col gap-3 h-full cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0`}
                      >
                        <Icon size={22} className={tool.color} />
                      </div>
                      {tool.badge && tool.badgeVariant && (
                        <Badge variant={tool.badgeVariant} size="sm">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm leading-snug">
                        {tool.name}
                      </h3>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed">{tool.desc}</p>
                    </div>
                    <div className="flex items-center text-orbit-400 text-xs font-medium hover:text-orbit-200 transition-colors">
                      Abrir ferramenta <ArrowRight size={12} className="ml-1" />
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Locked tools */}
      <section>
        <ScrollReveal direction="up" delay={0.05}>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
            Disponível no Premium
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <Card
                  variant="dark"
                  padding="md"
                  className="flex flex-col gap-3 opacity-70 relative overflow-hidden"
                >
                  {/* Lock overlay */}
                  <div className="absolute inset-0 bg-dark-card/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Lock size={18} className="text-white/60" />
                    </div>
                    <span className="text-white/60 text-xs font-medium">Disponível no Premium</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0`}
                    >
                      <Icon size={22} className={tool.color} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{tool.desc}</p>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Upgrade CTA */}
      {!isPremium && (
        <ScrollReveal direction="up" delay={0.1}>
          <Card
            variant="glass"
            padding="lg"
            className="bg-gradient-to-br from-orbit-900/60 to-accent-800/20 border border-accent-400/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,159,39,0.12),transparent_60%)]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <Badge variant="accent" size="sm" className="mb-2">
                  Premium
                </Badge>
                <h3 className="text-white font-bold text-lg font-display">
                  Desbloqueie o Monitor de Preços e Kit de Templates
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Com o Premium você tem acesso a todas as ferramentas, suporte prioritário e
                  muito mais.
                </p>
              </div>
              <Link href="/dashboard/plano">
                <Button variant="accent" size="lg">
                  Upgrade para Premium <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      )}
    </div>
  );
}
