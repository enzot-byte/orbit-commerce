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
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Acesse ferramentas e cursos",
    description:
      "Use calculadoras, geradores, templates e assista a cursos práticos criados por quem vende de verdade nos maiores marketplaces do Brasil.",
    color: "#C4B5FD",
    bgColor: "rgba(196,181,253,0.12)",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Escale suas vendas",
    description:
      "Com mentoria especializada e dados em mãos, tome decisões melhores e veja seu faturamento crescer mês após mês.",
    color: "#5B3FD8",
    bgColor: "rgba(91,63,216,0.15)",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: "#0F0F1A" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#9B7BFF" }}>
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Simples, rápido e{" "}
            <span className="gradient-text-accent" style={{ paddingTop: "0.05em", display: "inline-block" }}>eficiente</span>
          </h2>
          <p className="mt-4 text-lg text-white/45 max-w-xl mx-auto">
            Três passos para transformar seu negócio de e-commerce.
          </p>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connecting line between cards — desktop only */}
          <div
            className="hidden md:block absolute top-14 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(155,123,255,0.2) 20%, rgba(155,123,255,0.2) 80%, transparent)",
            }}
          />
          {/* Dot connectors */}
          <div className="hidden md:flex absolute top-14 left-0 right-0 justify-between px-[calc(16.66%-4px)] pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full -translate-y-1/2"
                style={{ backgroundColor: "rgba(155,123,255,0.4)" }}
              />
            ))}
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} direction="up" index={i} delay={0.1}>
                <motion.div
                  className="relative group flex flex-col items-start p-8 rounded-2xl border transition-all duration-300"
                  style={{
                    backgroundColor: "#16162A",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(155,123,255,0.2)",
                    boxShadow: "0 16px 48px rgba(91,63,216,0.15)",
                  }}
                >
                  {/* Number badge */}
                  <span
                    className="absolute top-6 right-6 text-5xl font-display font-black select-none"
                    style={{ color: step.color, opacity: 0.08 }}
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
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
    </section>
  );
}
