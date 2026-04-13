"use client";

/**
 * Pixel-art factory scene — conveyor belts with cute personalized "agent"
 * boxes representing Sellerverse's AI-powered tools.
 * Each agent has a unique icon, color, and shape.
 * Pure CSS animations — zero JS per-frame cost.
 */

const LEVELS = [
  {
    y: "18%",
    dir: "right" as const,
    agents: [
      { name: "Calculadora", color: "#9B7BFF", delay: 0, dur: 24, icon: "=", rad: 3 },
      { name: "SEO", color: "#EF9F27", delay: 8, dur: 24, icon: "S", rad: 12 },
      { name: "Ads", color: "#378ADD", delay: 16, dur: 24, icon: "A", rad: 4 },
    ],
  },
  {
    y: "38%",
    dir: "left" as const,
    agents: [
      { name: "Frete", color: "#10b981", delay: 2, dur: 28, icon: "F", rad: 3 },
      { name: "Estoque", color: "#9B7BFF", delay: 11, dur: 28, icon: "E", rad: 4 },
      { name: "Margem", color: "#EF9F27", delay: 20, dur: 28, icon: "%", rad: 5 },
    ],
  },
  {
    y: "58%",
    dir: "right" as const,
    agents: [
      { name: "Templates", color: "#378ADD", delay: 3, dur: 22, icon: "T", rad: 3 },
      { name: "M\u00e9tricas", color: "#9B7BFF", delay: 12, dur: 22, icon: "M", rad: 5 },
    ],
  },
  {
    y: "78%",
    dir: "left" as const,
    agents: [
      { name: "Monitor", color: "#10b981", delay: 0, dur: 30, icon: "!", rad: 12 },
      { name: "Relat\u00f3rios", color: "#EF9F27", delay: 7.5, dur: 30, icon: "R", rad: 4 },
      { name: "ROI", color: "#378ADD", delay: 15, dur: 30, icon: "$", rad: 12 },
      { name: "Analytics", color: "#9B7BFF", delay: 22.5, dur: 30, icon: "~", rad: 5 },
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
              <div
                className="factory-box"
                data-icon={agent.icon}
                style={{
                  "--box-color": agent.color,
                  borderRadius: agent.rad + "px",
                } as React.CSSProperties}
              />
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
