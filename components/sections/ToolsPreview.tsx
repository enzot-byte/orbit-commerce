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

// First 3 tools shown in the floating 3D showcase
const showcaseTools = tools.slice(0, 3);
const gridTools = tools.slice(3);

function ToolCard({
  tool,
  index,
  isShowcase = false,
}: {
  tool: typeof tools[number];
  index: number;
  isShowcase?: boolean;
}) {
  const Icon = tool.icon;

  return (
    <ScrollReveal direction="up" index={index} delay={isShowcase ? 0 : 0.05}>
      <motion.div
        className="group relative flex flex-col gap-4 p-6 rounded-2xl cursor-pointer overflow-hidden glass-card gradient-border h-full"
        whileHover={{
          y: -6,
          boxShadow: "0 20px 50px rgba(91,63,216,0.15)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Corner dots */}
        <div className="corner-dots">
          <div className="corner-dots-bottom" />
        </div>

        {/* Icon + badge row */}
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tool.bg }}
          >
            <Icon className="w-6 h-6" style={{ color: tool.color }} />
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={
              tool.badgeType === "free"
                ? {
                    backgroundColor: "rgba(16,185,129,0.12)",
                    color: "#34d399",
                    border: "1px solid rgba(16,185,129,0.15)",
                  }
                : {
                    backgroundColor: "rgba(239,159,39,0.12)",
                    color: "#EF9F27",
                    border: "1px solid rgba(239,159,39,0.15)",
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
          <p className="text-sm text-white/40 leading-relaxed">
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
          className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, ${tool.color}, transparent)`,
          }}
        />
      </motion.div>
    </ScrollReveal>
  );
}

export default function ToolsPreview() {
  return (
    <section
      className="relative overflow-hidden ambient-light"
      style={{ backgroundColor: "#0A0A0F", padding: "128px 0 160px" }}
    >
      {/* Subtle background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#9B7BFF" }}>
            Ferramentas
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ferramentas que{" "}
            <span className="shimmer-text">trabalham por voc&ecirc;</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            Automatize tarefas repetitivas e tome decis&otilde;es com base em dados reais.
          </p>
        </ScrollReveal>

        {/* 3D Floating showcase — top 3 tools with perspective */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="perspective-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {showcaseTools.map((tool, i) => {
                const Icon = tool.icon;
                const isCenter = i === 1;
                const rotation = i === 0 ? 4 : i === 2 ? -4 : 0;
                const scale = isCenter ? 1 : 0.92;
                const zOffset = isCenter ? 20 : 0;

                return (
                  <motion.div
                    key={tool.name}
                    className="group relative flex flex-col gap-4 p-7 rounded-2xl cursor-pointer overflow-hidden glass-card gradient-border"
                    initial={{
                      rotateY: rotation,
                      scale: scale,
                      z: zOffset,
                    }}
                    whileInView={{
                      rotateY: rotation,
                      scale: scale,
                      z: zOffset,
                    }}
                    whileHover={{
                      rotateY: 0,
                      scale: 1.05,
                      z: 40,
                      boxShadow: "0 24px 60px rgba(91,63,216,0.2)",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Corner dots */}
                    <div className="corner-dots">
                      <div className="corner-dots-bottom" />
                    </div>

                    {/* Glow for center card */}
                    {isCenter && (
                      <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                          boxShadow: "inset 0 0 60px rgba(91,63,216,0.06), 0 0 60px rgba(91,63,216,0.08)",
                        }}
                      />
                    )}

                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: tool.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: tool.color }} />
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={
                          tool.badgeType === "free"
                            ? {
                                backgroundColor: "rgba(16,185,129,0.12)",
                                color: "#34d399",
                                border: "1px solid rgba(16,185,129,0.15)",
                              }
                            : {
                                backgroundColor: "rgba(239,159,39,0.12)",
                                color: "#EF9F27",
                                border: "1px solid rgba(239,159,39,0.15)",
                              }
                        }
                      >
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-white text-base mb-1.5">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-1 text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: tool.color }}
                    >
                      Acessar ferramenta
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Remaining tools in standard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gridTools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
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

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
      />
    </section>
  );
}
