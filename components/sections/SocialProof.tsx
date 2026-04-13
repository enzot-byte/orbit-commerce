"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  {
    value: 2500,
    prefix: "+",
    suffix: "",
    label: "Sellers na comunidade",
    sublabel: "ativos mensalmente",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 015 17.668V17.5a6.5 6.5 0 0113 0v.168c0 .552-.112 1.078-.314 1.56M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 50,
    prefix: "R$",
    suffix: "M+",
    label: "Faturados",
    sublabel: "pelos nossos membros",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 15,
    prefix: "+",
    suffix: "",
    label: "Ferramentas",
    sublabel: "disponíveis na plataforma",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.42 15.17l-5.648-3.014a1.125 1.125 0 01-.122-1.94l6.394-4.262a1.125 1.125 0 011.272 0l6.394 4.262a1.125 1.125 0 01-.122 1.94l-5.648 3.014a1.125 1.125 0 01-1.12 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.375 12.739l-6.394 4.262a1.125 1.125 0 01-1.12 0l-6.394-4.262" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.375 16.488l-6.394 4.263a1.125 1.125 0 01-1.12 0l-6.394-4.263" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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

  const statsY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);
  const badgesY = useTransform(scrollYProgress, [0, 1], [30, -15]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#1A1A2E",
        padding: "clamp(80px, 10vw, 128px) 0",
      }}
    >
      {/* Subtle ambient glow — CSS only, zero performance cost */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(91,63,216,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top ambient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px z-[2]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(91,63,216,0.35), transparent)",
        }}
      />

      <div className="container-orbit relative z-10">
        {/* Stats row */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity, willChange: "transform" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div
                className="relative flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(91,63,216,0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(91,63,216,0.15), rgba(155,123,255,0.08))",
                    border: "1px solid rgba(155,123,255,0.15)",
                    color: "#9B7BFF",
                  }}
                >
                  {stat.icon}
                </div>

                {/* Number */}
                <div
                  className="text-4xl sm:text-5xl font-display font-black mb-2 leading-tight"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #C4B5FD 60%, #9B7BFF 100%)",
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

                {/* Label */}
                <p className="text-base font-display font-semibold text-white/80 mb-0.5">
                  {stat.label}
                </p>
                <p className="text-sm text-white/35">
                  {stat.sublabel}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(155,123,255,0.4), transparent)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marketplace badges */}
        <motion.div
          style={{ y: badgesY, willChange: "transform" }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-xs text-white/30 tracking-[0.15em] font-medium uppercase">
            Presentes nos principais marketplaces
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {marketplaces.map((name) => (
              <span
                key={name}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:shadow-[0_0_24px_rgba(91,63,216,0.25)] hover:border-[rgba(155,123,255,0.5)] hover:scale-105 cursor-default"
                style={{
                  borderColor: "rgba(155,123,255,0.2)",
                  backgroundColor: "rgba(91,63,216,0.06)",
                  color: "rgba(255,255,255,0.7)",
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
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent, #0F0F1A)" }}
      />
    </section>
  );
}
