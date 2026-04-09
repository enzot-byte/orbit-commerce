"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import GradientMesh from "@/components/shared/GradientMesh";
import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

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

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      {/* Animated gradient mesh background */}
      <GradientMesh intensity="medium" />

      {/* Orbital decoration — right side (no blur, cheap) */}
      <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
        <OrbitalAnimation size={540} opacity={1} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-orbit flex flex-col items-center text-center px-4">
        <AnimatePresence>
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/8 border border-white/15 text-white/90 backdrop-blur-sm">
              <span>🚀</span>
              <span>+2.500 sellers já fazem parte</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse-slow" />
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] tracking-tight text-white max-w-4xl mb-6"
          >
            O ecossistema completo para sellers que querem{" "}
            <span className="gradient-text-accent">escalar</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/65 max-w-2xl mb-10 leading-relaxed"
          >
            Comunidade, cursos, ferramentas e mentoria — tudo num só lugar.
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
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-accent"
              style={{
                background: "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                color: "#ffffff",
              }}
            >
              <span className="relative z-10">Começar gratuitamente</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
            <a
              href="/planos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/8 hover:scale-105"
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
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-white/50"
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
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Rolar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,10,15,0.6))",
        }}
      />
    </section>
  );
}
