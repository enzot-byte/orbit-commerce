"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses = {
  default: [
    "bg-white border border-gray-200/80",
    "dark:bg-dark-card dark:border-white/10",
    "shadow-sm",
  ].join(" "),

  glass: [
    "backdrop-blur-md",
    "bg-white/10 border border-white/20",
    "dark:bg-white/5 dark:border-white/10",
    "shadow-lg",
  ].join(" "),

  dark: [
    "bg-dark-surface border border-white/10",
    "dark:bg-dark-card dark:border-white/10",
    "shadow-md",
  ].join(" "),

  accent: [
    "bg-accent-50 border border-accent-200",
    "dark:bg-accent-800/20 dark:border-accent-800/40",
    "shadow-sm",
  ].join(" "),
} as const;

type Variant = keyof typeof variantClasses;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CardProps {
  variant?: Variant;
  hover?: boolean;
  spotlight?: boolean;
  rounded?: "md" | "lg" | "xl" | "2xl";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  role?: string;
}

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const paddingMap = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
};

// Hover lift previously used framer-motion's spring animation. CSS transition
// gives an indistinguishable result for a -6px translate + shadow swap, and
// avoids dragging framer-motion into every page that renders a Card.
const hoverClasses =
  "transition-[transform,box-shadow] duration-200 ease-out shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] motion-reduce:hover:translate-y-0";

// ─── Component ────────────────────────────────────────────────────────────────

export function Card({
  variant = "default",
  hover = false,
  spotlight = false,
  rounded = "2xl",
  padding = "md",
  className,
  style,
  children,
  onClick,
  id,
  role,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!spotlight || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
      cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
      cardRef.current.style.setProperty("--spotlight-opacity", "1");
    },
    [spotlight]
  );

  const handleMouseLeave = useCallback(() => {
    if (!spotlight || !cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  }, [spotlight]);

  return (
    <div
      ref={cardRef}
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        roundedMap[rounded],
        paddingMap[padding],
        hover && hoverClasses,
        className
      )}
      style={style}
      onClick={onClick}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      onMouseLeave={spotlight ? handleMouseLeave : undefined}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle 180px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(24,95,165,0.1), transparent 70%)",
            opacity: "var(--spotlight-opacity, 0)" as unknown as number,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export type { Variant as CardVariant };
