"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight cursor glow — a soft radial halo that follows the pointer.
 * Uses CSS variables updated inside a single rAF tick, zero React re-renders.
 * Disabled on touch devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setEnabled(true);

    const el = document.getElementById("cursor-glow");
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    let pending = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
        pending = false;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
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
          "radial-gradient(circle, rgba(239,159,39,0.14) 0%, rgba(24,95,165,0.08) 35%, transparent 70%)",
        mixBlendMode: "screen",
        willChange: "transform",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
