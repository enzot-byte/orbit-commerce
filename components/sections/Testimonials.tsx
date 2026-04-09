"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Fernanda Oliveira",
    store: "FerShop — Moda Feminina",
    quote:
      "Antes do Orbit Commerce eu passava horas tentando calcular minha margem na planilha. Agora levo 30 segundos. Triplicar o faturamento em 6 meses foi consequência de ter as ferramentas certas.",
    avatarColor: "from-orbit-600 to-orbit-800",
    initials: "FO",
    revenue: "+R$120k em 6 meses",
  },
  {
    id: 2,
    name: "Ricardo Mendes",
    store: "TechParts Brasil — Eletrônicos",
    quote:
      "A comunidade foi o que mais me surpreendeu. Sempre tem alguém com a resposta certa quando eu preciso. Já evitei pelo menos umas 3 suspensões de conta só com o que aprendi aqui.",
    avatarColor: "from-accent-600 to-accent-400",
    initials: "RM",
    revenue: "Saiu do vermelho em 90 dias",
  },
  {
    id: 3,
    name: "Camila Torres",
    store: "NaturalHome — Casa e Jardim",
    quote:
      "O gerador de títulos mudou meus resultados na Shopee completamente. Minhas impressões subiram 340% no primeiro mês. Não acreditei até ver os números.",
    avatarColor: "from-green-600 to-emerald-400",
    initials: "CT",
    revenue: "+340% em impressões",
  },
  {
    id: 4,
    name: "Lucas Brandão",
    store: "SupStyle — Suplementos",
    quote:
      "Estava desistindo de vender na Amazon por conta da concorrência. A mentoria me mostrou um ângulo completamente diferente. Hoje sou líder de categoria.",
    avatarColor: "from-purple-600 to-violet-400",
    initials: "LB",
    revenue: "Líder de categoria na Amazon",
  },
  {
    id: 5,
    name: "Juliana Prado",
    store: "PetLover — Pets",
    quote:
      "Os templates de anúncio Pro valem o valor do plano inteiro. Minha taxa de conversão no Mercado Livre saiu de 1.2% para 4.8%. Resultado imediato.",
    avatarColor: "from-pink-600 to-rose-400",
    initials: "JP",
    revenue: "Conversão 4x maior",
  },
  {
    id: 6,
    name: "Mateus Carvalho",
    store: "SportGear — Esportes",
    quote:
      "O simulador de frete me salvou meses de prejuízo. Eu nem sabia que estava pagando 30% a mais que meus concorrentes em logística. Ajuste simples, lucro real.",
    avatarColor: "from-orange-500 to-amber-400",
    initials: "MC",
    revenue: "-30% em custo de frete",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + testimonials.length) % testimonials.length);
    },
    []
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-orbit">
        {/* Section title */}
        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-orbit-600 mb-3">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-dark leading-tight">
            O que nossos sellers{" "}
            <span className="gradient-text">estão falando</span>
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large quote mark */}
          <div className="absolute -top-6 left-0 md:-left-8 text-orbit-600/10 pointer-events-none">
            <Quote className="w-24 h-24 fill-current" />
          </div>

          {/* Card */}
          <div className="relative overflow-hidden min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm">
                  {/* Quote */}
                  <p className="text-lg md:text-xl text-dark/75 leading-relaxed mb-8 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author row */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-display font-bold text-dark text-base">
                          {t.name}
                        </p>
                        <p className="text-sm text-dark/50">{t.store}</p>
                      </div>
                    </div>

                    {/* Revenue badge */}
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-orbit-600/10 text-orbit-600">
                      {t.revenue}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark/50 hover:border-orbit-600/40 hover:text-orbit-600 transition-all duration-200 hover:scale-110"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className="transition-all duration-300"
                  aria-label={`Ir para depoimento ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full bg-orbit-600"
                    animate={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      opacity: i === current ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark/50 hover:border-orbit-600/40 hover:text-orbit-600 transition-all duration-200 hover:scale-110"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
