import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: "#0A0A0F",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Decorative background glow */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(24,95,165,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Orbital animation decoration */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <OrbitalAnimation size={500} opacity={0.15} />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* 404 number */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(7rem, 20vw, 12rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                background: "linear-gradient(135deg, #185FA5 0%, #378ADD 40%, #B5D4F4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "8px",
                userSelect: "none",
              }}
            >
              404
            </p>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Página não encontrada
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.75,
                maxWidth: "400px",
                margin: "0 auto 40px",
              }}
            >
              A página que você está procurando não existe, foi movida ou você digitou o endereço incorretamente.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm font-body transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #185FA5, #378ADD)",
                  boxShadow: "0 4px 24px rgba(24,95,165,0.3)",
                }}
              >
                <Home className="w-4 h-4" />
                Voltar ao início
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm font-body transition-all"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Ver o blog
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-10">
              <p className="text-xs text-white/25 font-body mb-3 uppercase tracking-widest">
                Ou acesse diretamente
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {[
                  { label: "Planos", href: "/planos" },
                  { label: "Ferramentas", href: "/ferramentas" },
                  { label: "Cursos", href: "/cursos" },
                  { label: "Blog", href: "/blog" },
                  { label: "Sobre", href: "/sobre" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-orbit-400 hover:text-orbit-200 font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
