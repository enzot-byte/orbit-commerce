import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Plan data ─────────────────────────────────────────────────────────────────

const PLANS = {
  pro: {
    name: "Pro",
    monthlyPrice: 97,
    description: "Para sellers que querem crescer com ferramentas profissionais.",
  },
  premium: {
    name: "Premium",
    monthlyPrice: 197,
    description: "Para sellers sérios com suporte e mentoria direta.",
  },
} as const;

type PlanSlug = keyof typeof PLANS;

export async function generateStaticParams() {
  return Object.keys(PLANS).map((plano) => ({ plano }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plano: string }>;
}): Promise<Metadata> {
  const { plano } = await params;
  const plan = PLANS[plano as PlanSlug];
  if (!plan) return { title: "Plano não encontrado" };
  return {
    title: `Assinar ${plan.name} | Sellerverse`,
    description: plan.description,
    robots: { index: false, follow: false },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * Checkout DESATIVADO temporariamente.
 *
 * Antes essa rota mostrava um form completo de cartão de crédito com badges
 * "SSL 256-bit · Stripe Secure · Certificado PCI" — mas o Stripe NÃO está
 * plugado. O form era 100% mock: usuário preenchia cartão, recebia
 * SuccessState falso, nenhum dinheiro saía. Risco ético + legal grave
 * (coleta de dados sensíveis sem processador autorizado).
 *
 * Substituído por esta página de "Como assinar" que explica a fase atual
 * (Pix manual com Enzo) até o Stripe entrar de verdade no Sprint 1.
 *
 * Pra reativar o checkout automatizado:
 * 1. Stripe wired (envs STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET)
 * 2. /api/checkout/route.ts cria Checkout Session
 * 3. /api/webhook/stripe/route.ts processa events
 * 4. Esta page volta a renderizar o CheckoutForm
 * Ver ROADMAP.md Sprint 1.
 */
export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ plano: string }>;
}) {
  const { plano } = await params;
  const plan = PLANS[plano as PlanSlug];
  if (!plan) notFound();

  return (
    <>
      <Navbar />
      <main
        style={{
          background: "linear-gradient(160deg, #042C53 0%, #1A1A2E 40%, #0A0A0F 100%)",
          minHeight: "100vh",
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
      >
        <div className="container-orbit">
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              padding: "48px",
              borderRadius: "24px",
              backgroundColor: "rgba(26,26,46,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                borderRadius: "999px",
                backgroundColor: "rgba(239,159,39,0.12)",
                border: "1px solid rgba(239,159,39,0.3)",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#EF9F27" }}>
                MVP · cobrança manual via Pix
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Assinar Plano{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {plan.name}
              </span>{" "}
              — R$ {plan.monthlyPrice}/mês
            </h1>

            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "32px" }}>
              Estamos na fase inicial do Sellerverse. Pra entregar com qualidade pros primeiros
              assinantes, a cobrança ainda é processada manualmente via Pix —{" "}
              <strong className="text-white">não com cartão de crédito automatizado</strong> (Stripe
              entra no próximo sprint).
            </p>

            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                backgroundColor: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.20)",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Como funciona
              </h2>
              <ol
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  paddingLeft: "20px",
                  marginBottom: 0,
                }}
              >
                <li>
                  Você manda mensagem no WhatsApp ou e-mail com seu nome + e-mail de cadastro
                </li>
                <li>
                  A gente confirma seus dados e te passa a chave Pix do plano {plan.name} (R$ {plan.monthlyPrice}/mês)
                </li>
                <li>
                  Você paga e manda comprovante. Em até 12h úteis seu acesso Pro fica liberado
                </li>
                <li>
                  Garantia de 7 dias — qualquer motivo, devolvemos 100%
                </li>
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <a
                href="https://wa.me/5500000000000?text=Olá! Quero assinar o Plano Pro do Sellerverse"
                /* TODO: substituir 5500000000000 pelo WhatsApp real do Enzo */
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </a>
              <a
                href={`mailto:suporte@sellerverse.com.br?subject=Quero assinar Plano ${plan.name}&body=Olá!%0A%0AQuero assinar o Plano ${plan.name} (R$ ${plan.monthlyPrice}/mês) do Sellerverse.%0A%0AMeu email de cadastro:%0AMeu nome:%0A`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                <Mail size={18} />
                Mandar por e-mail
              </a>
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                textAlign: "center",
                marginBottom: "0",
              }}
            >
              Cobrança automatizada via cartão (Stripe) chega no Sprint 1 do roadmap.{" "}
              <Link href="/planos" style={{ color: "#9B7BFF", textDecoration: "none" }}>
                Voltar pra planos
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
