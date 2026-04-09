import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  Infinity,
  ChevronRight,
  Play,
  CheckCircle,
  Lock,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Course data ───────────────────────────────────────────────────────────────

const COURSES: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  lastUpdate: string;
  instructor: { name: string; role: string; bio: string; avatar: string };
  price: number | null;
  description: string;
  requirements: string[];
  learningOutcomes: string[];
  hours: number;
  modules: number;
  hasCertificate: boolean;
  gradient: string;
  curriculum: {
    title: string;
    lessons: { title: string; duration: string; free?: boolean }[];
  }[];
  reviews: { author: string; rating: number; text: string; date: string }[];
}> = {
  "precificacao-avancada": {
    title: "Precificação Avançada para Sellers",
    subtitle: "Domine a estratégia de preços que os top sellers usam para maximizar margens",
    category: "Gestão",
    rating: 4.9,
    reviewCount: 312,
    enrollmentCount: 2847,
    lastUpdate: "Março 2025",
    instructor: {
      name: "Rafael Mendes",
      role: "Co-fundador Sellerverse · 5+ anos vendendo em ML",
      bio: "Rafael acumulou mais de R$4M em vendas no Mercado Livre antes de fundar o Sellerverse. É especialista em pricing, rentabilidade e escala de operações.",
      avatar: "R",
    },
    price: null, // null = included in Pro
    description:
      "Aprenda a precificar estrategicamente seus produtos para maximizar lucro sem perder posição no ranking. Este curso combina teoria sólida com exemplos reais de produtos que faturam R$50k+ por mês.",
    requirements: [
      "Ter uma conta ativa no Mercado Livre ou Shopee",
      "Conhecimento básico de planilhas (Google Sheets ou Excel)",
      "Pelo menos 3 produtos à venda (recomendado, não obrigatório)",
    ],
    learningOutcomes: [
      "Calcular o custo total de servir de qualquer produto",
      "Aplicar markup reverso para entrar em mercados competitivos",
      "Monitorar e reagir a mudanças de preço da concorrência",
      "Criar estratégias de precificação dinâmica sem scripts",
      "Identificar quais produtos têm margem real negativa",
      "Negociar melhor com fornecedores usando dados de custo",
    ],
    hours: 6.5,
    modules: 8,
    hasCertificate: true,
    gradient: "linear-gradient(135deg, #042C53 0%, #185FA5 60%, #378ADD 100%)",
    curriculum: [
      {
        title: "Módulo 1 — Fundamentos de custo",
        lessons: [
          { title: "Boas-vindas e visão geral do curso", duration: "5:20", free: true },
          { title: "Mapeando todos os seus custos reais", duration: "18:45" },
          { title: "Comissões do ML por categoria", duration: "12:10" },
          { title: "Impostos: Simples vs Presumido vs Real", duration: "22:30" },
        ],
      },
      {
        title: "Módulo 2 — Markup e margem",
        lessons: [
          { title: "Diferença entre margem bruta e líquida", duration: "14:20" },
          { title: "Aplicando markup reverso na prática", duration: "25:00" },
          { title: "Workshop: calcule seu preço mínimo", duration: "30:00" },
        ],
      },
      {
        title: "Módulo 3 — Precificação competitiva",
        lessons: [
          { title: "Análise de concorrentes: o que olhar", duration: "16:40" },
          { title: "Estratégias: seguimento, posição e demanda", duration: "20:15" },
          { title: "Quando entrar em guerra de preços (e quando não)", duration: "18:00" },
        ],
      },
      {
        title: "Módulo 4 — Automação e ferramentas",
        lessons: [
          { title: "Ferramentas de monitoramento gratuitas", duration: "12:30" },
          { title: "Como usar o monitor de preços do Orbit", duration: "20:00" },
          { title: "Configurando alertas e regras automáticas", duration: "24:10" },
        ],
      },
    ],
    reviews: [
      {
        author: "Camila R.",
        rating: 5,
        text: "Em duas semanas aplicando o que aprendi, minha margem média subiu de 8% para 14%. Vale muito.",
        date: "15 mar 2025",
      },
      {
        author: "Thiago M.",
        rating: 5,
        text: "Rafael explica de forma muito didática. A parte de markup reverso foi um divisor de águas pra mim.",
        date: "02 mar 2025",
      },
      {
        author: "Fernanda L.",
        rating: 5,
        text: "Melhor conteúdo sobre precificação que já consumi, e já comprei vários cursos sobre o assunto.",
        date: "22 fev 2025",
      },
    ],
  },
};

const DEFAULT_COURSE = {
  title: "Curso de Estratégia para Sellers",
  subtitle: "Aprenda a escalar suas vendas no e-commerce brasileiro",
  category: "Estratégia",
  rating: 4.8,
  reviewCount: 189,
  enrollmentCount: 1240,
  lastUpdate: "Abril 2025",
  instructor: {
    name: "Equipe Orbit",
    role: "Especialistas em e-commerce brasileiro",
    bio: "Nossa equipe reúne sellers com experiência real em Mercado Livre, Shopee, Amazon e outros marketplaces brasileiros.",
    avatar: "O",
  },
  price: null,
  description: "Um curso completo para quem quer levar suas vendas em marketplaces para o próximo nível.",
  requirements: ["Conta ativa em algum marketplace", "Motivação para crescer"],
  learningOutcomes: [
    "Entender o mercado de e-commerce brasileiro",
    "Aplicar estratégias de crescimento comprovadas",
    "Usar dados para tomar melhores decisões",
  ],
  hours: 5,
  modules: 6,
  hasCertificate: true,
  gradient: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
  curriculum: [
    {
      title: "Módulo 1 — Introdução",
      lessons: [
        { title: "Boas-vindas ao curso", duration: "5:00", free: true as const },
        { title: "Visão geral do mercado", duration: "20:00" },
      ],
    },
  ],
  reviews: [
    {
      author: "João P.",
      rating: 5,
      text: "Conteúdo excelente e muito prático.",
      date: "10 abr 2025",
    },
  ],
};

function getCourse(slug: string) {
  return COURSES[slug] ?? DEFAULT_COURSE;
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${starSize} ${i <= Math.round(rating) ? "text-accent-400 fill-accent-400" : "text-white/20"}`}
        />
      ))}
    </div>
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return {
    title: `${course.title} | Sellerverse Cursos`,
    description: course.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F", paddingTop: "80px" }}>

        {/* ── Course Hero ── */}
        <section
          style={{
            background: course.gradient,
            padding: "48px 0 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", pointerEvents: "none" }}
          />

          <div className="container-orbit" style={{ position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/cursos"
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-body transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Cursos
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-white/40 text-sm font-body">{course.category}</span>
            </div>

            <div className="max-w-3xl">
              {/* Category badge */}
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 font-body"
                style={{
                  backgroundColor: "rgba(239,159,39,0.2)",
                  color: "#FAC775",
                  border: "1px solid rgba(239,159,39,0.35)",
                }}
              >
                {course.category}
              </span>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {course.title}
              </h1>

              <p className="text-white/65 font-body text-base leading-relaxed mb-6 max-w-2xl">
                {course.subtitle}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <StarRating rating={course.rating} />
                  <span className="text-accent-400 font-bold text-sm font-body">{course.rating}</span>
                  <span className="text-white/40 text-sm font-body">({course.reviewCount} avaliações)</span>
                </div>
                <span className="flex items-center gap-1.5 text-white/50 text-sm font-body">
                  <Users className="w-4 h-4" />
                  {course.enrollmentCount.toLocaleString("pt-BR")} alunos
                </span>
                <span className="text-white/40 text-xs font-body">
                  Atualizado em {course.lastUpdate}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <section style={{ padding: "40px 0 80px" }}>
          <div className="container-orbit">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

              {/* ── Left column ── */}
              <div className="space-y-8">

                {/* Video preview */}
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    aspectRatio: "16/9",
                    background: course.gradient,
                    border: "1px solid rgba(255,255,255,0.1)",
                    minHeight: "240px",
                  }}
                >
                  <div
                    style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.3)" }}
                    >
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                    <span className="text-white/60 text-sm font-body">Aula preview gratuita</span>
                  </div>
                </div>

                {/* Description */}
                <div
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <h2
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Sobre o curso
                  </h2>
                  <p className="text-white/60 font-body text-sm leading-relaxed">{course.description}</p>
                </div>

                {/* What you'll learn */}
                <div
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <h2
                    className="text-lg font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    O que você vai aprender
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-white/65 font-body leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <h2
                    className="text-lg font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Requisitos
                  </h2>
                  <ul className="space-y-2.5">
                    {course.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-orbit-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-white/60 font-body">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curriculum */}
                <div
                  className="rounded-2xl border border-white/10 overflow-hidden"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <div className="p-6 border-b border-white/10">
                    <h2
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Conteúdo do curso
                    </h2>
                    <p className="text-sm text-white/40 font-body mt-1">
                      {course.modules} módulos · {course.hours}h de conteúdo
                    </p>
                  </div>
                  <div>
                    {course.curriculum.map((module, mIdx) => (
                      <details key={mIdx} open={mIdx === 0}>
                        <summary
                          className="flex items-center justify-between px-6 py-4 cursor-pointer border-b border-white/6 hover:bg-white/3 transition-colors list-none"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <div className="flex items-center gap-3">
                            <ChevronDown className="w-4 h-4 text-orbit-400 transition-transform" />
                            <span className="text-sm font-semibold text-white font-body">
                              {module.title}
                            </span>
                          </div>
                          <span className="text-xs text-white/30 font-body shrink-0">
                            {module.lessons.length} aulas
                          </span>
                        </summary>
                        <div className="border-b border-white/6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          {module.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex items-center gap-3 px-6 py-3.5 hover:bg-white/2 transition-colors"
                              style={{ borderBottom: lIdx < module.lessons.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                            >
                              {lesson.free ? (
                                <Play className="w-4 h-4 text-orbit-400 shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-white/20 shrink-0" />
                              )}
                              <span className="text-sm text-white/60 font-body flex-1">{lesson.title}</span>
                              {lesson.free && (
                                <span className="text-xs text-orbit-400 font-bold font-body bg-orbit-900/60 px-2 py-0.5 rounded-full">
                                  Grátis
                                </span>
                              )}
                              <span className="text-xs text-white/25 font-body shrink-0">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Instructor */}
                <div
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <h2
                    className="text-lg font-bold text-white mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Instrutor
                  </h2>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xl"
                      style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
                    >
                      {course.instructor.avatar}
                    </div>
                    <div>
                      <p
                        className="font-bold text-white text-base"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {course.instructor.name}
                      </p>
                      <p className="text-orbit-400 text-xs font-body mb-2">{course.instructor.role}</p>
                      <p className="text-sm text-white/55 font-body leading-relaxed">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Avaliações dos alunos
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarRating rating={course.rating} size="md" />
                      <span className="text-accent-400 font-bold font-body">{course.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {course.reviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="border-b border-white/8 pb-5 last:border-0 last:pb-0"
                        style={{ borderBottom: idx < course.reviews.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
                          >
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white font-body">{review.author}</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} />
                              <span className="text-xs text-white/30 font-body">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-white/60 font-body leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right: Sticky sidebar ── */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div
                  className="rounded-2xl border border-white/10 overflow-hidden"
                  style={{ backgroundColor: "rgba(26,26,46,0.9)", backdropFilter: "blur(16px)" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      height: "180px",
                      background: course.gradient,
                    }}
                  >
                    <div
                      style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }}
                    />
                    <Play className="w-12 h-12 text-white fill-white/20 relative z-10" />
                  </div>

                  {/* Price / Plan */}
                  <div className="p-5 border-b border-white/10">
                    {course.price === null ? (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            Incluso
                          </span>
                          <span
                            className="text-xs font-bold px-2 py-1 rounded-full font-body"
                            style={{ backgroundColor: "rgba(239,159,39,0.15)", color: "#EF9F27", border: "1px solid rgba(239,159,39,0.3)" }}
                          >
                            Plano Pro
                          </span>
                        </div>
                        <p className="text-xs text-white/40 font-body">
                          Acesse este curso e todos os outros com qualquer plano pago.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span
                          className="text-3xl font-bold text-accent-400"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          R$ {course.price}
                        </span>
                        <span className="text-white/40 text-sm font-body ml-1">acesso vitalício</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="p-5 border-b border-white/10">
                    <Link
                      href="/checkout/pro"
                      className="block w-full py-3.5 rounded-xl text-center font-bold text-white text-sm font-body transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
                    >
                      Começar agora
                    </Link>
                    <p className="text-center text-xs text-white/30 font-body mt-2">
                      Garantia de 7 dias · Cancele quando quiser
                    </p>
                  </div>

                  {/* Features */}
                  <div className="p-5 space-y-3">
                    {[
                      { icon: Clock, label: `${course.hours}h de conteúdo em vídeo` },
                      { icon: BookOpen, label: `${course.modules} módulos` },
                      { icon: Award, label: course.hasCertificate ? "Certificado de conclusão" : "Sem certificado" },
                      { icon: Infinity, label: "Acesso vitalício" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-orbit-400 shrink-0" />
                        <span className="text-sm text-white/60 font-body">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
