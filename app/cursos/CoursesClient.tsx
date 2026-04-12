"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Level = "Todos" | "Iniciante" | "Intermediário" | "Avançado";
type Marketplace = "Todos" | "ML" | "Shopee" | "Amazon" | "Magalu" | "Shein" | "Geral";

interface Course {
  id: number;
  title: string;
  instructor: string;
  hours: string;
  modules: number;
  level: Exclude<Level, "Todos">;
  marketplace: Exclude<Marketplace, "Todos">;
  rating: number;
  reviews: number;
  gradient: string;
  price: "Incluso no Pro" | "Grátis";
  emoji: string;
}

// ─── Course data ───────────────────────────────────────────────────────────────

const courses: Course[] = [
  {
    id: 1,
    title: "Do Zero ao Primeiro Pedido no Mercado Livre",
    instructor: "Rafael Mendes",
    hours: "8h",
    modules: 12,
    level: "Iniciante",
    marketplace: "ML",
    rating: 4.9,
    reviews: 847,
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    price: "Grátis",
    emoji: "🚀",
  },
  {
    id: 2,
    title: "Shopee: Dominando o Algoritmo",
    instructor: "Carla Vasconcelos",
    hours: "6h",
    modules: 9,
    level: "Intermediário",
    marketplace: "Shopee",
    rating: 4.8,
    reviews: 512,
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    price: "Incluso no Pro",
    emoji: "🛒",
  },
  {
    id: 3,
    title: "Precificação Estratégica para Lucrar Mais",
    instructor: "Lucas Ferreira",
    hours: "4h",
    modules: 7,
    level: "Intermediário",
    marketplace: "Geral",
    rating: 4.7,
    reviews: 393,
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    price: "Incluso no Pro",
    emoji: "💹",
  },
  {
    id: 4,
    title: "Amazon FBA Brasil: Guia Completo",
    instructor: "Amanda Costa",
    hours: "12h",
    modules: 16,
    level: "Avançado",
    marketplace: "Amazon",
    rating: 4.9,
    reviews: 261,
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
    price: "Incluso no Pro",
    emoji: "📦",
  },
  {
    id: 5,
    title: "Fotografia de Produto com Celular",
    instructor: "Mariana Santos",
    hours: "3h",
    modules: 5,
    level: "Iniciante",
    marketplace: "Geral",
    rating: 4.6,
    reviews: 724,
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    price: "Grátis",
    emoji: "📸",
  },
  {
    id: 6,
    title: "Tráfego Pago para Sellers",
    instructor: "Pedro Alves",
    hours: "5h",
    modules: 8,
    level: "Intermediário",
    marketplace: "Geral",
    rating: 4.8,
    reviews: 438,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    price: "Incluso no Pro",
    emoji: "📣",
  },
  {
    id: 7,
    title: "Gestão de Estoque e Logística",
    instructor: "Ricardo Lima",
    hours: "4h",
    modules: 6,
    level: "Avançado",
    marketplace: "Geral",
    rating: 4.7,
    reviews: 312,
    gradient: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
    price: "Incluso no Pro",
    emoji: "🏭",
  },
  {
    id: 8,
    title: "Copywriting para Anúncios Perfeitos",
    instructor: "Julia Ramos",
    hours: "3h",
    modules: 6,
    level: "Iniciante",
    marketplace: "Geral",
    rating: 4.9,
    reviews: 583,
    gradient: "linear-gradient(135deg, #4a1942 0%, #a21caf 100%)",
    price: "Grátis",
    emoji: "✍️",
  },
  {
    id: 9,
    title: "Magalu Marketplace: Do Cadastro à Primeira Venda",
    instructor: "Bruno Almeida",
    hours: "5h",
    modules: 8,
    level: "Iniciante",
    marketplace: "Magalu",
    rating: 4.7,
    reviews: 189,
    gradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    price: "Grátis",
    emoji: "🏪",
  },
  {
    id: 10,
    title: "Shein: Como Vender Moda no Maior Marketplace do Mundo",
    instructor: "Juliana Costa",
    hours: "6h",
    modules: 10,
    level: "Intermediário",
    marketplace: "Shein",
    rating: 4.8,
    reviews: 274,
    gradient: "linear-gradient(135deg, #171717 0%, #404040 100%)",
    price: "Incluso no Pro",
    emoji: "👗",
  },
];

const levels: Level[] = ["Todos", "Iniciante", "Intermediário", "Avançado"];
const marketplaces: Marketplace[] = ["Todos", "ML", "Shopee", "Amazon", "Magalu", "Shein", "Geral"];

const levelColors: Record<Exclude<Level, "Todos">, { color: string; bg: string }> = {
  Iniciante: { color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  Intermediário: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
  Avançado: { color: "#f87171", bg: "rgba(248,113,113,0.15)" },
};

const marketplaceColors: Record<Exclude<Marketplace, "Todos">, { color: string; bg: string }> = {
  ML: { color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  Shopee: { color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  Amazon: { color: "#facc15", bg: "rgba(250,204,21,0.12)" },
  Magalu: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  Shein: { color: "#e5e5e5", bg: "rgba(229,229,229,0.1)" },
  Geral: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          style={{ width: "13px", height: "13px" }}
          fill={s <= Math.round(rating) ? "#EF9F27" : "rgba(255,255,255,0.15)"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CoursesClient() {
  const [activeLevel, setActiveLevel] = useState<Level>("Todos");
  const [activeMarketplace, setActiveMarketplace] = useState<Marketplace>("Todos");

  const filtered = courses.filter((c) => {
    const levelMatch = activeLevel === "Todos" || c.level === activeLevel;
    const marketplaceMatch = activeMarketplace === "Todos" || c.marketplace === activeMarketplace;
    return levelMatch && marketplaceMatch;
  });

  return (
    <div>
      {/* ── Filters ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
        {/* Level filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginRight: "4px" }}>
            Nível:
          </span>
          {levels.map((level) => {
            const isActive = activeLevel === level;
            return (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive ? "1px solid #378ADD" : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: isActive ? "rgba(55,138,221,0.15)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#378ADD" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}
              >
                {level}
              </button>
            );
          })}
        </div>

        {/* Marketplace filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginRight: "4px" }}>
            Marketplace:
          </span>
          {marketplaces.map((mp) => {
            const isActive = activeMarketplace === mp;
            return (
              <button
                key={mp}
                onClick={() => setActiveMarketplace(mp)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive ? "1px solid #EF9F27" : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: isActive ? "rgba(239,159,39,0.12)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#EF9F27" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}
              >
                {mp === "ML" ? "Mercado Livre" : mp}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results count ── */}
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>
        {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* ── Course Grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.35)" }}
          >
            <p style={{ fontSize: "16px" }}>Nenhum curso encontrado com esses filtros.</p>
          </motion.div>
        ) : (
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((course) => {
              const levelStyle = levelColors[course.level];
              const mpStyle = marketplaceColors[course.marketplace];

              return (
                <motion.div
                  key={course.id}
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
                  }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.2)", y: -4 }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      background: course.gradient,
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      position: "relative",
                    }}
                  >
                    {course.emoji}
                    {/* Level badge */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        color: levelStyle.color,
                        backgroundColor: levelStyle.bg,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {course.level}
                    </span>
                    {/* Marketplace badge */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        color: mpStyle.color,
                        backgroundColor: mpStyle.bg,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {course.marketplace === "ML" ? "Mercado Livre" : course.marketplace}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {course.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
                      {course.instructor}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "12px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      <span>⏱ {course.hours}</span>
                      <span>📚 {course.modules} módulos</span>
                    </div>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <StarRating rating={course.rating} />
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#EF9F27" }}>
                        {course.rating}
                      </span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                        ({course.reviews})
                      </span>
                    </div>

                    {/* Price / CTA */}
                    <div style={{ marginTop: "auto" }}>
                      {course.price === "Grátis" ? (
                        <Link
                          href="/cadastro"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px 0",
                            borderRadius: "10px",
                            border: "1px solid rgba(16,185,129,0.4)",
                            color: "#10b981",
                            fontSize: "13px",
                            fontWeight: 600,
                            textDecoration: "none",
                            backgroundColor: "rgba(16,185,129,0.06)",
                          }}
                        >
                          Grátis — Começar agora →
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
                            border: "1px solid rgba(239,159,39,0.4)",
                            color: "#EF9F27",
                            fontSize: "13px",
                            fontWeight: 600,
                            textDecoration: "none",
                            backgroundColor: "rgba(239,159,39,0.06)",
                          }}
                        >
                          ⭐ Incluso no Pro
                        </Link>
                      )}
                    </div>
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
