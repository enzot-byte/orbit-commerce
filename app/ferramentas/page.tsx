import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ToolsClient from "./ToolsClient";
import Link from "next/link";
import {
  Calculator,
  Search,
  Truck,
  Package,
  FileText,
  BarChart2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ferramentas",
  description:
    "Ferramentas práticas para otimizar cada etapa do seu negócio como seller. Calculadoras, geradores, simuladores e muito mais.",
};

export default function FerramentasPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F" }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ padding: "160px 0 80px" }}
        >
          {/* ── Background layers ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #042C53 0%, #0C447C 20%, #1A1A2E 55%, #0A0A0F 100%)",
            }}
          />

          {/* Warm seller‐gold glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "10%",
              right: "5%",
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239,159,39,0.09) 0%, transparent 65%)",
            }}
          />

          {/* Cool blue glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "25%",
              left: "10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(24,95,165,0.12) 0%, transparent 65%)",
            }}
          />

          {/* Center purple spotlight */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(91,63,216,0.08) 0%, transparent 60%)",
            }}
          />

          {/* 3D Perspective grid floor */}
          <div className="ft-grid-floor" />

          {/* ── Floating tool pills & metrics (desktop) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
            {/* Tool pills */}
            <div className="ft-pill ft-pill-1">
              <Calculator className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Margem</span>
            </div>
            <div className="ft-pill ft-pill-2">
              <Search className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>SEO</span>
            </div>
            <div className="ft-pill ft-pill-3">
              <Package className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Estoque</span>
            </div>
            <div className="ft-pill ft-pill-4">
              <Truck className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>Frete</span>
            </div>
            <div className="ft-pill ft-pill-5">
              <FileText className="w-4 h-4" style={{ color: "#EF9F27" }} />
              <span>Templates</span>
            </div>
            <div className="ft-pill ft-pill-6">
              <BarChart2 className="w-4 h-4" style={{ color: "#9B7BFF" }} />
              <span>Métricas</span>
            </div>

            {/* Floating metric badges — seller KPIs */}
            <div
              className="ft-metric ft-metric-1"
              style={{
                background: "rgba(16,185,129,0.10)",
                border: "1px solid rgba(16,185,129,0.18)",
                color: "#34d399",
              }}
            >
              +247% ROI
            </div>
            <div
              className="ft-metric ft-metric-2"
              style={{
                background: "rgba(239,159,39,0.10)",
                border: "1px solid rgba(239,159,39,0.18)",
                color: "#EF9F27",
              }}
            >
              R$ 12.5k MRR
            </div>
            <div
              className="ft-metric ft-metric-3"
              style={{
                background: "rgba(155,123,255,0.10)",
                border: "1px solid rgba(155,123,255,0.18)",
                color: "#C4B5FD",
              }}
            >
              4.8★ Rating
            </div>

            {/* Data‐flow connection lines (SVG SMIL — zero JS) */}
            <svg
              className="absolute inset-0 w-full h-full ft-lines"
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="fl1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(155,123,255,0)" />
                  <stop offset="35%" stopColor="rgba(155,123,255,0.25)" />
                  <stop offset="65%" stopColor="rgba(239,159,39,0.18)" />
                  <stop offset="100%" stopColor="rgba(239,159,39,0)" />
                </linearGradient>
                <linearGradient id="fl2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(55,138,221,0)" />
                  <stop offset="40%" stopColor="rgba(55,138,221,0.18)" />
                  <stop offset="60%" stopColor="rgba(155,123,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(155,123,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M 60 130 Q 300 70 600 210 Q 900 340 1140 170"
                stroke="url(#fl1)"
                strokeWidth="0.8"
                strokeDasharray="4 8"
                fill="none"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-12"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 80 320 Q 350 260 600 290 Q 850 330 1120 260"
                stroke="url(#fl2)"
                strokeWidth="0.6"
                strokeDasharray="3 10"
                fill="none"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-13"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* ── Content ── */}
          <div
            className="container-orbit relative z-10"
            style={{ textAlign: "center" }}
          >
            <p
              className="text-xs font-bold tracking-[0.12em] uppercase mb-5"
              style={{ color: "#378ADD" }}
            >
              Ferramentas
            </p>
            <h1
              className="font-display font-extrabold text-white leading-[1.1] max-w-3xl mx-auto mb-5"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Ferramentas para otimizar{" "}
              <span className="shimmer-text" style={{ WebkitTextFillColor: "unset", background: "linear-gradient(90deg, #EF9F27 0%, #FAC775 25%, #EF9F27 50%, #FAC775 75%, #EF9F27 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                cada etapa do seu neg&oacute;cio
              </span>
            </h1>
            <p
              className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              15+ ferramentas desenvolvidas especialmente para sellers
              brasileiros. Algumas gr&aacute;tis para sempre, outras
              dispon&iacute;veis nos planos Pro e Premium.
            </p>

            {/* Quick stats */}
            <div className="flex justify-center gap-10 flex-wrap">
              {[
                { label: "Ferramentas dispon\u00edveis", value: "15+" },
                { label: "Sempre gr\u00e1tis", value: "4" },
                { label: "Usu\u00e1rios ativos", value: "2.5k+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display font-extrabold text-white leading-none"
                    style={{ fontSize: "2rem" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0A0A0F)",
            }}
          />
        </section>

        {/* ── Tools section ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-orbit">
            <ToolsClient />
          </div>
        </section>

        {/* ── Upgrade CTA Banner ── */}
        <section style={{ padding: "0 0 96px" }}>
          <div className="container-orbit">
            <ScrollReveal direction="up">
              <div
                style={{
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #0C447C 0%, #185FA5 50%, #1A1A2E 100%)",
                  border: "1px solid rgba(55,138,221,0.3)",
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
                    right: "-80px",
                    top: "-80px",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(239,159,39,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ maxWidth: "500px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(239,159,39,0.15)",
                      border: "1px solid rgba(239,159,39,0.3)",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#EF9F27" }}>
                      🔒 Ferramentas Pro e Premium bloqueadas
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "12px",
                      lineHeight: 1.25,
                    }}
                  >
                    Faça upgrade para desbloquear todas as ferramentas
                  </h2>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Acesse mais de 15 ferramentas avançadas por apenas R$97/mês. Garantia de 7 dias.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href="/planos"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                      color: "#0A0A0F",
                      fontWeight: 700,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Ver planos →
                  </Link>
                  <Link
                    href="/cadastro"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Criar conta grátis
                  </Link>
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
