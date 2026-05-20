import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./SignupForm";
import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie sua conta grátis no Sellerverse e comece a vender mais hoje mesmo.",
};

const benefits = [
  { icon: "🧮", text: "Calculadora multiplataforma (Shopee, ML, Amazon, Magalu)" },
  { icon: "💬", text: "Comunidade gratuita no WhatsApp" },
  { icon: "🗺️", text: "Acesso ao roadmap de cursos e ferramentas que tá chegando" },
  { icon: "📩", text: "Newsletter quando tiver conteúdo novo" },
];

export default function CadastroPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Right panel form ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          backgroundColor: "white",
          order: 1,
        }}
        className="lg:order-1"
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
          <SignupForm />
        </div>
      </div>

      {/* ── Left panel (branding) ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "50%",
          background: "linear-gradient(160deg, #1a0533 0%, #0C447C 50%, #1A1A2E 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
          order: 2,
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-40%, -55%)",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <OrbitalAnimation size={580} opacity={1} />
        </div>

        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,159,39,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              backgroundColor: "#185FA5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>⭕</span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            Seller<span style={{ color: "#5B3FD8" }}>verse</span>
          </span>
        </Link>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#10b981", fontWeight: 600 }}>
              ✓ Grátis para sempre — sem cartão de crédito
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              marginBottom: "20px",
              maxWidth: "380px",
            }}
          >
            Tudo o que você precisa para crescer no ecommerce
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "340px",
              marginBottom: "32px",
            }}
          >
            Crie sua conta gratuita e acesse imediatamente recursos exclusivos para sellers brasileiros.
          </p>

          {/* Benefits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Honest founder card — substituiu o bloco de "social proof" com
            depoimentos e contagem inventados. Quando tivermos pagantes
            reais com permissão, reintroduzir testimonial verdadeiro aqui. */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: "white", marginBottom: "6px" }}>
            Construído por seller, pra sellers
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Sellerverse é o ecossistema que nasceu dentro da operação real da Nexus Importadora.
            As ferramentas e cursos que você vê aqui são os mesmos que a gente usa todo dia.
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
            — Enzo, fundador
          </p>
        </div>
      </div>
    </div>
  );
}
