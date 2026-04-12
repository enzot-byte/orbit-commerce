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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const statsY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.85]);
  const statsScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);
  const badgesY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden ambient-light"
      style={{
        backgroundColor: "#1A1A2E",
        padding: "clamp(80px, 12vw, 140px) 0",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(91,63,216,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Stats with corner dots */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity, scale: statsScale, willChange: "transform" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center relative">
              {/* Stat card with corner dots */}
              <div className="relative py-6 px-4 rounded-2xl corner-dots" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="corner-dots-bottom" />
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-3 leading-tight"
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
                <p className="text-sm md:text-base text-white/45 font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Marketplace badges with hover glow */}
        <motion.div
          style={{ y: badgesY, willChange: "transform" }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-sm text-white/35 tracking-wide font-medium uppercase">
            Presentes nos principais marketplaces:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {marketplaces.map((name) => (
              <span
                key={name}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 hover:shadow-[0_0_20px_rgba(91,63,216,0.2)] hover:border-[rgba(155,123,255,0.5)] cursor-default"
                style={{
                  borderColor: "rgba(155,123,255,0.2)",
                  backgroundColor: "rgba(91,63,216,0.06)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section fade to next */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0F0F1A)" }}
      />
    </section>
  );
}
