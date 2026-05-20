import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Link from "next/link";
import { HomeBelowFold } from "@/components/sections/HomeBelowFold";

// ─── Roadmap preview ─────────────────────────────────────────────────────────
//
// Substitui o bloco "Cursos" que mostrava 4 cursos inventados com instrutores
// fictícios e ratings de 800+ reviews fakes. Em vez disso, mostramos a fase
// real do produto: 2 cursos em produção + 2 no roadmap, sem inventar autor
// nem inflar números.

const roadmapItems = [
  {
    id: 1,
    title: "Precificação que sobra",
    tagline: "Margem real em 5 marketplaces",
    status: "Em produção",
    statusColor: "#EF9F27",
    statusBg: "rgba(239,159,39,0.12)",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    emoji: "💹",
  },
  {
    id: 2,
    title: "Sellerspy do zero",
    tagline: "Ache fornecedor ganhador no ML em 15min",
    status: "Em produção",
    statusColor: "#EF9F27",
    statusBg: "rgba(239,159,39,0.12)",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    emoji: "🔍",
  },
  {
    id: 3,
    title: "Anatomia de anúncio campeão",
    tagline: "UX e SEO de listing pra ML, Shopee, Amazon",
    status: "No roadmap",
    statusColor: "#a78bfa",
    statusBg: "rgba(167,139,250,0.12)",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    emoji: "🎯",
  },
  {
    id: 4,
    title: "DRE pra seller",
    tagline: "Saiba se você tá lucrando de verdade",
    status: "Sob demanda",
    statusColor: "#a78bfa",
    statusBg: "rgba(167,139,250,0.12)",
    gradient: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
    emoji: "📊",
  },
];

function CoursesPreview() {
  return (
    <section className="relative overflow-hidden ambient-light cv-section contain-section" style={{ backgroundColor: "#0A0A0F", padding: "128px 0 160px" }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(239,159,39,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-orbit relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-400 mb-3">
            Cursos · Em construção
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Honestidade radical sobre{" "}
            <span className="shimmer-text-static">o que tá no ar</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-2xl mx-auto">
            Estamos gravando os 2 primeiros cursos agora. Quando publicar, qualquer Pro tem acesso
            imediato. Sem instrutor inventado, sem rating inflado — só o que existe e o que tá vindo.
          </p>
        </div>

        {/* Roadmap grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {roadmapItems.map((item) => (
            <div
              key={item.id}
              style={{ borderRadius: "16px", overflow: "hidden" }}
              className="group glass-card gradient-border hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                style={{
                  background: item.gradient,
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  position: "relative",
                }}
              >
                {item.emoji}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    color: item.statusColor,
                    backgroundColor: item.statusBg,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "white",
                    fontSize: "14px",
                    lineHeight: 1.35,
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
            style={{ color: "#9B7BFF" }}
          >
            Ver roadmap completo
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #12121F)" }}
      />
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HomeBelowFold coursesPreview={<CoursesPreview />} />
      </main>
      <Footer />
    </>
  );
}
