import React from "react";
import { Check, X, CreditCard, ExternalLink, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const mockUser = {
  name: "Pedro Alves",
  email: "pedro@exemplo.com",
  plan: "Pro" as "Grátis" | "Pro" | "Premium",
};

const plans = [
  {
    id: "gratis",
    name: "Grátis",
    price: "R$ 0",
    period: "/mês",
    desc: "Para quem está começando",
    features: [
      { text: "3 cursos básicos", included: true },
      { text: "2 ferramentas básicas", included: true },
      { text: "Comunidade WhatsApp", included: true },
      { text: "Suporte via FAQ", included: true },
      { text: "Cursos avançados", included: false },
      { text: "Ferramentas Pro", included: false },
      { text: "Comunidade Discord", included: false },
      { text: "Lives exclusivas", included: false },
    ],
    cta: "Plano atual",
    isCurrent: false,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 97",
    period: "/mês",
    desc: "Para sellers que querem crescer",
    features: [
      { text: "Todos os cursos (20+)", included: true },
      { text: "6 ferramentas avançadas", included: true },
      { text: "Comunidade WhatsApp", included: true },
      { text: "Comunidade Discord exclusiva", included: true },
      { text: "Lives mensais ao vivo", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Monitor de Preços", included: false },
      { text: "Kit de Templates", included: false },
    ],
    cta: "Plano atual",
    isCurrent: true,
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 197",
    period: "/mês",
    desc: "Para sellers de alto volume",
    features: [
      { text: "Tudo do Pro", included: true },
      { text: "Monitor de Preços em tempo real", included: true },
      { text: "Kit de Templates completo (50+)", included: true },
      { text: "Mentorias em grupo quinzenais", included: true },
      { text: "Análise de conta gratuita", included: true },
      { text: "Acesso antecipado a novas features", included: true },
      { text: "Suporte via WhatsApp direto", included: true },
      { text: "Garantia de resultados", included: true },
    ],
    cta: "Fazer upgrade",
    isCurrent: false,
    highlight: false,
  },
];

const paymentHistory = [
  { date: "01/04/2025", desc: "Sellerverse — Plano Pro", value: "R$ 97,00", status: "Pago" },
  { date: "01/03/2025", desc: "Sellerverse — Plano Pro", value: "R$ 97,00", status: "Pago" },
  { date: "01/02/2025", desc: "Sellerverse — Plano Pro", value: "R$ 97,00", status: "Pago" },
];

export default function PlanoPage() {
  return (
    <div className="p-6 lg:p-8 space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
              Meu Plano
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              Gerencie sua assinatura e benefícios
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="accent" size="lg" dot>
              Plano {mockUser.plan} ativo
            </Badge>
          </div>
        </div>
      </ScrollReveal>

      {/* Current plan card */}
      <ScrollReveal direction="up" delay={0.05}>
        <Card
          variant="dark"
          padding="lg"
          className="border border-accent-400/20 bg-accent-800/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,159,39,0.08),transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/50 text-sm mb-1">Seu plano atual</p>
              <h2 className="text-white font-bold text-2xl font-display">Plano Pro</h2>
              <p className="text-white/60 text-sm mt-1">
                Próxima cobrança em <span className="text-white">01/05/2025</span> ·{" "}
                <span className="text-accent-400 font-semibold">R$ 97,00</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-white/40 text-sm hover:text-white/60 transition-colors">
                Gerenciar cartão
              </button>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink size={14} />}
              >
                Portal de pagamento
              </Button>
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* Plan comparison */}
      <ScrollReveal direction="up" delay={0.05}>
        <section>
          <h2 className="text-lg font-bold text-white font-display mb-5">
            Fazer upgrade
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                variant="dark"
                padding="lg"
                className={`flex flex-col relative ${
                  plan.isCurrent
                    ? "border border-accent-400/30 bg-accent-800/10"
                    : plan.id === "premium"
                    ? "border border-orbit-400/20"
                    : "border border-white/10"
                }`}
              >
                {plan.isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" size="sm">
                      Atual
                    </Badge>
                  </div>
                )}
                {plan.id === "premium" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" size="sm">
                      Recomendado
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg font-display">{plan.name}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-3xl font-bold text-white font-display">
                      {plan.price}
                    </span>
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-xs">
                      {feature.included ? (
                        <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <X size={14} className="text-white/20 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={feature.included ? "text-white/70" : "text-white/30"}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.isCurrent ? (
                  <Button variant="outline" size="sm" disabled className="w-full justify-center">
                    Plano atual
                  </Button>
                ) : plan.id === "gratis" ? (
                  <Button variant="ghost" size="sm" className="w-full justify-center text-white/40" disabled>
                    Fazer downgrade
                  </Button>
                ) : (
                  <Button
                    variant={plan.id === "premium" ? "accent" : "primary"}
                    size="sm"
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Payment history */}
      <ScrollReveal direction="up" delay={0.1}>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-display">
              Histórico de pagamentos
            </h2>
            <button className="text-orbit-400 text-sm hover:text-orbit-200 transition-colors flex items-center gap-1">
              Ver todos <ExternalLink size={12} />
            </button>
          </div>
          <Card variant="dark" padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 text-left text-white/40 text-xs font-medium">
                      Data
                    </th>
                    <th className="px-5 py-3 text-left text-white/40 text-xs font-medium">
                      Descrição
                    </th>
                    <th className="px-5 py-3 text-right text-white/40 text-xs font-medium">
                      Valor
                    </th>
                    <th className="px-5 py-3 text-right text-white/40 text-xs font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0"
                    >
                      <td className="px-5 py-3.5 text-white/60 text-xs">{row.date}</td>
                      <td className="px-5 py-3.5 text-white/80 text-xs">{row.desc}</td>
                      <td className="px-5 py-3.5 text-white/80 text-xs text-right font-medium">
                        {row.value}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Badge variant="success" size="sm" dot>
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </ScrollReveal>

      {/* Manage card */}
      <ScrollReveal direction="up" delay={0.1}>
        <Card variant="dark" padding="lg" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orbit-900/40 flex items-center justify-center shrink-0">
            <CreditCard size={22} className="text-orbit-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm">Gerenciar cartão de crédito</h3>
            <p className="text-white/50 text-xs mt-0.5">
              Atualize seu cartão ou método de pagamento no portal seguro do Stripe.
            </p>
          </div>
          <Button variant="outline" size="sm" rightIcon={<ExternalLink size={14} />}>
            Abrir portal
          </Button>
        </Card>
      </ScrollReveal>

      {/* Cancellation */}
      <ScrollReveal direction="up" delay={0.1}>
        <Card
          variant="dark"
          padding="lg"
          className="border border-red-500/20 bg-red-900/10"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">Cancelar assinatura</h3>
              <p className="text-white/50 text-xs leading-relaxed">
                Ao cancelar, você perderá acesso aos cursos, ferramentas e comunidade exclusiva
                ao final do período atual (01/05/2025). Seus dados serão mantidos por 90 dias.
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-900/20 shrink-0">
              Cancelar plano
            </Button>
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}
