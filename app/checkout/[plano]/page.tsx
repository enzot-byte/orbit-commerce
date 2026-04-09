import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle, Shield, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "./CheckoutForm";

// ─── Plan data ─────────────────────────────────────────────────────────────────

const PLANS = {
  pro: {
    name: "Pro",
    monthlyPrice: 97,
    annualPrice: 930,
    description: "Para sellers que querem crescer com ferramentas profissionais.",
    features: [
      "Todas as ferramentas (12+)",
      "Todos os cursos completos",
      "Dashboard de métricas avançado",
      "Suporte prioritário",
      "Grupo exclusivo de mentoria",
      "Relatórios mensais personalizados",
    ],
    badge: "Mais popular",
    badgeColor: "#EF9F27",
  },
  premium: {
    name: "Premium",
    monthlyPrice: 197,
    annualPrice: 1880,
    description: "Para sellers sérios que querem acelerar e ter suporte especializado.",
    features: [
      "Tudo do plano Pro",
      "Monitor de preços da concorrência",
      "Canal direto com especialistas",
      "SLA de resposta em 2h",
      "Acesso antecipado a novos cursos",
      "Mentoria 1:1 mensal",
      "Diagnóstico e auditoria de negócio",
    ],
    badge: "Exclusivo",
    badgeColor: "#185FA5",
  },
} as const;

type PlanSlug = keyof typeof PLANS;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plano: string }>;
}): Promise<Metadata> {
  const { plano } = await params;
  const plan = PLANS[plano as PlanSlug];
  if (!plan) return { title: "Plano não encontrado" };
  return {
    title: `Checkout — Plano ${plan.name} | Sellerverse`,
    description: plan.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ plano: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const { plano } = await params;
  const { period } = await searchParams;

  const plan = PLANS[plano as PlanSlug];
  if (!plan) notFound();

  const initialPeriod = period === "annual" ? "annual" : "monthly";

  return (
    <>
      <Navbar />
      <main
        style={{
          background: "linear-gradient(160deg, #042C53 0%, #1A1A2E 40%, #0A0A0F 100%)",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        <div className="container-orbit">
          {/* Page header */}
          <div className="text-center mb-12">
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#378ADD",
                marginBottom: "12px",
              }}
            >
              Finalizar assinatura
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Plano{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {plan.name}
              </span>
            </h1>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Order summary */}
            <div>
              {/* Plan card */}
              <div
                className="rounded-2xl border border-white/10 p-6 mb-6"
                style={{ backgroundColor: "rgba(26,26,46,0.7)", backdropFilter: "blur(12px)" }}
              >
                {/* Plan header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span
                      className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 font-body"
                      style={{
                        backgroundColor: `${plan.badgeColor}20`,
                        color: plan.badgeColor,
                        border: `1px solid ${plan.badgeColor}40`,
                      }}
                    >
                      {plan.badge}
                    </span>
                    <h2
                      className="text-xl font-bold text-white font-display"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Orbit {plan.name}
                    </h2>
                    <p className="text-sm text-white/50 font-body mt-1">{plan.description}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="rounded-xl bg-white/5 border border-white/8 p-4 mb-5">
                  <div className="flex items-end gap-2 mb-1">
                    <span
                      className="text-3xl font-bold font-display"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: "linear-gradient(135deg, #EF9F27 0%, #FAC775 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      R$ {plan.monthlyPrice}
                    </span>
                    <span className="text-white/40 font-body text-sm mb-1">/mês</span>
                  </div>
                  <p className="text-xs text-white/40 font-body">
                    Ou R$ {plan.annualPrice}/ano (economize 20%)
                  </p>
                </div>

                {/* Features */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-medium font-body mb-3">
                    Incluso no plano
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-sm text-white/70 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security badges */}
              <div
                className="rounded-2xl border border-white/10 p-5"
                style={{ backgroundColor: "rgba(26,26,46,0.5)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-orbit-400" />
                  <span className="text-sm font-semibold text-white font-body">
                    Sua compra está protegida
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Lock, title: "SSL 256-bit", desc: "Dados criptografados" },
                    { icon: Shield, title: "Stripe Secure", desc: "Pagamento certificado PCI" },
                    { icon: CheckCircle, title: "Garantia 7 dias", desc: "Reembolso total sem perguntas" },
                    { icon: Shield, title: "Privacidade", desc: "Seus dados nunca são compartilhados" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orbit-900/60 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-orbit-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/80 font-body">{title}</p>
                        <p className="text-xs text-white/35 font-body">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Checkout form */}
            <div>
              <CheckoutForm
                planName={plan.name}
                monthlyPrice={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                initialPeriod={initialPeriod}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
