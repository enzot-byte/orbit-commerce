import React from "react";
import { cn } from "@/lib/utils";

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses = {
  default: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/70",
  primary:
    "bg-orbit-100 text-orbit-800 dark:bg-orbit-900/50 dark:text-orbit-200",
  accent:
    "bg-accent-50 text-accent-800 dark:bg-accent-800/20 dark:text-accent-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  outline:
    "border border-orbit-600 text-orbit-600 bg-transparent dark:border-orbit-400 dark:text-orbit-400",
  ghost: "bg-transparent text-gray-600 dark:text-white/60",
} as const;

type Variant = keyof typeof variantClasses;

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses = {
  sm: "text-xs px-2 py-0.5 rounded-md",
  md: "text-xs px-2.5 py-1 rounded-lg",
  lg: "text-sm px-3 py-1 rounded-lg",
} as const;

type Size = keyof typeof sizeClasses;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  dotColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ─── Dot colors map ───────────────────────────────────────────────────────────

const dotColors: Record<Variant, string> = {
  default: "bg-gray-400",
  primary: "bg-orbit-600",
  accent: "bg-accent-400",
  success: "bg-emerald-500",
  error: "bg-error",
  outline: "bg-orbit-600",
  ghost: "bg-gray-400",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  dotColor,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium font-body",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full shrink-0",
            dotColor ?? dotColors[variant]
          )}
          aria-hidden="true"
        />
      )}
      {leftIcon && (
        <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">
          {rightIcon}
        </span>
      )}
    </span>
  );
}

export type { Variant as BadgeVariant, Size as BadgeSize };
