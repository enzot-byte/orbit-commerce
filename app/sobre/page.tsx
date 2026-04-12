import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a missão, história e o time por trás do Sellerverse — o ecossistema criado por sellers, para sellers.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: 2500, suffix: "+", label: "Sellers ativos", prefix: "" },
  { value: 50, suffix: "M+", label: "Em vendas geradas", prefix: "R$" },
  { value: 95, suffix: "%", label: "Taxa de satisfação", prefix: "" },
  { value: 5, suffix: "+", label: "Marketplaces cobertos", prefix: "" },
];

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Missão",
    description:
      "Democratizar o acesso a conhecimento, ferramentas e comunidade de qualidade para que qualquer seller brasileiro possa escalar seu negócio — independente do tamanho ou do capital inicial.",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.08)",
    border: "rgba(239,159,39,0.25)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Visão",
    description:
      "Ser o ecossistema de referência para sellers brasileiros, reconhecido pela qualidade do conteúdo, pela força da comunidade e pelos resultados reais que entrega para quem faz parte.",
    color: "#378ADD",
    bg: "rgba(55,138,221,0.08)",
    border: "rgba(55,138,221,0.25)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Valores",
    description:
      "Transparência acima de tudo. Resultados antes de promessas. Comunidade como produto. Inovação constante. E o compromisso de crescer junto com nossos membros — não à custa deles.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
  },
];

const team = [
  {
    name: "Rafael Mendes",
    role: "Co-fundador & CEO",
    bio: "Ex-seller do Mercado Livre com mais de R$5M em vendas. Criou o Sellerverse após perceber a falta de suporte de qualidade para pequenos e médios sellers.",
    gradient: "linear-gradient(135deg, #0C447C 0%, #378ADD 100%)",
    initials: "RM",
  },
  {
    name: "Carla Vasconcelos",
    role: "Co-fundadora & Head de Conteúdo",
    bio: "Especialista em marketplaces com passagem pela Shopee Brasil. Responsável pela curadoria de todos os cursos e pela qualidade do conteúdo da plataforma.",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #EF9F27 100%)",
    initials: "CV",
  },
  {
    name: "Lucas Ferreira",
    role: "CTO",
    bio: "Engenheiro de software com 10 anos de experiência em SaaS. Construiu toda a infraestrutura do Sellerverse do zero com foco em performance e escalabilidade.",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    initials: "LF",
  },
  {
    name: "Juliana Costa",
    role: "Head de Comunidade",
    bio: "Formada em Marketing Digital com foco em growth. Gerencia a comunidade de +2.500 sellers e lidera as iniciativas de engajamento e retenção de membros.",
    gradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    initials: "JC",
  },
  {
    name: "Bruno Almeida",
    role: "Head de Produto",
    bio: "Product Manager com 8 anos de experiência em startups B2B. Responsável pelo roadmap de ferramentas e pela experiência do usuário na plataforma.",
    gradient: "linear-gradient(135deg, #9f1239 0%, #f43f5e 100%)",
    initials: "BA",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero ── */}
        <section
          style={{
            background: "linear-gradient(160deg, #0C447C 0%, #1A1A2E 50%, #0A0A0F 100%)",
            padding: "160px 0 96px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-120px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(239,159,39,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="container-orbit text-center" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                Fundada em 2023 · São Paulo, Brasil
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
              Nossa missão é democratizar o{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                sucesso no e-commerce
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.55)",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Nascemos da frustração de quem já foi seller e sentiu falta de suporte real. Hoje somos o ecossistema que gostaríamos de ter encontrado no começo.
            </p>
          </div>
        </section>

        {/* ── Story ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#0A0A0F" }}>
          <div className="container-orbit">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "64px",
                alignItems: "center",
              }}
            >
              {/* Visual */}
              <ScrollReveal direction="left">
                <div
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "4/3",
                    background: "linear-gradient(135deg, #0C447C 0%, #1A1A2E 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Decorative grid lines */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "96px",
                        height: "96px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "40px",
                      }}
                    >
                      🚀
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 500,
                        textAlign: "center",
                        maxWidth: "200px",
                      }}
                    >
                      Sellerverse HQ<br />São Paulo · 2023
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Text */}
              <ScrollReveal direction="right">
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#378ADD",
                      marginBottom: "16px",
                    }}
                  >
                    Nossa história
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1.2,
                      marginBottom: "24px",
                    }}
                  >
                    Começou numa planilha.<br />Virou um ecossistema.
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      "Em 2021, Rafael Mendes vendia no Mercado Livre e não encontrava recursos sérios para sellers brasileiros. Os cursos eram genéricos, as ferramentas caríssimas ou em inglês, e a comunidade, dispersa.",
                      "Junto com Carla, criou um grupo no WhatsApp que explodiu para 800 pessoas em 3 meses. Ficou claro que a demanda era real — e que o mercado estava desatendido.",
                      "Em 2023, com Lucas como CTO, nasceu o Sellerverse. Uma plataforma construída por quem já vendeu, para quem quer vender mais e melhor.",
                    ].map((paragraph, i) => (
                      <p key={i} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Mission / Vision / Values ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#1A1A2E" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-14">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                O que nos move
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto" }}>
                Princípios que guiam cada decisão que tomamos.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((item, i) => (
                <ScrollReveal key={item.title} direction="up" index={i} delay={0.1}>
                  <div
                    style={{
                      backgroundColor: "#16162A",
                      borderRadius: "20px",
                      border: `1px solid ${item.border}`,
                      padding: "40px 32px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        backgroundColor: item.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        marginBottom: "24px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "12px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#0A0A0F" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-14">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Sellerverse em números
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} direction="up" index={i} delay={0.1}>
                  <div className="text-center">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #378ADD 0%, #B5D4F4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1,
                        marginBottom: "12px",
                      }}
                    >
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2200}
                      />
                    </div>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#1A1A2E" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up" className="text-center mb-14">
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#378ADD",
                  marginBottom: "12px",
                }}
              >
                Time
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Quem está por trás do Sellerverse
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto" }}>
                Um time pequeno, experiente e completamente focado nos resultados dos nossos membros.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <ScrollReveal key={member.name} direction="up" index={i} delay={0.1}>
                  <div
                    style={{
                      backgroundColor: "#16162A",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "40px 32px",
                      textAlign: "center",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: "88px",
                        height: "88px",
                        borderRadius: "50%",
                        background: member.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        fontSize: "28px",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "white",
                        border: "3px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {member.initials}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "6px",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#378ADD",
                        marginBottom: "16px",
                      }}
                    >
                      {member.role}
                    </p>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                      {member.bio}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            padding: "96px 0",
            background: "linear-gradient(135deg, #0C447C 0%, #1A1A2E 100%)",
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
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(55,138,221,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="container-orbit" style={{ position: "relative", zIndex: 1 }}>
            <ScrollReveal direction="up">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Faça parte da comunidade
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "520px",
                  margin: "0 auto 40px",
                  lineHeight: 1.7,
                }}
              >
                Junte-se a +2.500 sellers que estão construindo negócios mais lucrativos com o Sellerverse.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="/cadastro"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 32px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                    color: "#0A0A0F",
                    fontWeight: 700,
                    fontSize: "16px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Criar conta grátis →
                </a>
                <a
                  href="/planos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 32px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  Ver planos
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
