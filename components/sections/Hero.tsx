"use client";

import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("@/components/shared/Galaxy"), {
  ssr: false,
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: EASE,
    },
  }),
};

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Galaxy WebGL background */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={0.8}
          glowIntensity={0.25}
          saturation={0.1}
          hueShift={260}
          twinkleIntensity={0.4}
          rotationSpeed={0.03}
          repulsionStrength={1.5}
          autoCenterRepulsion={0}
          starSpeed={0.3}
          speed={0.6}
          transparent={false}
        />
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

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, willChange: "transform" }}
        className="relative z-10 container-orbit flex flex-col items-center text-center px-4"
      >
        <>
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/[0.06] border border-white/[0.1] text-white/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-slow" />
              <span>+2.500 sellers j&aacute; fazem parte</span>
            </span>
          </motion.div>

          {/* H1 — proportional sizing */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.06] text-white max-w-4xl mb-7"
            style={{ letterSpacing: "-0.035em" }}
          >
            O ecossistema para sellers que querem{" "}
            <span className="shimmer-text">escalar</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            Comunidade, cursos, ferramentas e mentoria — tudo num s&oacute; lugar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a
              href="/cadastro"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white/80 border border-white/[0.15] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:scale-105"
            >
              Conhecer os planos
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-white/40 mb-16"
          >
            {["Grátis para começar", "Sem cartão de crédito", "Cancele quando quiser"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="text-accent-400">✓</span>
                  {item}
                </span>
              )
            )}
          </motion.div>
        </>

        {/* Feature pills marquee — pauses on hover */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="marquee-wrapper w-full max-w-3xl overflow-hidden relative cursor-default"
        >
          {/* Fade edges */}
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute inset-x-0 top-0 w-full h-full bg-white/40 scroll-line-anim" />
        </div>
      </motion.div>

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
