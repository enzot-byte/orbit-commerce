"use client";

import { motion } from "framer-motion";
import { Users, LayoutGrid, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Entre na comunidade gratuita",
    description:
      "Crie sua conta gratuitamente e acesse uma comunidade de sellers que compartilham estratégias, resultados e aprendizados todos os dias.",
    color: "#9B7BFF",
    bgColor: "rgba(155,123,255,0.12)",
    span: "md:col-span-2", // bento: larger card
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Acesse ferramentas e cursos",
    description:
      "Use calculadoras, geradores, templates e assista a cursos práticos criados por quem vende de verdade nos maiores marketplaces do Brasil.",
    color: "#C4B5FD",
    bgColor: "rgba(196,181,253,0.12)",
    span: "md:col-span-1",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Escale suas vendas",
    description:
      "Com mentoria especializada e dados em mãos, tome decisões melhores e veja seu faturamento crescer mês após mês.",
    color: "#5B3FD8",
    bgColor: "rgba(91,63,216,0.15)",
    span: "md:col-span-1",
  },
];

function MiniShowcase({ step }: { step: typeof steps[number] }) {
  const Icon = step.icon;
  return (
    <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
      <motion.div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: step.bgColor }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon className="w-5 h-5" style={{ color: step.color }} />
      </motion.div>
      <div className="flex-1 space-y-1.5">
        <div className="h-1.5 rounded-full bg-white/[0.08] w-3/4" />
        <div className="h-1.5 rounded-full bg-white/[0.05] w-1/2" />
      </div>
      <div
        className="w-2 h-2 rounded-full animate-pulse-slow"
        style={{ backgroundColor: step.color }}
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden ambient-light"
      style={{ backgroundColor: "#0F0F1A", padding: "128px 0 160px" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#9B7BFF" }}>
            Como funciona
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Simples, r&aacute;pido e{" "}
            <span className="shimmer-text">eficiente</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            Tr&ecirc;s passos para transformar seu neg&oacute;cio de e-commerce.
          </p>
        </ScrollReveal>

        {/* Bento grid — 2 columns on md */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Animated SVG connecting gradient line — desktop */}
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLarge = step.span.includes("col-span-2");

            return (
              <ScrollReveal key={step.number} direction="up" index={i} delay={0.1} className={step.span}>
                <motion.div
                  className="relative group flex flex-col p-8 rounded-2xl glass-card gradient-border h-full transition-all duration-300"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 16px 48px rgba(91,63,216,0.12)",
                  }}
                >
                  {/* Number badge — faint watermark */}
                  <span
                    className="absolute top-6 right-6 text-6xl font-display font-black select-none"
                    style={{ color: step.color, opacity: 0.06 }}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: step.bgColor }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className="text-xl font-display font-bold text-white mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/45 leading-relaxed text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Mini showcase UI — animated placeholder */}
                  {isLarge && (
                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <MiniShowcase step={step} />
                      <MiniShowcase step={{ ...step, color: "#C4B5FD", bgColor: "rgba(196,181,253,0.12)" }} />
                    </div>
                  )}
                  {!isLarge && (
                    <div className="mt-auto">
                      <MiniShowcase step={step} />
                    </div>
                  )}

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, ${step.color}, transparent)`,
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
      />
    </section>
  );
}
