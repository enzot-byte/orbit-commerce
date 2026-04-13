"use client";

/**
 * BlogSlider — Swiper-based featured news carousel with hover highlight.
 * A white "spotlight" card follows the hovered slide.
 * Background: orbital / planetary Sellerverse theme (CSS).
 * Converted from jQuery to React refs.
 */

import { useRef, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

interface SlideData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  gradient: string;
  emoji: string;
  catColor: string;
  catBg: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Como dominar o algoritmo do Mercado Livre em 2025",
    excerpt:
      "Descubra os fatores que realmente influenciam o posicionamento dos seus anúncios e como otimizá-los.",
    category: "Mercado Livre",
    date: "05 abr 2025",
    readTime: "8 min",
    author: "Rafael Mendes",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    emoji: "🛒",
    catColor: "#60a5fa",
    catBg: "rgba(96,165,250,0.15)",
  },
  {
    id: 2,
    title: "Shopee vs Mercado Livre: onde vale mais a pena vender?",
    excerpt:
      "Uma análise detalhada das taxas, alcance e potencial de lucro em cada plataforma.",
    category: "Shopee",
    date: "02 abr 2025",
    readTime: "12 min",
    author: "Carla Vasconcelos",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    emoji: "⚖️",
    catColor: "#fb923c",
    catBg: "rgba(251,146,60,0.15)",
  },
  {
    id: 3,
    title: "Amazon FBA: vale a pena para sellers brasileiros?",
    excerpt:
      "Tudo sobre a estrutura FBA no Brasil, custos reais, vantagens e como começar do jeito certo.",
    category: "Amazon",
    date: "29 mar 2025",
    readTime: "10 min",
    author: "Amanda Costa",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    emoji: "📦",
    catColor: "#facc15",
    catBg: "rgba(250,204,21,0.15)",
  },
  {
    id: 4,
    title: "Precificação dinâmica: ajustar preços sem perder margem",
    excerpt:
      "Estratégias avançadas de precificação para competir no preço sem destruir lucratividade.",
    category: "Precificação",
    date: "25 mar 2025",
    readTime: "7 min",
    author: "Lucas Ferreira",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    emoji: "💹",
    catColor: "#a78bfa",
    catBg: "rgba(167,139,250,0.15)",
  },
  {
    id: 5,
    title: "TikTok Shop: a oportunidade que sellers estão ignorando",
    excerpt:
      "Como usar o TikTok Shop para gerar vendas orgânicas e construir audiência fiel.",
    category: "Marketing",
    date: "20 mar 2025",
    readTime: "9 min",
    author: "Pedro Alves",
    gradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    emoji: "🎵",
    catColor: "#f472b6",
    catBg: "rgba(244,114,182,0.15)",
  },
  {
    id: 6,
    title: "SEO para marketplaces: títulos que vendem",
    excerpt:
      "Framework comprovado para criar títulos que rankeiam bem e convencem o cliente a clicar.",
    category: "Marketing",
    date: "15 mar 2025",
    readTime: "11 min",
    author: "Julia Ramos",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    emoji: "✍️",
    catColor: "#34d399",
    catBg: "rgba(52,211,153,0.15)",
  },
];

export default function BlogSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      const spotlight = spotlightRef.current;
      if (!container || !spotlight) return;

      const slides = container.querySelectorAll<HTMLElement>(".blog-slide");
      let found = false;

      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
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
        {/* Central sun/planet */}
        <div className="blog-orbit-sun" />
        {/* Orbit rings */}
        <div className="blog-orbit-ring blog-orbit-ring-1" />
        <div className="blog-orbit-ring blog-orbit-ring-2" />
        <div className="blog-orbit-ring blog-orbit-ring-3" />
        {/* Tiny planets */}
        <div className="blog-planet blog-planet-1" />
        <div className="blog-planet blog-planet-2" />
        <div className="blog-planet blog-planet-3" />
        {/* Scattered dots */}
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
        {/* Spotlight follow card */}
        <div ref={spotlightRef} className="blog-spotlight" />

        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1.5,
            slideShadows: false,
          }}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={24}
          loop
          grabCursor
          navigation={{
            nextEl: ".blog-slider-next",
            prevEl: ".blog-slider-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            900: { slidesPerView: 2.2, spaceBetween: 24 },
            1200: { slidesPerView: 3, spaceBetween: 28 },
          }}
          style={{ padding: "20px 0 40px", overflow: "visible" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} style={{ width: "340px" }}>
              <article className="blog-slide">
                {/* Thumbnail */}
                <div
                  className="blog-slide-thumb"
                  style={{ background: slide.gradient }}
                >
                  <span className="blog-slide-emoji">{slide.emoji}</span>
                  <span
                    className="blog-slide-cat"
                    style={{
                      color: slide.catColor,
                      backgroundColor: slide.catBg,
                    }}
                  >
                    {slide.category}
                  </span>
                </div>

                {/* Content */}
                <div className="blog-slide-body">
                  <h3 className="blog-slide-title">{slide.title}</h3>
                  <p className="blog-slide-excerpt">{slide.excerpt}</p>
                  <div className="blog-slide-meta">
                    <div className="blog-slide-author">
                      <div className="blog-slide-avatar">
                        {slide.author.charAt(0)}
                      </div>
                      <span>{slide.author}</span>
                    </div>
                    <div className="blog-slide-info">
                      <span>{slide.date}</span>
                      <span className="blog-slide-time">{slide.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

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
