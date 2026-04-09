"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Category = "Todos" | "Precificação" | "SEO" | "Logística" | "Gestão" | "Ads";
type PlanFilter = "Todos" | "Grátis" | "Pro" | "Premium";
type Plan = "Grátis" | "Pro" | "Premium";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: Exclude<Category, "Todos">;
  plan: Plan;
  icon: string;
  gradient: string;
}

// ─── Tools data ────────────────────────────────────────────────────────────────

const tools: Tool[] = [
  {
    id: 1,
    name: "Calculadora de Margem e Preço",
    description: "Calcule sua margem real descontando taxas do marketplace, frete e custo do produto.",
    category: "Precificação",
    plan: "Grátis",
    icon: "💰",
    gradient: "linear-gradient(135deg, #0C447C 0%, #378ADD 100%)",
  },
  {
    id: 2,
    name: "Gerador de Títulos SEO ML",
    description: "Crie títulos otimizados para o Mercado Livre com palavras-chave de alta conversão.",
    category: "SEO",
    plan: "Grátis",
    icon: "🔍",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
  },
  {
    id: 3,
    name: "Simulador de Frete",
    description: "Simule o custo de frete para qualquer CEP e compare entre transportadoras.",
    category: "Logística",
    plan: "Grátis",
    icon: "📦",
    gradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
  },
  {
    id: 4,
    name: "Planilha de Controle de Estoque",
    description: "Gerencie seu estoque com alertas automáticos de reposição e relatórios de giro.",
    category: "Gestão",
    plan: "Pro",
    icon: "📊",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  },
  {
    id: 5,
    name: "Template de Anúncio Pro",
    description: "Templates de descrição e título otimizados para Shopee, ML e Amazon.",
    category: "SEO",
    plan: "Pro",
    icon: "✍️",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
  },
  {
    id: 6,
    name: "Dashboard de Métricas",
    description: "Visualize suas vendas, ROI e métricas-chave em um painel unificado e intuitivo.",
    category: "Gestão",
    plan: "Pro",
    icon: "📈",
    gradient: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
  },
  {
    id: 7,
    name: "Calculadora de ROI em Ads",
    description: "Calcule o retorno real das suas campanhas de anúncios pagos em todos os marketplaces.",
    category: "Ads",
    plan: "Pro",
    icon: "📣",
    gradient: "linear-gradient(135deg, #4a1942 0%, #a21caf 100%)",
  },
  {
    id: 8,
    name: "Gerador de Descrição de Produto",
    description: "Crie descrições persuasivas e otimizadas com IA para qualquer categoria de produto.",
    category: "SEO",
    plan: "Grátis",
    icon: "📝",
    gradient: "linear-gradient(135deg, #1c1917 0%, #78716c 100%)",
  },
  {
    id: 9,
    name: "Monitor de Preços da Concorrência",
    description: "Acompanhe os preços dos seus concorrentes em tempo real e receba alertas de mudança.",
    category: "Gestão",
    plan: "Premium",
    icon: "👁️",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
  },
  {
    id: 10,
    name: "Gerador de Hashtags TikTok/Insta",
    description: "Encontre as hashtags mais performáticas para seus produtos no TikTok e Instagram.",
    category: "Ads",
    plan: "Grátis",
    icon: "#️⃣",
    gradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
  },
  {
    id: 11,
    name: "Calculadora de Lucro por Marketplace",
    description: "Compare sua lucratividade real em cada marketplace considerando todas as taxas.",
    category: "Precificação",
    plan: "Pro",
    icon: "⚖️",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)",
  },
  {
    id: 12,
    name: "Kit de Templates de Resposta ao Cliente",
    description: "50+ templates prontos para respostas rápidas e profissionais a clientes.",
    category: "Gestão",
    plan: "Pro",
    icon: "💬",
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #16a34a 100%)",
  },
];

const categories: Category[] = ["Todos", "Precificação", "SEO", "Logística", "Gestão", "Ads"];
const planFilters: PlanFilter[] = ["Todos", "Grátis", "Pro", "Premium"];

const planBadgeStyle: Record<Plan, { color: string; bg: string }> = {
  Grátis: { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  Pro: { color: "#EF9F27", bg: "rgba(239,159,39,0.12)" },
  Premium: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [activePlan, setActivePlan] = useState<PlanFilter>("Todos");

  const filtered = tools.filter((t) => {
    const categoryMatch = activeCategory === "Todos" || t.category === activeCategory;
    const planMatch = activePlan === "Todos" || t.plan === activePlan;
    return categoryMatch && planMatch;
  });

  return (
    <div>
      {/* ── Filter bar ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "48px",
        }}
      >
        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive ? "1px solid #378ADD" : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: isActive ? "rgba(55,138,221,0.15)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#378ADD" : "rgba(255,255,255,0.6)",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Plan filter */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "4px",
            backgroundColor: "rgba(255,255,255,0.04)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            width: "fit-content",
          }}
        >
          {planFilters.map((plan) => {
            const isActive = activePlan === plan;
            return (
              <button
                key={plan}
                onClick={() => setActivePlan(plan)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: isActive ? "#185FA5" : "transparent",
                  color: isActive ? "white" : "rgba(255,255,255,0.5)",
                  transition: "all 0.2s",
                }}
              >
                {plan}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tool grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.35)" }}
          >
            <p style={{ fontSize: "16px" }}>Nenhuma ferramenta encontrada com esses filtros.</p>
          </motion.div>
        ) : (
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((tool) => {
              const badge = planBadgeStyle[tool.plan];
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    backgroundColor: "#16162A",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  whileHover={{
                    borderColor: "rgba(255,255,255,0.2)",
                    y: -4,
                  }}
                >
                  {/* Tool header */}
                  <div
                    style={{
                      background: tool.gradient,
                      padding: "28px 24px 24px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "36px" }}>{tool.icon}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        color: badge.color,
                        backgroundColor: badge.bg,
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${badge.color}40`,
                      }}
                    >
                      {tool.plan}
                    </span>
                  </div>

                  {/* Tool content */}
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {tool.category}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "10px",
                        lineHeight: 1.35,
                      }}
                    >
                      {tool.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.7,
                        flex: 1,
                        marginBottom: "20px",
                      }}
                    >
                      {tool.description}
                    </p>

                    {/* CTA */}
                    {tool.plan === "Grátis" ? (
                      <Link
                        href="/cadastro"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 0",
                          borderRadius: "10px",
                          border: "1px solid rgba(55,138,221,0.4)",
                          color: "#378ADD",
                          fontSize: "13px",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "background-color 0.2s",
                          backgroundColor: "rgba(55,138,221,0.06)",
                        }}
                      >
                        Acessar grátis →
                      </Link>
                    ) : (
                      <Link
                        href="/planos"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 0",
                          borderRadius: "10px",
                          border: `1px solid ${badge.color}50`,
                          color: badge.color,
                          fontSize: "13px",
                          fontWeight: 600,
                          textDecoration: "none",
                          backgroundColor: badge.bg,
                        }}
                      >
                        🔒 Disponível no {tool.plan}
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
