import React, { forwardRef } from "react";
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

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    asChild?: false;
    href?: never;
  };

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

// hover:scale & active:scale below replace framer-motion's whileHover/whileTap —
// the transition curve here mimics the previous spring (stiff/damped → ~150ms
// ease-out) closely enough that the visual feel is unchanged.
const baseInteract =
  "transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.96] motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

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
    "inline-flex items-center justify-center font-medium",
    "select-none cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    baseInteract,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

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

  // Spread the rest of the props directly so consumers can pass any native
  // attribute the underlying element supports — aria-*, data-*, id, title,
  // tabIndex, onMouseEnter, onFocus, etc. Previously this component only
  // forwarded a handful of explicit fields and silently dropped everything
  // else, which made it impossible to add things like a tooltip `title`
  // or analytics `data-*` attributes without forking the component.

  if (asChild && (rest as ButtonAsAnchor).href) {
    const { className: _ignored, ...anchorRest } = rest as ButtonAsAnchor;
    void _ignored; // we own className
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorRest}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  const { className: _ignoredBtn, type: btnType, disabled: btnDisabled, ...btnRest } =
    rest as ButtonAsButton;
  void _ignoredBtn;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...btnRest}
      type={btnType ?? "button"}
      disabled={isLoading || btnDisabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
