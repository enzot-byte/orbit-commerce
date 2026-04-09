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
    const sat1 = document.getElementById("cursor-sat-1");
    const sat2 = document.getElementById("cursor-sat-2");
    if (!glow || !sat1 || !sat2) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    // Smoothed position (eases toward target)
    let x = targetX;
    let y = targetY;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = (t: number) => {
      // Smooth easing (lerp ~0.18 for buttery follow)
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;

      // Big soft glow (offset by half its size: 250)
      glow.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;

      // Orbiting satellites
      const elapsed = (t - start) / 1000;
      const r = 34;
      const a1 = elapsed * 1.6;
      const a2 = elapsed * 1.6 + Math.PI;
      const s1x = x + Math.cos(a1) * r - 4;
      const s1y = y + Math.sin(a1) * r * 0.55 - 4;
      const s2x = x + Math.cos(a2) * r - 3;
      const s2y = y + Math.sin(a2) * r * 0.55 - 3;
      sat1.style.transform = `translate3d(${s1x}px, ${s1y}px, 0)`;
      sat2.style.transform = `translate3d(${s2x}px, ${s2y}px, 0)`;

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
            "radial-gradient(circle, rgba(91,63,216,0.16) 0%, rgba(155,123,255,0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Satellite 1 — purple */}
      <div
        id="cursor-sat-1"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#9B7BFF",
          boxShadow: "0 0 12px rgba(155,123,255,0.8)",
          pointerEvents: "none",
          zIndex: 31,
          willChange: "transform",
        }}
      />
      {/* Satellite 2 — lighter purple */}
      <div
        id="cursor-sat-2"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#C4B5FD",
          boxShadow: "0 0 8px rgba(196,181,253,0.7)",
          pointerEvents: "none",
          zIndex: 31,
          willChange: "transform",
        }}
      />
    </>
  );
}
