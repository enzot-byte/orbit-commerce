"use client";

/**
 * Hero — landing surface with WebGL galaxy + CTA.
 *
 * Previously this used framer-motion's useScroll + useTransform to fade the
 * content out as the user scrolled (the page would gradually go to opacity
 * 0 + translate-y -120 by the time you left the hero). That added a scroll
 * listener that fired on every scroll event and re-rendered the entire
 * motion subtree.
 *
 * Removed: useScroll/useTransform parallax. The content now stays put as
 * you scroll — when the next section comes up it just overlays normally.
 * Also removed: per-element motion.div fadeUp wrappers (badge / h1 / subhead
 * / CTAs / trust line / pills) — they were 6 framer instances on the LCP
 * surface running spring physics on mount. Replaced by a single CSS
 * keyframe `hero-fade-up` with staggered animation-delay, which the browser
 * compositor handles natively.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDeviceTier } from "@/lib/perf";

const Galaxy = dynamic(() => import("@/components/shared/Galaxy"), {
  ssr: false,
});

/**
 * On low-tier hardware (≤4 cores or ≤4GB RAM or save-data on or
 * reduced-motion preference), skip the WebGL Galaxy entirely. A static
 * dark background with a subtle radial gradient takes its place — the
 * page still looks composed but doesn't burn ~30% of a frame budget on
 * the fragment shader.
 */
function useShouldRenderGalaxy() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(getDeviceTier() !== "low");
  }, []);
  return enabled;
}

const featurePills = [
  "Calculadora de Lucro",
  "Gerador de Títulos SEO",
  "Simulador de Frete",
  "Cursos Exclusivos",
  "Comunidade Ativa",
  "Mentoria Individual",
  "Templates Pro",
  "Dashboard de Métricas",
];

export default function Hero() {
  const renderGalaxy = useShouldRenderGalaxy();
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Galaxy WebGL background — only rendered on mid/high-tier devices.
          On low-tier the background stays solid dark with the static glow
          overlays below filling the space. */}
      <div className="absolute inset-0 z-0">
        {renderGalaxy ? (
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={0.45}
            glowIntensity={0.2}
            saturation={0.1}
            hueShift={260}
            twinkleIntensity={0.25}
            rotationSpeed={0.025}
            repulsionStrength={1.2}
            autoCenterRepulsion={0}
            starSpeed={0.22}
            speed={0.45}
            transparent={false}
          />
        ) : (
          // Static low-tier fallback: a deep radial gradient that hints at
          // depth without any GPU work.
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(28,18,60,0.6) 0%, rgba(10,10,15,1) 75%)",
            }}
          />
        )}
      </div>

      {/* Top gradient overlay for blending */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(10,10,15,0.4) 70%, rgba(10,10,15,0.85) 100%)",
        }}
      />

      {/* Spotlight center glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 50% 45%, rgba(91,63,216,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content — CSS-only stagger, no framer-motion, no scroll listener */}
      <div className="relative z-10 w-full container-orbit flex flex-col items-center text-center px-4">
        <div className="hero-fade-up mb-8" style={{ animationDelay: "0ms" }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/[0.06] border border-white/[0.1] text-white/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-slow" />
            <span>+2.500 sellers já fazem parte</span>
          </span>
        </div>

        <h1
          className="hero-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.06] text-white max-w-4xl mb-7"
          style={{ letterSpacing: "-0.035em", animationDelay: "120ms" }}
        >
          O ecossistema para sellers que querem{" "}
          <span className="shimmer-text">escalar</span>
        </h1>

        <p
          className="hero-fade-up text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          Comunidade, cursos, ferramentas e mentoria — tudo num só lugar.
        </p>

        <div
          className="hero-fade-up flex flex-col sm:flex-row gap-4 mb-8"
          style={{ animationDelay: "360ms" }}
        >
          <a
            href="/cadastro"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
              color: "#ffffff",
              boxShadow: "0 0 40px rgba(91,63,216,0.35), 0 8px 32px rgba(91,63,216,0.2)",
            }}
          >
            <span className="relative z-10">Começar gratuitamente</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
          <a
            href="/planos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white/80 border border-white/[0.15] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:scale-105"
          >
            Conhecer os planos
          </a>
        </div>

        <div
          className="hero-fade-up flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-white/40 mb-16"
          style={{ animationDelay: "480ms" }}
        >
          {["Grátis para começar", "Sem cartão de crédito", "Cancele quando quiser"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-accent-400">✓</span>
                {item}
              </span>
            )
          )}
        </div>

        {/* Feature pills marquee — pauses on hover via CSS */}
        <div
          className="hero-fade-up marquee-wrapper w-full max-w-3xl overflow-hidden relative cursor-default"
          style={{ animationDelay: "600ms" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {[...featurePills, ...featurePills].map((pill, i) => (
              <span
                key={`pill-${i}`}
                className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 whitespace-nowrap transition-all duration-200 hover:scale-105 hover:text-white"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(91,63,216,0.18), rgba(155,123,255,0.1))",
                  border: "1px solid rgba(155,123,255,0.3)",
                  boxShadow: "0 0 12px rgba(91,63,216,0.1)",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — single CSS fade-in via class, no framer */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute inset-x-0 top-0 w-full h-full bg-white/40 scroll-line-anim" />
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #1A1A2E)",
        }}
      />
    </section>
  );
}
