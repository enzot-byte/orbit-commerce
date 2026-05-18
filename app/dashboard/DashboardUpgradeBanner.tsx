"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/AuthProvider";

/**
 * Plan-aware upsell banner shown only to Grátis/Pro users on the dashboard
 * home. Isolated from the server-rendered page so the rest of the layout
 * doesn't depend on auth for its first paint.
 */
export function DashboardUpgradeBanner() {
  const { user } = useAuth();
  const plan = user?.plan ?? "Grátis";
  const isPro = plan === "Pro";
  const isGratis = plan === "Grátis";

  if (!isPro && !isGratis) return null;

  return (
    <Card
      variant="glass"
      padding="lg"
      className="bg-gradient-to-br from-orbit-900/60 to-accent-800/20 border border-accent-400/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,159,39,0.15),transparent_60%)]" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <Badge variant="accent" size="sm" className="mb-2">
            {isPro ? "Upgrade disponível" : "Desbloqueie tudo"}
          </Badge>
          <h3 className="text-white font-bold text-lg font-display">
            {isPro
              ? "Upgrade para Premium e acesse tudo"
              : "Faça upgrade para Pro e acelere suas vendas"}
          </h3>
          <p className="text-white/60 text-sm mt-1">
            {isPro
              ? "Alerta de preço no WhatsApp + kit de templates + suporte prioritário."
              : "Calculadora Multiplataforma, Sellerspy, comunidade Discord e cursos completos."}
          </p>
        </div>
        <Link href="/dashboard/plano">
          <Button variant="accent" size="lg">
            Upgrade para {isPro ? "Premium" : "Pro"}
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
