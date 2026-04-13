"use client";

import { useEffect, useRef } from "react";

/* ─── Config ────────────────────────────────────────────────────── */

const Z_GAP = 380;
const Z_START = 1000;
const CAM_SPEED = 1.1;

function seeded(s: number) {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ─── Scene illustrations for each card ─────────────────────────── */

function Scene({ index, color }: { index: number; color: string }) {
  const c = color;
  const c40 = c + "66";
  const c25 = c + "40";
  const c15 = c + "26";
  const c08 = c + "14";

  switch (index) {
    /* ── Grátis tier ── */
    case 0: // Comunidade Geral — connected people network
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <circle cx="70" cy="38" r="16" fill={c08} stroke={c25} strokeWidth="0.8" />
          <circle cx="130" cy="24" r="16" fill={c08} stroke={c25} strokeWidth="0.8" />
          <circle cx="190" cy="38" r="16" fill={c08} stroke={c25} strokeWidth="0.8" />
          <circle cx="100" cy="64" r="12" fill={c08} stroke={c15} strokeWidth="0.8" />
          <circle cx="160" cy="64" r="12" fill={c08} stroke={c15} strokeWidth="0.8" />
          <line x1="86" y1="33" x2="114" y2="28" stroke={c15} strokeWidth="0.8" />
          <line x1="146" y1="28" x2="174" y2="33" stroke={c15} strokeWidth="0.8" />
          <line x1="82" y1="48" x2="96" y2="56" stroke={c15} strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="164" y1="56" x2="178" y2="48" stroke={c15} strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="112" y1="62" x2="148" y2="62" stroke={c15} strokeWidth="0.8" strokeDasharray="3 2" />
          <circle cx="70" cy="38" r="5" fill={c25} />
          <circle cx="130" cy="24" r="5" fill={c40} />
          <circle cx="190" cy="38" r="5" fill={c25} />
          <circle cx="100" cy="64" r="4" fill={c15} />
          <circle cx="160" cy="64" r="4" fill={c15} />
        </svg>
      );
    case 1: // 3 Ferramentas — calculator, search, truck
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          {/* Calculator */}
          <rect x="30" y="18" width="48" height="56" rx="6" fill={c08} stroke={c25} strokeWidth="0.8" />
          <rect x="38" y="28" width="32" height="10" rx="2" fill={c15} />
          <rect x="38" y="44" width="8" height="8" rx="1.5" fill={c15} />
          <rect x="50" y="44" width="8" height="8" rx="1.5" fill={c15} />
          <rect x="62" y="44" width="8" height="8" rx="1.5" fill={c25} />
          <rect x="38" y="56" width="8" height="8" rx="1.5" fill={c15} />
          <rect x="50" y="56" width="8" height="8" rx="1.5" fill={c15} />
          <rect x="62" y="56" width="8" height="8" rx="1.5" fill={c15} />
          {/* Magnifier */}
          <circle cx="130" cy="38" r="18" fill={c08} stroke={c25} strokeWidth="0.8" />
          <line x1="143" y1="51" x2="156" y2="64" stroke={c25} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M123 33 L128 38 L138 28" stroke={c40} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Truck */}
          <rect x="185" y="30" width="40" height="26" rx="3" fill={c08} stroke={c25} strokeWidth="0.8" />
          <rect x="210" y="38" width="20" height="18" rx="2" fill={c15} />
          <circle cx="195" cy="60" r="5" fill={c08} stroke={c25} strokeWidth="0.8" />
          <circle cx="220" cy="60" r="5" fill={c08} stroke={c25} strokeWidth="0.8" />
          <circle cx="195" cy="60" r="2" fill={c25} />
          <circle cx="220" cy="60" r="2" fill={c25} />
        </svg>
      );
    case 2: // Conteúdo de Cursos — video player
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="50" y="10" width="160" height="70" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          <rect x="58" y="18" width="100" height="8" rx="4" fill={c15} />
          <rect x="58" y="32" width="70" height="5" rx="2.5" fill={c08} />
          <rect x="58" y="42" width="85" height="5" rx="2.5" fill={c08} />
          <circle cx="180" cy="50" r="16" fill={c15} stroke={c25} strokeWidth="0.8" />
          <path d="M175 43 L189 50 L175 57Z" fill={c40} />
          {/* Progress bar */}
          <rect x="58" y="68" width="144" height="4" rx="2" fill={c08} />
          <rect x="58" y="68" width="55" height="4" rx="2" fill={c25} />
        </svg>
      );
    case 3: // Newsletter Semanal — email envelope
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="65" y="18" width="130" height="54" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          <path d="M73 26 L130 55 L187 26" stroke={c25} strokeWidth="1" fill="none" />
          <path d="M73 64 L105 45" stroke={c15} strokeWidth="0.8" fill="none" />
          <path d="M187 64 L155 45" stroke={c15} strokeWidth="0.8" fill="none" />
          {/* Sparkles */}
          <circle cx="200" cy="22" r="2" fill={c40} />
          <circle cx="210" cy="32" r="1.5" fill={c25} />
          <circle cx="55" cy="28" r="1.5" fill={c25} />
          <path d="M48 45 L52 42 L56 45 L52 48Z" fill={c15} />
        </svg>
      );

    /* ── Pro tier ── */
    case 4: // Grupo de Mentoria — chat bubbles
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="40" y="12" width="100" height="36" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          <path d="M60 48 L50 56 L70 48" fill={c08} stroke={c25} strokeWidth="0.8" />
          <rect x="48" y="22" width="60" height="4" rx="2" fill={c15} />
          <rect x="48" y="30" width="40" height="4" rx="2" fill={c15} />
          <rect x="120" y="40" width="100" height="36" rx="8" fill={c15} stroke={c25} strokeWidth="0.8" />
          <path d="M200 76 L210 84 L190 76" fill={c15} stroke={c25} strokeWidth="0.8" />
          <rect x="128" y="50" width="55" height="4" rx="2" fill={c25} />
          <rect x="128" y="58" width="35" height="4" rx="2" fill={c25} />
        </svg>
      );
    case 5: // 12+ Ferramentas — tool grid
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={55 + col * 52}
                y={8 + row * 21}
                width="42"
                height="16"
                rx="4"
                fill={row === 1 && col === 1 ? c15 : c08}
                stroke={row === 1 && col === 1 ? c40 : c15}
                strokeWidth="0.6"
              />
            ))
          )}
          <text x="130" y="80" textAnchor="middle" fill={c25} fontSize="8" fontFamily="monospace" fontWeight="bold">12+ tools</text>
        </svg>
      );
    case 6: // Dashboard Avançado — analytics chart
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="40" y="8" width="180" height="74" rx="8" fill={c08} stroke={c15} strokeWidth="0.8" />
          {/* Chart bars */}
          {[35, 55, 40, 70, 48, 80, 60].map((h, i) => (
            <rect key={i} x={58 + i * 22} y={70 - h * 0.7} width="14" height={h * 0.7} rx="2" fill={i === 5 ? c40 : c15} />
          ))}
          {/* Trend line */}
          <path d="M65 55 L87 42 L109 48 L131 28 L153 35 L175 18 L197 22" stroke={c40} strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <circle cx="175" cy="18" r="3" fill={c} opacity="0.5" />
        </svg>
      );
    case 7: // Cursos Completos — course stack
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          {/* Stacked course cards */}
          <rect x="60" y="6" width="140" height="24" rx="6" fill={c08} stroke={c15} strokeWidth="0.6" />
          <rect x="55" y="18" width="150" height="24" rx="6" fill={c08} stroke={c15} strokeWidth="0.7" />
          <rect x="50" y="30" width="160" height="28" rx="6" fill={c08} stroke={c25} strokeWidth="0.8" />
          {/* Active card content */}
          <rect x="60" y="38" width="50" height="5" rx="2.5" fill={c25} />
          <rect x="60" y="48" width="80" height="4" rx="2" fill={c15} />
          <circle cx="185" cy="44" r="10" fill={c15} stroke={c25} strokeWidth="0.8" />
          <path d="M182 39 L190 44 L182 49Z" fill={c40} />
          {/* Progress */}
          <rect x="50" y="66" width="160" height="5" rx="2.5" fill={c08} />
          <rect x="50" y="66" width="120" height="5" rx="2.5" fill={c25} />
          <text x="215" y="72" fill={c40} fontSize="8" fontFamily="monospace" fontWeight="bold">75%</text>
        </svg>
      );
    case 8: // Suporte Prioritário — priority support
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          {/* Headset */}
          <path d="M105 50 Q105 25 130 25 Q155 25 155 50" stroke={c25} strokeWidth="2" fill="none" />
          <rect x="95" y="45" width="16" height="22" rx="6" fill={c15} stroke={c25} strokeWidth="0.8" />
          <rect x="149" y="45" width="16" height="22" rx="6" fill={c15} stroke={c25} strokeWidth="0.8" />
          <circle cx="130" cy="52" r="6" fill={c08} stroke={c25} strokeWidth="0.8" />
          {/* Priority badge */}
          <rect x="170" y="20" width="60" height="20" rx="10" fill={c15} stroke={c40} strokeWidth="0.8" />
          <text x="200" y="34" textAnchor="middle" fill={c} fontSize="9" fontWeight="700" fontFamily="monospace">P1</text>
          {/* Speed lines */}
          <line x1="50" y1="35" x2="80" y2="35" stroke={c15} strokeWidth="0.8" strokeDasharray="6 4" />
          <line x1="45" y1="45" x2="85" y2="45" stroke={c15} strokeWidth="0.6" strokeDasharray="4 3" />
          <line x1="50" y1="55" x2="80" y2="55" stroke={c15} strokeWidth="0.8" strokeDasharray="6 4" />
        </svg>
      );

    /* ── Premium tier ── */
    case 9: // Mentoria 1:1 — two people video call
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          {/* Two video frames */}
          <rect x="30" y="15" width="90" height="60" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          <rect x="140" y="15" width="90" height="60" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          {/* Person 1 */}
          <circle cx="75" cy="38" r="10" fill={c15} />
          <rect x="65" y="52" width="20" height="14" rx="4" fill={c15} />
          {/* Person 2 */}
          <circle cx="185" cy="38" r="10" fill={c15} />
          <rect x="175" y="52" width="20" height="14" rx="4" fill={c15} />
          {/* Connection line */}
          <line x1="120" y1="45" x2="140" y2="45" stroke={c40} strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="130" cy="45" r="3" fill={c40} />
          {/* 1:1 badge */}
          <text x="130" y="12" textAnchor="middle" fill={c40} fontSize="9" fontWeight="700" fontFamily="monospace">1:1</text>
        </svg>
      );
    case 10: // Monitor de Preços — price tracking
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="30" y="8" width="200" height="74" rx="8" fill={c08} stroke={c15} strokeWidth="0.8" />
          {/* Price line going up and down */}
          <path d="M45 55 L70 48 L95 52 L120 35 L145 40 L170 22 L195 28 L215 18" stroke={c40} strokeWidth="1.8" fill="none" />
          <path d="M45 55 L70 48 L95 52 L120 35 L145 40 L170 22 L195 28 L215 18 L215 72 L45 72Z" fill="url(#pmg)" opacity="0.3" />
          <defs><linearGradient id="pmg" x1="130" y1="18" x2="130" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={c} stopOpacity="0.2" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </linearGradient></defs>
          <circle cx="170" cy="22" r="4" fill={c} opacity="0.5" />
          <circle cx="215" cy="18" r="4" fill={c} opacity="0.7" />
          {/* Price labels */}
          <text x="170" y="16" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">R$42</text>
          <text x="215" y="12" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">R$38</text>
        </svg>
      );
    case 11: // SLA 2 Horas — clock
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <circle cx="130" cy="45" r="32" fill={c08} stroke={c25} strokeWidth="1" />
          <circle cx="130" cy="45" r="28" fill={c08} stroke={c15} strokeWidth="0.5" />
          {/* Clock marks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line key={deg}
              x1={130 + 24 * Math.cos((deg - 90) * Math.PI / 180)}
              y1={45 + 24 * Math.sin((deg - 90) * Math.PI / 180)}
              x2={130 + 27 * Math.cos((deg - 90) * Math.PI / 180)}
              y2={45 + 27 * Math.sin((deg - 90) * Math.PI / 180)}
              stroke={deg % 90 === 0 ? c40 : c15} strokeWidth={deg % 90 === 0 ? "1.2" : "0.6"}
            />
          ))}
          {/* Hour hand — pointing at 2 */}
          <line x1="130" y1="45" x2="145" y2="28" stroke={c40} strokeWidth="2" strokeLinecap="round" />
          {/* Minute hand */}
          <line x1="130" y1="45" x2="130" y2="22" stroke={c25} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="130" cy="45" r="3" fill={c40} />
          {/* 2h label */}
          <text x="200" y="35" fill={c40} fontSize="14" fontWeight="800" fontFamily="var(--font-display)">2h</text>
          <text x="200" y="48" fill={c15} fontSize="8" fontFamily="monospace">SLA</text>
        </svg>
      );
    case 12: // Auditoria de Negócio — audit report
      return (
        <svg viewBox="0 0 260 90" fill="none" className="hyper-scene-svg">
          <rect x="70" y="4" width="120" height="82" rx="8" fill={c08} stroke={c25} strokeWidth="0.8" />
          {/* Header bar */}
          <rect x="78" y="12" width="104" height="10" rx="3" fill={c15} />
          {/* Checklist items */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="82" y={30 + i * 14} width="10" height="10" rx="2" fill={i < 3 ? c15 : c08} stroke={c25} strokeWidth="0.6" />
              {i < 3 && <path d={`M${84} ${35 + i * 14} L${87} ${38 + i * 14} L${92} ${32 + i * 14}`} stroke={c40} strokeWidth="1.2" fill="none" />}
              <rect x="98" y={32 + i * 14} width={60 - i * 10} height="5" rx="2.5" fill={c15} />
            </g>
          ))}
          {/* Score badge */}
          <circle cx="210" cy="50" r="20" fill={c08} stroke={c40} strokeWidth="1.5" />
          <text x="210" y="46" textAnchor="middle" fill={c} fontSize="11" fontWeight="800" fontFamily="var(--font-display)">92</text>
          <text x="210" y="57" textAnchor="middle" fill={c15} fontSize="7" fontFamily="monospace">/100</text>
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Real plan features, ordered by tier ───────────────────────── */

const FEATURES = [
  { tier: "Gr\u00e1tis", title: "Comunidade Geral", desc: "Acesso a +2.500 sellers compartilhando experi\u00eancias reais", color: "#378ADD" },
  { tier: "Gr\u00e1tis", title: "3 Ferramentas", desc: "Calculadora de margem, gerador SEO e simulador de frete", color: "#378ADD" },
  { tier: "Gr\u00e1tis", title: "Conte\u00fado de Cursos", desc: "Acesso ao conte\u00fado introdut\u00f3rio de todos os cursos", color: "#378ADD" },
  { tier: "Gr\u00e1tis", title: "Newsletter Semanal", desc: "Tend\u00eancias e insights do mercado toda semana no seu e-mail", color: "#378ADD" },

  { tier: "Pro", title: "Grupo de Mentoria", desc: "Grupo exclusivo com sellers experientes e mentores dedicados", color: "#EF9F27" },
  { tier: "Pro", title: "12+ Ferramentas", desc: "Acesso completo a todas as ferramentas da plataforma", color: "#EF9F27" },
  { tier: "Pro", title: "Dashboard Avan\u00e7ado", desc: "M\u00e9tricas detalhadas e relat\u00f3rios mensais personalizados", color: "#EF9F27" },
  { tier: "Pro", title: "Cursos Completos", desc: "Acesso ilimitado a todos os cursos e materiais exclusivos", color: "#EF9F27" },
  { tier: "Pro", title: "Suporte Priorit\u00e1rio", desc: "Atendimento r\u00e1pido com prioridade na fila de suporte", color: "#EF9F27" },

  { tier: "Premium", title: "Mentoria 1:1", desc: "Sess\u00f5es mensais individuais com especialistas s\u00eanior", color: "#9B7BFF" },
  { tier: "Premium", title: "Monitor de Pre\u00e7os", desc: "Acompanhe pre\u00e7os da concorr\u00eancia em tempo real", color: "#9B7BFF" },
  { tier: "Premium", title: "SLA 2 Horas", desc: "Garantia de resposta do suporte em at\u00e9 2 horas", color: "#9B7BFF" },
  { tier: "Premium", title: "Auditoria de Neg\u00f3cio", desc: "Diagn\u00f3stico completo e plano de a\u00e7\u00e3o personalizado", color: "#9B7BFF" },
];

/* Gentle alternating positions — slightly wider spread for illustration cards */
const POSITIONS = [
  { x: -140, y: -20, rot: -2.5 },
  { x: 150, y: 30, rot: 2 },
  { x: -125, y: 40, rot: -1.5 },
  { x: 145, y: -35, rot: 2.5 },
  { x: -155, y: 15, rot: -2 },
  { x: 135, y: -25, rot: 1.5 },
  { x: -140, y: 45, rot: -2.5 },
  { x: 140, y: -30, rot: 2 },
  { x: -130, y: 25, rot: -1.5 },
  { x: 150, y: 35, rot: 2.5 },
  { x: -140, y: -40, rot: -2 },
  { x: 145, y: 20, rot: 1.5 },
  { x: -125, y: -15, rot: -2.5 },
];

interface FeatureItem {
  tier: string;
  title: string;
  desc: string;
  color: string;
  x: number;
  y: number;
  z: number;
  rot: number;
}

const ITEMS: FeatureItem[] = FEATURES.map((f, i) => ({
  ...f,
  ...POSITIONS[i],
  z: -(i * Z_GAP + Z_START),
}));

const TOTAL_Z = FEATURES.length * Z_GAP + Z_START;

/* Stars */
const STAR_COUNT = 60;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: (seeded(i * 7 + 1) - 0.5) * 2200,
  y: (seeded(i * 13 + 3) - 0.5) * 1400,
  z: -seeded(i * 19 + 7) * TOTAL_Z,
  size: 1 + seeded(i * 23 + 11) * 1.5,
  opacity: 0.12 + seeded(i * 29 + 17) * 0.3,
}));

/* ─── Component ──────────────────────────────────────────────────── */

export default function PlanosHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef<(HTMLDivElement | null)[]>([]);
  const visibleRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const world = worldRef.current;
    const overlay = overlayRef.current;
    if (!section || !world || !overlay) return;

    // Pause 3D calculations when off-screen
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(section);

    let mouseX = 0;
    let mouseY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let currentCamZ = 0;
    let rafId: number;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visibleRef.current) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

      /* Smooth lerp — slightly slower for richer cards */
      const targetCamZ = progress * TOTAL_Z * CAM_SPEED;
      currentCamZ += (targetCamZ - currentCamZ) * 0.065;

      /* Subtle mouse tilt */
      tiltX += (mouseY * 1.5 - tiltX) * 0.04;
      tiltY += (mouseX * 1.5 - tiltY) * 0.04;

      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${currentCamZ}px)`;

      /* Visibility window — wider for illustrated cards */
      for (let i = 0; i < ITEMS.length; i++) {
        const el = itemEls.current[i];
        if (!el) continue;
        const relZ = ITEMS[i].z + currentCamZ;
        let a = 1;
        if (relZ < -1400) a = 0;
        else if (relZ < -500) a = (relZ + 1400) / 900;
        if (relZ > 250) a = 1 - (relZ - 250) / 350;
        el.style.opacity = String(Math.max(0, Math.min(1, a)));
      }

      /* Overlay fades out */
      overlay.style.opacity = String(progress < 0.08 ? 1 - progress / 0.08 : 0);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "480vh", position: "relative" }}>
      <div className="hyper-viewport">
        <div className="hyper-world" ref={worldRef}>
          {STARS.map((s, i) => (
            <div
              key={`s${i}`}
              className="hyper-star"
              style={{
                transform: `translate3d(${s.x}px, ${s.y}px, ${s.z}px)`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
              }}
            />
          ))}

          {ITEMS.map((item, i) => (
            <div
              key={`f${i}`}
              ref={(el) => { itemEls.current[i] = el; }}
              className="hyper-item"
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotateZ(${item.rot}deg)`,
              }}
            >
              <div
                className="hyper-feature-card hyper-feature-card--illustrated"
                style={{ "--tier-color": item.color } as React.CSSProperties}
              >
                {/* Visual scene illustration */}
                <div className="hyper-feature-scene">
                  <Scene index={i} color={item.color} />
                  {/* Grid overlay */}
                  <div className="hyper-scene-grid" />
                </div>

                <div
                  className="hyper-feature-badge"
                  style={{
                    color: item.color,
                    borderColor: item.color + "30",
                    backgroundColor: item.color + "12",
                  }}
                >
                  {item.tier}
                </div>
                <h3 className="hyper-feature-title">{item.title}</h3>
                <p className="hyper-feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Title overlay — visible at start, fades on scroll */}
        <div ref={overlayRef} className="hyper-overlay">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              Planos e Pre&ccedil;os
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              maxWidth: 820,
              margin: "0 auto 24px",
              letterSpacing: "-0.02em",
            }}
          >
            Escolha o plano ideal para o{" "}
            <span
              className="shimmer-text"
              style={{
                WebkitTextFillColor: "unset",
                background:
                  "linear-gradient(90deg, #EF9F27 0%, #FAC775 25%, #EF9F27 50%, #FAC775 75%, #EF9F27 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              seu neg&oacute;cio
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Comece gr&aacute;tis. Fa&ccedil;a upgrade quando seu neg&oacute;cio pedir mais.
          </p>

          <div
            style={{
              marginTop: 48,
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            &darr; SCROLL PARA EXPLORAR
          </div>
        </div>

        <div className="hyper-vignette" />
      </div>
    </section>
  );
}
