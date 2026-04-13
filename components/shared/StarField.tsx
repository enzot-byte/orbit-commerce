"use client";

/**
 * StarField — Canvas-based orbiting star field background.
 * Stars orbit the center at varying speeds/distances with twinkle effect.
 * Adapted from CodePen reference, optimized for React with rAF.
 * Uses Sellerverse brand hues (blue-217 / purple-260 / gold-36).
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  speed: number;
  angle: number;
  orbitRadius: number;
  opacity: number;
  twinkleSpeed: number;
  hue: number;
  saturation: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;

    const STAR_COUNT = 300;
    const HUES = [217, 230, 260, 36, 200]; // blue, light-blue, purple, gold, cyan

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createStars() {
      stars = [];
      const cx = w / 2;
      const cy = h / 2;
      const maxOrbit = Math.max(cx, cy) * 1.2;

      for (let i = 0; i < STAR_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const orbitRadius = 30 + Math.random() * maxOrbit;
        const z = Math.random(); // depth layer 0-1
        const radius = 0.6 + Math.random() * 2.2 * (0.3 + z * 0.7);
        // Slower speed for outer orbits, reduced overall by 0.4x
        const speed = (0.0001 + Math.random() * 0.00035) * (1 - z * 0.5) * 0.4;

        stars.push({
          x: cx + Math.cos(angle) * orbitRadius,
          y: cy + Math.sin(angle) * orbitRadius,
          z,
          radius,
          speed,
          angle,
          orbitRadius,
          opacity: 0.2 + Math.random() * 0.7,
          twinkleSpeed: 0.003 + Math.random() * 0.008,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
          saturation: 40 + Math.random() * 50,
        });
      }
    }

    let time = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      time += 1;

      for (const star of stars) {
        // Orbit movement
        star.angle += star.speed;
        star.x = cx + Math.cos(star.angle) * star.orbitRadius;
        star.y = cy + Math.sin(star.angle) * star.orbitRadius * 0.6; // slight ellipse

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.angle * 3);
        const alpha = star.opacity * (0.5 + twinkle * 0.5) * (0.4 + star.z * 0.6);

        // Draw the star
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 85%, ${alpha})`;
        ctx!.fill();

        // Glow for brighter stars
        if (star.radius > 1.2 && alpha > 0.4) {
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 75%, ${alpha * 0.18})`;
          ctx!.fill();
        }
      }

      // Subtle orbital ring hints
      ctx!.strokeStyle = "rgba(55, 138, 221, 0.06)";
      ctx!.lineWidth = 0.6;
      for (const r of [120, 220, 360]) {
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    createStars();
    draw();

    const onResize = () => {
      resize();
      createStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
}
