import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import ToolsPreview from "@/components/sections/ToolsPreview";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import EbookCapture from "@/components/sections/EbookCapture";
import Link from "next/link";

// ─── Courses Data ─────────────────────────────────────────────────────────────

const courses = [
  {
    id: 1,
    title: "Do Zero ao Primeiro Pedido no Mercado Livre",
    instructor: "Rafael Mendes",
    duration: "8h",
    level: "Iniciante",
    rating: 4.9,
    reviews: 847,
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    levelColor: "#10b981",
    levelBg: "rgba(16,185,129,0.15)",
  },
  {
    id: 2,
    title: "Shopee: Dominando o Algoritmo",
    instructor: "Carla Vasconcelos",
    duration: "6h",
    level: "Intermediário",
    rating: 4.8,
    reviews: 512,
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    levelColor: "#fbbf24",
    levelBg: "rgba(251,191,36,0.15)",
  },
  {
    id: 3,
    title: "Precificação Estratégica para Lucrar Mais",
    instructor: "Lucas Ferreira",
    duration: "4h",
    level: "Intermediário",
    rating: 4.7,
    reviews: 393,
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    levelColor: "#fbbf24",
    levelBg: "rgba(251,191,36,0.15)",
  },
  {
    id: 4,
    title: "Amazon FBA Brasil: Guia Completo",
    instructor: "Amanda Costa",
    duration: "12h",
    level: "Avançado",
    rating: 4.9,
    reviews: 261,
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
    levelColor: "#f87171",
    levelBg: "rgba(248,113,113,0.15)",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-3.5 h-3.5"
          fill={star <= Math.round(rating) ? "#EF9F27" : "rgba(255,255,255,0.15)"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function CoursesPreview() {
  return (
    <section style={{ backgroundColor: "#0A0A0F", padding: "96px 0" }}>
      <div className="container-orbit">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-400 mb-3">
            Cursos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Aprenda com quem{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              vende de verdade
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            Conteúdo prático, atualizado e criado por sellers com histórico comprovado.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: "#16162A",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              className="group hover:border-white/20 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <div
                style={{
                  background: course.gradient,
                  height: "160px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    color: course.levelColor,
                    backgroundColor: course.levelBg,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {course.level}
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "999px",
                    padding: "4px 8px",
                  }}
                >
                  <svg
                    style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.6)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{course.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "white",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {course.title}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
                  {course.instructor}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <StarRating rating={course.rating} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#EF9F27" }}>
                    {course.rating}
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                    ({course.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <div className="text-center">
          <Link
            href="/cursos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#378ADD",
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            Ver todos os cursos →
          </Link>
        </div>
      </div>
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
        <HowItWorks />
        <ToolsPreview />
        <CoursesPreview />
        <Testimonials />
        <Pricing />
        <EbookCapture />
      </main>
      <Footer />
    </>
  );
}
