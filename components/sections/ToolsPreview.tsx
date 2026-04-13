"use client";

import { useMemo, useEffect, useRef, useState } from "react";
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
    desc: "Lucro líquido e margem em segundos",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    border: "rgba(155,123,255,0.2)",
  },
  {
    icon: Search,
    name: "Gerador de Títulos SEO",
    desc: "Títulos otimizados para rankear melhor",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    border: "rgba(239,159,39,0.2)",
  },
  {
    icon: Truck,
    name: "Simulador de Frete",
    desc: "Compare e ache o frete mais barato",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    border: "rgba(155,123,255,0.2)",
  },
  {
    icon: Package,
    name: "Planilha de Estoque",
    desc: "Alertas de reposição automáticos",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    border: "rgba(239,159,39,0.2)",
  },
  {
    icon: FileText,
    name: "Template de Anúncio",
    desc: "Estruturas que convertem mais",
    badge: "Pro",
    type: "pro" as const,
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    border: "rgba(239,159,39,0.2)",
  },
  {
    icon: BarChart2,
    name: "Dashboard de Métricas",
    desc: "Visualize seus KPIs de vendas",
    badge: "Grátis",
    type: "free" as const,
    color: "#9B7BFF",
    bg: "rgba(155,123,255,0.12)",
    border: "rgba(155,123,255,0.2)",
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
    return 0.78 + d * 0.22;
  });

  const op = useTransform(progress, (p: number) => {
    const a = ((((p + off) % 100) + 100) % 100 / 100) * Math.PI * 2;
    const d = (Math.sin(a) + 1) / 2;
    return 0.35 + d * 0.65;
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

/* ─── Tool Card (compact, for orbit) ─────────────────────────────────────── */

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = tool.icon;
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200"
      style={{
        background: "rgba(10,10,15,0.88)",
        border: `1px solid ${tool.border}`,
        backdropFilter: "blur(12px)",
        minWidth: 250,
        boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 20px ${tool.type === "pro" ? "rgba(239,159,39,0.05)" : "rgba(91,63,216,0.08)"}`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: tool.bg }}
      >
        <Icon className="w-5 h-5" style={{ color: tool.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-white text-sm leading-tight">
          {tool.name}
        </p>
        <p className="text-[11px] text-white/35 leading-tight mt-0.5 truncate">
          {tool.desc}
        </p>
      </div>
      <span
        className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
        style={
          tool.type === "free"
            ? { backgroundColor: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }
            : { backgroundColor: "rgba(239,159,39,0.15)", color: "#EF9F27", border: "1px solid rgba(239,159,39,0.15)" }
        }
      >
        {tool.badge}
      </span>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function ToolsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);

  const BASE = 1400;
  const cx = BASE / 2;
  const cy = BASE / 2;
  const RX = 550;
  const RY = 140;
  const ROT = -6;
  const DUR = 45;

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

  // Orbit loop — lightweight rAF, only updates a single number
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
      style={{ backgroundColor: "#0A0A0F", padding: "128px 0 80px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,63,216,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* ────────── Desktop: Orbit ────────── */}
        <div
          ref={containerRef}
          className="orbit-container hidden md:block"
          style={{ width: "100%", aspectRatio: "2.4 / 1" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
              <svg
                className="orbit-path-svg"
                viewBox={`0 0 ${BASE} ${BASE}`}
              >
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(155,123,255,0.07)"
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
                  <ToolCard tool={tool} />
                </OrbitItem>
              ))}
            </div>
          </div>

          {/* Center content */}
          <div className="orbit-center-content">
            <div className="text-center max-w-lg px-4">
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
                <span className="shimmer-text">trabalham por você</span>
              </h2>
              <p className="text-base text-white/40 max-w-md mx-auto">
                Automatize tarefas repetitivas e tome decisões com base em dados
                reais.
              </p>
            </div>
          </div>
        </div>

        {/* ────────── Mobile: Grid fallback ────────── */}
        <div className="md:hidden">
          <ScrollReveal direction="up" className="text-center mb-10">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#9B7BFF" }}
            >
              Ferramentas
            </p>
            <h2
              className="text-3xl font-display font-bold text-white leading-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ferramentas que{" "}
              <span className="shimmer-text">trabalham por você</span>
            </h2>
            <p className="text-base text-white/40 max-w-md mx-auto">
              Automatize tarefas e tome decisões com dados reais.
            </p>
          </ScrollReveal>

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
        <ScrollReveal direction="up" delay={0.2} className="text-center mt-4">
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
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0F)",
        }}
      />
    </section>
  );
}
