"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  MessageCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Rocket,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/AuthProvider";

/**
 * Plan-aware next-steps section. Substitui "Continue de onde parou" +
 * "Ferramentas recentes" + "Próximas lives" mockados.
 *
 * Free → 3 CTAs: ver planos / ver cursos / entrar na comunidade gratuita.
 * Pro/Premium → 3 ferramentas reais: Calculadora (externa) + Sellerspy (CWS)
 *   + Comunidade Discord.
 */
export function DashboardNextSteps() {
  const { user } = useAuth();
  const plan = user?.plan ?? "Grátis";
  const isGratis = plan === "Grátis";

  const steps = isGratis
    ? [
        {
          icon: Sparkles,
          color: "text-accent-400",
          bg: "bg-accent-800/20",
          title: "Vire Pro pra desbloquear tudo",
          desc: "Calculadora multiplataforma + Sellerspy + comunidade Discord + cursos completos.",
          cta: "Ver planos",
          href: "/dashboard/plano",
          external: false,
        },
        {
          icon: BookOpen,
          color: "text-orbit-400",
          bg: "bg-orbit-900/30",
          title: "Explore o catálogo de cursos",
          desc: "Veja o que está disponível no Pro e o que tá no roadmap.",
          cta: "Ver cursos",
          href: "/dashboard/cursos",
          external: false,
        },
        {
          icon: MessageCircle,
          color: "text-emerald-400",
          bg: "bg-emerald-900/20",
          title: "Entre na comunidade gratuita",
          desc: "Grupo de WhatsApp com 3.800+ sellers brasileiros.",
          cta: "Acessar",
          href: "/dashboard/comunidade",
          external: false,
        },
      ]
    : [
        {
          icon: TrendingUp,
          color: "text-emerald-400",
          bg: "bg-emerald-900/20",
          title: "Calcule sua margem em 30s",
          desc: "Calculadora multiplataforma — Shopee, ML, Amazon, Magalu numa só tela.",
          cta: "Abrir Calculadora",
          href: "https://shopee-calc-mu.vercel.app",
          external: true,
        },
        {
          icon: Search,
          color: "text-orbit-400",
          bg: "bg-orbit-900/30",
          title: "Instale o Sellerspy",
          desc: "Extensão que mostra preço histórico e venda estimada direto no anúncio ML + Amazon.",
          cta: "Instalar extensão",
          // TODO: trocar pelo URL exato da extensão na Chrome Web Store
          href: "https://chromewebstore.google.com/search/sellerspy",
          external: true,
        },
        {
          icon: MessageCircle,
          color: "text-orbit-400",
          bg: "bg-orbit-900/30",
          title: "Comunidade exclusiva no Discord",
          desc: "Servidor com canais organizados, suporte e networking de alto nível.",
          cta: "Acessar Discord",
          href: "/dashboard/comunidade",
          external: false,
        },
      ];

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Rocket size={18} className="text-accent-400" />
        <h2 className="text-lg font-bold text-white font-display">
          {isGratis ? "Por onde começar" : "Suas ferramentas Pro"}
        </h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const Wrapper: React.FC<{ children: React.ReactNode }> = ({
            children,
          }) =>
            step.external ? (
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {children}
              </a>
            ) : (
              <Link href={step.href} className="block h-full">
                {children}
              </Link>
            );
          return (
            <Wrapper key={i}>
              <Card
                variant="dark"
                padding="md"
                hover
                className="flex flex-col gap-3 h-full cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${step.bg}`}
                >
                  <Icon size={22} className={step.color} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="flex items-center text-orbit-400 text-xs font-medium hover:text-orbit-200 transition-colors">
                  {step.cta}{" "}
                  {step.external ? (
                    <ExternalLink size={12} className="ml-1" />
                  ) : (
                    <ArrowRight size={12} className="ml-1" />
                  )}
                </div>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
