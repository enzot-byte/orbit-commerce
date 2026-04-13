"use client";

import { useEffect, useRef } from "react";

/* ─── Config ────────────────────────────────────────────────────── */

const Z_GAP = 300;
const Z_START = 1000;
const CAM_SPEED = 1.1;

function seeded(s: number) {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
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

/* Gentle alternating positions */
const POSITIONS = [
  { x: -130, y: -25, rot: -3 },
  { x: 145, y: 35, rot: 2.5 },
  { x: -120, y: 45, rot: -2 },
  { x: 140, y: -40, rot: 3 },
  { x: -150, y: 20, rot: -2.5 },
  { x: 130, y: -30, rot: 2 },
  { x: -140, y: 50, rot: -3 },
  { x: 135, y: -35, rot: 2.5 },
  { x: -125, y: 30, rot: -2 },
  { x: 145, y: 40, rot: 3 },
  { x: -135, y: -45, rot: -2.5 },
  { x: 140, y: 20, rot: 2 },
  { x: -120, y: -20, rot: -3 },
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
const STAR_COUNT = 50;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: (seeded(i * 7 + 1) - 0.5) * 2000,
  y: (seeded(i * 13 + 3) - 0.5) * 1200,
  z: -seeded(i * 19 + 7) * TOTAL_Z,
  size: 1 + seeded(i * 23 + 11) * 1.5,
  opacity: 0.15 + seeded(i * 29 + 17) * 0.35,
}));

/* ─── Component ──────────────────────────────────────────────────── */

export default function PlanosHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const world = worldRef.current;
    const overlay = overlayRef.current;
    if (!section || !world || !overlay) return;

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

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

      /* Smooth lerp for buttery scroll */
      const targetCamZ = progress * TOTAL_Z * CAM_SPEED;
      currentCamZ += (targetCamZ - currentCamZ) * 0.08;

      /* Subtle mouse tilt */
      tiltX += (mouseY * 1.5 - tiltX) * 0.04;
      tiltY += (mouseX * 1.5 - tiltY) * 0.04;

      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${currentCamZ}px)`;

      /* Tight visibility window — 3-4 cards visible at once */
      for (let i = 0; i < ITEMS.length; i++) {
        const el = itemEls.current[i];
        if (!el) continue;
        const relZ = ITEMS[i].z + currentCamZ;
        let a = 1;
        if (relZ < -1200) a = 0;
        else if (relZ < -400) a = (relZ + 1200) / 800;
        if (relZ > 200) a = 1 - (relZ - 200) / 300;
        el.style.opacity = String(Math.max(0, Math.min(1, a)));
      }

      /* Overlay fades out — extended range so title is readable longer */
      overlay.style.opacity = String(progress < 0.10 ? 1 - progress / 0.10 : 0);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
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
                className="hyper-feature-card"
                style={{ "--tier-color": item.color } as React.CSSProperties}
              >
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
