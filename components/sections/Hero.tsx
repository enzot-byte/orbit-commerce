"use client";

import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import BlueprintGrid from "@/components/shared/BlueprintGrid";
import Abstract3DShape from "@/components/shared/Abstract3DShape";

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
  const shapeY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const shapeOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Cone of light / spotlight */}
      <div className="absolute inset-0 hero-spotlight" />

      {/* Blueprint grid overlay */}
      <BlueprintGrid markers cellSize={80} />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Abstract 3D shape — right side */}
      <motion.div
        style={{ y: shapeY, opacity: shapeOpacity, willChange: "transform" }}
        className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
      >
        <Abstract3DShape size={520} />
      </motion.div>

      {/* Secondary ambient glow — left */}
      <div
        className="absolute left-[-200px] top-[30%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(24,95,165,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/[0.05] border border-white/[0.08] text-white/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-slow" />
              <span>+2.500 sellers j&aacute; fazem parte</span>
            </span>
          </motion.div>

          {/* H1 — dramatic large type */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-display font-semibold leading-[1.04] text-white max-w-5xl mb-7"
            style={{ letterSpacing: "-0.04em" }}
          >
            O ecossistema para sellers que querem{" "}
            <span className="shimmer-text">escalar</span>
          </motion.h1>

          {/* Subheadline — more muted */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/45 max-w-2xl mb-12 leading-relaxed"
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
                boxShadow: "0 0 40px rgba(91,63,216,0.3)",
              }}
            >
              <span className="relative z-10">Começar gratuitamente</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
            <a
              href="/planos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white/80 border border-white/[0.12] backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:scale-105"
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

        {/* Feature pills marquee */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl overflow-hidden relative"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {/* Duplicate pills for seamless loop */}
            {[...featurePills, ...featurePills].map((pill, i) => (
              <span
                key={`pill-${i}`}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm text-white/60 bg-white/[0.04] border border-white/[0.08] whitespace-nowrap hover:bg-white/[0.08] hover:text-white/80 transition-colors duration-200"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — minimal line */}
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
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #1A1A2E)",
        }}
      />
    </section>
  );
}
