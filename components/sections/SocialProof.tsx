"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  {
    value: 2500,
    prefix: "+",
    suffix: " sellers",
    label: "Comunidade ativa",
  },
  {
    value: 50,
    prefix: "+R$",
    suffix: "M faturados",
    label: "Pelos nossos membros",
  },
  {
    value: 15,
    prefix: "+",
    suffix: " ferramentas",
    label: "Disponíveis na plataforma",
  },
];

const marketplaces = [
  "Amazon",
  "Mercado Livre",
  "Shopee",
  "Magalu",
  "Shein",
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);

  // Parallax — we read scroll progress of the section relative to the viewport.
  // useScroll + useTransform are motion-values; they drive CSS transforms via
  // the compositor without triggering any React re-renders.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Stats container glides up ~80px and fades while traversing the section.
  const statsY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.85]);
  const statsScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);

  // Marketplace badges move opposite direction for depth.
  const badgesY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  // Floating background accents parallax harder.
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section
      ref={ref}
      className="relative border-y overflow-hidden"
      style={{
        backgroundColor: "#1A1A2E",
        borderColor: "rgba(255,255,255,0.08)",
        padding: "clamp(80px, 12vw, 140px) 0",
      }}
    >
      {/* Parallax background accents */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          y: bgY1,
          background:
            "radial-gradient(circle, rgba(91,63,216,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY2,
          background:
            "radial-gradient(circle, rgba(155,123,255,0.16) 0%, transparent 70%)",
          filter: "blur(50px)",
          willChange: "transform",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Stats — parallax + counter */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity, scale: statsScale, willChange: "transform" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center overflow-hidden">
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-3 leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #C4B5FD 60%, #9B7BFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2200}
                />
              </div>
              <p className="text-sm md:text-base text-white/55 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Marketplace badges */}
        <motion.div
          style={{ y: badgesY, willChange: "transform" }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-sm text-white/45 tracking-wide font-medium uppercase">
            Presentes nos principais marketplaces:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {marketplaces.map((name) => (
              <span
                key={name}
                className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  borderColor: "rgba(155,123,255,0.35)",
                  backgroundColor: "rgba(91,63,216,0.1)",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
