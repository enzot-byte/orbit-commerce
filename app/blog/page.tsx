import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StarField from "@/components/shared/StarField";
import BlogSlider from "@/components/sections/BlogSlider";
import BlogClient from "./BlogClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Estratégias, dicas e análises para sellers de alto nível. Conteúdo gratuito criado por quem realmente vende nos marketplaces brasileiros.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero with Star Field ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #042C53 0%, #0d1b3a 40%, #0A0A0F 100%)",
            padding: "160px 0 80px",
            textAlign: "center",
          }}
        >
          {/* Star field canvas */}
          <StarField />

          {/* Subtle center vignette for text readability */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 40% 45% at 50% 45%, rgba(4,44,83,0.45) 0%, transparent 100%)",
            }}
          />

          <div className="container-orbit" style={{ position: "relative", zIndex: 2 }}>
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
              Blog
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
              Estratégias e dicas para sellers{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                de alto nível
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Conteúdo gratuito, sem enrolação. Publicado por sellers que vivem o dia a dia dos marketplaces brasileiros.
            </p>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0A0A0F)",
              zIndex: 3,
            }}
          />
        </section>

        {/* ── Featured — Swiper news carousel ── */}
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="mb-4">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Artigos em destaque
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                Deslize para explorar os conteúdos mais recentes.
              </p>
            </ScrollReveal>
          </div>
          <BlogSlider />
        </section>

        {/* ── Article grid with filter ── */}
        <section style={{ padding: "60px 0" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="mb-8">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Todos os artigos
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                Filtre por categoria para encontrar o que precisa.
              </p>
            </ScrollReveal>
            <BlogClient />
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section style={{ padding: "40px 0 96px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #1A1A2E 0%, #042C53 100%)",
                  border: "1px solid rgba(55,138,221,0.2)",
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
                    right: "-60px",
                    top: "-60px",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(55,138,221,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>📩</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "8px",
                    }}
                  >
                    Receba as melhores dicas toda semana
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "380px", lineHeight: 1.7 }}>
                    Newsletter gratuita com estratégias exclusivas, análises de mercado e oportunidades para sellers brasileiros.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0", minWidth: "340px", maxWidth: "440px", flex: 1 }}>
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    style={{
                      flex: 1,
                      padding: "14px 18px",
                      borderRadius: "12px 0 0 12px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRight: "none",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "white",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <button
                    style={{
                      padding: "14px 24px",
                      borderRadius: "0 12px 12px 0",
                      border: "none",
                      background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                      color: "#0A0A0F",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Inscrever-se →
                  </button>
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
