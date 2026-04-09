import React from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Wrench } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MarginCalculator } from "@/components/tools/MarginCalculator";

const toolMeta: Record<string, { name: string; desc: string; badge?: string }> = {
  "calculadora-margem": {
    name: "Calculadora de Margem",
    desc: "Calcule sua margem de lucro real considerando taxas do marketplace, frete e custos operacionais.",
    badge: "Mais usada",
  },
  "gerador-titulos-seo": {
    name: "Gerador de Títulos SEO",
    desc: "Crie títulos otimizados para aparecer no topo das buscas dos marketplaces.",
  },
  "simulador-frete": {
    name: "Simulador de Frete",
    desc: "Compare diferentes opções de frete e encontre a mais econômica para cada pedido.",
  },
  "dashboard-metricas": {
    name: "Dashboard de Métricas",
    desc: "Visualize seus KPIs de vendas: conversão, ticket médio, margem e crescimento.",
    badge: "Novo",
  },
  "planilha-estoque": {
    name: "Planilha de Estoque",
    desc: "Controle seu estoque com alertas de reposição e histórico de movimentações.",
  },
  "gerador-descricao": {
    name: "Gerador de Descrição",
    desc: "Gere descrições persuasivas e completas para seus produtos com IA.",
    badge: "IA",
  },
};

function ComingSoonTool({ name, desc }: { name: string; desc: string }) {
  return (
    <Card variant="dark" padding="xl" className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-orbit-900/40 flex items-center justify-center mb-4">
        <Wrench size={28} className="text-orbit-400" />
      </div>
      <h2 className="text-white font-bold text-xl font-display mb-2">{name}</h2>
      <p className="text-white/50 text-sm mb-4 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-2 text-white/30 text-sm">
        <Clock size={14} />
        <span>Em desenvolvimento — em breve disponível</span>
      </div>
      <p className="text-white/20 text-xs mt-2">
        Você será notificado quando esta ferramenta estiver pronta.
      </p>
    </Card>
  );
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = toolMeta[slug];

  const name = meta?.name ?? slug.replace(/-/g, " ");
  const desc = meta?.desc ?? "Ferramenta em desenvolvimento.";
  const badge = meta?.badge;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Back nav */}
      <Link
        href="/dashboard/ferramentas"
        className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
      >
        <ChevronLeft size={16} /> Ferramentas
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">{name}</h1>
            {badge && (
              <Badge variant="accent" size="sm">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-white/50 text-sm">{desc}</p>
        </div>
      </div>

      {/* Tool content */}
      {slug === "calculadora-margem" ? (
        <MarginCalculator />
      ) : (
        <ComingSoonTool name={name} desc={desc} />
      )}
    </div>
  );
}
