"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Variant + Size maps ──────────────────────────────────────────────────────

const variantClasses = {
  primary: [
    "bg-orbit-600 text-white",
    "hover:bg-orbit-800 focus-visible:ring-orbit-400",
    "dark:bg-orbit-600 dark:hover:bg-orbit-400",
    "shadow-[0_0_0_0_rgba(24,95,165,0)] hover:shadow-[0_0_20px_4px_rgba(24,95,165,0.4)]",
    "transition-shadow",
  ].join(" "),

  secondary: [
    "border border-orbit-600 text-orbit-600 bg-transparent",
    "hover:bg-orbit-50 focus-visible:ring-orbit-400",
    "dark:border-orbit-400 dark:text-orbit-400 dark:hover:bg-orbit-900/30",
  ].join(" "),

  accent: [
    "bg-accent-400 text-dark font-semibold",
    "hover:bg-accent-600 focus-visible:ring-accent-400",
    "shadow-[0_0_0_0_rgba(239,159,39,0)] hover:shadow-[0_0_20px_4px_rgba(239,159,39,0.35)]",
    "transition-shadow",
  ].join(" "),

  ghost: [
    "bg-transparent text-orbit-600",
    "hover:bg-orbit-50 focus-visible:ring-orbit-400",
    "dark:text-orbit-400 dark:hover:bg-orbit-900/30",
  ].join(" "),

  outline: [
    "border border-gray-300 text-gray-700 bg-transparent",
    "hover:bg-gray-50 focus-visible:ring-gray-400",
    "dark:border-white/20 dark:text-white/80 dark:hover:bg-white/5",
  ].join(" "),
} as const;

type Variant = keyof typeof variantClasses;

const sizeClasses = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-7 text-base rounded-xl gap-2.5",
} as const;

type Size = keyof typeof sizeClasses;

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

// When `asChild` is false (default) — renders as <motion.button>
type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    asChild?: false;
    href?: never;
  };

// When used with href — renders as <motion.a>
type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    asChild?: true;
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    asChild,
    ...rest
  } = props;

  const baseClasses = cn(
    // Layout
    "inline-flex items-center justify-center font-medium",
    "select-none cursor-pointer",
    // Focus
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    // Disabled
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    // Variant + size
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const tapAnimation = {
    whileTap: { scale: 0.96 },
    whileHover: { scale: 1.02 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };

  const content = (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if (asChild && (rest as ButtonAsAnchor).href) {
    const { href, target, rel, onClick, onMouseEnter, onMouseLeave, ...anchorRest } =
      rest as ButtonAsAnchor;
    void anchorRest; // unused spread — explicit props only
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </motion.a>
    );
  }

  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    type: btnType,
    disabled: btnDisabled,
    form,
    name,
    value,
  } = rest as ButtonAsButton;

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses}
      type={btnType ?? "button"}
      disabled={isLoading || btnDisabled}
      form={form}
      name={name}
      value={value as string | number | readonly string[] | undefined}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = "Button";

export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
