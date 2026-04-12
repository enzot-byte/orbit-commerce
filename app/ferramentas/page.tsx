import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
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
          style={{
            background: "linear-gradient(160deg, #042C53 0%, #1A1A2E 55%, #0A0A0F 100%)",
            padding: "160px 0 80px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(24,95,165,0.1) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(239,159,39,0.06) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div className="container-orbit" style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#378ADD",
                marginBottom: "20px",
              }}
            >
              Ferramentas
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                maxWidth: "760px",
                margin: "0 auto 20px",
                letterSpacing: "-0.02em",
              }}
            >
              Ferramentas para otimizar{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cada etapa do seu negócio
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "540px",
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              15+ ferramentas desenvolvidas especialmente para sellers brasileiros. Algumas grátis para sempre, outras disponíveis nos planos Pro e Premium.
            </p>

            {/* Quick stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Ferramentas disponíveis", value: "15+" },
                { label: "Sempre grátis", value: "4" },
                { label: "Usuários ativos", value: "2.5k+" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "white",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
