"use client";

/**
 * ToolsPreview — premium orbital layout.
 *
 * The first version of this file ran a rAF loop driving a MotionValue,
 * 6 motion.divs orbiting via `offsetDistance`, 3 atom-ring 3D rotations
 * (`rotateX/Y/Z` infinite), 6 floating micro-tools, a spinning globe
 * wireframe (35s infinite) and a pulsing glow (5s infinite). Constant
 * compositor work, even when the section was just sitting in the viewport.
 *
 * We then collapsed it to a flat grid — but the user liked the orbital
 * shape. This version keeps the orbital visual (ellipse + central node +
 * cards positioned around it) but makes it 100% static: cards are
 * positioned with `cos()`/`sin()` ONCE on mount, the central node is a
 * static gradient ball with the "S" monogram (no spin, no wireframe), the
 * ellipse path is plain SVG, and NOTHING runs infinitely while the
 * section is on-screen. Hover effects still work — they're CSS-only.
 *
 * Mobile keeps a simple swipe-scroll carousel (no infinite marquee).
 */

import { useMemo, useState, useEffect, useRef } from "react";
import {
  Calculator,
  Search,
  Truck,
  Package,
  FileText,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ─── Tool Data ──────────────────────────────────────────────────────────── */

const tools = [
  {
    icon: Calculator,
    name: "Calculadora de Margem",
    desc: "Calcule lucro líquido, margem e ponto de equilíbrio em segundos.",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    headerBg: "rgba(91,63,216,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <rect x="20" y="60" width="24" height="25" rx="3" fill="rgba(155,123,255,0.12)" stroke="rgba(155,123,255,0.25)" strokeWidth="0.5" />
        <rect x="55" y="42" width="24" height="43" rx="3" fill="rgba(155,123,255,0.16)" stroke="rgba(155,123,255,0.28)" strokeWidth="0.5" />
        <rect x="90" y="28" width="24" height="57" rx="3" fill="rgba(155,123,255,0.2)" stroke="rgba(155,123,255,0.3)" strokeWidth="0.5" />
        <rect x="125" y="16" width="24" height="69" rx="3" fill="rgba(155,123,255,0.25)" stroke="rgba(155,123,255,0.35)" strokeWidth="0.5" />
        <rect x="160" y="6" width="24" height="79" rx="3" fill="rgba(155,123,255,0.3)" stroke="rgba(155,123,255,0.4)" strokeWidth="0.5" />
        <path d="M32 58 L67 40 L102 26 L137 14 L172 4" stroke="rgba(155,123,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <circle cx="172" cy="4" r="3" fill="#9B7BFF" opacity="0.6" />
      </svg>
    ),
  },
  {
    icon: Search,
    name: "Gerador de Títulos SEO",
    desc: "Crie títulos otimizados para rankear melhor nos marketplaces.",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    headerBg: "rgba(239,159,39,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <rect x="15" y="15" width="120" height="10" rx="5" fill="rgba(239,159,39,0.12)" stroke="rgba(239,159,39,0.2)" strokeWidth="0.5" />
        <rect x="15" y="33" width="90" height="7" rx="3.5" fill="rgba(239,159,39,0.08)" />
        <rect x="15" y="47" width="105" height="7" rx="3.5" fill="rgba(239,159,39,0.06)" />
        <rect x="15" y="61" width="70" height="7" rx="3.5" fill="rgba(239,159,39,0.05)" />
        <circle cx="185" cy="30" r="20" stroke="rgba(239,159,39,0.25)" strokeWidth="1.5" fill="rgba(239,159,39,0.04)" />
        <line x1="200" y1="45" x2="215" y2="60" stroke="rgba(239,159,39,0.3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M177 25 L183 31 L195 20" stroke="rgba(239,159,39,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    icon: Truck,
    name: "Simulador de Frete",
    desc: "Compare transportadoras e encontre a opção mais barata.",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    headerBg: "rgba(91,63,216,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <circle cx="40" cy="60" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="40" cy="60" r="3" fill="rgba(155,123,255,0.25)" />
        <circle cx="190" cy="25" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="190" cy="25" r="3" fill="#9B7BFF" opacity="0.5" />
        <path d="M48 57 Q90 48 120 38 Q150 28 182 27" stroke="rgba(155,123,255,0.25)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <rect x="100" y="35" width="40" height="14" rx="3" fill="rgba(155,123,255,0.12)" stroke="rgba(155,123,255,0.22)" strokeWidth="0.5" />
        <text x="120" y="44" textAnchor="middle" fontSize="7" fill="rgba(155,123,255,0.6)" fontWeight="600">R$ 14,90</text>
      </svg>
    ),
  },
  {
    icon: BarChart2,
    name: "Dashboard de Métricas",
    desc: "Visualize seus KPIs de vendas, estoque e lucratividade.",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    headerBg: "rgba(91,63,216,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <path d="M15 70 L60 50 L100 60 L140 30 L180 40 L225 20" stroke="rgba(155,123,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M15 70 L60 50 L100 60 L140 30 L180 40 L225 20 L225 80 L15 80 Z" fill="url(#dash-grad)" opacity="0.3" />
        <defs>
          <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9B7BFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9B7BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="50" r="2.5" fill="#9B7BFF" />
        <circle cx="100" cy="60" r="2.5" fill="#9B7BFF" />
        <circle cx="140" cy="30" r="2.5" fill="#9B7BFF" />
        <circle cx="180" cy="40" r="2.5" fill="#9B7BFF" />
        <circle cx="225" cy="20" r="3" fill="#9B7BFF" />
      </svg>
    ),
  },
  {
    icon: Package,
    name: "Planilha de Estoque",
    desc: "Gerencie estoque com alertas de reposição automáticos.",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    headerBg: "rgba(239,159,39,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        {Array.from({ length: 5 }).map((_, c) =>
          Array.from({ length: 3 }).map((__, r) => {
            const fill = c === 2 && r === 1 ? "rgba(239,159,39,0.3)" : "rgba(239,159,39,0.08)";
            const stroke = c === 2 && r === 1 ? "rgba(239,159,39,0.5)" : "rgba(239,159,39,0.15)";
            return (
              <rect
                key={`${c}-${r}`}
                x={28 + c * 38}
                y={12 + r * 22}
                width={32}
                height={18}
                rx={2}
                fill={fill}
                stroke={stroke}
                strokeWidth="0.5"
              />
            );
          })
        )}
        <circle cx="116" cy="43" r="3" fill="#EF9F27" />
      </svg>
    ),
  },
  {
    icon: FileText,
    name: "Template de Anúncio",
    desc: "Estruturas testadas que convertem mais em qualquer marketplace.",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    headerBg: "rgba(239,159,39,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <rect x="60" y="10" width="120" height="70" rx="6" fill="rgba(239,159,39,0.06)" stroke="rgba(239,159,39,0.22)" strokeWidth="0.7" />
        <rect x="70" y="18" width="100" height="18" rx="3" fill="rgba(239,159,39,0.18)" />
        <rect x="70" y="42" width="80" height="6" rx="2" fill="rgba(239,159,39,0.12)" />
        <rect x="70" y="52" width="90" height="6" rx="2" fill="rgba(239,159,39,0.10)" />
        <rect x="70" y="62" width="60" height="6" rx="2" fill="rgba(239,159,39,0.08)" />
      </svg>
    ),
  },
];

/* ─── Tool Card ──────────────────────────────────────────────────────────── */

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = tool.icon;
  return (
    <div
      className="tool-card"
      data-type={tool.type}
      style={{ "--tc-header-bg": tool.headerBg } as React.CSSProperties}
    >
      <div className="tool-card-glow" />
      <div className="tool-card-header">
        <div className="tool-card-illustration">{tool.illustration}</div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-2.5 right-3">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={
              tool.type === "free"
                ? { backgroundColor: "rgba(16,185,129,0.25)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }
                : { backgroundColor: "rgba(239,159,39,0.25)", color: "#EF9F27", border: "1px solid rgba(239,159,39,0.2)" }
            }
          >
            {tool.badge}
          </span>
        </div>
      </div>
      <div className="px-5 py-4 relative z-[2]">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: tool.bg }}
          >
            <Icon className="w-4 h-4" style={{ color: tool.color }} />
          </div>
          <p className="font-display font-bold text-white text-[13px] leading-tight">
            {tool.name}
          </p>
        </div>
        <p className="text-[11px] text-white/55 leading-relaxed">{tool.desc}</p>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

// Ellipse SVG path — built once at module scope, never recomputed.
function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 -${rx * 2} 0`;
}

// Card slot positions on the ellipse — pre-computed, never animated.
function cardSlots(rx: number, ry: number, n: number) {
  return Array.from({ length: n }).map((_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start at top
    return { x: rx * Math.cos(angle), y: ry * Math.sin(angle) };
  });
}

const BASE = 1400;
const RX = 500;
const RY = 230;
const ELLIPSE_PATH = ellipsePath(BASE / 2, BASE / 2, RX, RY);
const SLOTS = cardSlots(RX, RY, tools.length);

export default function ToolsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // One-time resize listener — no per-frame work. Only fires when the
  // window genuinely changes width.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / BASE);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardElements = useMemo(
    () =>
      tools.map((tool, i) => {
        const slot = SLOTS[i];
        return (
          <div
            key={tool.name}
            className="orbit-card-slot"
            style={{
              position: "absolute",
              left: `calc(50% + ${slot.x}px)`,
              top: `calc(50% + ${slot.y}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <ToolCard tool={tool} />
          </div>
        );
      }),
    []
  );

  return (
    <section
      className="relative overflow-hidden ambient-light"
      style={{ backgroundColor: "#0A0A0F", padding: "112px 0 96px" }}
    >
      {/* Single static ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#9B7BFF" }}
          >
            Ferramentas
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ferramentas que{" "}
            <span className="shimmer-text-static">trabalham por você</span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Automatize tarefas repetitivas e tome decisões com base em dados reais.
          </p>
        </ScrollReveal>

        {/* ─── Desktop / tablet: static orbital ─── */}
        <div
          ref={containerRef}
          className="hidden md:block relative mx-auto"
          style={{ width: "100%", maxWidth: "1100px", aspectRatio: "1.65 / 1" }}
        >
          {/* Scale-to-fit wrapper */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: BASE,
              height: BASE,
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {/* Static dashed orbit ellipse */}
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox={`0 0 ${BASE} ${BASE}`}
              style={{ width: BASE, height: BASE }}
            >
              <path
                d={ELLIPSE_PATH}
                fill="none"
                stroke="rgba(155,123,255,0.10)"
                strokeWidth={1.5}
                strokeDasharray="8 6"
              />
              {/* Faint force lines from center to each slot */}
              {SLOTS.map((s, i) => (
                <line
                  key={i}
                  x1={BASE / 2}
                  y1={BASE / 2}
                  x2={BASE / 2 + s.x}
                  y2={BASE / 2 + s.y}
                  stroke="rgba(155,123,255,0.05)"
                  strokeWidth={1}
                  strokeDasharray="4 8"
                />
              ))}
            </svg>

            {/* Central node — static gradient sphere with S monogram. No
                spin, no wireframe meridians, no atom rings, no glow pulse.
                Just a still ball. */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 200,
                height: 200,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Soft outer halo — static, no animation */}
              <div
                className="absolute"
                style={{
                  inset: -80,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(91,63,216,0.28) 0%, rgba(155,123,255,0.10) 30%, transparent 60%)",
                }}
              />
              {/* Sphere body */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, rgba(155,123,255,0.22) 0%, rgba(91,63,216,0.14) 26%, rgba(10,10,15,0.9) 56%, rgba(10,10,15,0.98) 100%)",
                  border: "1px solid rgba(155,123,255,0.25)",
                  boxShadow:
                    "inset 0 0 50px rgba(91,63,216,0.20), 0 0 80px rgba(91,63,216,0.16)",
                }}
              />
              {/* S monogram */}
              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M118 70 C118 70 85 70 85 88 C85 106 125 100 125 115 C125 130 90 130 90 130"
                  stroke="rgba(155,123,255,0.45)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Cards positioned around the ellipse — pre-computed, never
                move. Hover effects still work via .tool-card CSS. */}
            {cardElements}
          </div>
        </div>

        {/* ─── Mobile: horizontal swipe carousel (no auto-scroll) ─── */}
        <div className="md:hidden">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex-shrink-0 snap-center"
                style={{ width: 260 }}
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.2} className="text-center mt-12">
          <a
            href="/ferramentas"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
            style={{ color: "#9B7BFF" }}
          >
            Ver todas as ferramentas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </ScrollReveal>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
      />
    </section>
  );
}
