import type { Metadata } from "next";
import Link from "next/link";
import RecuperarSenhaForm from "./RecuperarSenhaForm";
import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

export const metadata: Metadata = {
  title: "Recuperar Senha",
  description: "Redefina sua senha no Sellerverse.",
};

export default function RecuperarSenhaPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Left panel */}
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
            Seller<span style={{ color: "#5B3FD8" }}>verse</span>
          </span>
        </Link>

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
              Sua conta está segura com a gente
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
            Sem problema, acontece com todo mundo
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "340px",
            }}
          >
            Em menos de 1 minuto você cria uma nova senha e volta a acessar tudo que preparamos pra você.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Sellerverse. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right panel */}
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
          <RecuperarSenhaForm />
        </div>
      </div>
    </div>
  );
}
