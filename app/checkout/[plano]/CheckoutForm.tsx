"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, Shield, CheckCircle, Tag, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckoutFormProps {
  planName: string;
  monthlyPrice: number;
  annualPrice: number;
  initialPeriod?: "monthly" | "annual";
}

// ─── Card number formatter ─────────────────────────────────────────────────────

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }
  return digits;
}

// ─── Input Component ──────────────────────────────────────────────────────────

function FormInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  inputMode,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-white/70 font-body">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-white placeholder:text-white/25 font-body text-sm",
          "focus:outline-none focus:ring-2 focus:ring-orbit-400/60 focus:border-orbit-400/60",
          "transition-all duration-200"
        )}
      />
    </div>
  );
}

// ─── Success State ─────────────────────────────────────────────────────────────

function SuccessState({ planName }: { planName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col items-center justify-center py-12 text-center gap-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
        className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center"
      >
        <CheckCircle className="w-10 h-10 text-emerald-400" />
      </motion.div>

      <div>
        <h3
          className="text-2xl font-bold text-white font-display mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Assinatura confirmada!
        </h3>
        <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs mx-auto">
          Bem-vindo ao plano <span className="text-orbit-400 font-semibold">{planName}</span>.
          Você receberá o acesso por e-mail em instantes.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <div className="flex items-center gap-2 text-sm text-white/40 font-body justify-center">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Pagamento processado com segurança</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CheckoutForm ─────────────────────────────────────────────────────────────

export default function CheckoutForm({
  planName,
  monthlyPrice,
  annualPrice,
  initialPeriod = "monthly",
}: CheckoutFormProps) {
  const [period, setPeriod] = useState<"monthly" | "annual">(initialPeriod);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const price = period === "annual" ? annualPrice : monthlyPrice;
  const discount = couponApplied ? Math.round(price * 0.1) : 0;
  const finalPrice = price - discount;

  const handleCardNumber = useCallback((v: string) => {
    setCardNumber(formatCardNumber(v));
  }, []);

  const handleExpiry = useCallback((v: string) => {
    setExpiry(formatExpiry(v));
  }, []);

  const handleCoupon = () => {
    if (coupon.toLowerCase() === "orbit10" || coupon.toLowerCase() === "promo") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponApplied(false);
      setCouponError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div
        className="rounded-2xl border border-white/10 p-8"
        style={{ backgroundColor: "rgba(26,26,46,0.7)", backdropFilter: "blur(12px)" }}
      >
        <SuccessState planName={planName} />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/10"
      style={{ backgroundColor: "rgba(26,26,46,0.7)", backdropFilter: "blur(12px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-orbit-400" />
          <span className="text-xs font-medium text-orbit-400 uppercase tracking-wider font-body">
            Pagamento seguro
          </span>
        </div>
        <h2
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dados do cartão
        </h2>
      </div>

      {/* Period Toggle */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-xs text-white/40 font-body mb-3 uppercase tracking-wide font-medium">
          Período de cobrança
        </p>
        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium font-body transition-all duration-200",
                period === p
                  ? "bg-orbit-600 text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {p === "monthly" ? "Mensal" : (
                <span className="flex items-center justify-center gap-1.5">
                  Anual
                  <span className="text-xs bg-accent-600/20 text-accent-400 px-1.5 py-0.5 rounded-full font-bold">
                    -20%
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        <FormInput
          label="Número do cartão"
          id="card-number"
          value={cardNumber}
          onChange={handleCardNumber}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          inputMode="numeric"
          autoComplete="cc-number"
        />

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Validade"
            id="expiry"
            value={expiry}
            onChange={handleExpiry}
            placeholder="MM/AA"
            maxLength={5}
            inputMode="numeric"
            autoComplete="cc-exp"
          />
          <FormInput
            label="CVV"
            id="cvv"
            value={cvv}
            onChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
            placeholder="•••"
            maxLength={4}
            inputMode="numeric"
            autoComplete="cc-csc"
          />
        </div>

        <FormInput
          label="Nome no cartão"
          id="name"
          value={nameOnCard}
          onChange={setNameOnCard}
          placeholder="Exatamente como no cartão"
          autoComplete="cc-name"
        />

        {/* Coupon */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="coupon" className="text-sm font-medium text-white/70 font-body">
            Cupom de desconto
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="coupon"
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponError(false);
                }}
                placeholder="Insira o cupom"
                className={cn(
                  "w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border font-body text-sm",
                  "text-white placeholder:text-white/25",
                  "focus:outline-none focus:ring-2 focus:ring-orbit-400/60 transition-all",
                  couponApplied
                    ? "border-emerald-500/50 focus:ring-emerald-500/30"
                    : couponError
                    ? "border-error/50 focus:ring-error/30"
                    : "border-white/10 focus:border-orbit-400/60"
                )}
              />
            </div>
            <button
              type="button"
              onClick={handleCoupon}
              disabled={!coupon || couponApplied}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium font-body transition-all",
                couponApplied
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                  : "bg-orbit-600 text-white hover:bg-orbit-800 disabled:opacity-40"
              )}
            >
              {couponApplied ? "Aplicado" : "Aplicar"}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {couponApplied && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-emerald-400 font-body"
              >
                Cupom aplicado! 10% de desconto.
              </motion.p>
            )}
            {couponError && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-400 font-body"
              >
                Cupom inválido ou expirado.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Price summary */}
        <div className="rounded-xl bg-white/5 border border-white/8 p-4 space-y-2">
          <div className="flex justify-between text-sm font-body">
            <span className="text-white/50">Plano {planName} ({period === "annual" ? "anual" : "mensal"})</span>
            <span className="text-white">R$ {price.toFixed(2).replace(".", ",")}</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between text-sm font-body">
              <span className="text-emerald-400">Desconto (10%)</span>
              <span className="text-emerald-400">- R$ {discount.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div className="border-t border-white/10 pt-2 flex justify-between font-bold font-display">
            <span className="text-white">Total</span>
            <span className="text-accent-400 text-lg">
              R$ {finalPrice.toFixed(2).replace(".", ",")}
              <span className="text-white/40 text-xs font-normal font-body ml-1">
                /{period === "annual" ? "ano" : "mês"}
              </span>
            </span>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-white font-display text-base",
            "transition-all duration-200 flex items-center justify-center gap-2",
            loading
              ? "bg-orbit-800 cursor-not-allowed"
              : "bg-gradient-to-r from-orbit-600 to-orbit-400 hover:shadow-glow-orbit"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Assinar agora
            </>
          )}
        </motion.button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 pt-1 flex-wrap">
          {[
            { icon: Lock, label: "SSL 256-bit" },
            { icon: CreditCard, label: "Powered by Stripe" },
            { icon: Shield, label: "Garantia 7 dias" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-white/30">
              <Icon className="w-3.5 h-3.5" />
              <span className="text-xs font-body">{label}</span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
