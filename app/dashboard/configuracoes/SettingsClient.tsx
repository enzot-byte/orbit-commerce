"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Lock, Trash2, Save, Eye, EyeOff, AlertTriangle, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/useAuth";

type Tab = "perfil" | "notificacoes" | "seguranca" | "conta";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "perfil", label: "Perfil", icon: <User size={16} /> },
  { id: "notificacoes", label: "Notificações", icon: <Bell size={16} /> },
  { id: "seguranca", label: "Segurança", icon: <Lock size={16} /> },
  { id: "conta", label: "Conta", icon: <Trash2 size={16} /> },
];

const MARKETPLACES = [
  {
    value: "mercado-livre",
    label: "Mercado Livre",
    bg: "bg-yellow-500",
    text: "text-black",
    abbr: "ML",
  },
  {
    value: "shopee",
    label: "Shopee",
    bg: "bg-orange-500",
    text: "text-white",
    abbr: "SH",
  },
  {
    value: "amazon",
    label: "Amazon",
    bg: "bg-amber-400",
    text: "text-black",
    abbr: "AZ",
  },
  {
    value: "magalu",
    label: "Magazine Luiza",
    bg: "bg-blue-600",
    text: "text-white",
    abbr: "ML",
  },
  {
    value: "americanas",
    label: "Americanas",
    bg: "bg-red-600",
    text: "text-white",
    abbr: "AM",
  },
  {
    value: "shein",
    label: "Shein",
    bg: "bg-neutral-800",
    text: "text-white",
    abbr: "SN",
  },
  {
    value: "outro",
    label: "Outro",
    bg: "bg-white/20",
    text: "text-white",
    abbr: "+",
  },
];

function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/70 block">{label}</label>
      {children}
      {hint && <p className="text-white/30 text-xs">{hint}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 h-10",
        "placeholder:text-white/20 focus:outline-none focus:border-orbit-400/60",
        "transition-all duration-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    />
  );
}

// ─── Profile Tab ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setWhatsapp(user.whatsapp);
      setSelectedMarketplaces(user.marketplaces ?? []);
    }
  }, [user]);

  const toggleMarketplace = (value: string) => {
    setSelectedMarketplaces((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  const handleSave = async () => {
    setError("");
    const { error: err } = await updateProfile({ name, whatsapp, marketplaces: selectedMarketplaces });
    if (err) {
      setError(err);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-orbit-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{name || user?.name}</p>
          <p className="text-white/40 text-xs">{user?.email}</p>
          <Badge variant="accent" size="sm" className="mt-1.5">
            Plano {user?.plan ?? "Grátis"}
          </Badge>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Nome completo">
          <TextInput value={name} onChange={setName} placeholder="Seu nome" />
        </FormField>

        <FormField label="E-mail" hint="Para alterar o e-mail, entre em contato com o suporte.">
          <TextInput value={user?.email ?? ""} disabled />
        </FormField>

        <FormField label="WhatsApp">
          <TextInput
            value={whatsapp}
            onChange={setWhatsapp}
            placeholder="(11) 99999-9999"
          />
        </FormField>

        <FormField label="Marketplaces que você vende">
          <div className="flex flex-wrap gap-2 mt-1">
            {MARKETPLACES.map((mp) => {
              const active = selectedMarketplaces.includes(mp.value);
              return (
                <button
                  key={mp.value}
                  type="button"
                  onClick={() => toggleMarketplace(mp.value)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                    active
                      ? "border-white/40 bg-white/10 text-white scale-105"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
                  )}
                >
                  <span className={cn("w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0", mp.bg, mp.text)}>
                    {mp.abbr}
                  </span>
                  {mp.label}
                  {active && <span className="text-emerald-400 ml-0.5">✓</span>}
                </button>
              );
            })}
          </div>
          {selectedMarketplaces.length === 0 && (
            <p className="text-white/30 text-xs mt-1.5">Selecione pelo menos um marketplace</p>
          )}
        </FormField>
      </div>

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5">
          <AlertTriangle size={12} /> {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          variant={saved ? "ghost" : "primary"}
          size="md"
          leftIcon={saved ? <Check size={16} /> : <Save size={16} />}
          onClick={handleSave}
          className={saved ? "text-emerald-400" : ""}
        >
          {saved ? "Salvo com sucesso!" : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    newLessons: true,
    liveReminders: true,
    toolUpdates: false,
    weeklyDigest: true,
    marketingEmails: false,
    systemAlerts: true,
  });

  const toggle = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items: { key: keyof typeof notifs; label: string; desc: string }[] = [
    { key: "newLessons", label: "Novas aulas disponíveis", desc: "Receba um e-mail quando novos cursos ou aulas forem publicados." },
    { key: "liveReminders", label: "Lembretes de lives", desc: "Notificação 30 minutos antes de uma live começar." },
    { key: "toolUpdates", label: "Atualizações de ferramentas", desc: "Quando novas funcionalidades forem adicionadas às ferramentas." },
    { key: "weeklyDigest", label: "Resumo semanal", desc: "Um e-mail todo domingo com seu progresso e novidades da plataforma." },
    { key: "marketingEmails", label: "E-mails promocionais", desc: "Ofertas, descontos e novidades sobre planos e produtos." },
    { key: "systemAlerts", label: "Alertas do sistema", desc: "Notificações importantes sobre sua conta e segurança (recomendado)." },
  ];

  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm">
        Controle quais notificações por e-mail você deseja receber.
      </p>
      {items.map((item) => (
        <Card key={item.key} variant="dark" padding="md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{item.label}</p>
              <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
            <Toggle checked={notifs[item.key]} onChange={() => toggle(item.key)} colorScheme="orbit" />
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const { updatePassword } = useAuth();
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    if (!newPw || !confirmPw) { setError("Preencha todos os campos."); return; }
    if (newPw.length < 8) { setError("A nova senha deve ter pelo menos 8 caracteres."); return; }
    if (newPw !== confirmPw) { setError("As senhas não coincidem."); return; }

    const { error: err } = await updatePassword(newPw);
    if (err) {
      setError(err);
    } else {
      setSaved(true);
      setNewPw("");
      setConfirmPw("");
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const strength = newPw.length === 0 ? 0 : newPw.length < 8 ? 1 : newPw.length < 12 ? 2 : 3;
  const strengthColors = ["", "bg-red-500", "bg-accent-400", "bg-emerald-500"];
  const strengthLabels = ["", "Fraca", "Moderada", "Forte"];

  function PasswordField({ label, value, onChange, show, onToggle }: { label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void }) {
    return (
      <FormField label={label}>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 pr-10 h-10 placeholder:text-white/20 focus:outline-none focus:border-orbit-400/60 transition-all"
            placeholder="••••••••"
          />
          <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormField>
    );
  }

  return (
    <div className="space-y-5 max-w-md">
      <p className="text-white/50 text-sm">Use uma senha forte e única para proteger sua conta.</p>

      <PasswordField label="Nova senha" value={newPw} onChange={setNewPw} show={showNew} onToggle={() => setShowNew(!showNew)} />

      {newPw.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={cn("flex-1 h-1 rounded-full transition-all", i <= strength ? strengthColors[strength] : "bg-white/10")} />
            ))}
          </div>
          <p className="text-xs text-white/40">Força: <span className="font-medium text-white/70">{strengthLabels[strength]}</span></p>
        </div>
      )}

      <PasswordField label="Confirmar nova senha" value={confirmPw} onChange={setConfirmPw} show={showNew} onToggle={() => setShowNew(!showNew)} />

      {error && <p className="text-red-400 text-xs flex items-center gap-1.5"><AlertTriangle size={12} /> {error}</p>}
      {saved && <p className="text-emerald-400 text-xs flex items-center gap-1.5"><Check size={12} /> Senha alterada com sucesso!</p>}

      <Button variant="primary" size="md" onClick={handleSave}>Alterar senha</Button>
    </div>
  );
}

// ─── Account Tab ──────────────────────────────────────────────────────────────

function AccountTab() {
  const { user } = useAuth();
  const [confirmed, setConfirmed] = useState("");
  const canDelete = confirmed === user?.email;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="space-y-6">
      <Card variant="dark" padding="lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <User size={16} className="text-white/40" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user?.name ?? "—"}</p>
            <p className="text-white/40 text-xs">{user?.email ?? "—"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-white/40">Plano</p>
            <p className="text-white font-medium mt-0.5">{user?.plan ?? "Grátis"}</p>
          </div>
          <div>
            <p className="text-white/40">Membro desde</p>
            <p className="text-white font-medium mt-0.5">{memberSince}</p>
          </div>
        </div>
      </Card>

      <Card variant="dark" padding="lg" className="border border-red-500/20 bg-red-900/10 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-semibold text-sm">Zona de perigo</h3>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">
              Ao deletar sua conta, todos os dados serão removidos permanentemente após 30 dias. Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>

        <FormField label={`Para confirmar, digite seu e-mail: ${user?.email ?? ""}`} hint="Isso garante que você está ciente da ação.">
          <TextInput value={confirmed} onChange={setConfirmed} placeholder={user?.email ?? ""} />
        </FormField>

        <Button variant="outline" size="md" className="border-red-500/40 text-red-400 hover:bg-red-900/20 disabled:opacity-30" disabled={!canDelete} leftIcon={<Trash2 size={16} />}>
          Deletar conta permanentemente
        </Button>
      </Card>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");

  const tabContent: Record<Tab, React.ReactNode> = {
    perfil: <ProfileTab />,
    notificacoes: <NotificationsTab />,
    seguranca: <SecurityTab />,
    conta: <AccountTab />,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <nav className="lg:w-48 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-orbit-600 text-white shadow-[0_0_12px_rgba(24,95,165,0.3)]"
                : "text-white/50 hover:bg-white/8 hover:text-white/80"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 min-w-0">
        <Card variant="dark" padding="lg" className="min-h-64">
          {tabContent[activeTab]}
        </Card>
      </div>
    </div>
  );
}
