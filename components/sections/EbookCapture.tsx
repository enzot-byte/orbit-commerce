"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  Users,
  Star,
  ArrowRight,
  BookOpen,
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ─── ElasticSlider ─────────────────────────────────────────────────── */

const MAX_OVERFLOW = 50;

function decay(value: number, max: number): number {
  if (max === 0) return 0;
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  leftIcon,
  rightIcon,
  accentColor = "rgba(155,123,255,0.6)",
  onChange,
}: {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  accentColor?: string;
  onChange?: (v: number) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<"left" | "middle" | "right">("middle");
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useMotionValueEvent(clientX, "change", (latest) => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let nv: number;
      if (latest < left) {
        setRegion("left");
        nv = left - latest;
      } else if (latest > right) {
        setRegion("right");
        nv = latest - right;
      } else {
        setRegion("middle");
        nv = 0;
      }
      overflow.jump(decay(nv, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons > 0 && sliderRef.current) {
        const { left, width } = sliderRef.current.getBoundingClientRect();
        let nv =
          startingValue +
          ((e.clientX - left) / width) * (maxValue - startingValue);
        nv = Math.min(Math.max(nv, startingValue), maxValue);
        setValue(nv);
        onChange?.(nv);
        clientX.jump(e.clientX);
      }
    },
    [startingValue, maxValue, clientX, onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      handlePointerMove(e);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [handlePointerMove],
  );

  const handlePointerUp = useCallback(() => {
    animate(overflow, 0, { type: "spring", bounce: 0.5 });
  }, [overflow]);

  /* ── Derived motion values (top-level, stable order) ── */
  const wrapperOpacity = useTransform(scale, [1, 1.2], [0.7, 1]);
  const leftIconX = useTransform(
    () => (region === "left" ? -overflow.get() / (scale.get() || 1) : 0),
  );
  const rightIconX = useTransform(
    () => (region === "right" ? overflow.get() / (scale.get() || 1) : 0),
  );
  const trackScaleX = useTransform(() => {
    if (sliderRef.current) {
      const { width } = sliderRef.current.getBoundingClientRect();
      return 1 + overflow.get() / width;
    }
    return 1;
  });
  const trackScaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]);
  const trackOrigin = useTransform(() => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      return clientX.get() < left + width / 2 ? "right" : "left";
    }
    return "left";
  });
  const trackHeight = useTransform(scale, [1, 1.2], [6, 12]);
  const trackMt = useTransform(scale, [1, 1.2], [0, -3]);
  const trackMb = useTransform(scale, [1, 1.2], [0, -3]);

  const pct =
    maxValue === startingValue
      ? 0
      : ((value - startingValue) / (maxValue - startingValue)) * 100;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{ scale, opacity: wrapperOpacity }}
        className="flex w-full items-center justify-center gap-3 touch-none select-none"
      >
        {/* Left icon */}
        <motion.div
          animate={{
            scale: region === "left" ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{ x: leftIconX }}
          className="text-white/40"
        >
          {leftIcon}
        </motion.div>

        {/* Track */}
        <div
          ref={sliderRef}
          className="relative flex w-full max-w-[220px] flex-1 items-center py-4 touch-none select-none cursor-grab active:cursor-grabbing"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: trackScaleX,
              scaleY: trackScaleY,
              transformOrigin: trackOrigin,
              height: trackHeight,
              marginTop: trackMt,
              marginBottom: trackMb,
            }}
            className="flex flex-1"
          >
            <div className="relative h-full flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute h-full rounded-full transition-[width] duration-75"
                style={{ width: `${pct}%`, backgroundColor: accentColor }}
              />
            </div>
          </motion.div>
        </div>

        {/* Right icon */}
        <motion.div
          animate={{
            scale: region === "right" ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{ x: rightIconX }}
          className="text-white/40"
        >
          {rightIcon}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Waveform bars (deterministic heights for SSR) ─────────────────── */

const WAVE_HEIGHTS = [
  45, 65, 55, 80, 70, 90, 60, 85, 75, 50, 40, 70, 95, 80, 65, 55, 75, 85, 60,
  45, 35, 50, 70, 80, 65, 55, 40, 60, 75, 85, 70, 55, 45, 65, 80, 90, 75, 60,
  50, 35,
];

function Waveform({ progress = 35 }: { progress?: number }) {
  const activeCount = Math.floor((progress / 100) * WAVE_HEIGHTS.length);
  return (
    <div className="flex items-center gap-px h-10 w-full">
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full transition-colors duration-200"
          style={{
            height: `${h}%`,
            backgroundColor:
              i < activeCount
                ? "rgba(155,123,255,0.7)"
                : "rgba(155,123,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Ebook Mockup (original book cover) ────────────────────────────── */

function EbookMockup() {
  return (
    <div className="relative">
      {/* Shadow layers */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl opacity-30"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />
      <div
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl opacity-40"
        style={{ background: "rgba(0,0,0,0.3)" }}
      />

      {/* Book cover */}
      <motion.div
        className="relative w-64 sm:w-72 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0F 0%, #1A1A2E 40%, #042C53 100%)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
          aspectRatio: "2/3",
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(to right, #EF9F27, #FAC775)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col p-8 justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent-400/20 flex items-center justify-center mb-6">
              <BookOpen className="w-5 h-5 text-accent-400" />
            </div>
            <p className="text-accent-400 text-xs font-bold tracking-widest uppercase mb-3">
              Guia Gratuito
            </p>
            <h3 className="text-white font-display font-black text-xl leading-tight">
              Os 7 Erros que Quebram 90% dos Sellers
            </h3>
          </div>
          <div>
            <div className="space-y-2 mb-6">
              {[70, 85, 60, 75, 50].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full opacity-20"
                  style={{
                    width: `${w}%`,
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0.8), transparent)",
                  }}
                />
              ))}
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/50 text-xs">Sellerverse &middot; 2025</p>
            </div>
          </div>
        </div>

        {/* Shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 bg-accent-400 text-dark text-xs font-black px-3 py-2 rounded-xl shadow-glow-accent"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        GR&Aacute;TIS
      </motion.div>
    </div>
  );
}

/* ─── Audiobook Player Mockup ───────────────────────────────────────── */

function AudiobookPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  // Fake playback: increment progress when "playing"
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return p + 0.3;
      });
    }, 100);
    return () => clearInterval(id);
  }, [isPlaying]);

  const formatTime = (pct: number) => {
    const total = 12 * 60 + 34; // 12:34 total duration
    const secs = Math.floor((pct / 100) * total);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      {/* Shadow */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl opacity-30"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />

      <motion.div
        className="relative w-64 sm:w-72 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0F 0%, #1A1A2E 40%, #1E1040 100%)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(to right, #5B3FD8, #9B7BFF)",
          }}
        />

        <div className="p-6 space-y-5">
          {/* Cover + info */}
          <div className="flex gap-4 items-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,63,216,0.3), rgba(155,123,255,0.15))",
                border: "1px solid rgba(155,123,255,0.2)",
              }}
            >
              <Headphones className="w-6 h-6 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-purple-400 text-[10px] font-bold tracking-widest uppercase">
                Audiobook
              </p>
              <h4 className="text-white font-display font-bold text-sm leading-tight mt-1 line-clamp-2">
                Os 7 Erros que Quebram 90% dos Sellers
              </h4>
              <p className="text-white/30 text-[10px] mt-1">
                Cap. 1 &mdash; Introdu&ccedil;&atilde;o
              </p>
            </div>
          </div>

          {/* Waveform */}
          <Waveform progress={progress} />

          {/* Elastic slider progress */}
          <div className="space-y-1">
            <ElasticSlider
              defaultValue={progress}
              startingValue={0}
              maxValue={100}
              accentColor="rgba(155,123,255,0.6)"
              leftIcon={<SkipBack className="w-4 h-4" />}
              rightIcon={<SkipForward className="w-4 h-4" />}
              onChange={(v) => setProgress(v)}
            />
            <div className="flex justify-between px-1">
              <span className="text-[9px] text-white/25">
                {formatTime(progress)}
              </span>
              <span className="text-[9px] text-white/25">12:34</span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              className="text-white/30 hover:text-white/60 transition-colors"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #5B3FD8, #9B7BFF)",
                boxShadow: "0 0 20px rgba(155,123,255,0.3)",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </motion.button>
            <button
              className="text-white/30 hover:text-white/60 transition-colors"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 text-xs font-black px-3 py-2 rounded-xl"
        style={{
          background: "linear-gradient(135deg, #5B3FD8, #9B7BFF)",
          color: "#fff",
          boxShadow: "0 0 20px rgba(91,63,216,0.4)",
        }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        GR&Aacute;TIS
      </motion.div>
    </div>
  );
}

/* ─── Trust items ───────────────────────────────────────────────────── */

const trustItems = [
  { icon: Shield, text: "100% gratuito, sem spam" },
  { icon: Users, text: "+2.500 sellers já baixaram" },
  { icon: Star, text: "Nota 4.9/5 pelos leitores" },
];

/* ─── Formats ───────────────────────────────────────────────────────── */

const formats = [
  {
    id: "ebook" as const,
    label: "E-book",
    icon: BookOpen,
    title: "Baixe grátis: Os 7 erros que quebram 90% dos sellers",
    description:
      "Descubra o que está sabotando seu faturamento e como corrigir cada erro com passos simples e imediatos.",
    cta: "Baixar grátis",
    tagline: "E-book gratuito",
  },
  {
    id: "audio" as const,
    label: "Audiobook",
    icon: Headphones,
    title: "Ouça grátis: Os 7 erros que quebram 90% dos sellers",
    description:
      "Ouça onde quiser — 7 capítulos narrados profissionalmente. Perfeito para ouvir enquanto trabalha.",
    cta: "Ouvir grátis",
    tagline: "Audiobook gratuito",
  },
];

/* ─── Main Component ────────────────────────────────────────────────── */

export default function EbookCapture() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<"ebook" | "audio">("ebook");

  const currentFormat = formats.find((f) => f.id === format)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Falha ao inscrever.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Sem conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden ambient-light"
      style={{
        background:
          "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #252547 100%)",
        padding: "128px 0 160px",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(91,63,216,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(155,123,255,0.2) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 animate-grain opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="container-orbit relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: Mockup (ebook or audiobook) ── */}
          <ScrollReveal direction="left" delay={0}>
            <div className="flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                {format === "ebook" ? (
                  <motion.div
                    key="ebook"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <EbookMockup />
                  </motion.div>
                ) : (
                  <motion.div
                    key="audio"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <AudiobookPlayer />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* ── Right: Form side ── */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="text-white">
              {/* Format toggle */}
              <div className="flex gap-2 mb-6">
                {formats.map((f) => {
                  const Icon = f.icon;
                  const active = format === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: active
                          ? "rgba(91,63,216,0.2)"
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${
                          active
                            ? "rgba(155,123,255,0.4)"
                            : "rgba(255,255,255,0.08)"
                        }`,
                        color: active
                          ? "#C4B5FD"
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Tagline */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFormat.tagline}
                  className="text-sm font-bold tracking-widest uppercase mb-4"
                  style={{
                    color:
                      format === "ebook" ? "#EF9F27" : "#9B7BFF",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentFormat.tagline}
                </motion.p>
              </AnimatePresence>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentFormat.title}
                  className="text-3xl md:text-4xl font-display font-black leading-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentFormat.title}
                </motion.h2>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFormat.description}
                  className="text-white/60 text-base leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentFormat.description}
                </motion.p>
              </AnimatePresence>

              {/* Form */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl border border-white/15 bg-white/8 text-center"
                >
                  <div className="text-4xl mb-4">
                    {format === "ebook" ? "\u{1F389}" : "\u{1F3A7}"}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    {format === "ebook"
                      ? "E-book enviado!"
                      : "Link do audiobook enviado!"}
                  </h3>
                  <p className="text-white/60 text-sm">
                    Verifique sua caixa de entrada em {form.email}. Caso
                    n&atilde;o encontre, confira o spam.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu primeiro nome"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/60 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/60 transition-all duration-200"
                    />
                  </div>
                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-500/15 border border-red-400/30 text-red-200 text-sm">
                      {error}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold transition-all duration-300 disabled:opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                      color: "#ffffff",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Enviando...
                      </span>
                    ) : (
                      <>
                        {currentFormat.cta}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Trust badges */}
              {!submitted && (
                <div className="flex flex-wrap gap-5 mt-6">
                  {trustItems.map(({ icon: TrustIcon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs text-white/50"
                    >
                      <TrustIcon className="w-3.5 h-3.5 text-white/35 flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
