"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const marketplaces = [
  "Mercado Livre",
  "Shopee",
  "Amazon",
  "Magazine Luiza",
  "Loja Própria",
  "Outro",
];

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    marketplace: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.12)",
    backgroundColor: "#F9FAFB",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#185FA5";
    e.target.style.boxShadow = "0 0 0 3px rgba(24,95,165,0.12)";
    e.target.style.backgroundColor = "white";
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(0,0,0,0.12)";
    e.target.style.boxShadow = "none";
    e.target.style.backgroundColor = "#F9FAFB";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      {/* Logo on mobile */}
      <div className="lg:hidden mb-8 flex items-center justify-center">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#185FA5" }}>
          orbit<span style={{ color: "#111827" }}>commerce</span>
        </span>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
          Crie sua conta grátis
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Comece em 30 segundos. Sem cartão de crédito.
        </p>
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,0.12)",
          backgroundColor: "white",
          fontSize: "14px",
          fontWeight: 600,
          color: "#374151",
          cursor: "pointer",
          marginBottom: "20px",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
      >
        <GoogleIcon />
        Cadastrar com Google
      </button>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
        <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 500 }}>ou preencha os dados</span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Name */}
        <div>
          <label htmlFor="name" style={labelStyle}>Nome completo</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Seu nome completo"
            required
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>E-mail</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="voce@exemplo.com"
            required
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        {/* Marketplace */}
        <div>
          <label htmlFor="marketplace" style={labelStyle}>Marketplace principal</label>
          <select
            id="marketplace"
            value={form.marketplace}
            onChange={handleChange("marketplace")}
            required
            style={{
              ...inputStyle,
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px",
              paddingRight: "40px",
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <option value="" disabled>Selecione seu marketplace</option>
            {marketplaces.map((mp) => (
              <option key={mp} value={mp}>{mp}</option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" style={labelStyle}>Senha</label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
              style={{ ...inputStyle, paddingRight: "44px" }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
            >
              <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPassword
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  : <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm" style={labelStyle}>Confirmar senha</label>
          <div style={{ position: "relative" }}>
            <input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Repita sua senha"
              required
              style={{ ...inputStyle, paddingRight: "44px" }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
            >
              <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showConfirm
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  : <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Terms */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            style={{
              width: "16px",
              height: "16px",
              marginTop: "2px",
              accentColor: "#185FA5",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>
            Ao criar uma conta, concordo com os{" "}
            <Link href="/termos" style={{ color: "#185FA5", fontWeight: 600 }}>Termos de Uso</Link>{" "}
            e a{" "}
            <Link href="/privacidade" style={{ color: "#185FA5", fontWeight: 600 }}>Política de Privacidade</Link>.
          </span>
        </label>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || !termsAccepted}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background:
              !termsAccepted
                ? "rgba(24,95,165,0.4)"
                : isLoading
                ? "rgba(24,95,165,0.7)"
                : "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
            color: "white",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isLoading || !termsAccepted ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isLoading ? (
            <>
              <svg style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Criando conta...
            </>
          ) : (
            "Criar minha conta →"
          )}
        </motion.button>
      </form>

      {/* Login link */}
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6B7280" }}>
        Já tem conta?{" "}
        <Link href="/login" style={{ color: "#185FA5", fontWeight: 700, textDecoration: "none" }}>
          Entrar
        </Link>
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
