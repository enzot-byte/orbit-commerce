"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
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

function CommunityViz({ active }: { active: boolean }) {
  const messages = [
    { name: "Rafael M.", initials: "R", text: "Acabei de fechar R$12k no ML esse mês!", delay: 0.3, color: "#9B7BFF" },
    { name: "Carla V.", initials: "C", text: "Quem testou a nova calculadora de frete?", delay: 0.5, color: "#C4B5FD" },
    { name: "Lucas F.", initials: "L", text: "ROI subiu 34% com a estratégia do curso!", delay: 0.7, color: "#EF9F27" },
  ];

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-purple-400" />
        </div>
        <span className="text-xs text-white/40 font-medium">Comunidade Sellerverse</span>
        <div className="ml-auto flex -space-x-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 rounded-full border border-[#0F0F1A]"
              style={{ background: `hsl(${260 + i * 20}, 60%, ${55 + i * 10}%)` }}
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
            />
          ))}
          <motion.span
            className="text-[9px] text-white/30 pl-2.5 self-center"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            +2.4k online
          </motion.span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className="flex gap-3 items-start"
            initial={{ opacity: 0, x: -16 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: msg.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>
        ))}
      </div>

      {/* Typing indicator */}
      <motion.div
        className="px-5 py-2.5 border-t border-white/5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-400/40"
              animate={active ? { opacity: [0.3, 1, 0.3] } : {}}
              transition={{ delay: 1.2 + i * 0.15, duration: 1.2, repeat: Infinity }}
            />
          ))}
        </div>
        <span className="text-[9px] text-white/20">3 sellers digitando...</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Illustration: Tools & Courses (step 2) ────────────────────────── */

function ToolsViz({ active }: { active: boolean }) {
  const tools = [
    { emoji: "\u{1F4CA}", name: "Calculadora ML", pct: 55, color: "#9B7BFF" },
    { emoji: "\u26A1",    name: "Gerador SEO",    pct: 70, color: "#C4B5FD" },
    { emoji: "\u{1F4CB}", name: "Templates",      pct: 82, color: "#5B3FD8" },
    { emoji: "\u{1F4C8}", name: "Analytics",       pct: 92, color: "#EF9F27" },
  ];

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
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
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.3 + i * 0.12,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            <span className="text-lg block mb-2">{tool.emoji}</span>
            <p className="text-[11px] text-white/50 font-medium">{tool.name}</p>
            <div className="mt-2.5 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tool.color }}
                initial={{ width: 0 }}
                animate={active ? { width: `${tool.pct}%` } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Illustration: Growth chart (step 3) ───────────────────────────── */

function GrowthViz({ active }: { active: boolean }) {
  const bars = [30, 42, 38, 50, 58, 52, 68, 75, 70, 88, 82, 96];

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden p-5 w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Faturamento</p>
          <motion.p
            className="text-2xl font-display font-bold text-white mt-0.5"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            +247%
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium"
          style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }}
          initial={{ opacity: 0, x: 10 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.3 }}
        >
          <TrendingUp className="w-3 h-3" />
          Crescendo
        </motion.div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-28">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background:
                i >= bars.length - 3
                  ? "linear-gradient(to top, #5B3FD8, #9B7BFF)"
                  : "rgba(155,123,255,0.12)",
            }}
            initial={{ height: 0 }}
            animate={active ? { height: `${h}%` } : {}}
            transition={{
              delay: 0.3 + i * 0.06,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
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
    </motion.div>
  );
}

/* ─── Vizualization components map ──────────────────────────────────── */

const vizComponents = [CommunityViz, ToolsViz, GrowthViz];

/* ─── Timeline Step ─────────────────────────────────────────────────── */

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const even = index % 2 === 0;
  const Viz = vizComponents[index];
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative py-12 md:py-20">
      {/* ── Node on timeline ── */}
      <motion.div
        className="absolute z-20 left-6 top-12 md:left-1/2 md:top-20 w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          x: "-50%",
          backgroundColor: inView ? step.accentBg : "rgba(255,255,255,0.03)",
          border: `2px solid ${inView ? step.accent : "rgba(255,255,255,0.08)"}`,
          boxShadow: inView ? `0 0 24px ${step.accent}40` : "none",
          transition: "background-color 0.6s, border-color 0.6s, box-shadow 0.6s",
        }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 250, damping: 20 }}
      >
        <Icon className="w-4 h-4" style={{ color: step.accent }} />
      </motion.div>

      {/* ── Content row ── */}
      <div className="pl-16 md:pl-0 md:grid md:grid-cols-2 md:items-center">
        {/* Text side */}
        <motion.div
          className={`${
            even ? "md:pr-16 md:text-right" : "md:pl-16 md:order-2"
          } mb-8 md:mb-0`}
          initial={{ opacity: 0, x: even ? -24 : 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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
        </motion.div>

        {/* Illustration side */}
        <motion.div
          className={even ? "md:pl-16" : "md:pr-16 md:order-1"}
          initial={{ opacity: 0, x: even ? 24 : -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <Viz active={inView} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Clamp the progress so the line never overflows
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="relative overflow-hidden ambient-light"
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
            Simples, r&aacute;pido e{" "}
            <span className="shimmer-text">eficiente</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            Tr&ecirc;s passos para transformar seu neg&oacute;cio de e-commerce.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={sectionRef} className="relative max-w-5xl mx-auto">
          {/* Static grey line (background) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />

          {/* Active gradient line (fills with scroll) — wrapper holds position,
              inner motion.div handles scaleY to avoid CSS/framer transform conflict */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                scaleY: lineProgress,
                background:
                  "linear-gradient(to bottom, #9B7BFF, #C4B5FD, #EF9F27)",
              }}
            />
          </div>

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
