import React from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { DashboardWelcome } from "./DashboardWelcome";
import { DashboardStats } from "./DashboardStats";
import { DashboardNextSteps } from "./DashboardNextSteps";
import { DashboardUpgradeBanner } from "./DashboardUpgradeBanner";

// Roadmap honesto — substitui "Próximas lives" + "Novidades" mockados.
// Items aqui são estáticos no servidor; quando virarem dinâmicos (CMS ou
// JSON em DB), mover pra um fetch.
const roadmap = [
  {
    date: "Em breve",
    title: "Primeiro curso piloto: Precificação que sobra",
    desc: "Margem real em 5 marketplaces, prático, sem teoria balofa. Casa com a Calculadora.",
  },
  {
    date: "Em breve",
    title: "Sellerspy do zero: ache fornecedor ganhador no ML em 15min",
    desc: "Demo prática usando a extensão pra descobrir oportunidade real de catálogo.",
  },
  {
    date: "Julho 2026",
    title: "Sellertrack Shopee",
    desc: "Extensão com inteligência de concorrente direto no painel do seller Shopee.",
  },
  {
    date: "Agosto 2026",
    title: "Sellertrack Magalu",
    desc: "Mesma magia, agora pro Magazine Luiza.",
  },
  {
    date: "Sob demanda",
    title: "Mais cursos conforme demanda da comunidade",
    desc: "Tema específico que você precisa? Pede no Discord — gravamos os mais votados.",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome header — client island (uses auth) */}
      <ScrollReveal direction="up">
        <DashboardWelcome />
      </ScrollReveal>

      {/* Stats row — client island (lê daysOnPlatform real do createdAt) */}
      <ScrollReveal direction="up" delay={0.1}>
        <DashboardStats />
      </ScrollReveal>

      {/* Próximos passos — client island plan-aware */}
      <ScrollReveal direction="up" delay={0.15}>
        <DashboardNextSteps />
      </ScrollReveal>

      {/* Upgrade banner — client island (plan-aware) */}
      <ScrollReveal direction="up" delay={0.1}>
        <DashboardUpgradeBanner />
      </ScrollReveal>

      {/* Roadmap honesto — substitui mocks de "próximas lives" e "novidades" */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-orbit-400" />
            <h2 className="text-lg font-bold text-white font-display">
              No roadmap
            </h2>
          </div>
          <p className="text-white/40 text-xs mb-4">
            O que tá vindo nas próximas semanas e meses — sem prazos vagos, sem promessa que não dá pra cumprir.
          </p>
          <div className="space-y-3">
            {roadmap.map((item, i) => (
              <Card key={i} variant="dark" padding="md">
                <div className="flex gap-4">
                  <div className="shrink-0 text-right w-24">
                    <span className="text-orbit-400 text-xs font-semibold">
                      {item.date}
                    </span>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
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
