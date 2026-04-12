"use client";

import { useEffect, useState } from "react";

interface Abstract3DShapeProps {
  className?: string;
  size?: number;
}

export default function Abstract3DShape({
  className = "",
  size = 500,
}: Abstract3DShapeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const half = size / 2;
  const r = size * 0.38;

  // Generate icosahedron-like wireframe vertices projected to 2D
  const vertices: [number, number][] = [];
  const rings = 5;
  const pointsPerRing = 8;

  for (let ring = 0; ring < rings; ring++) {
    const t = ring / (rings - 1);
    const y = half - r + t * r * 2;
    const ringRadius = Math.sin(t * Math.PI) * r;
    for (let p = 0; p < pointsPerRing; p++) {
      const angle = (p / pointsPerRing) * Math.PI * 2 + (ring % 2) * (Math.PI / pointsPerRing);
      const x = half + Math.cos(angle) * ringRadius;
      const yPos = y;
      vertices.push([x, yPos]);
    }
  }

  // Connect vertices to create wireframe edges
  const edges: [number, number][] = [];
  for (let ring = 0; ring < rings; ring++) {
    for (let p = 0; p < pointsPerRing; p++) {
      const i = ring * pointsPerRing + p;
      const nextP = ring * pointsPerRing + ((p + 1) % pointsPerRing);
      edges.push([i, nextP]);

      if (ring < rings - 1) {
        const nextRing = (ring + 1) * pointsPerRing + p;
        const nextRingNext = (ring + 1) * pointsPerRing + ((p + 1) % pointsPerRing);
        edges.push([i, nextRing]);
        edges.push([i, nextRingNext]);
      }
    }
  }

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="w-full h-full"
        style={{
          animation: reducedMotion ? "none" : "rotate3d 40s linear infinite",
          filter: "blur(0.5px)",
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="shape-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(91,63,216,0.2)" />
            <stop offset="100%" stopColor="rgba(91,63,216,0)" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx={half} cy={half} r={r * 1.2} fill="url(#shape-glow)" />

        {/* Wireframe edges */}
        {edges.map(([a, b], i) => {
          const [x1, y1] = vertices[a];
          const [x2, y2] = vertices[b];
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(91,63,216,0.12)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Vertex dots */}
        {vertices.map(([x, y], i) => (
          <circle
            key={`v-${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="rgba(155,123,255,0.25)"
          />
        ))}
      </svg>
    </div>
  );
}
