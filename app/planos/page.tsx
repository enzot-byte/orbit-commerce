import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PlanosHero from "@/components/sections/PlanosHero";
import PlanosClient from "./PlanosClient";
import { Calculator, Search, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Planos e Preços",
  description:
    "Escolha o plano ideal para o seu negócio. Comece grátis e faça upgrade quando precisar.",
};

// ─── Comparison table data ─────────────────────────────────────────────────────

const tableFeatures = [
  {
    category: "Comunidade",
    features: [
      { name: "Acesso à comunidade geral", free: true, pro: true, premium: true },
      { name: "Grupo exclusivo de mentoria", free: false, pro: true, premium: true },
      { name: "Canal direto com especialistas", free: false, pro: false, premium: true },
    ],
  },
  {
    category: "Ferramentas",
    features: [
      { name: "Ferramentas gratuitas (3)", free: true, pro: true, premium: true },
      { name: "Todas as ferramentas (12+)", free: false, pro: true, premium: true },
      { name: "Monitor de preços da concorrência", free: false, pro: false, premium: true },
      { name: "Dashboard de métricas avançado", free: false, pro: true, premium: true },
    ],
  },
  {
    category: "Cursos",
    features: [
      { name: "Conteúdo básico de cursos", free: true, pro: true, premium: true },
      { name: "Todos os cursos completos", free: false, pro: true, premium: true },
      { name: "Acesso antecipado a novos cursos", free: false, pro: false, premium: true },
    ],
  },
  {
    category: "Suporte",
    features: [
      { name: "Suporte via FAQ", free: true, pro: true, premium: true },
      { name: "Suporte prioritário", free: false, pro: true, premium: true },
      { name: "SLA de resposta em 2h", free: false, pro: false, premium: true },
    ],
  },
  {
    category: "Mentoria",
    features: [
      { name: "Newsletter semanal", free: true, pro: true, premium: true },
      { name: "Relatórios mensais personalizados", free: false, pro: true, premium: true },
      { name: "Mentoria 1:1 mensal", free: false, pro: false, premium: true },
      { name: "Diagnóstico e auditoria de negócio", free: false, pro: false, premium: true },
    ],
  },
];

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, sem burocracia. Você pode cancelar sua assinatura diretamente no painel da conta com apenas um clique. Não há taxa de cancelamento e seu acesso continua até o fim do período pago.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer:
      "Se por qualquer motivo você não ficar satisfeito nos primeiros 7 dias após a assinatura de qualquer plano pago, devolvemos 100% do valor. Basta enviar um e-mail para suporte@sellerverse.com.br.",
  },
  {
    question: "Posso fazer upgrade ou downgrade do meu plano?",
    answer:
      "Sim. Você pode alterar seu plano a qualquer momento. No upgrade, você é cobrado proporcionalmente pelos dias restantes. No downgrade, o novo valor é aplicado no próximo ciclo.",
  },
  {
    question: "O plano anual é cobrado de uma vez?",
    answer:
      "Sim, o plano anual é cobrado integralmente no momento da assinatura, mas você economiza 20% comparado ao plano mensal. Isso representa uma economia de até R$600 por ano no plano Pro.",
  },
  {
    question: "Qual a diferença entre as ferramentas gratuitas e as Pro?",
    answer:
      "As ferramentas gratuitas incluem calculadora de margem, gerador de títulos SEO básico e simulador de frete. As ferramentas Pro e Premium oferecem funcionalidades mais avançadas como dashboard de métricas, ROI de ads, monitoramento de concorrentes e muito mais.",
  },
  {
    question: "A mentoria 1:1 do plano Premium é com quem?",
    answer:
      "As sessões de mentoria 1:1 são realizadas com um dos nossos especialistas sêniores — todos com pelo menos 3 anos de experiência prática vendendo em marketplaces brasileiros. As sessões duram 60 minutos e são agendadas diretamente na plataforma.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero — Scroll 3D Parallax ── */}
        <PlanosHero />

        {/* ══════════════════════════════════════════════════════════════
            Community Showcase — themed background with social graph
            ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: "#0A0A0F", padding: "100px 0 60px" }}
        >
          {/* Community network background pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute w-full h-full opacity-[0.04]"
              viewBox="0 0 1200 600"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Connection lines */}
              <line x1="100" y1="120" x2="300" y2="200" stroke="#9B7BFF" strokeWidth="1" />
              <line x1="300" y1="200" x2="500" y2="150" stroke="#9B7BFF" strokeWidth="1" />
              <line x1="500" y1="150" x2="700" y2="250" stroke="#378ADD" strokeWidth="1" />
              <line x1="700" y1="250" x2="900" y2="180" stroke="#9B7BFF" strokeWidth="1" />
              <line x1="900" y1="180" x2="1100" y2="280" stroke="#378ADD" strokeWidth="1" />
              <line x1="200" y1="400" x2="400" y2="350" stroke="#378ADD" strokeWidth="1" />
              <line x1="400" y1="350" x2="600" y2="420" stroke="#9B7BFF" strokeWidth="1" />
              <line x1="600" y1="420" x2="800" y2="370" stroke="#378ADD" strokeWidth="1" />
              <line x1="800" y1="370" x2="1000" y2="450" stroke="#9B7BFF" strokeWidth="1" />
              <line x1="300" y1="200" x2="400" y2="350" stroke="#EF9F27" strokeWidth="0.8" opacity="0.6" />
              <line x1="500" y1="150" x2="600" y2="420" stroke="#EF9F27" strokeWidth="0.8" opacity="0.6" />
              <line x1="700" y1="250" x2="800" y2="370" stroke="#EF9F27" strokeWidth="0.8" opacity="0.6" />
              <line x1="900" y1="180" x2="1000" y2="450" stroke="#EF9F27" strokeWidth="0.8" opacity="0.6" />
              {/* Nodes */}
              {[
                [100, 120], [300, 200], [500, 150], [700, 250], [900, 180], [1100, 280],
                [200, 400], [400, 350], [600, 420], [800, 370], [1000, 450],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="20" fill="rgba(155,123,255,0.06)" />
                  <circle cx={x} cy={y} r="5" fill="rgba(155,123,255,0.3)" />
                  <circle cx={x} cy={y} r="2" fill="#9B7BFF" opacity="0.6" />
                </g>
              ))}
            </svg>
            {/* Central glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(91,63,216,0.08) 0%, transparent 60%)",
              }}
            />
          </div>

          <div className="container-orbit relative z-10">
            <ScrollReveal direction="up" className="text-center mb-16">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(155,123,255,0.1)",
                  border: "1px solid rgba(155,123,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9B7BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#9B7BFF" }}
              >
                Comunidade
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Fa&ccedil;a parte de uma comunidade de sellers
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", maxWidth: "540px", margin: "0 auto" }}>
                Todos os planos incluem acesso &agrave; comunidade geral. Troque experi&ecirc;ncias, tire d&uacute;vidas e cres&ccedil;a junto com milhares de sellers brasileiros.
              </p>
            </ScrollReveal>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {[
                { value: "4.200+", label: "Sellers ativos", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" },
                { value: "12k+", label: "Mensagens/m\u00EAs", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                { value: "50+", label: "Eventos ao vivo", icon: "M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" },
                { value: "98%", label: "Satisfa\u00E7\u00E3o", icon: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" },
              ].map((stat) => (
                <ScrollReveal key={stat.label} direction="up">
                  <div
                    style={{
                      padding: "28px 20px",
                      borderRadius: "16px",
                      background: "linear-gradient(180deg, rgba(22,22,42,0.8) 0%, rgba(16,16,34,0.7) 100%)",
                      border: "1px solid rgba(155,123,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(155,123,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
                        <path d={stat.icon} />
                      </svg>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        color: "white",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #1A1A2E)" }}
          />
        </section>

        {/* ── Pricing Component ── */}
        <Pricing />

        {/* ══════════════════════════════════════════════════════════════
            Free Tools Showcase — visual cards for the 3 free tools
            ══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 0 0", backgroundColor: "#0A0A0F" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-12">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#10b981" }}
              >
                Incluído no plano gr&aacute;tis
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                3 ferramentas para come&ccedil;ar agora
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", maxWidth: "500px", margin: "0 auto" }}>
                Comece a otimizar seu neg&oacute;cio hoje mesmo, sem custo.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Calculadora de Margem */}
              <ScrollReveal direction="up" index={0} delay={0.1}>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(22,22,44,0.96) 0%, rgba(16,16,34,0.95) 100%)",
                    border: "1px solid rgba(155,123,255,0.2)",
                  }}
                >
                  {/* Illustration area */}
                  <div
                    style={{
                      height: 160,
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(180deg, rgba(91,63,216,0.1) 0%, transparent 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <svg viewBox="0 0 300 140" fill="none" className="absolute inset-0 w-full h-full p-4">
                      <rect x="30" y="90" width="32" height="38" rx="4" fill="rgba(155,123,255,0.1)" stroke="rgba(155,123,255,0.2)" strokeWidth="0.8" />
                      <rect x="75" y="65" width="32" height="63" rx="4" fill="rgba(155,123,255,0.14)" stroke="rgba(155,123,255,0.24)" strokeWidth="0.8" />
                      <rect x="120" y="45" width="32" height="83" rx="4" fill="rgba(155,123,255,0.18)" stroke="rgba(155,123,255,0.28)" strokeWidth="0.8" />
                      <rect x="165" y="28" width="32" height="100" rx="4" fill="rgba(155,123,255,0.22)" stroke="rgba(155,123,255,0.32)" strokeWidth="0.8" />
                      <rect x="210" y="12" width="32" height="116" rx="4" fill="rgba(155,123,255,0.28)" stroke="rgba(155,123,255,0.38)" strokeWidth="0.8" />
                      <path d="M46 88 L91 63 L136 43 L181 26 L226 10" stroke="rgba(155,123,255,0.4)" strokeWidth="2" strokeDasharray="5 4" fill="none" />
                      <circle cx="226" cy="10" r="4" fill="#9B7BFF" opacity="0.7" />
                      <text x="226" y="25" textAnchor="middle" fill="rgba(155,123,255,0.5)" fontSize="9" fontFamily="monospace">+42%</text>
                    </svg>
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }}
                      >
                        Gr&aacute;tis
                      </span>
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(155,123,255,0.12)" }}
                      >
                        <Calculator className="w-4.5 h-4.5" style={{ color: "#9B7BFF" }} />
                      </div>
                      <h3 className="font-display font-bold text-white text-[15px]">Calculadora de Margem</h3>
                    </div>
                    <p className="text-[13px] text-white/50 leading-relaxed">
                      Calcule lucro l&iacute;quido, margem e ponto de equil&iacute;brio em segundos. Ideal para precificar produtos com confian&ccedil;a.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Gerador de Títulos SEO */}
              <ScrollReveal direction="up" index={1} delay={0.1}>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(22,22,44,0.96) 0%, rgba(16,16,34,0.95) 100%)",
                    border: "1px solid rgba(55,138,221,0.2)",
                  }}
                >
                  <div
                    style={{
                      height: 160,
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(180deg, rgba(55,138,221,0.08) 0%, transparent 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <svg viewBox="0 0 300 140" fill="none" className="absolute inset-0 w-full h-full p-4">
                      <rect x="25" y="15" width="160" height="14" rx="7" fill="rgba(55,138,221,0.12)" stroke="rgba(55,138,221,0.2)" strokeWidth="0.6" />
                      <rect x="25" y="38" width="120" height="9" rx="4.5" fill="rgba(55,138,221,0.08)" />
                      <rect x="25" y="54" width="140" height="9" rx="4.5" fill="rgba(55,138,221,0.06)" />
                      <rect x="25" y="70" width="95" height="9" rx="4.5" fill="rgba(55,138,221,0.05)" />
                      <rect x="25" y="90" width="130" height="9" rx="4.5" fill="rgba(55,138,221,0.04)" />
                      <circle cx="230" cy="45" r="28" stroke="rgba(55,138,221,0.25)" strokeWidth="2" fill="rgba(55,138,221,0.04)" />
                      <line x1="250" y1="66" x2="270" y2="86" stroke="rgba(55,138,221,0.3)" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M222 40 L228 46 L242 32" stroke="rgba(55,138,221,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <text x="230" y="85" textAnchor="middle" fill="rgba(55,138,221,0.4)" fontSize="8" fontFamily="monospace">SEO 95/100</text>
                    </svg>
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }}
                      >
                        Gr&aacute;tis
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(55,138,221,0.12)" }}
                      >
                        <Search className="w-4.5 h-4.5" style={{ color: "#378ADD" }} />
                      </div>
                      <h3 className="font-display font-bold text-white text-[15px]">Gerador de T&iacute;tulos SEO</h3>
                    </div>
                    <p className="text-[13px] text-white/50 leading-relaxed">
                      Crie t&iacute;tulos otimizados para rankear melhor nos marketplaces. Baseado em dados reais de buscas.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Simulador de Frete */}
              <ScrollReveal direction="up" index={2} delay={0.1}>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(22,22,44,0.96) 0%, rgba(16,16,34,0.95) 100%)",
                    border: "1px solid rgba(239,159,39,0.2)",
                  }}
                >
                  <div
                    style={{
                      height: 160,
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(180deg, rgba(239,159,39,0.08) 0%, transparent 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <svg viewBox="0 0 300 140" fill="none" className="absolute inset-0 w-full h-full p-4">
                      {/* Origin dot */}
                      <circle cx="40" cy="75" r="10" stroke="rgba(239,159,39,0.3)" strokeWidth="1" fill="rgba(239,159,39,0.06)" />
                      <circle cx="40" cy="75" r="4" fill="rgba(239,159,39,0.3)" />
                      {/* Destination dot */}
                      <circle cx="250" cy="40" r="10" stroke="rgba(239,159,39,0.3)" strokeWidth="1" fill="rgba(239,159,39,0.06)" />
                      <circle cx="250" cy="40" r="4" fill="#EF9F27" opacity="0.6" />
                      {/* Route path */}
                      <path d="M50 73 Q120 60 150 52 Q200 38 240 40" stroke="rgba(239,159,39,0.25)" strokeWidth="2" strokeDasharray="8 5" fill="none" />
                      {/* Waypoint */}
                      <circle cx="150" cy="52" r="5" fill="rgba(239,159,39,0.12)" stroke="rgba(239,159,39,0.25)" strokeWidth="0.8" />
                      {/* Cost comparison boxes */}
                      <rect x="70" y="95" width="70" height="22" rx="5" fill="rgba(239,159,39,0.06)" stroke="rgba(239,159,39,0.15)" strokeWidth="0.5" />
                      <text x="105" y="109" textAnchor="middle" fill="rgba(239,159,39,0.45)" fontSize="8" fontFamily="monospace">R$12,90</text>
                      <rect x="155" y="95" width="70" height="22" rx="5" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
                      <text x="190" y="109" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="8" fontFamily="monospace" fontWeight="bold">R$8,50</text>
                      <text x="150" y="132" textAnchor="middle" fill="rgba(239,159,39,0.35)" fontSize="7" fontFamily="monospace">-34% mais barato</text>
                    </svg>
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }}
                      >
                        Gr&aacute;tis
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(239,159,39,0.12)" }}
                      >
                        <Truck className="w-4.5 h-4.5" style={{ color: "#EF9F27" }} />
                      </div>
                      <h3 className="font-display font-bold text-white text-[15px]">Simulador de Frete</h3>
                    </div>
                    <p className="text-[13px] text-white/50 leading-relaxed">
                      Compare transportadoras e encontre a op&ccedil;&atilde;o mais barata. Reduza custos de envio autom&aacute;ticamente.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#0A0A0F" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-14">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Compare os planos em detalhe
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)" }}>
                Veja exatamente o que cada plano inclui.
              </p>
            </ScrollReveal>

            <div
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 100px 120px",
                  gap: 0,
                  backgroundColor: "#16162A",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  padding: "20px 32px",
                }}
              >
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  Recurso
                </div>
                {["Grátis", "Pro", "Premium"].map((plan) => (
                  <div
                    key={plan}
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: plan === "Pro" ? "#EF9F27" : "white",
                      textAlign: "center",
                    }}
                  >
                    {plan}
                  </div>
                ))}
              </div>

              {/* Table rows */}
              {tableFeatures.map((group, gIdx) => (
                <div key={group.category}>
                  {/* Category header */}
                  <div
                    style={{
                      padding: "12px 32px",
                      backgroundColor: "rgba(55,138,221,0.06)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#378ADD",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {group.category}
                  </div>
                  {/* Feature rows */}
                  {group.features.map((feature, fIdx) => {
                    const isEven = fIdx % 2 === 0;
                    return (
                      <div
                        key={feature.name}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 100px 100px 120px",
                          padding: "16px 32px",
                          backgroundColor: isEven ? "#16162A" : "#1A1A2E",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                          {feature.name}
                        </span>
                        {[feature.free, feature.pro, feature.premium].map((included, idx) => (
                          <div key={idx} style={{ textAlign: "center" }}>
                            {included ? (
                              <span style={{ color: "#10b981", fontSize: "18px", fontWeight: 700 }}>✓</span>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "16px" }}>—</span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#1A1A2E" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-14">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Perguntas frequentes
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)" }}>
                Tudo o que você precisa saber antes de assinar.
              </p>
            </ScrollReveal>

            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <PlanosClient faqs={faqs} />
            </div>
          </div>
        </section>

        {/* ── Guarantee ── */}
        <section style={{ padding: "80px 0", backgroundColor: "#0A0A0F" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  maxWidth: "640px",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "56px 48px",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, rgba(16,110,86,0.15) 0%, rgba(15,110,86,0.05) 100%)",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                {/* Shield icon */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(16,185,129,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg
                    style={{ width: "36px", height: "36px", color: "#10b981" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "12px",
                  }}
                >
                  Garantia de 7 dias
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.75,
                    marginBottom: "24px",
                  }}
                >
                  Experimente qualquer plano pago por 7 dias. Se não ficar satisfeito — por qualquer motivo — devolvemos 100% do valor sem perguntas.
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#10b981",
                    fontWeight: 600,
                  }}
                >
                  ✓ Garantia de 7 dias · ✓ Sem perguntas · ✓ Reembolso total
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
