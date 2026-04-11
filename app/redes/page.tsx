"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import GradientMesh from "@/components/shared/GradientMesh";
import { Logo } from "@/components/ui/Logo";
import {
  Mail,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

// ─── Social links data ───────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    id: "youtube",
    label: "YouTube",
    description: "Conteúdo exclusivo para sellers",
    href: "https://www.youtube.com/channel/UCksiby6SGhom0AzUhKEQr6g",
    color: "#FF0000",
    glow: "rgba(255,0,0,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "Dicas rápidas e trends",
    href: "https://www.tiktok.com/@sellerverseofc",
    color: "#00F2EA",
    glow: "rgba(0,242,234,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "Comunidade WhatsApp",
    description: "Entre no grupo da comunidade",
    href: "https://chat.whatsapp.com/H5zR1nHjKw55SFCo5cil2q",
    color: "#25D366",
    glow: "rgba(37,211,102,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Bastidores e novidades",
    href: "https://www.instagram.com/sellerverseoficial",
    color: "#E4405F",
    glow: "rgba(228,64,95,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X (Twitter)",
    description: "Updates e opiniões",
    href: "https://x.com/sellerverseofc",
    color: "#A8B3CF",
    glow: "rgba(168,179,207,0.1)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "E-mail",
    description: "vidadesellerecom@gmail.com",
    href: "mailto:vidadesellerecom@gmail.com",
    color: "#9B7BFF",
    glow: "rgba(155,123,255,0.12)",
    icon: <Mail className="w-6 h-6" />,
    copyValue: "vidadesellerecom@gmail.com",
  },
] as const;

// ─── Floating particles background ──────────────────────────────────────────

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 7 + 1) * 100,
    y: seededRandom(i * 13 + 3) * 100,
    size: 2 + seededRandom(i * 19 + 5) * 3,
    duration: 10 + seededRandom(i * 23 + 7) * 15,
    delay: seededRandom(i * 31 + 11) * 5,
    opacity: 0.1 + seededRandom(i * 37 + 13) * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "#9B7BFF",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -8, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Social card ─────────────────────────────────────────────────────────────

function SocialCard({
  link,
  index,
}: {
  link: (typeof SOCIAL_LINKS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  // Subtle 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      if (!("copyValue" in link)) return;
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(link.copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    [link]
  );

  const isEmail = link.id === "email";

  return (
    <motion.a
      ref={cardRef}
      href={link.href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3 + index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative block rounded-2xl transition-all duration-300"
    >
      {/* Card body */}
      <div
        className="relative flex items-center gap-4 px-5 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: "rgba(22,22,42,0.85)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Hover glow — colored left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: link.color }}
        />

        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${link.glow}, transparent 60%)`,
          }}
        />

        {/* Icon */}
        <div
          className="relative shrink-0 flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${link.color}18`,
            color: link.color,
          }}
        >
          {link.icon}
        </div>

        {/* Text */}
        <div className="relative flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors">
            {link.label}
          </p>
          <p className="text-sm text-white/40 group-hover:text-white/55 transition-colors truncate">
            {link.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="relative flex items-center gap-1.5 shrink-0">
          {"copyValue" in link && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Copiar e-mail"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg text-white/20 group-hover:text-white/50 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// ─── Orbiting rings (smaller, background only) ──────────────────────────────

function OrbitalRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[160, 220, 300].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(155,123,255,${0.08 - i * 0.02})`,
            borderStyle: i === 1 ? "dashed" : "solid",
          }}
          animate={{ rotate: i === 1 ? -360 : 360 }}
          transition={{
            duration: 25 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RedesPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex flex-col items-center overflow-hidden" style={{ backgroundColor: "#0A0A0F" }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <GradientMesh intensity="medium" />
        </div>
        <FloatingParticles />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-4 pt-32 pb-20">
          {/* Logo + heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center mb-10"
          >
            <Logo size="lg" variant="icon" className="mb-5" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white text-center mb-2">
              Seller<span style={{ color: "#5B3FD8" }}>verse</span>
            </h1>
            <p className="text-white/50 text-center text-sm max-w-xs">
              Conecte-se com a maior comunidade de sellers do Brasil
            </p>
          </motion.div>

          {/* Orbital decoration */}
          <OrbitalRings />

          {/* Social links stack */}
          <div className="relative z-10 w-full flex flex-col gap-3">
            {SOCIAL_LINKS.map((link, i) => (
              <SocialCard key={link.id} link={link} index={i} />
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
            >
              Visitar site completo
            </Link>
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} Sellerverse. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
