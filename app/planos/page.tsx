import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PlanosClient from "./PlanosClient";
import {
  Users,
  Wrench,
  BookOpen,
  Headphones,
  Award,
  BarChart2,
} from "lucide-react";

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

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ padding: "160px 0 60px" }}
        >
          {/* ── Background layers ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #042C53 0%, #0C447C 20%, #1A1A2E 55%, #0A0A0F 100%)",
            }}
          />

          {/* Warm gold glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "8%",
              right: "8%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239,159,39,0.08) 0%, transparent 65%)",
            }}
          />
          {/* Cool blue glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "25%",
              left: "10%",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(24,95,165,0.10) 0%, transparent 65%)",
            }}
          />
          {/* Center purple spotlight */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 550,
              height: 550,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(91,63,216,0.07) 0%, transparent 60%)",
            }}
          />

          {/* 3D Perspective grid floor */}
          <div className="ft-grid-floor" />

          {/* 3D Orbital rings (desktop) */}
          <div
            className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none overflow-hidden"
            style={{ perspective: "1000px", perspectiveOrigin: "50% 45%" }}
          >
            <div className="pl-ring pl-ring-1">
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "rgba(155,123,255,0.45)",
                  boxShadow: "0 0 10px rgba(155,123,255,0.3)",
                }}
              />
            </div>
            <div className="pl-ring pl-ring-2">
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "rgba(239,159,39,0.35)",
                  boxShadow: "0 0 8px rgba(239,159,39,0.25)",
                }}
              />
            </div>
          </div>

          {/* ── Floating feature pills & pricing badges (desktop) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
            {/* Plan feature pills */}
            <div
              className="ft-pill"
              style={{
                top: "14%",
                left: "6%",
                animation: "ft-fa 8s ease-in-out infinite",
              }}
            >
              <Users className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Comunidade</span>
            </div>
            <div
              className="ft-pill"
              style={{
                top: "10%",
                right: "7%",
                animation: "ft-fb 10s ease-in-out infinite",
              }}
            >
              <Wrench className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>15+ Ferramentas</span>
            </div>
            <div
              className="ft-pill"
              style={{
                top: "42%",
                left: "3%",
                animation: "ft-fc 9s ease-in-out infinite",
              }}
            >
              <BookOpen className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Cursos ilimitados</span>
            </div>
            <div
              className="ft-pill"
              style={{
                top: "44%",
                right: "4%",
                animation: "ft-fd 7s ease-in-out infinite",
              }}
            >
              <Award className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>Mentoria 1:1</span>
            </div>
            <div
              className="ft-pill"
              style={{
                bottom: "28%",
                left: "8%",
                animation: "ft-fe 8.5s ease-in-out infinite",
              }}
            >
              <BarChart2 className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Dashboard Pro</span>
            </div>
            <div
              className="ft-pill"
              style={{
                bottom: "22%",
                right: "6%",
                animation: "ft-ff 9.5s ease-in-out infinite",
              }}
            >
              <Headphones className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>Suporte priorit&aacute;rio</span>
            </div>

            {/* Pricing highlight badges */}
            <div
              className="ft-metric"
              style={{
                top: "24%",
                right: "19%",
                animation: "ft-fb 11s ease-in-out infinite",
                background: "rgba(239,159,39,0.10)",
                border: "1px solid rgba(239,159,39,0.18)",
                color: "#EF9F27",
              }}
            >
              a partir de R$ 97/m&ecirc;s
            </div>
            <div
              className="ft-metric"
              style={{
                top: "56%",
                left: "7%",
                animation: "ft-fd 9s ease-in-out infinite",
                background: "rgba(16,185,129,0.10)",
                border: "1px solid rgba(16,185,129,0.18)",
                color: "#34d399",
              }}
            >
              Economize 20% anual
            </div>
            <div
              className="ft-metric"
              style={{
                bottom: "32%",
                right: "5%",
                animation: "ft-fa 10s ease-in-out infinite",
                background: "rgba(155,123,255,0.10)",
                border: "1px solid rgba(155,123,255,0.18)",
                color: "#C4B5FD",
              }}
            >
              7 dias de garantia
            </div>
          </div>

          {/* ── Content ── */}
          <div className="container-orbit relative z-10 text-center">
            <p
              className="text-xs font-bold tracking-[0.12em] uppercase mb-5"
              style={{ color: "#378ADD" }}
            >
              Planos e Pre&ccedil;os
            </p>
            <h1
              className="font-display font-extrabold text-white leading-[1.1] max-w-3xl mx-auto mb-5"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Escolha o plano ideal para o{" "}
              <span
                className="shimmer-text"
                style={{
                  WebkitTextFillColor: "unset",
                  background:
                    "linear-gradient(90deg, #EF9F27 0%, #FAC775 25%, #EF9F27 50%, #FAC775 75%, #EF9F27 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                seu neg&oacute;cio
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Comece gr&aacute;tis. Fa&ccedil;a upgrade quando seu neg&oacute;cio
              pedir mais.
            </p>
          </div>

          {/* Bottom fade → Pricing section bg */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #1A1A2E)",
            }}
          />
        </section>

        {/* ── Pricing Component ── */}
        <Pricing />

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
