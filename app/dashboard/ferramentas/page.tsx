"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  Eye,
  ShoppingBag,
  Lock,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useAuth } from "@/lib/useAuth";

// ─── Catalog ──────────────────────────────────────────────────────────────────
//
// Single source of truth pra todas as ferramentas — live, em construção
// e gated por plano. Pra adicionar uma nova ferramenta, é só estender essa
// lista. Status drive o card render + a section em que aparece.

type ToolStatus = "live" | "coming-soon" | "premium-only";
type Plan = "Grátis" | "Pro" | "Premium";

interface Tool {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  status: ToolStatus;
  planRequired: Plan;
  externalUrl?: string;
  eta?: string;
  badge?: { text: string; variant: "accent" | "primary" | "success" };
}

const tools: Tool[] = [
  {
    slug: "calculadora-multiplataforma",
    name: "Calculadora Multiplataforma",
    tagline: "Sua margem real em 30s — Shopee, ML, Amazon, Magalu",
    desc: "Cola custo, frete e taxa de cada marketplace. Recebe net, margem % e ponto de equilíbrio no mesmo instante.",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    status: "live",
    planRequired: "Pro",
    externalUrl: "https://shopee-calc-mu.vercel.app",
    badge: { text: "Top usada", variant: "success" },
  },
  {
    slug: "sellerspy",
    name: "Sellerspy",
    tagline: "Espia concorrente direto na página do marketplace",
    desc: "Extensão Chrome/Edge que injeta histórico de preço, ranking estimado e venda mensal direto no anúncio ML + Amazon BR.",
    icon: Search,
    color: "text-orbit-400",
    bg: "bg-orbit-900/30",
    status: "live",
    planRequired: "Pro",
    // TODO: trocar pelo URL exato da extensão na Chrome Web Store
    externalUrl: "https://chromewebstore.google.com/search/sellerspy",
    badge: { text: "Extensão", variant: "primary" },
  },
  {
    slug: "sellertrack-shopee",
    name: "Sellertrack Shopee",
    tagline: "Inteligência de concorrente na Shopee",
    desc: "Mesma mágica do Sellerspy, mas pros sellers Shopee — chegando após validação do Sellerspy ML.",
    icon: ShoppingBag,
    color: "text-pink-400",
    bg: "bg-pink-900/20",
    status: "coming-soon",
    planRequired: "Pro",
    eta: "Julho 2026",
  },
  {
    slug: "sellertrack-magalu",
    name: "Sellertrack Magalu",
    tagline: "Inteligência de concorrente no Magalu",
    desc: "Catalog scrape + price tracker pro Magazine Luiza.",
    icon: ShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    status: "coming-soon",
    planRequired: "Pro",
    eta: "Agosto 2026",
  },
  {
    slug: "sellertrack-shein",
    name: "Sellertrack SHEIN",
    tagline: "Inteligência de concorrente na SHEIN",
    desc: "Pra quem opera no SHEIN Brasil — snapshot de catálogo e price tracking.",
    icon: ShoppingBag,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    status: "coming-soon",
    planRequired: "Pro",
    eta: "Setembro 2026",
  },
  {
    slug: "monitor-precos",
    name: "Monitor de Preços ao vivo",
    tagline: "Alerta no WhatsApp quando concorrente baixar",
    desc: "Cadastra produto + faixa de preço alvo. Quando concorrente cruza a faixa, chega notificação no teu WhatsApp em menos de 5 minutos.",
    icon: Eye,
    color: "text-red-400",
    bg: "bg-red-900/20",
    status: "premium-only",
    planRequired: "Premium",
  },
];

// ─── Gating logic ─────────────────────────────────────────────────────────────

function canAccess(plan: Plan, required: Plan): boolean {
  if (plan === "Premium") return true;
  if (plan === "Pro") return required !== "Premium";
  return required === "Grátis";
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ToolCard({ tool, userPlan }: { tool: Tool; userPlan: Plan }) {
  const Icon = tool.icon;
  const access = canAccess(userPlan, tool.planRequired);
  const isComing = tool.status === "coming-soon";
  const isPremiumLock = tool.status === "premium-only" && !access;
  const isProLock = tool.status === "live" && !access;

  // Coming soon — show ETA badge, no link
  if (isComing) {
    return (
      <Card variant="dark" padding="md" className="flex flex-col gap-3 h-full relative">
        <div className="flex items-start justify-between">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0 opacity-60`}>
            <Icon size={22} className={tool.color} />
          </div>
          <Badge variant="default" size="sm">
            <Clock size={11} className="mr-1" />
            {tool.eta}
          </Badge>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
          <p className="text-orbit-400 text-xs mt-1 font-medium">{tool.tagline}</p>
          <p className="text-white/40 text-xs mt-2 leading-relaxed">{tool.desc}</p>
        </div>
        <div className="text-white/30 text-xs font-medium">Em construção</div>
      </Card>
    );
  }

  // Premium-only locked (user is Free or Pro looking at Premium feature)
  if (isPremiumLock) {
    return (
      <Card
        variant="dark"
        padding="md"
        className="flex flex-col gap-3 h-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-dark-card/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Lock size={18} className="text-white/60" />
          </div>
          <span className="text-white/70 text-xs font-medium">Desbloqueie no Premium</span>
          <Link
            href="/dashboard/plano"
            className="text-orbit-400 text-xs font-semibold hover:text-orbit-200 transition-colors flex items-center gap-1"
          >
            Fazer upgrade <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex items-start justify-between opacity-50">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0`}>
            <Icon size={22} className={tool.color} />
          </div>
        </div>
        <div className="flex-1 opacity-50">
          <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
          <p className="text-orbit-400 text-xs mt-1 font-medium">{tool.tagline}</p>
          <p className="text-white/40 text-xs mt-2 leading-relaxed">{tool.desc}</p>
        </div>
      </Card>
    );
  }

  // Pro-only locked (user is Free looking at Pro feature)
  if (isProLock) {
    return (
      <Card
        variant="dark"
        padding="md"
        className="flex flex-col gap-3 h-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-dark-card/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent-900/40 flex items-center justify-center">
            <Sparkles size={18} className="text-accent-400" />
          </div>
          <span className="text-white/70 text-xs font-medium">Disponível no Pro</span>
          <Link
            href="/dashboard/plano"
            className="text-accent-400 text-xs font-semibold hover:text-accent-200 transition-colors flex items-center gap-1"
          >
            Virar Pro <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex items-start justify-between opacity-50">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0`}>
            <Icon size={22} className={tool.color} />
          </div>
        </div>
        <div className="flex-1 opacity-50">
          <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
          <p className="text-accent-400 text-xs mt-1 font-medium">{tool.tagline}</p>
          <p className="text-white/40 text-xs mt-2 leading-relaxed">{tool.desc}</p>
        </div>
      </Card>
    );
  }

  // Live + accessible
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    tool.externalUrl ? (
      <a
        href={tool.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {children}
      </a>
    ) : (
      <Link href={`/dashboard/ferramentas/${tool.slug}`} className="block h-full">
        {children}
      </Link>
    );

  return (
    <Wrapper>
      <Card variant="dark" padding="md" hover className="flex flex-col gap-3 h-full cursor-pointer">
        <div className="flex items-start justify-between">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} shrink-0`}>
            <Icon size={22} className={tool.color} />
          </div>
          {tool.badge && (
            <Badge variant={tool.badge.variant} size="sm">
              {tool.badge.text}
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
          <p className="text-orbit-400 text-xs mt-1 font-medium">{tool.tagline}</p>
          <p className="text-white/50 text-xs mt-2 leading-relaxed">{tool.desc}</p>
        </div>
        <div className="flex items-center text-orbit-400 text-xs font-medium hover:text-orbit-200 transition-colors">
          {tool.externalUrl ? (
            <>
              Abrir ferramenta <ExternalLink size={12} className="ml-1" />
            </>
          ) : (
            <>
              Abrir ferramenta <ArrowRight size={12} className="ml-1" />
            </>
          )}
        </div>
      </Card>
    </Wrapper>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FerramentasPage() {
  const { user } = useAuth();
  const plan: Plan = (user?.plan as Plan) ?? "Grátis";

  const liveAvailable = tools.filter(
    (t) => t.status === "live" && canAccess(plan, t.planRequired)
  );
  const liveLocked = tools.filter(
    (t) => t.status === "live" && !canAccess(plan, t.planRequired)
  );
  const comingSoon = tools.filter((t) => t.status === "coming-soon");
  const premiumLocked = tools.filter(
    (t) => t.status === "premium-only" && !canAccess(plan, t.planRequired)
  );

  return (
    <div className="p-6 lg:p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
              Ferramentas
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              {liveAvailable.length} disponíveis agora ·{" "}
              {comingSoon.length} no roadmap · {premiumLocked.length + liveLocked.length} pra desbloquear
            </p>
          </div>
          <Badge variant="accent">Plano {plan}</Badge>
        </div>
      </ScrollReveal>

      {/* Disponíveis agora */}
      {liveAvailable.length > 0 && (
        <section>
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Disponíveis agora
              </h2>
              <span className="text-white/30 text-xs">
                {liveAvailable.length} {liveAvailable.length === 1 ? "ferramenta" : "ferramentas"}
              </span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveAvailable.map((tool, i) => (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <ToolCard tool={tool} userPlan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA pra Free virar Pro — se tem ferramenta live trancada */}
      {liveLocked.length > 0 && (
        <section>
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Disponíveis no Pro
              </h2>
              <span className="text-white/30 text-xs">
                {liveLocked.length} {liveLocked.length === 1 ? "ferramenta" : "ferramentas"}
              </span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveLocked.map((tool, i) => (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <ToolCard tool={tool} userPlan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Em construção (roadmap visível) */}
      {comingSoon.length > 0 && (
        <section>
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Em construção
              </h2>
              <span className="text-white/30 text-xs">
                {comingSoon.length} no roadmap
              </span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoon.map((tool, i) => (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <ToolCard tool={tool} userPlan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Premium upsell — para users Pro */}
      {premiumLocked.length > 0 && (
        <section>
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Premium
              </h2>
              <span className="text-white/30 text-xs">
                {premiumLocked.length} {premiumLocked.length === 1 ? "ferramenta" : "ferramentas"}
              </span>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumLocked.map((tool, i) => (
              <ScrollReveal key={tool.slug} direction="up" index={i} delay={0.05}>
                <ToolCard tool={tool} userPlan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Upgrade banner pra Free */}
      {plan === "Grátis" && (
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
                  Pro
                </Badge>
                <h3 className="text-white font-bold text-lg font-display">
                  Desbloqueie a Calculadora + Sellerspy
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Margem real em 30s + inteligência de concorrente direto no anúncio. Mais Sellertrack Shopee/Magalu/SHEIN conforme o roadmap.
                </p>
              </div>
              <Link href="/dashboard/plano">
                <Button variant="accent" size="lg">
                  Virar Pro <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      )}
    </div>
  );
}
