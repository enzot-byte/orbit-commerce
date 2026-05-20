"use client";

import Link from "next/link";

/**
 * Ferramentas públicas — versão honesta (substituiu 12 ferramentas
 * inventadas tipo "Gerador de Títulos SEO ML", "Calculadora de ROI em Ads",
 * "Monitor de Preços em tempo real" que não existem).
 *
 * Cada item aqui ou (a) está live e tem URL real, ou (b) tá no roadmap
 * com ETA público. Não inventamos ferramenta pra parecer maior.
 */

interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: "live" | "em-breve";
  plan: "Grátis" | "Pro" | "Premium";
  eta?: string;
  externalUrl?: string;
  icon: string;
  gradient: string;
}

const tools: Tool[] = [
  {
    id: "calculadora-multiplataforma",
    name: "Calculadora Multiplataforma",
    tagline: "Sua margem real em 30 segundos",
    description:
      "Cole custo, frete e taxa de cada marketplace. Recebe net, margem % e ponto de equilíbrio no instante. Funciona pra Shopee, ML, Amazon, Magalu.",
    category: "Precificação",
    status: "live",
    plan: "Grátis",
    externalUrl: "https://shopee-calc-mu.vercel.app",
    icon: "🧮",
    gradient: "linear-gradient(135deg, #0C447C 0%, #378ADD 100%)",
  },
  {
    id: "sellerspy",
    name: "Sellerspy",
    tagline: "Inteligência de concorrente direto no marketplace",
    description:
      "Extensão Chrome/Edge que injeta histórico de preço, ranking estimado e venda mensal direto no anúncio do Mercado Livre e Amazon BR.",
    category: "Inteligência",
    status: "live",
    plan: "Pro",
    // TODO: trocar pelo URL exato da extensão Sellerspy na Chrome Web Store
    externalUrl: "https://chromewebstore.google.com/search/sellerspy",
    icon: "🔍",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
  },
  {
    id: "sellertrack-shopee",
    name: "Sellertrack Shopee",
    tagline: "Mesma magia do Sellerspy, agora pra Shopee",
    description:
      "Extensão com price tracking e snapshot de catálogo direto no painel do seller Shopee Brasil.",
    category: "Inteligência",
    status: "em-breve",
    plan: "Pro",
    eta: "Julho 2026",
    icon: "🛍️",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  },
  {
    id: "sellertrack-magalu",
    name: "Sellertrack Magalu",
    tagline: "Inteligência de concorrente no Magazine Luiza",
    description:
      "Catalog scrape + price tracker pro Magalu, integrado ao dashboard Sellerverse.",
    category: "Inteligência",
    status: "em-breve",
    plan: "Pro",
    eta: "Agosto 2026",
    icon: "🏬",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
  },
  {
    id: "sellertrack-shein",
    name: "Sellertrack SHEIN",
    tagline: "Snapshot e price tracking SHEIN Brasil",
    description:
      "Pra quem opera no SHEIN BR e precisa monitorar catálogo de concorrente em escala.",
    category: "Inteligência",
    status: "em-breve",
    plan: "Pro",
    eta: "Setembro 2026",
    icon: "👗",
    gradient: "linear-gradient(135deg, #171717 0%, #404040 100%)",
  },
  {
    id: "monitor-precos",
    name: "Monitor de Preços ao vivo",
    tagline: "Alerta no WhatsApp quando concorrente baixar",
    description:
      "Cadastra produto + faixa de preço alvo. Quando concorrente cruzar, chega notificação no WhatsApp em <5min.",
    category: "Inteligência",
    status: "em-breve",
    plan: "Premium",
    eta: "Sob demanda",
    icon: "👁️",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
  },
];

const planBadgeStyle: Record<Tool["plan"], { color: string; bg: string }> = {
  Grátis: { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  Pro: { color: "#EF9F27", bg: "rgba(239,159,39,0.12)" },
  Premium: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

const statusBadgeStyle: Record<Tool["status"], { label: string; color: string; bg: string }> = {
  live: { label: "Live agora", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  "em-breve": { label: "Em breve", color: "rgba(255,255,255,0.55)", bg: "rgba(255,255,255,0.05)" },
};

export default function ToolsClient() {
  return (
    <div>
      {/* Status honesto */}
      <div
        style={{
          marginBottom: "32px",
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: "rgba(239,159,39,0.06)",
          border: "1px solid rgba(239,159,39,0.20)",
        }}
      >
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
          <strong style={{ color: "white" }}>Pé no chão:</strong> 2 ferramentas
          live (Calculadora pública + Sellerspy ML/Amazon) e 4 chegando até
          setembro 2026 conforme cronograma público abaixo. Sem promessa que
          não dá pra cumprir.
        </p>
      </div>

      {/* Tool grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {tools.map((tool) => {
          const planBadge = planBadgeStyle[tool.plan];
          const statusBadge = statusBadgeStyle[tool.status];
          const isLive = tool.status === "live";
          const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
            isLive && tool.externalUrl ? (
              <a
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                {children}
              </a>
            ) : (
              <Link href="/cadastro" style={{ textDecoration: "none", display: "block" }}>
                {children}
              </Link>
            );

          return (
            <Wrapper key={tool.id}>
              <div
                style={{
                  backgroundColor: "#16162A",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: tool.gradient,
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: isLive ? 1 : 0.7,
                  }}
                >
                  <span style={{ fontSize: "36px" }}>{tool.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        color: statusBadge.color,
                        backgroundColor: statusBadge.bg,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {statusBadge.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        color: planBadge.color,
                        backgroundColor: planBadge.bg,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {tool.plan}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "8px",
                    }}
                  >
                    {tool.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#EF9F27", marginBottom: "10px", fontWeight: 500 }}>
                    {tool.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.65,
                      flex: 1,
                      marginBottom: "16px",
                    }}
                  >
                    {tool.description}
                  </p>

                  {/* Action */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "auto",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                      {tool.eta ?? (tool.plan === "Grátis" ? "Acesso público" : `Incluso no ${tool.plan}`)}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: planBadge.color,
                      }}
                    >
                      {isLive ? "Abrir →" : "Garantir acesso →"}
                    </span>
                  </div>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
