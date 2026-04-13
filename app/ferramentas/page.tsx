import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FloatingLinesBg from "@/components/shared/FloatingLinesBg";
import ToolsClient from "./ToolsClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ferramentas",
  description:
    "Ferramentas práticas para otimizar cada etapa do seu negócio como seller. Calculadoras, geradores, simuladores e muito mais.",
};

export default function FerramentasPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "#0A0A0F", padding: "160px 0 96px" }}
        >
          {/* FloatingLines WebGL background — blue engineering accent */}
          <FloatingLinesBg
            className="opacity-55"
            linesGradient={["#185FA5", "#378ADD", "#5B3FD8", "#9B7BFF"]}
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={10}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive
            parallax
            parallaxStrength={0.2}
            animationSpeed={0.8}
            mixBlendMode="screen"
          />

          {/* Dim overlay for text readability */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(10,10,15,0.6) 100%)",
            }}
          />

          {/* ── Content ── */}
          <div
            className="container-orbit text-center"
            style={{ position: "relative", zIndex: 10 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 500,
                }}
              >
                Ferramentas para Sellers
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                maxWidth: "820px",
                margin: "0 auto 24px",
                letterSpacing: "-0.02em",
              }}
            >
              Ferramentas para otimizar{" "}
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
                cada etapa do seu neg&oacute;cio
              </span>
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "560px",
                margin: "0 auto 48px",
                lineHeight: 1.7,
              }}
            >
              15+ ferramentas desenvolvidas especialmente para sellers
              brasileiros. Algumas gr&aacute;tis para sempre, outras
              dispon&iacute;veis nos planos Pro e Premium.
            </p>

            {/* Quick stats */}
            <div className="flex justify-center gap-10 flex-wrap">
              {[
                { label: "Ferramentas dispon\u00edveis", value: "15+" },
                { label: "Sempre gr\u00e1tis", value: "4" },
                { label: "Usu\u00e1rios ativos", value: "2.5k+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display font-extrabold text-white leading-none"
                    style={{ fontSize: "2rem" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0A0A0F)",
            }}
          />
        </section>

        {/* ── Tools section ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-orbit">
            <ToolsClient />
          </div>
        </section>

        {/* ── Upgrade CTA Banner ── */}
        <section style={{ padding: "0 0 96px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #0C447C 0%, #185FA5 50%, #1A1A2E 100%)",
                  border: "1px solid rgba(55,138,221,0.3)",
                  padding: "56px 48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "-80px",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(239,159,39,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ maxWidth: "500px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(239,159,39,0.15)",
                      border: "1px solid rgba(239,159,39,0.3)",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#EF9F27" }}>
                      🔒 Ferramentas Pro e Premium bloqueadas
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "12px",
                      lineHeight: 1.25,
                    }}
                  >
                    Faça upgrade para desbloquear todas as ferramentas
                  </h2>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Acesse mais de 15 ferramentas avançadas por apenas R$97/mês. Garantia de 7 dias.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href="/planos"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                      color: "#0A0A0F",
                      fontWeight: 700,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Ver planos →
                  </Link>
                  <Link
                    href="/cadastro"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Criar conta grátis
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
