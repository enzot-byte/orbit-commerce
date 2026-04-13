"use client";

/**
 * BlogSlider — Swiper-based featured news carousel with hover highlight.
 * Large hero-style cards (3 only) for the "Artigos em destaque" section.
 * Background: orbital / planetary Sellerverse theme (CSS).
 */

import { useRef, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  gradient: string;
  emoji: string;
  catColor: string;
  catBg: string;
  highlights: string[];
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "O guia definitivo para escalar vendas no Mercado Livre em 2025",
    excerpt:
      "Desde a escolha do produto até a otimização de campanhas — um roadmap completo baseado em dados reais de sellers que faturam mais de R$100k/mês. Descubra como ranquear no topo, dominar o algoritmo e construir uma operação sustentável.",
    category: "Mercado Livre",
    date: "07 abr 2025",
    readTime: "18 min",
    author: "Rafael Mendes",
    authorRole: "Co-fundador, ex-seller ML",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 50%, #378ADD 100%)",
    emoji: "📈",
    catColor: "#60a5fa",
    catBg: "rgba(96,165,250,0.15)",
    highlights: ["Algoritmo e posicionamento", "Campanhas de anúncios", "Escalabilidade de operação"],
  },
  {
    id: 2,
    title: "Shopee vs Mercado Livre: onde vale mais a pena vender em cada nicho?",
    excerpt:
      "Uma análise detalhada das taxas, alcance, logística e potencial de lucro em cada plataforma. Comparamos comissões, frete, visibilidade orgânica e estratégias de crescimento para 8 nichos diferentes.",
    category: "Comparativo",
    date: "02 abr 2025",
    readTime: "14 min",
    author: "Carla Vasconcelos",
    authorRole: "Analista de marketplaces",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #f97316 100%)",
    emoji: "⚖️",
    catColor: "#fb923c",
    catBg: "rgba(251,146,60,0.15)",
    highlights: ["Tabela de comissões atualizada", "8 nichos comparados", "Calculadora de margem inclusa"],
  },
  {
    id: 3,
    title: "Precificação inteligente: como usar dados para maximizar lucro sem perder vendas",
    excerpt:
      "Estratégias avançadas de precificação dinâmica que os top sellers utilizam. Aprenda a monitorar concorrentes, ajustar margens automaticamente e encontrar o ponto ideal entre volume de vendas e lucratividade.",
    category: "Precificação",
    date: "25 mar 2025",
    readTime: "12 min",
    author: "Lucas Ferreira",
    authorRole: "Especialista em pricing",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)",
    emoji: "💹",
    catColor: "#a78bfa",
    catBg: "rgba(167,139,250,0.15)",
    highlights: ["Pricing dinâmico na prática", "Monitoramento de concorrentes", "Template de planilha grátis"],
  },
];

export default function BlogSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Throttled mousemove — runs at most once per animation frame
  const rafRef = useRef(0);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafRef.current) return; // already scheduled
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const container = containerRef.current;
        const spotlight = spotlightRef.current;
        if (!container || !spotlight) return;

        const cards = container.querySelectorAll<HTMLElement>(".blog-slide");
        let found = false;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            found = true;
            spotlight.style.opacity = "1";
            spotlight.style.left = `${rect.left - containerRect.left}px`;
            spotlight.style.top = `${rect.top - containerRect.top}px`;
            spotlight.style.width = `${rect.width}px`;
            spotlight.style.height = `${rect.height}px`;
          }
        });

        if (!found) {
          spotlight.style.opacity = "0";
        }
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="blog-slider-wrapper">
      {/* ── Orbital background ── */}
      <div className="blog-slider-bg" aria-hidden="true">
        <div className="blog-orbit-sun" />
        <div className="blog-orbit-ring blog-orbit-ring-1" />
        <div className="blog-orbit-ring blog-orbit-ring-2" />
        <div className="blog-orbit-ring blog-orbit-ring-3" />
        <div className="blog-planet blog-planet-1" />
        <div className="blog-planet blog-planet-2" />
        <div className="blog-planet blog-planet-3" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="blog-star-dot"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* ── Slider ── */}
      <div
        ref={containerRef}
        className="blog-slider-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={spotlightRef} className="blog-spotlight" />

        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          centeredSlides
          slidesPerView={1}
          spaceBetween={32}
          loop
          grabCursor
          pagination={{ clickable: true, el: ".blog-slider-dots" }}
          navigation={{
            nextEl: ".blog-slider-next",
            prevEl: ".blog-slider-prev",
          }}
          breakpoints={{
            900: { slidesPerView: 1.15, spaceBetween: 32 },
            1200: { slidesPerView: 1.3, spaceBetween: 40 },
          }}
          style={{ padding: "20px 0 50px", overflow: "visible" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article className="blog-slide blog-slide--featured">
                {/* Left — Visual */}
                <div
                  className="blog-slide-visual"
                  style={{ background: slide.gradient }}
                >
                  <span className="blog-slide-emoji blog-slide-emoji--lg">
                    {slide.emoji}
                  </span>
                  <span
                    className="blog-slide-cat blog-slide-cat--lg"
                    style={{
                      color: slide.catColor,
                      backgroundColor: slide.catBg,
                    }}
                  >
                    {slide.category}
                  </span>
                </div>

                {/* Right — Content */}
                <div className="blog-slide-content">
                  <h3 className="blog-slide-title blog-slide-title--lg">
                    {slide.title}
                  </h3>
                  <p className="blog-slide-excerpt blog-slide-excerpt--lg">
                    {slide.excerpt}
                  </p>

                  {/* Highlights */}
                  <div className="blog-slide-highlights">
                    {slide.highlights.map((h, i) => (
                      <span key={i} className="blog-slide-highlight">
                        <span className="blog-slide-highlight-dot" style={{ backgroundColor: slide.catColor }} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Author + Meta */}
                  <div className="blog-slide-footer">
                    <div className="blog-slide-author">
                      <div
                        className="blog-slide-avatar blog-slide-avatar--lg"
                        style={{
                          background: slide.gradient,
                        }}
                      >
                        {slide.author.charAt(0)}
                      </div>
                      <div>
                        <span className="blog-slide-author-name">
                          {slide.author}
                        </span>
                        <span className="blog-slide-author-role">
                          {slide.authorRole}
                        </span>
                      </div>
                    </div>
                    <div className="blog-slide-info">
                      <span>{slide.date}</span>
                      <span className="blog-slide-time">{slide.readTime}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="#"
                    className="blog-slide-cta"
                    style={{
                      background: slide.gradient,
                    }}
                  >
                    Ler artigo completo →
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="blog-slider-dots" />

        {/* Nav arrows */}
        <button className="blog-slider-prev" aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="blog-slider-next" aria-label="Próximo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
