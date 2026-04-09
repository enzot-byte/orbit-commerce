"use client";

import React, { useState, useCallback } from "react";
import { TrendingUp, TrendingDown, Minus, Save, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CalculatorState {
  costPrice: string;
  salePrice: string;
  marketplaceFee: string;
  shipping: string;
  otherCosts: string;
}

interface Results {
  grossMargin: number;
  netMargin: number;
  netProfit: number;
  roi: number;
  breakEven: number;
  totalCosts: number;
}

const defaultState: CalculatorState = {
  costPrice: "",
  salePrice: "",
  marketplaceFee: "12",
  shipping: "",
  otherCosts: "",
};

function parseNum(val: string): number {
  const cleaned = val.replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getMarginColor(margin: number): {
  text: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
} {
  if (margin >= 20) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-900/20",
      border: "border-emerald-500/30",
      icon: <TrendingUp size={18} className="text-emerald-400" />,
    };
  }
  if (margin >= 10) {
    return {
      text: "text-accent-400",
      bg: "bg-accent-800/20",
      border: "border-accent-400/30",
      icon: <Minus size={18} className="text-accent-400" />,
    };
  }
  return {
    text: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-500/30",
    icon: <TrendingDown size={18} className="text-red-400" />,
  };
}

function getMarginLabel(margin: number): string {
  if (margin >= 20) return "Margem saudável";
  if (margin >= 10) return "Margem moderada";
  if (margin > 0) return "Margem baixa";
  return "Operação no prejuízo";
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/70 block">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-white/40 text-sm font-medium pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0,00"
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm",
            "placeholder:text-white/20 focus:outline-none focus:border-orbit-400/60 focus:bg-white/8",
            "transition-all duration-200 h-10",
            prefix ? "pl-8 pr-3" : suffix ? "pl-3 pr-8" : "px-3"
          )}
        />
        {suffix && (
          <span className="absolute right-3 text-white/40 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-white/30 text-xs">{hint}</p>}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  colorClass,
  bgClass,
  borderClass,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-xl border p-4 flex flex-col gap-1", bgClass, borderClass)}>
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-xs font-medium">{label}</span>
        {icon}
      </div>
      <span className={cn("text-2xl font-bold font-display", colorClass)}>{value}</span>
      {sub && <span className="text-white/40 text-xs">{sub}</span>}
    </div>
  );
}

export function MarginCalculator() {
  const [state, setState] = useState<CalculatorState>(defaultState);
  const [saved, setSaved] = useState(false);

  const update = useCallback((key: keyof CalculatorState) => (v: string) => {
    setState((prev) => ({ ...prev, [key]: v }));
    setSaved(false);
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  // Calculations
  const costPrice = parseNum(state.costPrice);
  const salePrice = parseNum(state.salePrice);
  const marketplaceFee = parseNum(state.marketplaceFee);
  const shipping = parseNum(state.shipping);
  const otherCosts = parseNum(state.otherCosts);

  const results = React.useMemo((): Results => {
    if (salePrice === 0) {
      return { grossMargin: 0, netMargin: 0, netProfit: 0, roi: 0, breakEven: 0, totalCosts: 0 };
    }

    const feeAmount = (salePrice * marketplaceFee) / 100;
    const totalCosts = costPrice + feeAmount + shipping + otherCosts;
    const grossMargin = ((salePrice - costPrice) / salePrice) * 100;
    const netProfit = salePrice - totalCosts;
    const netMargin = (netProfit / salePrice) * 100;
    const roi = costPrice > 0 ? (netProfit / costPrice) * 100 : 0;
    const breakEven = costPrice > 0 ? costPrice / (1 - marketplaceFee / 100 - (shipping + otherCosts) / salePrice) : 0;

    return { grossMargin, netMargin, netProfit, roi, breakEven, totalCosts };
  }, [costPrice, salePrice, marketplaceFee, shipping, otherCosts]);

  const hasInputs = salePrice > 0;
  const netStyle = getMarginColor(results.netMargin);

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-4">
        <Card variant="dark" padding="lg" className="space-y-4">
          <h3 className="text-white font-semibold text-sm">Dados do produto</h3>

          <InputField
            label="Preço de custo (R$)"
            value={state.costPrice}
            onChange={update("costPrice")}
            prefix="R$"
            hint="Quanto você paga pelo produto"
          />

          <InputField
            label="Preço de venda (R$)"
            value={state.salePrice}
            onChange={update("salePrice")}
            prefix="R$"
            hint="Quanto você cobra do cliente"
          />

          <InputField
            label="Taxa do marketplace (%)"
            value={state.marketplaceFee}
            onChange={update("marketplaceFee")}
            suffix="%"
            hint="Comissão cobrada pelo marketplace"
          />

          <InputField
            label="Frete (R$)"
            value={state.shipping}
            onChange={update("shipping")}
            prefix="R$"
            hint="Custo do frete por unidade"
          />

          <InputField
            label="Outras despesas (R$)"
            value={state.otherCosts}
            onChange={update("otherCosts")}
            prefix="R$"
            hint="Embalagem, impostos, taxas extras..."
          />

          <div className="flex gap-2 pt-1">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              leftIcon={<Save size={14} />}
              onClick={handleSave}
            >
              {saved ? "Salvo!" : "Salvar cálculo"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw size={14} />}
              onClick={reset}
            >
              Limpar
            </Button>
          </div>
        </Card>

        {/* Cost breakdown */}
        {hasInputs && (
          <Card variant="dark" padding="md" className="space-y-2">
            <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
              Composição do custo
            </h3>
            {[
              { label: "Custo do produto", value: costPrice },
              {
                label: `Taxa marketplace (${state.marketplaceFee}%)`,
                value: (salePrice * marketplaceFee) / 100,
              },
              { label: "Frete", value: shipping },
              { label: "Outras despesas", value: otherCosts },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-xs">
                <span className="text-white/50">{row.label}</span>
                <span className="text-white/80 font-medium">R$ {formatBRL(row.value)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs">
              <span className="text-white/70 font-semibold">Total de custos</span>
              <span className="text-red-400 font-bold">R$ {formatBRL(results.totalCosts)}</span>
            </div>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-3 space-y-4">
        {!hasInputs ? (
          <Card variant="dark" padding="xl" className="flex flex-col items-center justify-center text-center h-64">
            <TrendingUp size={40} className="text-white/10 mb-3" />
            <p className="text-white/50 font-medium">Preencha os dados ao lado</p>
            <p className="text-white/30 text-sm mt-1">
              Os resultados serão calculados automaticamente
            </p>
          </Card>
        ) : (
          <>
            {/* Net margin — main result */}
            <Card
              variant="dark"
              padding="lg"
              className={cn(
                "border",
                netStyle.bg,
                netStyle.border,
                "relative overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_60%)]" />
              <div className="relative flex items-center justify-between mb-1">
                <span className="text-white/70 text-sm font-medium">Margem líquida</span>
                {netStyle.icon}
              </div>
              <p className={cn("text-5xl font-bold font-display", netStyle.text)}>
                {results.netMargin.toFixed(1)}%
              </p>
              <p className="text-white/40 text-xs mt-1">{getMarginLabel(results.netMargin)}</p>
            </Card>

            {/* Grid of results */}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                label="Lucro por venda"
                value={`R$ ${formatBRL(results.netProfit)}`}
                colorClass={
                  results.netProfit >= 0 ? "text-emerald-400" : "text-red-400"
                }
                bgClass={results.netProfit >= 0 ? "bg-emerald-900/20" : "bg-red-900/20"}
                borderClass={results.netProfit >= 0 ? "border-emerald-500/20" : "border-red-500/20"}
              />

              <ResultCard
                label="Margem bruta"
                value={`${results.grossMargin.toFixed(1)}%`}
                sub="Sem taxas e frete"
                colorClass={
                  results.grossMargin >= 30
                    ? "text-emerald-400"
                    : results.grossMargin >= 15
                    ? "text-accent-400"
                    : "text-red-400"
                }
                bgClass="bg-white/5"
                borderClass="border-white/10"
              />

              <ResultCard
                label="ROI"
                value={`${results.roi.toFixed(1)}%`}
                sub="Retorno sobre investimento"
                colorClass={
                  results.roi >= 20
                    ? "text-emerald-400"
                    : results.roi >= 10
                    ? "text-accent-400"
                    : "text-red-400"
                }
                bgClass="bg-white/5"
                borderClass="border-white/10"
              />

              <ResultCard
                label="Preço de equilíbrio"
                value={`R$ ${formatBRL(results.breakEven)}`}
                sub="Mínimo para não perder"
                colorClass="text-white/80"
                bgClass="bg-white/5"
                borderClass="border-white/10"
              />
            </div>

            {/* Margin guide */}
            <Card variant="dark" padding="md">
              <h4 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
                Referência de margem
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Excelente", range: "≥ 30%", color: "bg-emerald-500" },
                  { label: "Boa", range: "20–30%", color: "bg-emerald-400/70" },
                  { label: "Moderada", range: "10–20%", color: "bg-accent-400" },
                  { label: "Baixa", range: "< 10%", color: "bg-red-500" },
                ].map((ref) => (
                  <div key={ref.label} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${ref.color}`} />
                    <span className="text-white/60 flex-1">{ref.label}</span>
                    <span className="text-white/40">{ref.range}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
