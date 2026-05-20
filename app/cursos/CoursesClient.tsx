"use client";

import Link from "next/link";

/**
 * Cursos públicos — versão honesta (substituiu 10 cursos com instrutores
 * fictícios e ratings inventados).
 *
 * Regra dura: NENHUM curso aparece aqui com "rating: 4.X, reviews: NNN"
 * inventado. Quando um curso for ao ar de verdade, ele migra de
 * `status: "em-producao"` pra `status: "live"` e ganha rating real
 * conforme aluno avaliar. Até lá, só roadmap transparente.
 */

interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: "live" | "em-producao" | "roadmap";
  eta?: string;
  gradient: string;
  emoji: string;
  marketplace: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
}

const courses: Course[] = [
  {
    id: "precificacao-que-sobra",
    title: "Precificação que sobra",
    tagline: "Calcule margem real em 5 marketplaces sem teoria balofa",
    description:
      "Curso piloto pareado com a Calculadora Multiplataforma. Você sai sabendo exatamente quanto cobrar pra ter margem real em Shopee, ML, Amazon, Magalu e SHEIN.",
    status: "em-producao",
    eta: "Em produção",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    emoji: "💹",
    marketplace: "Geral",
    level: "Intermediário",
  },
  {
    id: "sellerspy-do-zero",
    title: "Sellerspy do zero",
    tagline: "Ache fornecedor ganhador no ML em 15 minutos",
    description:
      "Demo prática usando a extensão Sellerspy pra encontrar oportunidades reais de catálogo. Casa com a ferramenta que vem incluída no Pro.",
    status: "em-producao",
    eta: "Em produção",
    gradient: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
    emoji: "🔍",
    marketplace: "Mercado Livre",
    level: "Iniciante",
  },
  {
    id: "anatomia-anuncio-campeao",
    title: "Anatomia de anúncio campeão",
    tagline: "UX e SEO de listing pra ML, Shopee e Amazon",
    description:
      "Como construir título, imagem e descrição que convertem. Os 30 erros mais comuns que matam conversão — e como evitar todos.",
    status: "roadmap",
    eta: "Próximo na fila",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    emoji: "🎯",
    marketplace: "Geral",
    level: "Iniciante",
  },
  {
    id: "dre-pra-seller",
    title: "DRE pra seller",
    tagline: "Saiba se você tá lucrando de verdade",
    description:
      "Construa o DRE do seu negócio sem ser contador. Cross-curso com o Sellerdata (produto irmão) que automatiza a coleta de dados.",
    status: "roadmap",
    eta: "Sob demanda da comunidade",
    gradient: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
    emoji: "📊",
    marketplace: "Geral",
    level: "Avançado",
  },
];

const statusStyle: Record<
  Course["status"],
  { label: string; color: string; bg: string; border: string }
> = {
  live: {
    label: "Disponível agora",
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.30)",
  },
  "em-producao": {
    label: "Em produção",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.10)",
    border: "rgba(239,159,39,0.30)",
  },
  roadmap: {
    label: "No roadmap",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.10)",
    border: "rgba(167,139,250,0.30)",
  },
};

export default function CoursesClient() {
  return (
    <div>
      {/* Status honesto — substitui filtros que só faziam sentido com 10
          cursos inventados. */}
      <div
        style={{
          marginBottom: "32px",
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: "rgba(167,139,250,0.06)",
          border: "1px solid rgba(167,139,250,0.20)",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "white" }}>Honestidade radical:</strong>{" "}
          Sellerverse é um MVP em construção. Estamos gravando os primeiros
          cursos agora e abrindo o roadmap completo pra você ver o que vem
          a seguir. Assinantes Pro ganham acesso a TUDO que for publicado,
          desde o piloto.
        </p>
      </div>

      {/* Course grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {courses.map((course) => {
          const status = statusStyle[course.status];
          return (
            <div
              key={course.id}
              style={{
                backgroundColor: "#16162A",
                borderRadius: "18px",
                border: `1px solid ${status.border}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  background: course.gradient,
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "44px",
                  position: "relative",
                }}
              >
                {course.emoji}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    color: status.color,
                    backgroundColor: status.bg,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${status.border}`,
                  }}
                >
                  {status.label}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    color: "rgba(255,255,255,0.7)",
                    backgroundColor: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {course.marketplace}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "20px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "6px",
                    lineHeight: 1.35,
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#a78bfa",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  {course.tagline}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: "16px",
                  }}
                >
                  {course.description}
                </p>

                {/* ETA + CTA */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 500,
                    }}
                  >
                    {course.eta}
                  </span>
                  <Link
                    href="/cadastro"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: status.color,
                      textDecoration: "none",
                    }}
                  >
                    Garantir acesso →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
