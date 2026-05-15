"use client";

import { useEffect, useRef } from "react";
import { getDeviceTier } from "@/lib/perf";

/**
 * Cursor orbit — a dashed ring and 3 satellites orbiting the pointer.
 * Single rAF loop, writes directly to element refs, no React state.
 *
 * Perf gates:
 *   - Skipped entirely on touch, reduced-motion, and low-tier devices
 *   - Loop pauses while the tab is hidden (visibilitychange)
 *   - Loop pauses ~600ms after the last mouse movement (cursor isn't moving →
 *     no need to redraw the orbit ring/satellites at 60fps)
 *   - When active but mouse idle, orbits keep spinning but at 30fps instead
 *     of 60 — the user won't notice and CPU drops by half
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

    // Skip the decorative cursor entirely on low-tier hardware — these are
    // the machines where partners report jank, and a 60fps rAF loop on top
    // of WebGL backgrounds is the cheapest thing to cut.
    if (getDeviceTier() === "low") return;

    const root = rootRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const sat1 = sat1Ref.current;
    const sat2 = sat2Ref.current;
    const sat3 = sat3Ref.current;
    if (!root || !glow || !ring || !sat1 || !sat2 || !sat3) return;

    let revealed = false;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let lastMoveAt = 0;
    let lastFrameAt = 0;
    let paused = false;
    const start = performance.now();

    // Capture in const aliases so TS keeps the non-null narrowing inside
    // the closure (we already null-checked above).
    const _glow = glow;
    const _ring = ring;
    const _sat1 = sat1;
    const _sat2 = sat2;
    const _sat3 = sat3;

    const loop = (t: number) => {
      if (paused) return;

      // When the mouse has been still for >600ms, drop to ~30fps. The dashed
      // ring + 3 satellites keep orbiting (visual coherence) but at half
      // the framerate — invisible to the user, halves the CPU draw cost.
      const idle = t - lastMoveAt > 600;
      const minFrameGap = idle ? 33 : 0;
      if (t - lastFrameAt < minFrameGap) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrameAt = t;

      const x = mx;
      const y = my;

      _glow.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      _ring.style.transform = `translate3d(${x - 30}px, ${y - 30}px, 0) rotate(${t * 0.08}deg)`;

      const elapsed = (t - start) / 1000;
      const R = 26;
      const a1 = elapsed * 2.0;
      const a2 = elapsed * 1.6 + (Math.PI * 2) / 3;
      const a3 = elapsed * 2.4 + (Math.PI * 4) / 3;
      _sat1.style.transform = `translate3d(${x + Math.cos(a1) * R - 3}px, ${y + Math.sin(a1) * R * 0.65 - 3}px, 0)`;
      _sat2.style.transform = `translate3d(${x + Math.cos(a2) * R - 2.5}px, ${y + Math.sin(a2) * R * 0.65 - 2.5}px, 0)`;
      _sat3.style.transform = `translate3d(${x + Math.cos(a3) * (R * 0.8) - 2}px, ${y + Math.sin(a3) * (R * 0.8) * 0.6 - 2}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMoveAt = performance.now();
      if (!revealed) {
        revealed = true;
        root.style.opacity = "1";
      }
      if (paused) {
        paused = false;
        raf = requestAnimationFrame(loop);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        paused = true;
        cancelAnimationFrame(raf);
      } else if (paused) {
        paused = false;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
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
