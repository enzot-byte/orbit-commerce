"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

/**
 * Performant animated gradient mesh.
 *
 * Key perf decisions:
 * - 3 orbs instead of 5
 * - Animate with `x`/`y` (GPU transform) instead of `left`/`top` (layout reflow)
 * - Blur reduced from 100-120px to 60-80px
 * - Static noise overlay instead of continuously animating grain
 * - `will-change: transform` on every animated layer
 */

interface Orb {
  id: string;
  color: string;
  size: number;
  /** Initial position in viewport % */
  left: string;
  top: string;
  /** Translate animation in px */
  dx: number[];
  dy: number[];
  duration: number;
}

const intensityConfig = {
  subtle: { opacity: 0.3, blurPx: 50 },
  medium: { opacity: 0.5, blurPx: 70 },
  strong: { opacity: 0.65, blurPx: 90 },
} as const;

const orbs: Orb[] = [
  {
    id: "orb-1",
    color: "#185FA5",
    size: 520,
    left: "18%",
    top: "25%",
    dx: [0, 40, -30, 0],
    dy: [0, 50, -20, 0],
    duration: 22,
  },
  {
    id: "orb-2",
    color: "#0C447C",
    size: 460,
    left: "68%",
    top: "20%",
    dx: [0, -40, 30, 0],
    dy: [0, 40, 20, 0],
    duration: 26,
  },
  {
    id: "orb-3",
    color: "#042C53",
    size: 600,
    left: "50%",
    top: "70%",
    dx: [0, 30, -30, 0],
    dy: [0, -30, 20, 0],
    duration: 30,
  },
];

export default function GradientMesh({
  className,
  intensity = "medium",
}: GradientMeshProps) {
  const { opacity, blurPx } = intensityConfig[intensity];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity,
            left: orb.left,
            top: orb.top,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
            filter: `blur(${blurPx}px)`,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          animate={{ x: orb.dx, y: orb.dy }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        />
      ))}

      {/* Radial vignette for depth (static, cheap) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,15,0.6) 100%)",
        }}
      />
    </div>
  );
}
