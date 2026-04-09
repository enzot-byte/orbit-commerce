import React from "react";
import { MessageCircle, ExternalLink, Calendar, Play, Shield, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const mockUser = {
  plan: "Pro" as "Grátis" | "Pro" | "Premium",
};

const upcomingLives = [
  {
    date: "10",
    month: "ABR",
    weekday: "Quinta",
    time: "20h00",
    topic: "Como escalar no Mercado Livre em 2025",
    host: "Felipe Torres",
    tag: "Vendas",
  },
  {
    date: "15",
    month: "ABR",
    weekday: "Terça",
    time: "19h30",
    topic: "Gestão de estoque inteligente com planilhas",
    host: "Ana Lima",
    tag: "Operações",
  },
  {
    date: "22",
    month: "ABR",
    weekday: "Terça",
    time: "20h00",
    topic: "Amazon FBA — vale a pena no Brasil em 2025?",
    host: "Bruno Costa",
    tag: "Estratégia",
  },
];

const pastLives = [
  {
    date: "03 Abr",
    topic: "Precificação avançada para sellers de moda",
    host: "Rafaela Melo",
    views: "1.2k",
    duration: "1h 24min",
  },
  {
    date: "27 Mar",
    topic: "Shopee vs Mercado Livre: onde vender em 2025?",
    host: "Diego Santos",
    views: "983",
    duration: "58 min",
  },
  {
    date: "20 Mar",
    topic: "Tráfego pago para sellers: Google x Meta",
    host: "Camila Santos",
    views: "1.8k",
    duration: "1h 12min",
  },
];

const rules = [
  "Respeite todos os membros da comunidade.",
  "Não compartilhe spam ou propaganda não autorizada.",
  "Dúvidas sobre a plataforma? Use o canal #suporte.",
  "Compartilhe conquistas e aprendizados — a comunidade cresce junta.",
  "Conteúdo adulto, político ou ofensivo não é tolerado.",
];

export default function ComunidadePage() {
  const isPro = mockUser.plan === "Pro" || mockUser.plan === "Premium";

  return (
    <div className="p-6 lg:p-8 space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <ScrollReveal direction="up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Comunidade
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            Conecte-se com outros sellers e cresça junto.
          </p>
        </div>
      </ScrollReveal>

      {/* Community cards */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="grid sm:grid-cols-2 gap-5">
          {/* WhatsApp — free */}
          <Card variant="dark" padding="lg" className="flex flex-col gap-4 border border-emerald-500/20 bg-emerald-900/10">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 flex items-center justify-center">
                <MessageCircle size={24} className="text-emerald-400" />
              </div>
              <Badge variant="success" dot>
                Gratuita
              </Badge>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg font-display">
                Comunidade Gratuita
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Grupo no WhatsApp com mais de 3.800 sellers. Compartilhe dúvidas, dicas e
                resultados.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>3.847 membros</span>
              </div>
              <span>·</span>
              <span>WhatsApp</span>
            </div>
            <a
              href="https://chat.whatsapp.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="primary" size="md" rightIcon={<ExternalLink size={14} />} className="w-full justify-center">
                Entrar no grupo
              </Button>
            </a>
          </Card>

          {/* Discord — Pro */}
          <Card
            variant="dark"
            padding="lg"
            className={`flex flex-col gap-4 border relative overflow-hidden ${
              isPro
                ? "border-orbit-400/30 bg-orbit-900/20"
                : "border-white/10 opacity-80"
            }`}
          >
            {!isPro && (
              <div className="absolute inset-0 bg-dark-card/40 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
                <Lock size={20} className="text-white/40" />
                <span className="text-white/50 text-sm font-medium">Disponível no Pro</span>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-900/40 flex items-center justify-center">
                {/* Discord icon via SVG */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo-400"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </div>
              <Badge variant="primary" size="sm">
                Exclusiva Pro
              </Badge>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg font-display">
                Comunidade Exclusiva
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Servidor no Discord com canais organizados, suporte da equipe e networking
                de alto nível.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>892 membros ativos</span>
              </div>
              <span>·</span>
              <span>Discord</span>
            </div>
            {isPro ? (
              <a
                href="https://discord.gg/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  variant="secondary"
                  size="md"
                  rightIcon={<ExternalLink size={14} />}
                  className="w-full justify-center border-orbit-400/40 text-orbit-300"
                >
                  Acessar Discord
                </Button>
              </a>
            ) : (
              <Button variant="outline" size="md" className="w-full justify-center" disabled>
                Disponível no Pro
              </Button>
            )}
          </Card>
        </div>
      </ScrollReveal>

      {/* Upcoming lives */}
      <ScrollReveal direction="up" delay={0.1}>
        <section>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-bold text-white font-display">Próximas lives</h2>
            <Badge variant="accent" dot size="sm">
              Ao vivo
            </Badge>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {upcomingLives.map((live, i) => (
              <Card key={i} variant="dark" padding="md" className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white font-display leading-none">
                      {live.date}
                    </p>
                    <p className="text-orbit-400 text-xs font-semibold mt-0.5">{live.month}</p>
                  </div>
                  <Badge variant="default" size="sm">
                    {live.tag}
                  </Badge>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm leading-snug mb-1">
                    {live.topic}
                  </p>
                  <p className="text-white/40 text-xs">com {live.host}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-white/40">
                    <Calendar size={12} />
                    <span>
                      {live.weekday} · {live.time}
                    </span>
                  </div>
                  <button className="text-orbit-400 hover:text-orbit-200 transition-colors">
                    Lembrete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Past lives */}
      <ScrollReveal direction="up" delay={0.1}>
        <section>
          <h2 className="text-lg font-bold text-white font-display mb-5">
            Lives anteriores
          </h2>
          <div className="space-y-3">
            {pastLives.map((live, i) => (
              <Card key={i} variant="dark" padding="md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orbit-900/40 flex items-center justify-center shrink-0">
                    <Play size={16} className="text-orbit-400 ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm leading-snug truncate">
                      {live.topic}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {live.date} · com {live.host}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/60 text-xs">{live.duration}</p>
                    <p className="text-white/30 text-xs">{live.views} views</p>
                  </div>
                  <button className="text-orbit-400 hover:text-orbit-200 transition-colors">
                    <Play size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Rules */}
      <ScrollReveal direction="up" delay={0.1}>
        <Card variant="dark" padding="lg" className="pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-orbit-400" />
            <h2 className="text-white font-semibold text-sm">Regras da comunidade</h2>
          </div>
          <ul className="space-y-2">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5 text-white/60 text-sm">
                <span className="text-orbit-400 font-bold shrink-0 text-xs mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </Card>
      </ScrollReveal>
    </div>
  );
}
