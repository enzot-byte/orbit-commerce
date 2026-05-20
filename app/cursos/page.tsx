import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CursosHero from "@/components/sections/CursosHero";
import CoursesClient from "./CoursesClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Cursos práticos e atualizados para sellers brasileiros. Aprenda com quem realmente vende no Mercado Livre, Shopee, Amazon e muito mais.",
};

export default function CursosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a0533 0%, #1A1A2E 55%, #0A0A0F 100%)",
            padding: "160px 0 80px",
            textAlign: "center",
          }}
        >
          {/* Course Builder animated background */}
          <CursosHero />

          {/* Subtle center vignette — keeps text readable without dimming side panels */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 45% 50% at 50% 45%, rgba(26,5,51,0.4) 0%, transparent 100%)",
            }}
          />
          {/* Stronger vignette on mobile where animation is closer to text */}
          <div
            className="absolute inset-0 pointer-events-none z-[1] md:hidden"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(26,5,51,0.55) 0%, transparent 100%)",
            }}
          />

          <div className="container-orbit" style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#a78bfa",
                marginBottom: "20px",
              }}
            >
              Cursos
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
              Aprenda as estratégias que{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                realmente geram resultados
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
              Conteúdo criado por sellers com histórico comprovado. Sem teoria vaga — só o que funciona de verdade nos marketplaces brasileiros.
            </p>

            {/* Honest status — stats reais são "0 publicados, 2 gravando".
                Em vez de números inflados, contamos a fase do projeto. */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "999px",
                backgroundColor: "rgba(167,139,250,0.10)",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#a78bfa" }} />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                Cursos em produção · acesso garantido aos assinantes Pro conforme forem ao ar
              </span>
            </div>
          </div>
        </section>

        {/* ── Courses section ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-orbit">
            <CoursesClient />
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ padding: "0 0 96px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #4c1d95 0%, #1A1A2E 100%)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  padding: "64px 48px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎓</div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    Assine o Pro e tenha acesso a todos os cursos
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.5)",
                      maxWidth: "480px",
                      margin: "0 auto 36px",
                      lineHeight: 1.7,
                    }}
                  >
                    Por apenas R$97/mês você acessa todos os cursos, ferramentas Pro e o grupo exclusivo de mentoria. Garantia de 7 dias.
                  </p>
                  <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link
                      href="/planos"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                        color: "#0A0A0F",
                        fontWeight: 700,
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      Assinar o Pro — R$97/mês →
                    </Link>
                    <Link
                      href="/cadastro"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      Começar grátis
                    </Link>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "16px" }}>
                    ✓ Garantia de 7 dias · ✓ Cancele quando quiser
                  </p>
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
