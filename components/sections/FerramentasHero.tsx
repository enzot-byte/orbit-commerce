"use client";

/**
 * Pixel-art factory scene — conveyor belts with cute "agent" boxes
 * representing Sellerverse's AI-powered tools processing seller data.
 * Pure CSS animations — zero JS per-frame cost.
 */

const LEVELS = [
  {
    y: "18%",
    dir: "right" as const,
    agents: [
      { name: "Calculadora", color: "#9B7BFF", delay: 0, dur: 14 },
      { name: "SEO", color: "#EF9F27", delay: 4.5, dur: 14 },
      { name: "Ads", color: "#378ADD", delay: 9, dur: 14 },
    ],
  },
  {
    y: "38%",
    dir: "left" as const,
    agents: [
      { name: "Frete", color: "#10b981", delay: 1, dur: 16 },
      { name: "Estoque", color: "#9B7BFF", delay: 6, dur: 16 },
      { name: "Margem", color: "#EF9F27", delay: 11, dur: 16 },
    ],
  },
  {
    y: "58%",
    dir: "right" as const,
    agents: [
      { name: "Templates", color: "#378ADD", delay: 2, dur: 12 },
      { name: "Métricas", color: "#9B7BFF", delay: 6, dur: 12 },
    ],
  },
  {
    y: "78%",
    dir: "left" as const,
    agents: [
      { name: "Monitor", color: "#10b981", delay: 0, dur: 18 },
      { name: "Relatórios", color: "#EF9F27", delay: 5, dur: 18 },
      { name: "ROI", color: "#378ADD", delay: 10, dur: 18 },
      { name: "Analytics", color: "#9B7BFF", delay: 15, dur: 18 },
    ],
  },
];

const TUBES = [
  { x: "78%", y1: "22%", h: "16%" },
  { x: "22%", y1: "42%", h: "16%" },
  { x: "65%", y1: "62%", h: "16%" },
];

export default function FerramentasHero() {
  return (
    <div className="factory-scene" aria-hidden="true">
      {/* Conveyor belt levels */}
      {LEVELS.map((lvl, li) => (
        <div key={li} className="factory-level" style={{ top: lvl.y }}>
          {/* Belt track */}
          <div className={`factory-belt factory-belt-${lvl.dir}`} />

          {/* Agent boxes on this belt */}
          {lvl.agents.map((agent, ai) => (
            <div
              key={ai}
              className={`factory-agent ${lvl.dir === "left" ? "factory-agent-rev" : ""}`}
              style={{
                animationDelay: `${agent.delay}s`,
                animationDuration: `${agent.dur}s`,
              }}
            >
              <div className="factory-box" style={{ "--box-color": agent.color } as React.CSSProperties} />
              <span className="factory-label">{agent.name}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Vertical tubes connecting levels */}
      {TUBES.map((t, i) => (
        <div
          key={i}
          className="factory-tube"
          style={{ left: t.x, top: t.y1, height: t.h }}
        >
          <div className="factory-tube-ball" />
        </div>
      ))}
    </div>
  );
}
