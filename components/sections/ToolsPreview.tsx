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
    color: "#185FA5",
    bg: "rgba(24,95,165,0.1)",
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
    color: "#185FA5",
    bg: "rgba(24,95,165,0.1)",
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
    color: "#185FA5",
    bg: "rgba(24,95,165,0.1)",
  },
];

export default function ToolsPreview() {
  return (
    <section className="section-pad" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="container-orbit">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-600 mb-3">
            Ferramentas
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-dark leading-tight">
            Ferramentas que{" "}
            <span className="gradient-text">trabalham por você</span>
          </h2>
          <p className="mt-4 text-lg text-dark/55 max-w-xl mx-auto">
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
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer overflow-hidden"
                  whileHover={{
                    y: -4,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.1)`,
                    borderColor: `${tool.color}40`,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1.5px ${tool.color}30`,
                    }}
                  />

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
                              backgroundColor: "rgba(15,110,86,0.12)",
                              color: "#0F6E56",
                            }
                          : {
                              backgroundColor: "rgba(239,159,39,0.15)",
                              color: "#BA7517",
                            }
                      }
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-bold text-dark text-base mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-dark/55 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="flex items-center gap-1 text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: tool.color }}>
                    Acessar ferramenta
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA link */}
        <ScrollReveal direction="up" delay={0.3} className="text-center">
          <a
            href="/ferramentas"
            className="inline-flex items-center gap-2 text-orbit-600 font-semibold hover:text-orbit-800 transition-colors duration-200 group"
          >
            Ver todas as ferramentas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
