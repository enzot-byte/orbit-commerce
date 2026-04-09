"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

const intensityConfig = {
  subtle: {
    opacity: 0.35,
    blur: "blur-[80px]",
    scale: 0.8,
  },
  medium: {
    opacity: 0.55,
    blur: "blur-[100px]",
    scale: 1,
  },
  strong: {
    opacity: 0.75,
    blur: "blur-[120px]",
    scale: 1.2,
  },
};

const orbs = [
  {
    id: "orb-1",
    color: "#185FA5",
    size: 600,
    initialX: "15%",
    initialY: "20%",
    animateX: ["15%", "22%", "12%", "18%", "15%"],
    animateY: ["20%", "28%", "35%", "22%", "20%"],
    duration: 18,
  },
  {
    id: "orb-2",
    color: "#0C447C",
    size: 500,
    initialX: "60%",
    initialY: "10%",
    animateX: ["60%", "55%", "65%", "58%", "60%"],
    animateY: ["10%", "18%", "8%", "15%", "10%"],
    duration: 22,
  },
  {
    id: "orb-3",
    color: "#042C53",
    size: 700,
    initialX: "75%",
    initialY: "50%",
    animateX: ["75%", "68%", "80%", "72%", "75%"],
    animateY: ["50%", "45%", "58%", "52%", "50%"],
    duration: 26,
  },
  {
    id: "orb-4",
    color: "#185FA5",
    size: 400,
    initialX: "30%",
    initialY: "70%",
    animateX: ["30%", "36%", "25%", "32%", "30%"],
    animateY: ["70%", "65%", "75%", "68%", "70%"],
    duration: 20,
  },
  {
    id: "orb-5",
    color: "#0C447C",
    size: 350,
    initialX: "85%",
    initialY: "80%",
    animateX: ["85%", "80%", "88%", "83%", "85%"],
    animateY: ["80%", "75%", "85%", "78%", "80%"],
    duration: 24,
  },
];

export default function GradientMesh({
  className,
  intensity = "medium",
}: GradientMeshProps) {
  const config = intensityConfig[intensity];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Animated orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={cn("absolute rounded-full", config.blur)}
          style={{
            width: orb.size * config.scale,
            height: orb.size * config.scale,
            backgroundColor: orb.color,
            opacity: config.opacity,
            left: orb.initialX,
            top: orb.initialY,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            left: orb.animateX,
            top: orb.animateY,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        />
      ))}

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10, 10, 15, 0.6) 100%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.06,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
