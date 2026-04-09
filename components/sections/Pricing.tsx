"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const plans = [
  {
    id: "free",
    name: "Grátis",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Para quem está começando e quer explorar a plataforma.",
    badge: null,
    highlighted: false,
    ctaLabel: "Criar conta grátis",
    ctaStyle: "outline",
    features: [
      "Acesso à comunidade",
      "3 ferramentas gratuitas",
      "Conteúdo básico de cursos",
      "Newsletter semanal",
      "Suporte via FAQ",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 97,
    annualPrice: 77,
    description: "Para sellers que querem crescer com ferramentas e mentoria.",
    badge: "Mais popular",
    highlighted: true,
    ctaLabel: "Começar agora",
    ctaStyle: "accent",
    features: [
      "Tudo do plano Grátis",
      "Acesso a todas as ferramentas",
      "Cursos completos ilimitados",
      "Grupo exclusivo de mentoria",
      "Templates premium",
      "Suporte prioritário",
      "Relatórios mensais",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 247,
    annualPrice: 197,
    description: "Para quem quer acompanhamento individual e resultados acelerados.",
    badge: null,
    highlighted: false,
    ctaLabel: "Falar com consultor",
    ctaStyle: "outline",
    features: [
      "Tudo do plano Pro",
      "Mentoria 1:1 mensal",
      "Diagnóstico de negócio",
      "Acesso antecipado a features",
      "Canal exclusivo com especialistas",
      "Auditoria de anúncios",
      "SLA de suporte em 2h",
    ],
  },
];

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative inline-flex items-center gap-1.5 h-7 w-14 rounded-full border-2 border-orbit-600/50 bg-dark-surface transition-all duration-300"
      aria-label="Toggle annual billing"
    >
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-orbit-600"
        animate={{ x: value ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      className="section-pad"
      id="planos"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="container-orbit">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-400 mb-3">
            Planos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Escolha o plano{" "}
            <span className="gradient-text-accent">ideal para você</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            Comece grátis. Faça upgrade quando precisar.
          </p>
        </ScrollReveal>

        {/* Billing toggle */}
        <ScrollReveal direction="up" delay={0.1} className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-medium ${!isAnnual ? "text-white" : "text-white/45"}`}>
            Mensal
          </span>
          <Toggle value={isAnnual} onChange={setIsAnnual} />
          <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? "text-white" : "text-white/45"}`}>
            Anual
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent-400/20 text-accent-400">
              Economize 20%
            </span>
          </span>
        </ScrollReveal>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <ScrollReveal key={plan.id} direction="up" index={i} delay={0.1}>
                <motion.div
                  className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-dark-card border-accent-400/50 scale-105 shadow-glow-accent"
                      : "bg-dark-card border-white/10"
                  }`}
                  whileHover={{
                    boxShadow: plan.highlighted
                      ? "0 0 50px rgba(239,159,39,0.2)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <motion.span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-400 text-dark"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="w-3 h-3" />
                        {plan.badge}
                      </motion.span>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6">
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/45">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${plan.id}-${isAnnual}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-end gap-1"
                      >
                        {price === 0 ? (
                          <span className="text-5xl font-display font-black text-white">
                            Grátis
                          </span>
                        ) : (
                          <>
                            <span className="text-lg font-medium text-white/60 mb-2">R$</span>
                            <span className="text-5xl font-display font-black text-white">
                              {price}
                            </span>
                            <span className="text-sm text-white/45 mb-2">/mês</span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-xs text-white/40 mt-1">
                        Cobrado anualmente · R${plan.monthlyPrice}/mês no plano mensal
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href="#"
                    className={`w-full flex items-center justify-center py-3.5 rounded-xl font-semibold text-sm mb-8 transition-all duration-300 ${
                      plan.ctaStyle === "accent"
                        ? "bg-accent-400 text-dark hover:bg-accent-200 hover:scale-105"
                        : "border border-white/20 text-white hover:border-white/40 hover:bg-white/8"
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: plan.highlighted ? "#EF9F27" : "#185FA5" }}
                        />
                        <span className="text-sm text-white/65">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Money-back note */}
        <ScrollReveal direction="up" delay={0.4} className="text-center mt-10">
          <p className="text-sm text-white/35">
            ✓ 7 dias de garantia · ✓ Cancele a qualquer momento · ✓ Sem taxa de cancelamento
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
