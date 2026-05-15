"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Category = "Todos" | "Mercado Livre" | "Shopee" | "Amazon" | "Precificação" | "Marketing";

const categories: Category[] = ["Todos", "Mercado Livre", "Shopee", "Amazon", "Precificação", "Marketing"];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: Exclude<Category, "Todos">;
  date: string;
  readTime: string;
  author: string;
  gradient: string;
  emoji: string;
  /** Slug on /blog/[slug] when the article exists; otherwise card is non-clickable. */
  slug?: string;
}

// Slugs that currently resolve in app/blog/[slug]/page.tsx ARTICLES.
// As more articles are written, add their slug to the relevant entry below
// and the card will become clickable automatically.
const PUBLISHED_SLUGS = new Set(["como-precificar-mercado-livre"]);

const articles: Article[] = [
  {
    id: 1,
    title: "Como dominar o algoritmo do Mercado Livre em 2025",
    excerpt: "Descubra os fatores que realmente influenciam o posicionamento dos seus anúncios e como otimizá-los para aparecer nas primeiras posições.",
    category: "Mercado Livre",
    date: "05 abr 2025",
    readTime: "8 min",
    author: "Rafael Mendes",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    emoji: "🛒",
  },
  {
    id: 2,
    title: "Shopee vs Mercado Livre: onde vale mais a pena vender?",
    excerpt: "Uma análise detalhada das taxas, alcance e potencial de lucro em cada plataforma para diferentes nichos de produto.",
    category: "Shopee",
    date: "02 abr 2025",
    readTime: "12 min",
    author: "Carla Vasconcelos",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    emoji: "⚖️",
  },
  {
    id: 3,
    title: "Amazon FBA: vale a pena para sellers brasileiros?",
    excerpt: "Tudo o que você precisa saber sobre a estrutura FBA no Brasil, custos reais, vantagens e como começar do jeito certo.",
    category: "Amazon",
    date: "29 mar 2025",
    readTime: "10 min",
    author: "Amanda Costa",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    emoji: "📦",
  },
  {
    id: 4,
    title: "Como precificar produtos no Mercado Livre e ainda ter lucro",
    excerpt: "Descubra a fórmula de markup reverso e o custo total de servir que sellers de alto volume usam para manter margem líquida positiva mesmo em mercados competitivos.",
    category: "Precificação",
    date: "07 abr 2025",
    readTime: "14 min",
    author: "Rafael Mendes",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    emoji: "💹",
    slug: "como-precificar-mercado-livre",
  },
  {
    id: 5,
    title: "TikTok Shop: a oportunidade que a maioria dos sellers está ignorando",
    excerpt: "Como usar o TikTok Shop para gerar vendas orgânicas e construir uma audiência fiel ao redor dos seus produtos.",
    category: "Marketing",
    date: "20 mar 2025",
    readTime: "9 min",
    author: "Pedro Alves",
    gradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    emoji: "🎵",
  },
  {
    id: 6,
    title: "Como escrever títulos que vendem: guia completo de SEO para marketplaces",
    excerpt: "Framework comprovado para criar títulos que rankeiam bem nos algoritmos e convencem o cliente a clicar no seu anúncio.",
    category: "Marketing",
    date: "15 mar 2025",
    readTime: "11 min",
    author: "Julia Ramos",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    emoji: "✍️",
  },
];

const categoryColors: Record<Exclude<Category, "Todos">, { color: string; bg: string }> = {
  "Mercado Livre": { color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  Shopee: { color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  Amazon: { color: "#facc15", bg: "rgba(250,204,21,0.12)" },
  Precificação: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  Marketing: { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
};

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filtered = articles.filter(
    (a) => activeCategory === "Todos" || a.category === activeCategory
  );

  return (
    <div>
      {/* ── Category filter ── */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
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
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Article grid ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((article) => {
            const catStyle = categoryColors[article.category];
            const isPublished =
              article.slug !== undefined && PUBLISHED_SLUGS.has(article.slug);
            // Card is interactive only when the destination actually exists.
            // Previously every card had `cursor: pointer` + hover lift but no
            // link wrapper → looked clickable, navigated nowhere.
            return (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: "#16162A",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: isPublished ? "pointer" : "default",
                  transition: "border-color 0.2s",
                }}
                whileHover={
                  isPublished
                    ? { borderColor: "rgba(255,255,255,0.2)", y: -4 }
                    : undefined
                }
              >
                {/* Thumbnail */}
                <div
                  style={{
                    background: article.gradient,
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "56px",
                    position: "relative",
                  }}
                >
                  {article.emoji}
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      color: catStyle.color,
                      backgroundColor: catStyle.bg,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1.4,
                      marginBottom: "10px",
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {article.author.charAt(0)}
                      </div>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                        {article.author}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                        {article.date}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.35)",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          backgroundColor: "rgba(255,255,255,0.06)",
                        }}
                      >
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read link only when the article actually has a slug
                      that resolves on /blog/[slug]; otherwise show a
                      discreet "em breve" so users aren't misled. */}
                  {isPublished && article.slug ? (
                    <Link
                      href={`/blog/${article.slug}`}
                      style={{
                        marginTop: "16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#378ADD",
                        textDecoration: "none",
                      }}
                    >
                      Ler artigo
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span
                      style={{
                        marginTop: "16px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      Em breve
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
