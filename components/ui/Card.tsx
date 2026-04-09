"use client";

import React, { useRef, useCallback } from "react";
import { motion, type MotionStyle, type Transition } from "framer-motion";
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
  style?: MotionStyle;
  children?: React.ReactNode;
  /** Forward DOM event handlers */
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

// ─── Hover animation ─────────────────────────────────────────────────────────

const hoverTransition: Transition = { type: "spring", stiffness: 300, damping: 20 };

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
    <motion.div
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
        className
      )}
      style={style}
      onClick={onClick}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      onMouseLeave={spotlight ? handleMouseLeave : undefined}
      initial={hover ? { y: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" } : undefined}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow:
                "0 16px 40px rgba(0,0,0,0.16), 0 0 0 1px rgba(24,95,165,0.2)",
              transition: hoverTransition,
            }
          : undefined
      }
    >
      {/* Spotlight radial overlay */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle 180px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(24,95,165,0.1), transparent 70%)",
            // CSS custom property cast is safe here — it's a plain DOM div
            opacity: "var(--spotlight-opacity, 0)" as unknown as number,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}

export type { Variant as CardVariant };
