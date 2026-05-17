"use client";

/**
 * HowItWorks — 3-step timeline.
 *
 * Previously this surface ran:
 *   - useScroll + useTransform on the section to drive a scaleY gradient line
 *   - useInView per step (3 separate IntersectionObservers + framer machinery)
 *   - per-step motion.div fadeUp/slideIn with spring animations
 *   - 3 illustration components (CommunityViz, ToolsViz, GrowthViz) each
 *     with their own framer entry animations across many sub-elements
 *
 * Now: gradient line is a static CSS gradient (no scroll listener), each
 * step uses the shared CSS-only ScrollReveal for one-shot fade-in, and the
 * illustrations render in their final state with no entry animation. Same
 * 3-step narrative, ~zero framer-motion overhead on this section.
 */

import { Users, LayoutGrid, TrendingUp, MessageSquare } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ─── Step Data ─────────────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Entre na comunidade gratuita",
    description:
      "Crie sua conta gratuitamente e acesse uma comunidade de sellers que compartilham estratégias, resultados e aprendizados todos os dias.",
    accent: "#9B7BFF",
    accentBg: "rgba(155,123,255,0.12)",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Acesse ferramentas e cursos",
    description:
      "Use calculadoras, geradores, templates e assista a cursos práticos criados por quem vende de verdade nos maiores marketplaces do Brasil.",
    accent: "#C4B5FD",
    accentBg: "rgba(196,181,253,0.12)",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Escale suas vendas",
    description:
      "Com mentoria especializada e dados em mãos, tome decisões melhores e veja seu faturamento crescer mês após mês.",
    accent: "#EF9F27",
    accentBg: "rgba(239,159,39,0.12)",
  },
];

/* ─── Illustration: Community (step 1) ──────────────────────────────── */

function CommunityViz() {
  const messages = [
    { name: "Rafael M.", initials: "R", text: "Acabei de fechar R$12k no ML esse mês!", color: "#9B7BFF" },
    { name: "Carla V.", initials: "C", text: "Quem testou a nova calculadora de frete?", color: "#C4B5FD" },
    { name: "Lucas F.", initials: "L", text: "ROI subiu 34% com a estratégia do curso!", color: "#EF9F27" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-purple-400" />
        </div>
        <span className="text-xs text-white/40 font-medium">Comunidade Sellerverse</span>
        <div className="ml-auto flex -space-x-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-[#0F0F1A]"
              style={{ background: `hsl(${260 + i * 20}, 60%, ${55 + i * 10}%)` }}
            />
          ))}
          <span className="text-[9px] text-white/30 pl-2.5 self-center">+2.4k online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div
              className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
              style={{ backgroundColor: msg.color + "25", color: msg.color }}
            >
              {msg.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white/60">{msg.name}</p>
              <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Typing indicator — single CSS pulse animation, no JS, no per-dot animation */}
      <div className="px-5 py-2.5 border-t border-white/5 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-pulse-slow"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="text-[9px] text-white/20">3 sellers digitando...</span>
      </div>
    </div>
  );
}

/* ─── Illustration: Tools & Courses (step 2) ────────────────────────── */

function ToolsViz() {
  const tools = [
    { emoji: "\u{1F4CA}", name: "Calculadora ML", pct: 55, color: "#9B7BFF" },
    { emoji: "⚡",    name: "Gerador SEO",    pct: 70, color: "#C4B5FD" },
    { emoji: "\u{1F4CB}", name: "Templates",      pct: 82, color: "#5B3FD8" },
    { emoji: "\u{1F4C8}", name: "Analytics",       pct: 92, color: "#EF9F27" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden w-full max-w-sm mx-auto">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <span className="text-[10px] text-white/25 ml-2">sellerverse.com/ferramentas</span>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <span className="text-lg block mb-2">{tool.emoji}</span>
            <p className="text-[11px] text-white/50 font-medium">{tool.name}</p>
            <div className="mt-2.5 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${tool.pct}%`, backgroundColor: tool.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Illustration: Growth chart (step 3) ───────────────────────────── */

function GrowthViz() {
  const bars = [30, 42, 38, 50, 58, 52, 68, 75, 70, 88, 82, 96];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden p-5 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Faturamento</p>
          <p className="text-2xl font-display font-bold text-white mt-0.5">+247%</p>
        </div>
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium"
          style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }}
        >
          <TrendingUp className="w-3 h-3" />
          Crescendo
        </div>
      </div>

      {/* Bar chart — static, final state. No staggered entry animation. */}
      <div className="flex items-end gap-1 h-28">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background:
                i >= bars.length - 3
                  ? "linear-gradient(to top, #5B3FD8, #9B7BFF)"
                  : "rgba(155,123,255,0.12)",
            }}
          />
        ))}
      </div>

      {/* X axis */}
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[9px] text-white/15">Jan</span>
        <span className="text-[9px] text-white/15">Jun</span>
        <span className="text-[9px] text-white/15">Dez</span>
      </div>
    </div>
  );
}

const vizComponents = [CommunityViz, ToolsViz, GrowthViz];

/* ─── Timeline Step ─────────────────────────────────────────────────── */

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const even = index % 2 === 0;
  const Viz = vizComponents[index];
  const Icon = step.icon;

  return (
    <div className="relative py-12 md:py-20">
      {/* Node on timeline — always lit. Previously animated scale+color
          via useInView; the static accent is fine and skips a per-step IO. */}
      <div
        className="absolute z-20 left-6 top-12 md:left-1/2 md:top-20 w-11 h-11 rounded-full flex items-center justify-center -translate-x-1/2"
        style={{
          backgroundColor: step.accentBg,
          border: `2px solid ${step.accent}`,
          boxShadow: `0 0 24px ${step.accent}40`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color: step.accent }} />
      </div>

      {/* Content row */}
      <div className="pl-16 md:pl-0 md:grid md:grid-cols-2 md:items-center">
        {/* Text side — uses CSS ScrollReveal (one-shot, IO-shared) */}
        <ScrollReveal
          direction={even ? "left" : "right"}
          className={`${even ? "md:pr-16 md:text-right" : "md:pl-16 md:order-2"} mb-8 md:mb-0`}
        >
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase block mb-2"
            style={{ color: step.accent }}
          >
            Passo {step.number}
          </span>
          <h3
            className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            {step.title}
          </h3>
          <p
            className="text-white/40 leading-relaxed text-sm md:text-base max-w-md"
            style={even ? { marginLeft: "auto" } : undefined}
          >
            {step.description}
          </p>
        </ScrollReveal>

        {/* Illustration side */}
        <ScrollReveal
          direction={even ? "right" : "left"}
          className={even ? "md:pl-16" : "md:pr-16 md:order-1"}
        >
          <Viz />
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden ambient-light cv-section contain-section"
      style={{ backgroundColor: "#0F0F1A", padding: "128px 0 160px" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(91,63,216,0.06), transparent 70%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-16 md:mb-24">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#9B7BFF" }}
          >
            Como funciona
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Simples, rápido e{" "}
            <span className="shimmer-text-static">eficiente</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            Três passos para transformar seu negócio de e-commerce.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Static gradient line — replaces useScroll-driven scaleY of the
              previous version. Same visual feel without a scroll listener. */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(155,123,255,0.05) 0%, #9B7BFF 15%, #C4B5FD 50%, #EF9F27 85%, rgba(239,159,39,0.05) 100%)",
            }}
          />

          {/* Steps */}
          {steps.map((step, i) => (
            <TimelineStep key={step.number} step={step} index={i} />
          ))}
        </div>
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
