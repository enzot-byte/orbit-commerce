"use client";

import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { type MotionValue, motion, useMotionValue, useTransform } from "framer-motion";
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
    border: "rgba(155,123,255,0.25)",
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
    border: "rgba(239,159,39,0.25)",
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
    border: "rgba(155,123,255,0.25)",
    headerBg: "rgba(91,63,216,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <circle cx="40" cy="60" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="40" cy="60" r="3" fill="rgba(155,123,255,0.25)" />
        <circle cx="190" cy="25" r="8" stroke="rgba(155,123,255,0.3)" strokeWidth="1" fill="rgba(155,123,255,0.08)" />
        <circle cx="190" cy="25" r="3" fill="#9B7BFF" opacity="0.5" />
        <path d="M48 57 Q90 48 120 38 Q150 28 182 27" stroke="rgba(155,123,255,0.25)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <circle cx="120" cy="38" r="3.5" fill="rgba(155,123,255,0.15)" stroke="rgba(155,123,255,0.3)" strokeWidth="0.5" />
        <rect x="80" y="68" width="60" height="14" rx="4" fill="rgba(155,123,255,0.08)" stroke="rgba(155,123,255,0.15)" strokeWidth="0.5" />
        <text x="110" y="78" textAnchor="middle" fill="rgba(155,123,255,0.4)" fontSize="7" fontFamily="monospace">-30% custo</text>
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
    border: "rgba(239,159,39,0.25)",
    headerBg: "rgba(239,159,39,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={20 + col * 42}
              y={10 + row * 26}
              width="34"
              height="19"
              rx="3"
              fill={row === 1 && col === 2 ? "rgba(239,159,39,0.2)" : "rgba(239,159,39,0.06)"}
              stroke={row === 1 && col === 2 ? "rgba(239,159,39,0.4)" : "rgba(239,159,39,0.12)"}
              strokeWidth="0.5"
            />
          ))
        )}
        <circle cx="125" cy="36" r="5" fill="rgba(239,159,39,0.3)" />
        <text x="125" y="39" textAnchor="middle" fill="#0A0A0F" fontSize="6" fontWeight="bold">!</text>
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
    border: "rgba(239,159,39,0.25)",
    headerBg: "rgba(239,159,39,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <rect x="60" y="4" width="110" height="82" rx="6" fill="rgba(239,159,39,0.04)" stroke="rgba(239,159,39,0.15)" strokeWidth="0.8" />
        <rect x="72" y="14" width="86" height="6" rx="3" fill="rgba(239,159,39,0.15)" />
        <rect x="72" y="26" width="64" height="4" rx="2" fill="rgba(239,159,39,0.08)" />
        <rect x="72" y="35" width="74" height="4" rx="2" fill="rgba(239,159,39,0.08)" />
        <rect x="72" y="44" width="50" height="4" rx="2" fill="rgba(239,159,39,0.06)" />
        <rect x="72" y="55" width="86" height="20" rx="4" fill="rgba(239,159,39,0.06)" stroke="rgba(239,159,39,0.12)" strokeWidth="0.5" />
        <rect x="72" y="78" width="86" height="6" rx="3" fill="rgba(239,159,39,0.12)" />
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
    border: "rgba(155,123,255,0.25)",
    headerBg: "rgba(91,63,216,0.10)",
    illustration: (
      <svg viewBox="0 0 240 90" fill="none" className="w-full h-full">
        <path d="M15 55 L45 42 L75 48 L105 25 L135 32 L165 14 L195 20 L220 8" stroke="rgba(155,123,255,0.35)" strokeWidth="1.5" fill="none" />
        <path d="M15 55 L45 42 L75 48 L105 25 L135 32 L165 14 L195 20 L220 8 L220 75 L15 75 Z" fill="url(#cg2)" />
        <defs>
          <linearGradient id="cg2" x1="120" y1="8" x2="120" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(155,123,255,0.14)" />
            <stop offset="100%" stopColor="rgba(155,123,255,0)" />
          </linearGradient>
        </defs>
        <circle cx="105" cy="25" r="3" fill="#9B7BFF" opacity="0.5" />
        <circle cx="165" cy="14" r="3" fill="#9B7BFF" opacity="0.5" />
        <circle cx="220" cy="8" r="3" fill="#9B7BFF" opacity="0.7" />
      </svg>
    ),
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

/* ─── Orbit Item ─────────────────────────────────────────────────────────── */

function OrbitItem({
  children,
  index,
  total,
  path,
  rot,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  path: string;
  rot: number;
  progress: MotionValue<number>;
}) {
  const off = (index / total) * 100;

  const dist = useTransform(progress, (p: number) => {
    return `${(((p + off) % 100) + 100) % 100}%`;
  });

  const z = useTransform(progress, (p: number) => {
    const a = ((((p + off) % 100) + 100) % 100 / 100) * Math.PI * 2;
    return Math.round((Math.sin(a) + 1) * 50);
  });

  const sc = useTransform(progress, (p: number) => {
    const a = ((((p + off) % 100) + 100) % 100 / 100) * Math.PI * 2;
    const d = (Math.sin(a) + 1) / 2;
    return 0.82 + d * 0.18;
  });

  const op = useTransform(progress, (p: number) => {
    const a = ((((p + off) % 100) + 100) % 100 / 100) * Math.PI * 2;
    const d = (Math.sin(a) + 1) / 2;
    return 0.3 + d * 0.7;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance: dist,
        zIndex: z,
        scale: sc,
        opacity: op,
        willChange: "offset-distance, transform, opacity",
      }}
    >
      <div style={{ transform: `rotate(${-rot}deg)` }}>{children}</div>
    </motion.div>
  );
}

/* ─── Tool Card — with thematic illustration ─────────────────────────────── */

function ToolCard({
  tool,
  onHoverChange,
}: {
  tool: (typeof tools)[number];
  onHoverChange: (h: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = tool.icon;
  return (
    <div
      onMouseEnter={() => { setHovered(true); onHoverChange(true); }}
      onMouseLeave={() => { setHovered(false); onHoverChange(false); }}
      className="relative flex flex-col rounded-2xl cursor-pointer overflow-hidden"
      style={{
        width: 280,
        background: hovered
          ? "linear-gradient(180deg, rgba(30,30,58,0.98) 0%, rgba(22,22,44,0.96) 100%)"
          : "linear-gradient(180deg, rgba(22,22,44,0.96) 0%, rgba(16,16,34,0.95) 100%)",
        border: `1px solid ${hovered ? tool.color + "55" : tool.border}`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 80px ${tool.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Hover spotlight glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-[1]"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${tool.color}20, transparent 65%)`,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Illustration header */}
      <div
        className="relative w-full overflow-hidden z-[2]"
        style={{
          height: 90,
          background: `linear-gradient(180deg, ${tool.headerBg} 0%, transparent 100%)`,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            filter: hovered ? "brightness(1.8)" : "brightness(1.15)",
            transition: "filter 0.35s ease",
          }}
        >
          {tool.illustration}
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Badge */}
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

      {/* Body */}
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
        <p className="text-[11px] text-white/55 leading-relaxed">
          {tool.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function ToolsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hoveredCount, setHoveredCount] = useState(0);
  const progress = useMotionValue(0);

  const isPaused = hoveredCount > 0;

  const handleCardHover = useCallback((hovering: boolean) => {
    setHoveredCount((c) => c + (hovering ? 1 : -1));
  }, []);

  // Orbit geometry — more vertical ellipse, minimal rotation
  const BASE = 1400;
  const cx = BASE / 2;
  const cy = BASE / 2;
  const RX = 500;
  const RY = 230;
  const ROT = -3;
  const DUR = 50;

  const path = useMemo(() => ellipsePath(cx, cy, RX, RY), [cx, cy]);

  // Responsive scale
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / BASE);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Orbit loop
  useEffect(() => {
    if (isPaused) return;
    let last: number | null = null;
    let raf: number;
    const loop = (now: number) => {
      if (last !== null) {
        const dt = (now - last) / 1000;
        progress.set((progress.get() + (dt / DUR) * 100) % 100);
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, progress]);

  return (
    <section
      className="relative overflow-hidden ambient-light"
      style={{ backgroundColor: "#0A0A0F", padding: "128px 0 100px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.09) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(155,123,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* ─── Section Title — ABOVE orbit, never clipped ─── */}
        <ScrollReveal direction="up" className="text-center mb-6">
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
            <span className="shimmer-text">trabalham por voc&ecirc;</span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Automatize tarefas repetitivas e tome decis&otilde;es com base em dados reais.
          </p>
        </ScrollReveal>

        {/* ─── Desktop: Orbit ─── */}
        <div
          ref={containerRef}
          className="orbit-container hidden md:block"
          style={{ width: "100%", aspectRatio: "1.65 / 1" }}
        >
          {/* Scaling wrapper */}
          <div
            className="orbit-scaling-container orbit-scaling-container--responsive"
            style={{
              width: BASE,
              height: BASE,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <div
              className="orbit-rotation-wrapper"
              style={{ transform: `rotate(${ROT}deg)` }}
            >
              {/* Ellipse path */}
              <svg className="orbit-path-svg" viewBox={`0 0 ${BASE} ${BASE}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(155,123,255,0.06)"
                  strokeWidth={1.5 / Math.max(scale, 0.3)}
                  strokeDasharray={`${8 / Math.max(scale, 0.3)} ${6 / Math.max(scale, 0.3)}`}
                />
              </svg>

              {/* Orbiting cards */}
              {tools.map((tool, i) => (
                <OrbitItem
                  key={tool.name}
                  index={i}
                  total={tools.length}
                  path={path}
                  rot={ROT}
                  progress={progress}
                >
                  <ToolCard tool={tool} onHoverChange={handleCardHover} />
                </OrbitItem>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Mobile: Grid fallback ─── */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${tool.border}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: tool.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-white text-sm">
                      {tool.name}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={
                      tool.type === "free"
                        ? { backgroundColor: "rgba(16,185,129,0.15)", color: "#34d399" }
                        : { backgroundColor: "rgba(239,159,39,0.15)", color: "#EF9F27" }
                    }
                  >
                    {tool.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.2} className="text-center mt-2">
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
