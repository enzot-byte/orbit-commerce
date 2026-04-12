"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Search,
  Truck,
  Package,
  FileText,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const tools = [
  {
    icon: Calculator,
    name: "Calculadora de Margem",
    description: "Calcule lucro líquido, margem e ponto de equilíbrio em segundos.",
    badge: "Grátis",
    badgeType: "free",
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
  },
  {
    icon: Search,
    name: "Gerador de Títulos SEO",
    description: "Crie títulos otimizados para rankear melhor nos marketplaces.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
  },
  {
    icon: Truck,
    name: "Simulador de Frete",
    description: "Compare transportadoras e encontre a opção mais barata.",
    badge: "Grátis",
    badgeType: "free",
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
  },
  {
    icon: Package,
    name: "Planilha de Estoque",
    description: "Gerencie seu estoque com alertas de reposição automáticos.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
  },
  {
    icon: FileText,
    name: "Template de Anúncio Pro",
    description: "Estruturas testadas que convertem mais em qualquer marketplace.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
  },
  {
    icon: BarChart2,
    name: "Dashboard de Métricas",
    description: "Visualize seus KPIs de vendas, estoque e lucratividade.",
    badge: "Grátis",
    badgeType: "free",
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
  },
];

export default function ToolsPreview() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Subtle background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#9B7BFF" }}>
            Ferramentas
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Ferramentas que{" "}
            <span className="gradient-text-accent">trabalham por você</span>
          </h2>
          <p className="mt-4 text-lg text-white/45 max-w-xl mx-auto">
            Automatize tarefas repetitivas e tome decisões com base em dados reais.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <ScrollReveal key={tool.name} direction="up" index={i} delay={0.05}>
                <motion.div
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: "#16162A",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 12px 40px rgba(91,63,216,0.15)`,
                    borderColor: `rgba(155,123,255,0.25)`,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tool.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={
                        tool.badgeType === "free"
                          ? {
                              backgroundColor: "rgba(16,185,129,0.15)",
                              color: "#34d399",
                            }
                          : {
                              backgroundColor: "rgba(239,159,39,0.15)",
                              color: "#EF9F27",
                            }
                      }
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-bold text-white text-base mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div
                    className="flex items-center gap-1 text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: tool.color }}
                  >
                    Acessar ferramenta
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, ${tool.color}, transparent)`,
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA link */}
        <ScrollReveal direction="up" delay={0.3} className="text-center">
          <a
            href="/ferramentas"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
            style={{ color: "#9B7BFF" }}
          >
            Ver todas as ferramentas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
