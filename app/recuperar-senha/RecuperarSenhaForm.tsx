"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RecuperarSenhaForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setError("Serviço não configurado. Tente novamente mais tarde.");
      setIsLoading(false);
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recuperar-senha/nova-senha`,
    });

    if (resetError) {
      setError(resetError.message);
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.12)",
    backgroundColor: "#F9FAFB",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "12px",
          }}
        >
          E-mail enviado!
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, marginBottom: "32px" }}>
          Enviamos um link de recuperação para <strong style={{ color: "#374151" }}>{email}</strong>.
          Verifique sua caixa de entrada e a pasta de spam.
        </p>
        <Link
          href="/login"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
            color: "white",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Voltar ao login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      {/* Logo on mobile */}
      <div className="lg:hidden mb-8 flex items-center justify-center">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#185FA5",
          }}
        >
          Seller<span style={{ color: "#5B3FD8" }}>verse</span>
        </span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "#6B7280",
            fontWeight: 500,
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao login
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Recuperar senha
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6 }}>
          Digite seu e-mail e enviaremos um link para você criar uma nova senha.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            marginBottom: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "rgba(220,38,38,0.08)",
            border: "1px solid rgba(220,38,38,0.25)",
            color: "#991B1B",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "6px",
            }}
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            required
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#185FA5";
              e.target.style.boxShadow = "0 0 0 3px rgba(24,95,165,0.12)";
              e.target.style.backgroundColor = "white";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(0,0,0,0.12)";
              e.target.style.boxShadow = "none";
              e.target.style.backgroundColor = "#F9FAFB";
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: isLoading
              ? "rgba(24,95,165,0.7)"
              : "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
            color: "white",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.2s",
          }}
        >
          {isLoading ? (
            <>
              <svg
                style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }}
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </>
          ) : (
            "Enviar link de recuperação →"
          )}
        </motion.button>
      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
