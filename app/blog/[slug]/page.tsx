import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, BookOpen, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Article data ──────────────────────────────────────────────────────────────

const ARTICLES: Record<string, {
  title: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  readTime: string;
  gradient: string;
  body: {
    intro: string;
    sections: { heading: string; content: string; quote?: string }[];
  };
}> = {
  "como-precificar-mercado-livre": {
    title: "Como precificar produtos no Mercado Livre e ainda ter lucro",
    category: "Mercado Livre",
    author: "Rafael Mendes",
    authorRole: "Co-fundador, ex-seller ML",
    authorBio:
      "Rafael vendeu mais de R$4 milhões no Mercado Livre antes de co-fundar o Sellerverse. Especialista em pricing, rentabilidade e crescimento de lojas em marketplaces brasileiros.",
    date: "07 abr 2025",
    readTime: "14 min",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 60%, #378ADD 100%)",
    body: {
      intro:
        "Precificar mal é o erro número um que destrói margens de sellers no Mercado Livre. A lógica parece simples: compre por R$10, venda por R$20. Mas quando você desconta a comissão do marketplace, o frete, os impostos, o custo de embalagem, o custo de capital de giro e as inevitáveis devoluções, aquele lucro de R$10 pode virar prejuízo de R$2. Neste guia, vamos destrinchar a fórmula de precificação que sellers de alto volume usam para manter margem líquida positiva mesmo em mercados competitivos.",
      sections: [
        {
          heading: "Entendendo a estrutura de custos reais",
          content:
            "Antes de falar em preço de venda, você precisa mapear todos os custos que incidem sobre cada produto. A maioria dos sellers iniciantes considera apenas o custo de aquisição (CMV) e a comissão do Mercado Livre — que pode variar de 10% a 20% dependendo da categoria. Mas a lista real é bem maior: frete de saída (cobrado parcialmente pelo vendedor dependendo do nível de reputação), embalagem e insumos de expedição, impostos sobre vendas (que variam conforme seu regime tributário — Simples Nacional, Presumido ou Real), custo de devoluções e reembolsos (que historicamente giram em torno de 2% a 4% das vendas), custo de anúncios patrocinados quando usados, e o custo de oportunidade do capital investido em estoque. Um bom ponto de partida é calcular o chamado 'custo total de servir' — a soma de todos esses elementos — antes de definir qualquer preço. Sellers que faturam acima de R$100k mensais raramente precificam sem esse número em mãos.",
          quote:
            "Se você não sabe exatamente quanto custa servir cada pedido, você está apostando, não vendendo.",
        },
        {
          heading: "A fórmula do markup reverso",
          content:
            "A abordagem mais eficiente para precificação em marketplaces é o markup reverso: em vez de partir do custo e adicionar uma margem, você parte do preço que o mercado aceita pagar e verifica se há espaço para lucro. O processo é o seguinte: pesquise os três primeiros colocados da sua categoria para o produto em questão e anote o preço médio ponderado. Em seguida, subtraia todos os custos variáveis (comissão ML + frete + impostos) — isso geralmente representa entre 28% e 35% do preço de venda para a maioria das categorias. Do resultado, subtraia seus custos fixos rateados por unidade. O que sobrar é sua margem líquida disponível. Se a margem líquida for inferior a 8% do preço de venda, o produto merece uma análise cuidadosa antes de ser ativado. Alguns sellers trabalham com margens menores em produtos de giro muito alto, mas como regra geral, abaixo de 8% o risco operacional não compensa.",
        },
        {
          heading: "Estratégias de precificação dinâmica",
          content:
            "O mercado muda diariamente. Concorrentes entram e saem, custos de frete sobem, o Mercado Livre altera regras de comissão. Por isso, sellers profissionais não precificam uma vez e esquecem — eles monitoram e ajustam de forma sistemática. Existem três estratégias principais para precificação dinâmica. A primeira é o seguimento de preço: você define uma faixa de preço-alvo (exemplo: sempre 3% abaixo do segundo colocado) e ajusta automaticamente quando alguém altera o preço. A segunda é a precificação por posição: você define a posição que deseja ocupar no ranking e aceita o preço necessário para mantê-la, desde que a margem mínima seja respeitada. A terceira é a precificação por demanda: em períodos de alta demanda (Natal, Black Friday, Dia das Mães), você eleva o preço ligeiramente acima do mercado e aproveita o volume para melhorar a margem; em períodos fracos, você compensa com volume via preço competitivo. Ferramentas como o monitor de concorrentes do Sellerverse tornam esse processo automatizado para quem está no plano Premium.",
          quote:
            "Quem precifica manualmente uma vez por semana está sempre correndo atrás. Sellers de elite monitoram em tempo real.",
        },
        {
          heading: "Erros comuns e como evitá-los",
          content:
            "O primeiro erro é ignorar o regime tributário. Um seller no Lucro Presumido que compete com um seller no Simples Nacional está comparando custos completamente diferentes. Antes de entrar em qualquer batalha de preços, entenda quanto de imposto você paga por real faturado e quanto seu concorrente provavelmente paga. O segundo erro é não precificar devoluções. Se você vende 100 unidades por mês e tem 3% de devolução, isso são 3 unidades cujo custo você absorve — produto, frete de retorno, re-embalagem. Esse custo precisa estar diluído em todas as vendas. O terceiro erro é confundir margem bruta com margem líquida. É possível ter 40% de margem bruta e operar no vermelho se os custos fixos forem altos. Sempre calcule e acompanhe a margem líquida. O quarto e mais perigoso erro é entrar em guerra de preços sem ter vantagem de custo. Se você e seu concorrente pagam o mesmo pelo produto e têm a mesma estrutura, o único resultado de uma guerra de preços é que ambos perdem dinheiro. A saída é diferenciar — frete mais rápido, melhor foto, título mais otimizado, atendimento mais ágil — em vez de cortar preço.",
        },
      ],
    },
  },
};

// Default article for unknown slugs
const DEFAULT_ARTICLE = {
  title: "Guia completo de precificação para sellers de marketplace",
  category: "Estratégia",
  author: "Equipe Sellerverse",
  authorRole: "Time editorial",
  authorBio:
    "O time editorial do Sellerverse é formado por sellers experientes e especialistas em e-commerce brasileiro com mais de 10 anos de mercado.",
  date: "07 abr 2025",
  readTime: "12 min",
  gradient: "linear-gradient(135deg, #185FA5 0%, #378ADD 100%)",
  body: {
    intro:
      "Entender como precificar corretamente é a diferença entre um negócio sustentável e uma operação que consome capital sem gerar retorno.",
    sections: [
      {
        heading: "Fundamentos de precificação",
        content:
          "A precificação estratégica começa com o mapeamento completo dos custos. Isso inclui o custo do produto, frete, comissões, impostos e todos os custos indiretos da operação.",
      },
      {
        heading: "Como aplicar na prática",
        content:
          "Use ferramentas de análise para acompanhar o mercado em tempo real. O Sellerverse oferece dashboards completos para monitorar preços da concorrência e sua própria margem por produto.",
      },
    ],
  },
};

function getArticle(slug: string) {
  return ARTICLES[slug] ?? { ...DEFAULT_ARTICLE, slug };
}

// ─── Related Posts ─────────────────────────────────────────────────────────────

const RELATED_POSTS = [
  {
    title: "ROI de ads no Mercado Livre: quando investir e quando parar",
    category: "Anúncios",
    date: "02 abr 2025",
    readTime: "9 min",
    slug: "roi-ads-mercado-livre",
  },
  {
    title: "Gestão de estoque para sellers: o método ABC adaptado",
    category: "Gestão",
    date: "28 mar 2025",
    readTime: "11 min",
    slug: "gestao-estoque-abc",
  },
  {
    title: "SEO no Mercado Livre: títulos e descrições que convertem",
    category: "SEO",
    date: "21 mar 2025",
    readTime: "8 min",
    slug: "seo-mercado-livre",
  },
];

// ─── TOC Items ─────────────────────────────────────────────────────────────────

const POPULAR_POSTS = [
  {
    title: "O guia definitivo para escalar vendas no ML em 2025",
    date: "07 abr 2025",
    readTime: "18 min",
    slug: "escalar-vendas-ml-2025",
  },
  {
    title: "Shopee vs Mercado Livre: onde vender em 2025?",
    date: "01 abr 2025",
    readTime: "10 min",
    slug: "shopee-vs-ml-2025",
  },
  {
    title: "Como calcular a margem real de cada produto",
    date: "25 mar 2025",
    readTime: "7 min",
    slug: "calcular-margem-produto",
  },
];

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: `${article.title} | Blog Sellerverse`,
    description: article.body.intro.slice(0, 160),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0A0F", paddingTop: "80px" }}>

        {/* ── Article Hero ── */}
        <section
          style={{
            background: article.gradient,
            padding: "64px 0 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              pointerEvents: "none",
            }}
          />
          <div className="container-orbit" style={{ position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-body transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-white/40 text-sm font-body truncate max-w-[200px]">
                {article.category}
              </span>
            </div>

            {/* Category badge */}
            <span
              className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 font-body"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {article.category}
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.15,
                maxWidth: "800px",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 pb-8">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #185FA5, #378ADD)",
                  }}
                >
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold font-body">{article.author}</p>
                  <p className="text-white/50 text-xs font-body">{article.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/50 text-sm font-body">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime} de leitura
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero image area ── */}
        <div
          style={{
            height: "280px",
            background: `linear-gradient(180deg, ${article.gradient.replace("linear-gradient(135deg, ", "").replace(")", "")} 0%, #0A0A0F 100%)`,
            opacity: 0.4,
          }}
        />

        {/* ── Content + Sidebar ── */}
        <section style={{ padding: "0 0 80px" }}>
          <div className="container-orbit">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 -mt-20">

              {/* ── Article Body ── */}
              <article>
                {/* Intro */}
                <div
                  className="rounded-2xl border border-white/10 p-8 mb-8"
                  style={{ backgroundColor: "rgba(26,26,46,0.8)", backdropFilter: "blur(12px)" }}
                >
                  <p
                    style={{
                      fontSize: "1.125rem",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.85,
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                    }}
                  >
                    {article.body.intro}
                  </p>
                </div>

                {/* Sections */}
                <div
                  className="rounded-2xl border border-white/10 p-8 space-y-10"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  {article.body.sections.map((section, idx) => (
                    <section key={idx} id={`section-${idx}`}>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                          fontWeight: 700,
                          color: "white",
                          marginBottom: "16px",
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {section.heading}
                      </h2>

                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgba(255,255,255,0.65)",
                          lineHeight: 1.9,
                          fontFamily: "var(--font-body)",
                          marginBottom: section.quote ? "20px" : "0",
                        }}
                      >
                        {section.content}
                      </p>

                      {section.quote && (
                        <blockquote
                          style={{
                            borderLeft: "3px solid #378ADD",
                            paddingLeft: "20px",
                            margin: "0",
                            fontStyle: "italic",
                            color: "rgba(255,255,255,0.75)",
                            fontSize: "16px",
                            lineHeight: 1.7,
                            fontFamily: "var(--font-body)",
                            background: "rgba(55,138,221,0.06)",
                            borderRadius: "0 12px 12px 0",
                            padding: "16px 20px",
                          }}
                        >
                          {section.quote}
                        </blockquote>
                      )}
                    </section>
                  ))}
                </div>

                {/* Author card */}
                <div
                  className="rounded-2xl border border-white/10 p-6 mt-8 flex items-start gap-5"
                  style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                >
                  <div
                    className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
                  >
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className="font-bold text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {article.author}
                      </p>
                      <span className="text-xs text-white/40 font-body">•</span>
                      <span className="text-xs text-orbit-400 font-body">{article.authorRole}</span>
                    </div>
                    <p className="text-sm text-white/55 font-body leading-relaxed">
                      {article.authorBio}
                    </p>
                  </div>
                </div>
              </article>

              {/* ── Sidebar ── */}
              <aside className="space-y-6 lg:sticky lg:top-24 self-start">

                {/* Table of contents */}
                <div
                  className="rounded-2xl border border-white/10 p-5"
                  style={{ backgroundColor: "rgba(26,26,46,0.7)", backdropFilter: "blur(12px)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-orbit-400" />
                    <h3
                      className="text-sm font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Neste artigo
                    </h3>
                  </div>
                  <ol className="space-y-2">
                    {article.body.sections.map((section, idx) => (
                      <li key={idx}>
                        <a
                          href={`#section-${idx}`}
                          className="flex items-start gap-2.5 text-xs text-white/50 hover:text-orbit-400 transition-colors font-body leading-relaxed"
                        >
                          <span
                            className="shrink-0 w-4 h-4 rounded-full bg-orbit-900 text-orbit-400 flex items-center justify-center text-[10px] font-bold mt-0.5"
                          >
                            {idx + 1}
                          </span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Popular posts */}
                <div
                  className="rounded-2xl border border-white/10 p-5"
                  style={{ backgroundColor: "rgba(26,26,46,0.7)" }}
                >
                  <h3
                    className="text-sm font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Artigos populares
                  </h3>
                  <div className="space-y-3">
                    {POPULAR_POSTS.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <p className="text-xs text-white/70 group-hover:text-orbit-400 transition-colors font-body leading-relaxed mb-1">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-white/30 text-xs font-body">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Ebook CTA */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(12,68,124,0.6) 0%, rgba(24,95,165,0.4) 100%)",
                    border: "1px solid rgba(55,138,221,0.3)",
                  }}
                >
                  <span className="inline-block text-xs font-bold text-orbit-400 uppercase tracking-wider mb-3 font-body">
                    Grátis
                  </span>
                  <h3
                    className="text-sm font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Guia de Precificação para Sellers
                  </h3>
                  <p className="text-xs text-white/55 font-body mb-4 leading-relaxed">
                    Planilha + guia completo com fórmulas prontas para calcular margem real de qualquer produto.
                  </p>
                  <Link
                    href="/blog"
                    className="block w-full py-2.5 rounded-xl text-center text-sm font-bold text-white font-body transition-all"
                    style={{
                      background: "linear-gradient(135deg, #185FA5, #378ADD)",
                    }}
                  >
                    Baixar grátis
                  </Link>
                </div>
              </aside>
            </div>

            {/* ── Related Posts ── */}
            <div className="mt-16">
              <h2
                className="text-xl font-bold text-white mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Artigos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RELATED_POSTS.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <div
                      className="rounded-2xl border border-white/10 p-6 h-full transition-all duration-300"
                      style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
                    >
                      <span
                        className="inline-block text-xs font-bold text-orbit-400 uppercase tracking-wider mb-3 font-body"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="text-sm font-bold text-white group-hover:text-orbit-400 transition-colors mb-3 leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/30 text-xs font-body">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Newsletter CTA ── */}
            <div
              className="mt-12 rounded-2xl p-10 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(4,44,83,0.8) 0%, rgba(26,26,46,0.9) 100%)",
                border: "1px solid rgba(55,138,221,0.25)",
              }}
            >
              <span className="inline-block text-xs font-bold text-orbit-400 uppercase tracking-widest mb-3 font-body">
                Newsletter
              </span>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Receba conteúdo toda semana
              </h2>
              <p className="text-white/50 font-body text-sm mb-6 max-w-md mx-auto leading-relaxed">
                Estratégias, análises e dicas exclusivas para sellers. Sem spam. Cancele quando quiser.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-orbit-400/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white font-body transition-all hover:opacity-90 shrink-0"
                  style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
                >
                  Assinar
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
