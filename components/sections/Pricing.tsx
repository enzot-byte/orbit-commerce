"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ─── Plan Data ─────────────────────────────────────────────────────── */

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
    description:
      "Para quem quer acompanhamento individual e resultados acelerados.",
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

/* ─── Toggle ────────────────────────────────────────────────────────── */

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
      className="relative inline-flex items-center gap-1.5 h-7 w-14 rounded-full border border-white/[0.12] bg-white/[0.04] transition-all duration-300 hover:border-white/20"
      aria-label="Toggle annual billing"
    >
      <motion.div
        className="absolute w-5 h-5 rounded-full"
        style={{ background: "linear-gradient(135deg, #5B3FD8, #9B7BFF)" }}
        animate={{ x: value ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("pro");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? selectedId;

  return (
    <section
      className="relative overflow-hidden ambient-light"
      id="planos"
      style={{ backgroundColor: "#1A1A2E", padding: "128px 0 160px" }}
    >
      {/* Spotlight glow focused on center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(91,63,216,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-400 mb-3">
            Planos
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Escolha o plano{" "}
            <span className="shimmer-text">ideal para voc&ecirc;</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            Comece gr&aacute;tis. Fa&ccedil;a upgrade quando precisar.
          </p>
        </ScrollReveal>

        {/* Billing toggle */}
        <ScrollReveal
          direction="up"
          delay={0.1}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              !isAnnual ? "text-white" : "text-white/35"
            }`}
          >
            Mensal
          </span>
          <Toggle value={isAnnual} onChange={setIsAnnual} />
          <span
            className={`text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
              isAnnual ? "text-white" : "text-white/35"
            }`}
          >
            Anual
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent-400/15 text-accent-400 border border-accent-400/20">
              Economize 20%
            </span>
          </span>
        </ScrollReveal>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isActive = activeId === plan.id;
            const isPro = plan.id === "pro";

            return (
              <ScrollReveal key={plan.id} direction="up" index={i} delay={0.1}>
                <motion.div
                  onClick={() => setSelectedId(plan.id)}
                  onHoverStart={() => setHoveredId(plan.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    borderColor: isActive
                      ? "rgba(155,123,255,0.4)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative flex flex-col rounded-2xl p-8 cursor-pointer overflow-hidden"
                  style={{
                    background: isPro
                      ? "linear-gradient(180deg, rgba(30,28,56,0.95) 0%, rgba(22,22,42,0.92) 100%)"
                      : "linear-gradient(180deg, rgba(26,26,46,0.92) 0%, rgba(20,20,38,0.90) 100%)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow:
                      isPro && isActive
                        ? "0 0 80px rgba(91,63,216,0.25), 0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
                        : isActive
                          ? "0 0 40px rgba(91,63,216,0.15), 0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)"
                          : "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Card glow overlay — appears on active */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      opacity: isActive ? 1 : 0,
                      background: isPro
                        ? "radial-gradient(ellipse at 50% 0%, rgba(91,63,216,0.15) 0%, transparent 60%)"
                        : "radial-gradient(ellipse at 50% 0%, rgba(155,123,255,0.08) 0%, transparent 60%)",
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  {/* Pro spotlight glow */}
                  {isPro && (
                    <div
                      className="absolute -inset-px rounded-2xl pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(91,63,216,0.15) 0%, transparent 50%)",
                      }}
                    />
                  )}

                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <motion.span
                        className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                          boxShadow: "0 0 20px rgba(91,63,216,0.4)",
                        }}
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Zap className="w-3 h-3" />
                        {plan.badge}
                      </motion.span>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6 relative">
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/40">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 relative">
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
                            Gr&aacute;tis
                          </span>
                        ) : (
                          <>
                            <span className="text-lg font-medium text-white/50 mb-2">
                              R$
                            </span>
                            <span className="text-5xl font-display font-black text-white">
                              {price}
                            </span>
                            <span className="text-sm text-white/40 mb-2">
                              /m&ecirc;s
                            </span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-xs text-white/30 mt-1">
                        Cobrado anualmente &middot; R${plan.monthlyPrice}/m&ecirc;s
                        no plano mensal
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href="/cadastro"
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full flex items-center justify-center py-3.5 rounded-xl font-semibold text-sm mb-8 transition-all duration-300 overflow-hidden"
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                            color: "#ffffff",
                            boxShadow: "0 0 20px rgba(91,63,216,0.3)",
                          }
                        : {
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                          }
                    }
                  >
                    {plan.ctaLabel}
                  </a>

                  {/* Features */}
                  <ul className="space-y-3 relative">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{
                            color: isActive
                              ? "#9B7BFF"
                              : "rgba(255,255,255,0.25)",
                          }}
                        />
                        <span className="text-sm text-white/55">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom accent glow line on hover */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-px rounded-full"
                    style={{
                      opacity: isActive ? 1 : 0,
                      background: isPro
                        ? "linear-gradient(to right, transparent, rgba(91,63,216,0.5), transparent)"
                        : "linear-gradient(to right, transparent, rgba(155,123,255,0.3), transparent)",
                      transition: "opacity 0.4s ease",
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Money-back note */}
        <ScrollReveal direction="up" delay={0.4} className="text-center mt-12">
          <p className="text-sm text-white/30">
            &check; 7 dias de garantia &middot; &check; Cancele a qualquer
            momento &middot; &check; Sem taxa de cancelamento
          </p>
        </ScrollReveal>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0F)",
        }}
      />
    </section>
  );
}
