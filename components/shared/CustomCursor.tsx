"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor orbit — a dashed ring and 3 satellites orbiting the pointer,
 * locked 1:1 to the mouse position (zero delay). Driven by a single rAF
 * loop writing directly to element refs, no React state, no re-renders.
 *
 * IMPORTANT implementation note:
 *   Previously we gated mounting behind `useState(enabled)`. That introduced
 *   a race: the effect ran once before the DOM nodes existed, found them
 *   `null`, and bailed out — leaving a stale ring in the top-left corner.
 *   Now elements are ALWAYS mounted via refs, and the effect just attaches
 *   the rAF loop.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sat1Ref = useRef<HTMLDivElement>(null);
  const sat2Ref = useRef<HTMLDivElement>(null);
  const sat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const root = rootRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const sat1 = sat1Ref.current;
    const sat2 = sat2Ref.current;
    const sat3 = sat3Ref.current;
    if (!root || !glow || !ring || !sat1 || !sat2 || !sat3) return;

    // Reveal — elements are hidden until the pointer actually moves so
    // we don't flash anything at (0,0) on initial paint.
    let revealed = false;

    let mx = -9999;
    let my = -9999;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!revealed) {
        revealed = true;
        root.style.opacity = "1";
      }
    };

    const loop = (t: number) => {
      // 1:1 follow — zero delay
      const x = mx;
      const y = my;

      // Soft halo (offset by half its 300px box)
      glow.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      // Dashed orbit ring centered on cursor (60px box, radius 30)
      ring.style.transform = `translate3d(${x - 30}px, ${y - 30}px, 0) rotate(${t * 0.08}deg)`;

      // Three satellites at different speeds + phase offsets
      const elapsed = (t - start) / 1000;
      const R = 26;
      const a1 = elapsed * 2.0;
      const a2 = elapsed * 1.6 + (Math.PI * 2) / 3;
      const a3 = elapsed * 2.4 + (Math.PI * 4) / 3;
      sat1.style.transform = `translate3d(${x + Math.cos(a1) * R - 3}px, ${y + Math.sin(a1) * R * 0.65 - 3}px, 0)`;
      sat2.style.transform = `translate3d(${x + Math.cos(a2) * R - 2.5}px, ${y + Math.sin(a2) * R * 0.65 - 2.5}px, 0)`;
      sat3.style.transform = `translate3d(${x + Math.cos(a3) * (R * 0.8) - 2}px, ${y + Math.sin(a3) * (R * 0.8) * 0.6 - 2}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const dotBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 31,
    willChange: "transform",
    transform: "translate3d(-9999px, -9999px, 0)",
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{ opacity: 0, transition: "opacity 0.25s ease" }}
    >
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          pointerEvents: "none",
          zIndex: 30,
          background:
            "radial-gradient(circle, rgba(91,63,216,0.18) 0%, rgba(155,123,255,0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "1px dashed rgba(155,123,255,0.35)",
          pointerEvents: "none",
          zIndex: 31,
          willChange: "transform",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      />
      <div
        ref={sat1Ref}
        style={{
          ...dotBase,
          width: 6,
          height: 6,
          backgroundColor: "#9B7BFF",
          boxShadow: "0 0 10px rgba(155,123,255,0.9)",
        }}
      />
      <div
        ref={sat2Ref}
        style={{
          ...dotBase,
          width: 5,
          height: 5,
          backgroundColor: "#C4B5FD",
          boxShadow: "0 0 8px rgba(196,181,253,0.85)",
        }}
      />
      <div
        ref={sat3Ref}
        style={{
          ...dotBase,
          width: 4,
          height: 4,
          backgroundColor: "#5B3FD8",
          boxShadow: "0 0 6px rgba(91,63,216,0.9)",
        }}
      />
    </div>
  );
}
