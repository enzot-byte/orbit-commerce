"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Star, ArrowRight, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const trustItems = [
  { icon: Shield, text: "100% gratuito, sem spam" },
  { icon: Users, text: "+2.500 sellers já baixaram" },
  { icon: Star, text: "Nota 4.9/5 pelos leitores" },
];

export default function EbookCapture() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    console.log("Ebook capture form submitted:", form);

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #042C53 0%, #0C447C 50%, #185FA5 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(239,159,39,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(24,95,165,0.6) 0%, transparent 50%)`,
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
          {/* Ebook mockup */}
          <ScrollReveal direction="left" delay={0}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Shadow/depth layers */}
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
                    background: "linear-gradient(160deg, #0A0A0F 0%, #1A1A2E 40%, #042C53 100%)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
                    aspectRatio: "2/3",
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ background: "linear-gradient(to right, #EF9F27, #FAC775)" }}
                  />

                  {/* Book content */}
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
                      {/* Decorative lines */}
                      <div className="space-y-2 mb-6">
                        {[70, 85, 60, 75, 50].map((w, i) => (
                          <div
                            key={i}
                            className="h-1.5 rounded-full opacity-20"
                            style={{
                              width: `${w}%`,
                              background: "linear-gradient(to right, rgba(255,255,255,0.8), transparent)",
                            }}
                          />
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white/50 text-xs">Sellerverse · 2025</p>
                      </div>
                    </div>
                  </div>

                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
                    }}
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-accent-400 text-dark text-xs font-black px-3 py-2 rounded-xl shadow-glow-accent"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  GRÁTIS
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form side */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="text-white">
              <p className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-4">
                E-book gratuito
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4">
                Baixe grátis: Os 7 erros que quebram 90% dos sellers
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Descubra o que está sabotando seu faturamento e como corrigir cada
                erro com passos simples e imediatos.
              </p>

              {/* Form */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl border border-white/15 bg-white/8 text-center"
                >
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    E-book enviado!
                  </h3>
                  <p className="text-white/60 text-sm">
                    Verifique sua caixa de entrada em {form.email}. Caso não encontre, confira o spam.
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
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/60 transition-all duration-200"
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
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/60 transition-all duration-200"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold transition-all duration-300 disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                      color: "#0A0A0F",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Enviando...
                      </span>
                    ) : (
                      <>
                        Baixar grátis
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Trust badges */}
              {!submitted && (
                <div className="flex flex-wrap gap-5 mt-6">
                  {trustItems.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs text-white/50"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/35 flex-shrink-0" />
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
