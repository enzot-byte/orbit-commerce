"use client";

import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/lib/AuthProvider";

/**
 * Small client island for the personalised h1 + plan pill on the dashboard
 * home. Lets the surrounding page stay a Server Component so the static
 * stats/courses/tools/lives sections don't have to hydrate.
 */
function isNewUser(iso: string | undefined): boolean {
  if (!iso) return false;
  const created = new Date(iso).getTime();
  if (Number.isNaN(created)) return false;
  // Considera "novo" se cadastrou nos últimos 7 dias — evita mostrar
  // "Olá, pronto pra vender" pra alguém que acabou de chegar e não tem
  // contexto ainda.
  return Date.now() - created < 7 * 24 * 60 * 60 * 1000;
}

export function DashboardWelcome() {
  const { user } = useAuth();
  const firstName = (user?.name ?? "").split(" ")[0] || "Seller";
  const plan = user?.plan ?? "Grátis";
  const isNew = isNewUser(user?.createdAt);

  return (
    <div className="flex items-start justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
          {isNew
            ? `Bem-vindo, ${firstName}! 🚀`
            : `Olá, ${firstName}! 🚀 Pronto para vender mais hoje?`}
        </h1>
        <p className="text-white/50 mt-1 text-sm">
          {isNew
            ? "Por onde quer começar?"
            : "Aqui está um resumo da sua jornada na plataforma."}
        </p>
      </div>
      <Badge variant="accent" size="lg">
        Plano {plan}
      </Badge>
    </div>
  );
}
