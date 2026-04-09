"use client";

import { useEffect, useState } from "react";

/**
 * Cursor orbit — a soft radial glow following the pointer, with two small
 * satellites orbiting around it. Everything is driven by a single rAF loop
 * and direct style.transform updates (no React re-renders, no framer-motion).
 *
 * Perf rules:
 * - Single rAF loop — one loop handles mouse + orbit time
 * - GPU transforms only (translate3d + rotate)
 * - pointer-events: none — never blocks clicks
 * - Auto-disabled on touch / coarse pointer / reduced-motion
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    setEnabled(true);

    const glow = document.getElementById("cursor-glow");
    const ring = document.getElementById("cursor-ring");
    const sat1 = document.getElementById("cursor-sat-1");
    const sat2 = document.getElementById("cursor-sat-2");
    const sat3 = document.getElementById("cursor-sat-3");
    if (!glow || !ring || !sat1 || !sat2 || !sat3) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = (t: number) => {
      // Buttery lerp follow
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;

      // Soft halo (offset by half its size: 250)
      glow.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      // Thin orbit ring centered on cursor — 60px radius
      ring.style.transform = `translate3d(${x - 60}px, ${y - 60}px, 0) rotate(${t * 0.06}deg)`;

      // Three satellites orbiting at different speeds
      const elapsed = (t - start) / 1000;
      const R = 60;
      const a1 = elapsed * 1.8;
      const a2 = elapsed * 1.4 + (Math.PI * 2) / 3;
      const a3 = elapsed * 2.2 + (Math.PI * 4) / 3;
      sat1.style.transform = `translate3d(${x + Math.cos(a1) * R - 5}px, ${y + Math.sin(a1) * R * 0.6 - 5}px, 0)`;
      sat2.style.transform = `translate3d(${x + Math.cos(a2) * R - 4}px, ${y + Math.sin(a2) * R * 0.6 - 4}px, 0)`;
      sat3.style.transform = `translate3d(${x + Math.cos(a3) * (R * 0.78) - 3}px, ${y + Math.sin(a3) * (R * 0.78) * 0.55 - 3}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const dotBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 31,
    willChange: "transform",
  };

  return (
    <>
      {/* Soft halo */}
      <div
        id="cursor-glow"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 500,
          height: 500,
          pointerEvents: "none",
          zIndex: 30,
          background:
            "radial-gradient(circle, rgba(91,63,216,0.22) 0%, rgba(155,123,255,0.10) 35%, transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Orbit ring around cursor */}
      <div
        id="cursor-ring"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "1px dashed rgba(155,123,255,0.45)",
          pointerEvents: "none",
          zIndex: 31,
          willChange: "transform",
        }}
      />
      <div
        id="cursor-sat-1"
        aria-hidden="true"
        style={{
          ...dotBase,
          width: 10,
          height: 10,
          backgroundColor: "#9B7BFF",
          boxShadow: "0 0 14px rgba(155,123,255,0.9)",
        }}
      />
      <div
        id="cursor-sat-2"
        aria-hidden="true"
        style={{
          ...dotBase,
          width: 8,
          height: 8,
          backgroundColor: "#C4B5FD",
          boxShadow: "0 0 10px rgba(196,181,253,0.85)",
        }}
      />
      <div
        id="cursor-sat-3"
        aria-hidden="true"
        style={{
          ...dotBase,
          width: 6,
          height: 6,
          backgroundColor: "#5B3FD8",
          boxShadow: "0 0 8px rgba(91,63,216,0.9)",
        }}
      />
    </>
  );
}
