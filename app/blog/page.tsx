import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import BlogClient from "./BlogClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Estratégias, dicas e análises para sellers de alto nível. Conteúdo gratuito criado por quem realmente vende nos marketplaces brasileiros.",
};

// ─── Featured article ─────────────────────────────────────────────────────────

const featured = {
  title: "O guia definitivo para escalar vendas no Mercado Livre em 2025",
  excerpt:
    "Desde a escolha do produto até a otimização de campanhas — um roadmap completo baseado em dados reais de sellers que faturam mais de R$100k/mês.",
  category: "Mercado Livre",
  date: "07 abr 2025",
  readTime: "18 min",
  author: "Rafael Mendes",
  authorRole: "Co-fundador, ex-seller ML",
  gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 50%, #378ADD 100%)",
  emoji: "📈",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
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
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(24,95,165,0.1) 0%, transparent 65%)",
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
        </section>

        {/* ── Featured article ── */}
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                {/* Visual */}
                <div
                  style={{
                    background: featured.gradient,
                    minHeight: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "96px",
                    position: "relative",
                  }}
                >
                  {featured.emoji}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(0,0,0,0.3)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#EF9F27",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>
                      Artigo em destaque
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    backgroundColor: "#16162A",
                    padding: "48px 40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#60a5fa",
                      backgroundColor: "rgba(96,165,250,0.12)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      marginBottom: "16px",
                      width: "fit-content",
                    }}
                  >
                    {featured.category}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1.25,
                      marginBottom: "16px",
                    }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.75,
                      marginBottom: "28px",
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "28px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {featured.author.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>
                        {featured.author}
                      </p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                        {featured.authorRole}
                      </p>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                        {featured.date}
                      </p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                        {featured.readTime} de leitura
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "14px",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    Ler o artigo completo →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
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
