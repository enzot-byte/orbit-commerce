"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to monitoring
    console.error("Sellerverse — page error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(226,75,74,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "rgba(226,75,74,0.12)",
            border: "1px solid rgba(226,75,74,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <AlertTriangle style={{ width: "32px", height: "32px", color: "#E24B4A" }} />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          Algo deu errado
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.75,
            marginBottom: "8px",
          }}
        >
          Ocorreu um erro inesperado nesta página. Tente novamente ou volte ao início.
        </p>

        {/* Error digest */}
        {error.digest && (
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "var(--font-body)",
              marginBottom: "32px",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ID: {error.digest}
          </p>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            marginTop: "32px",
          }}
        >
          {/* Retry */}
          <button
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #185FA5, #378ADD)",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              transition: "opacity 0.2s",
              boxShadow: "0 4px 24px rgba(24,95,165,0.3)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <RefreshCw style={{ width: "16px", height: "16px" }} />
            Tentar novamente
          </button>

          {/* Home link */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
          >
            <Home style={{ width: "16px", height: "16px" }} />
            Voltar ao início
          </Link>
        </div>

        {/* Support hint */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Se o problema persistir, entre em contato:{" "}
          <a
            href="mailto:suporte@sellerverse.com.br"
            style={{ color: "#378ADD", textDecoration: "none" }}
          >
            suporte@sellerverse.com.br
          </a>
        </p>
      </div>
    </div>
  );
}
