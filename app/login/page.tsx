import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta no Orbit Commerce.",
};

const testimonialChips = [
  { text: '"Dobrei minhas vendas em 3 meses"', name: "R. Mendes" },
  { text: '"Melhor investimento para meu negócio"', name: "C. Vasconcelos" },
  { text: '"As ferramentas são incríveis"', name: "L. Ferreira" },
];

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Left panel (branding) ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "50%",
          background: "linear-gradient(160deg, #042C53 0%, #0C447C 40%, #1A1A2E 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        >
          <OrbitalAnimation size={560} opacity={1} />
        </div>

        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,159,39,0.1) 0%, transparent 70%)",
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
            orbit<span style={{ color: "#378ADD" }}>commerce</span>
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
              backgroundColor: "rgba(239,159,39,0.12)",
              border: "1px solid rgba(239,159,39,0.3)",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#EF9F27", fontWeight: 600 }}>
              +2.500 sellers confiam no Orbit
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
            Seu ecossistema de ecommerce espera por você
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "340px",
            }}
          >
            Cursos, ferramentas, comunidade e mentoria — tudo num só lugar para você vender mais.
          </p>
        </div>

        {/* Testimonial chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 1 }}>
          {testimonialChips.map((chip) => (
            <div
              key={chip.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "white",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {chip.name[0]}
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>
                  {chip.text}
                </p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                  — {chip.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          backgroundColor: "white",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
