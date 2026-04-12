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
    // Thematic background: bar chart / financial
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="20" y="80" width="20" height="30" rx="3" fill="rgba(155,123,255,0.12)" stroke="rgba(155,123,255,0.2)" strokeWidth="0.5" />
        <rect x="50" y="55" width="20" height="55" rx="3" fill="rgba(155,123,255,0.15)" stroke="rgba(155,123,255,0.25)" strokeWidth="0.5" />
        <rect x="80" y="35" width="20" height="75" rx="3" fill="rgba(155,123,255,0.2)" stroke="rgba(155,123,255,0.3)" strokeWidth="0.5" />
        <rect x="110" y="20" width="20" height="90" rx="3" fill="rgba(155,123,255,0.25)" stroke="rgba(155,123,255,0.35)" strokeWidth="0.5" />
        <rect x="140" y="10" width="20" height="100" rx="3" fill="rgba(155,123,255,0.3)" stroke="rgba(155,123,255,0.4)" strokeWidth="0.5" />
        <path d="M30 78 L60 53 L90 33 L120 18 L150 8" stroke="rgba(155,123,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <circle cx="150" cy="8" r="3" fill="#9B7BFF" opacity="0.6" />
      </svg>
    ),
  },
  {
    icon: Search,
    name: "Gerador de Títulos SEO",
    description: "Crie títulos otimizados para rankear melhor nos marketplaces.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    // Thematic: search / text lines
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="15" y="20" width="130" height="12" rx="6" fill="rgba(239,159,39,0.12)" stroke="rgba(239,159,39,0.2)" strokeWidth="0.5" />
        <rect x="15" y="42" width="100" height="8" rx="4" fill="rgba(239,159,39,0.08)" />
        <rect x="15" y="58" width="115" height="8" rx="4" fill="rgba(239,159,39,0.06)" />
        <rect x="15" y="74" width="80" height="8" rx="4" fill="rgba(239,159,39,0.05)" />
        <circle cx="165" cy="35" r="22" stroke="rgba(239,159,39,0.25)" strokeWidth="1.5" fill="rgba(239,159,39,0.04)" />
        <line x1="181" y1="51" x2="195" y2="65" stroke="rgba(239,159,39,0.3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M155 30 L162 37 L175 25" stroke="rgba(239,159,39,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    icon: Truck,
    name: "Simulador de Frete",
    description: "Compare transportadoras e encontre a opção mais barata.",
    badge: "Grátis",
    badgeType: "free",
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    // Thematic: route / delivery
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="85" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="40" cy="85" r="3" fill="rgba(155,123,255,0.25)" />
        <circle cx="160" cy="35" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="160" cy="35" r="3" fill="#9B7BFF" opacity="0.5" />
        <path d="M48 82 Q80 75 100 60 Q120 45 152 38" stroke="rgba(155,123,255,0.25)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <circle cx="100" cy="60" r="4" fill="rgba(155,123,255,0.15)" stroke="rgba(155,123,255,0.3)" strokeWidth="0.5" />
        <rect x="70" y="90" width="60" height="16" rx="4" fill="rgba(155,123,255,0.08)" stroke="rgba(155,123,255,0.15)" strokeWidth="0.5" />
        <text x="100" y="101" textAnchor="middle" fill="rgba(155,123,255,0.35)" fontSize="8" fontFamily="monospace">-30% custo</text>
      </svg>
    ),
  },
  {
    icon: Package,
    name: "Planilha de Estoque",
    description: "Gerencie seu estoque com alertas de reposição automáticos.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    // Thematic: grid / inventory
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={20 + col * 35}
              y={15 + row * 25}
              width="28"
              height="18"
              rx="3"
              fill={row === 1 && col === 2 ? "rgba(239,159,39,0.2)" : "rgba(239,159,39,0.06)"}
              stroke={row === 1 && col === 2 ? "rgba(239,159,39,0.4)" : "rgba(239,159,39,0.12)"}
              strokeWidth="0.5"
            />
          ))
        )}
        <circle cx="107" cy="40" r="5" fill="rgba(239,159,39,0.3)" />
        <text x="107" y="43" textAnchor="middle" fill="#0A0A0F" fontSize="6" fontWeight="bold">!</text>
      </svg>
    ),
  },
  {
    icon: FileText,
    name: "Template de Anúncio Pro",
    description: "Estruturas testadas que convertem mais em qualquer marketplace.",
    badge: "Pro",
    badgeType: "pro",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    // Thematic: document / template
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="50" y="8" width="100" height="104" rx="6" fill="rgba(239,159,39,0.04)" stroke="rgba(239,159,39,0.15)" strokeWidth="0.8" />
        <rect x="60" y="18" width="80" height="6" rx="3" fill="rgba(239,159,39,0.15)" />
        <rect x="60" y="30" width="60" height="4" rx="2" fill="rgba(239,159,39,0.08)" />
        <rect x="60" y="40" width="70" height="4" rx="2" fill="rgba(239,159,39,0.08)" />
        <rect x="60" y="50" width="50" height="4" rx="2" fill="rgba(239,159,39,0.06)" />
        <rect x="60" y="64" width="80" height="24" rx="4" fill="rgba(239,159,39,0.06)" stroke="rgba(239,159,39,0.12)" strokeWidth="0.5" />
        <path d="M75 76 L90 76 M95 76 L110 76 M115 76 L130 76" stroke="rgba(239,159,39,0.15)" strokeWidth="1" />
        <rect x="60" y="96" width="80" height="10" rx="5" fill="rgba(239,159,39,0.15)" stroke="rgba(239,159,39,0.25)" strokeWidth="0.5" />
        <text x="100" y="103" textAnchor="middle" fill="rgba(239,159,39,0.5)" fontSize="6" fontWeight="bold">PUBLICAR</text>
      </svg>
    ),
  },
  {
    icon: BarChart2,
    name: "Dashboard de Métricas",
    description: "Visualize seus KPIs de vendas, estoque e lucratividade.",
    badge: "Grátis",
    badgeType: "free",
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    // Thematic: dashboard / charts
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
        {/* Mini line chart */}
        <path d="M15 70 L40 55 L65 62 L90 35 L115 42 L140 20 L165 28 L185 12" stroke="rgba(155,123,255,0.35)" strokeWidth="1.5" fill="none" />
        <path d="M15 70 L40 55 L65 62 L90 35 L115 42 L140 20 L165 28 L185 12 L185 90 L15 90 Z" fill="url(#chart-gradient)" />
        <defs>
          <linearGradient id="chart-gradient" x1="100" y1="12" x2="100" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(155,123,255,0.12)" />
            <stop offset="100%" stopColor="rgba(155,123,255,0)" />
          </linearGradient>
        </defs>
        {/* Data points */}
        <circle cx="90" cy="35" r="3" fill="#9B7BFF" opacity="0.5" />
        <circle cx="140" cy="20" r="3" fill="#9B7BFF" opacity="0.5" />
        <circle cx="185" cy="12" r="3" fill="#9B7BFF" opacity="0.7" />
        {/* KPI boxes */}
        <rect x="15" y="95" width="50" height="18" rx="3" fill="rgba(155,123,255,0.08)" stroke="rgba(155,123,255,0.15)" strokeWidth="0.5" />
        <rect x="75" y="95" width="50" height="18" rx="3" fill="rgba(155,123,255,0.08)" stroke="rgba(155,123,255,0.15)" strokeWidth="0.5" />
        <rect x="135" y="95" width="50" height="18" rx="3" fill="rgba(155,123,255,0.08)" stroke="rgba(155,123,255,0.15)" strokeWidth="0.5" />
      </svg>
    ),
  },
];

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

        {/* Tools grid with thematic backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <ScrollReveal key={tool.name} direction="up" index={i} delay={0.05}>
                <motion.div
                  className="group relative flex flex-col rounded-2xl cursor-pointer overflow-hidden gradient-border h-full"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 24px 60px ${tool.badgeType === "pro" ? "rgba(239,159,39,0.1)" : "rgba(91,63,216,0.15)"}`,
                    borderColor: `${tool.badgeType === "pro" ? "rgba(239,159,39,0.25)" : "rgba(155,123,255,0.25)"}`,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Thematic illustration background */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      height: "140px",
                      background: tool.badgeType === "pro"
                        ? "linear-gradient(180deg, rgba(239,159,39,0.04) 0%, rgba(10,10,15,0.8) 100%)"
                        : "linear-gradient(180deg, rgba(91,63,216,0.04) 0%, rgba(10,10,15,0.8) 100%)",
                    }}
                  >
                    {/* SVG illustration */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                      {tool.illustration}
                    </div>

                    {/* Subtle grid overlay on illustration */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Bottom fade to card body */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-12"
                      style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,15,0.95))" }}
                    />

                    {/* Badge on illustration */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={
                          tool.badgeType === "free"
                            ? {
                                backgroundColor: "rgba(16,185,129,0.15)",
                                color: "#34d399",
                                border: "1px solid rgba(16,185,129,0.2)",
                                backdropFilter: "blur(8px)",
                              }
                            : {
                                backgroundColor: "rgba(239,159,39,0.15)",
                                color: "#EF9F27",
                                border: "1px solid rgba(239,159,39,0.2)",
                                backdropFilter: "blur(8px)",
                              }
                        }
                      >
                        {tool.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col gap-3 p-6 pt-3 flex-1" style={{ background: "rgba(10,10,15,0.95)" }}>
                    {/* Icon + title row */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: tool.bg }}
                      >
                        <Icon className="w-5 h-5" style={{ color: tool.color }} />
                      </div>
                      <h3 className="font-display font-bold text-white text-base">
                        {tool.name}
                      </h3>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Hover arrow */}
                    <div
                      className="flex items-center gap-1.5 text-xs font-semibold mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: tool.color }}
                    >
                      Acessar ferramenta
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
      />
    </section>
  );
}
