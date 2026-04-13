"use client";

import { useEffect, useRef } from "react";

/* ─── Scene data ─────────────────────────────────────────────────── */

const Z_GAP = 800;
const CAM_SPEED = 2.0;

function seeded(s: number) {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const CARDS = [
  { id: "01", title: "COMUNIDADE", desc: "+2.500 sellers conectados compartilhando experiências reais", accent: "#9B7BFF" },
  { id: "02", title: "FERRAMENTAS", desc: "15+ ferramentas inteligentes para cada etapa do e-commerce", accent: "#EF9F27" },
  { id: "03", title: "CONSULTORIA", desc: "Mentoria 1:1 com especialistas sênior em marketplaces", accent: "#378ADD" },
  { id: "04", title: "CURSOS", desc: "Acesso ilimitado a todos os cursos e conteúdos exclusivos", accent: "#10b981" },
  { id: "05", title: "DASHBOARD", desc: "Métricas avançadas e relatórios personalizados em tempo real", accent: "#9B7BFF" },
  { id: "06", title: "SUPORTE", desc: "Atendimento prioritário com SLA de resposta em 2 horas", accent: "#EF9F27" },
  { id: "07", title: "GARANTIA", desc: "7 dias de garantia incondicional em qualquer plano pago", accent: "#10b981" },
];

const TEXTS = ["SELLER", "VERSE", "PRO", "SCALE", "PREMIUM"];

// Card spiral positions: alternate sides for visual variety
const CARD_POS = [
  { x: 320, y: -80, rot: -8 },
  { x: -300, y: 70, rot: 10 },
  { x: 280, y: 100, rot: -6 },
  { x: -320, y: -50, rot: 12 },
  { x: 300, y: 60, rot: -10 },
  { x: -250, y: -80, rot: 8 },
  { x: 200, y: 90, rot: -5 },
];

interface Item {
  type: "text" | "card";
  content?: string;
  id?: string;
  title?: string;
  desc?: string;
  accent?: string;
  x: number;
  y: number;
  z: number;
  rot: number;
}

// Build interleaved timeline: text → card → text → card…
const ITEMS: Item[] = [];
let zIdx = 0;
for (let i = 0; i < Math.max(TEXTS.length, CARDS.length); i++) {
  if (i < TEXTS.length) {
    ITEMS.push({ type: "text", content: TEXTS[i], x: 0, y: 0, z: -zIdx * Z_GAP, rot: 0 });
    zIdx++;
  }
  if (i < CARDS.length) {
    const p = CARD_POS[i];
    ITEMS.push({ type: "card", ...CARDS[i], x: p.x, y: p.y, z: -zIdx * Z_GAP, rot: p.rot });
    zIdx++;
  }
}

const TOTAL_Z = zIdx * Z_GAP;
const STAR_COUNT = 100;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: (seeded(i * 7 + 1) - 0.5) * 2500,
  y: (seeded(i * 13 + 3) - 0.5) * 1500,
  z: -seeded(i * 19 + 7) * TOTAL_Z,
  size: 1 + seeded(i * 23 + 11) * 2,
  opacity: 0.3 + seeded(i * 29 + 17) * 0.5,
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

      const camZ = progress * TOTAL_Z * CAM_SPEED;

      // Smooth mouse tilt (lerp)
      tiltX += (mouseY * 3 - tiltX) * 0.05;
      tiltY += (mouseX * 3 - tiltY) * 0.05;

      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${camZ}px)`;

      // Item opacity by Z proximity
      for (let i = 0; i < ITEMS.length; i++) {
        const el = itemEls.current[i];
        if (!el) continue;
        const relZ = ITEMS[i].z + camZ;
        let a = 1;
        if (relZ < -3000) a = 0;
        else if (relZ < -1500) a = (relZ + 3000) / 1500;
        if (relZ > 300) a = 1 - (relZ - 300) / 400;
        el.style.opacity = String(Math.max(0, Math.min(1, a)));
      }

      // Overlay fade
      overlay.style.opacity = String(progress < 0.08 ? 1 - progress / 0.08 : 0);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
      <div className="hyper-viewport">
        {/* 3D world */}
        <div className="hyper-world" ref={worldRef}>
          {/* Stars */}
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

          {/* Scene items */}
          {ITEMS.map((item, i) => (
            <div
              key={`i${i}`}
              ref={(el) => { itemEls.current[i] = el; }}
              className="hyper-item"
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotateZ(${item.rot}deg)`,
              }}
            >
              {item.type === "text" ? (
                <div className="hyper-big-text">{item.content}</div>
              ) : (
                <div
                  className="hyper-card"
                  style={{ "--accent-color": item.accent } as React.CSSProperties}
                >
                  <div className="hyper-card-header">
                    <span className="hyper-card-id">ID-{item.id}</span>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: item.accent,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <h3 className="hyper-card-title">{item.title}</h3>
                  <p className="hyper-card-desc">{item.desc}</p>
                  <div className="hyper-card-footer">
                    <span>SELLERVERSE</span>
                    <span>FEATURE.{item.id}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Title overlay — visible at scroll start, fades out */}
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
              Planos e Preços
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
              seu negócio
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
            Comece grátis. Faça upgrade quando seu negócio pedir mais.
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
            ↓ SCROLL PARA EXPLORAR
          </div>
        </div>

        {/* Vignette for depth */}
        <div className="hyper-vignette" />
      </div>
    </section>
  );
}
