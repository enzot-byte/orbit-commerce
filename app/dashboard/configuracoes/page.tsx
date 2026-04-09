import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SettingsClient } from "./SettingsClient";

export default function ConfiguracoesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <ScrollReveal direction="up">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Configurações
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            Gerencie seu perfil, notificações e segurança da conta.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.05}>
        <SettingsClient />
      </ScrollReveal>
    </div>
  );
}
