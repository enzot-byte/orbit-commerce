"use client";

import React, { useId, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  inputSize?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { wrapper: "h-10", input: "text-sm px-3", label: "text-xs" },
  md: { wrapper: "h-12", input: "text-sm px-4", label: "text-sm" },
  lg: { wrapper: "h-14", input: "text-base px-4", label: "text-base" },
};

// ─── Shake animation (error) ──────────────────────────────────────────────────

const shakeVariants: import("framer-motion").Variants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    rightElement,
    containerClassName,
    inputSize = "md",
    className,
    id: idProp,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    disabled,
    type = "text",
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;

  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    (value ?? defaultValue ?? "") as string
  );
  const [shakeKey, setShakeKey] = useState(0);

  // Trigger shake whenever a new error arrives
  const prevError = React.useRef<string | undefined>(undefined);
  if (error && error !== prevError.current) {
    prevError.current = error;
    // Defer to avoid setState during render
    setTimeout(() => setShakeKey((k) => k + 1), 0);
  }
  if (!error) prevError.current = undefined;

  const hasValue =
    value !== undefined
      ? String(value).length > 0
      : internalValue.length > 0;

  const isFloating = focused || hasValue || Boolean(placeholder);

  const sizes = sizeMap[inputSize];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const paddingLeft = leftIcon ? "pl-10" : sizes.input.split(" ")[1];
  const paddingRight = rightIcon || rightElement ? "pr-10" : sizes.input.split(" ")[1];

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <motion.div
        key={shakeKey}
        variants={shakeVariants}
        animate={error ? "shake" : "idle"}
        className="relative"
      >
        {/* Input wrapper */}
        <div
          className={cn(
            "relative flex items-center rounded-xl border transition-all duration-200",
            sizes.wrapper,
            // State colours
            error
              ? "border-error bg-red-50 dark:bg-red-900/10"
              : focused
              ? "border-orbit-600 bg-white shadow-[0_0_0_3px_rgba(24,95,165,0.15)] dark:bg-dark-card dark:shadow-[0_0_0_3px_rgba(24,95,165,0.25)]"
              : "border-gray-200 bg-white dark:border-white/10 dark:bg-dark-card",
            disabled && "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-dark-surface"
          )}
        >
          {/* Left icon */}
          {leftIcon && (
            <span
              className={cn(
                "absolute left-3 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 transition-colors",
                focused ? "text-orbit-600" : "text-gray-400",
                error && "text-error"
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          {/* Actual input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={label ? (isFloating ? placeholder : "") : placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              "w-full h-full bg-transparent outline-none font-body",
              "text-gray-900 placeholder:text-gray-400",
              "dark:text-white dark:placeholder:text-white/30",
              sizes.input,
              // Override horizontal padding based on icons
              leftIcon ? "pl-10" : sizes.input.includes("px-3") ? "pl-3" : "pl-4",
              rightIcon || rightElement
                ? "pr-10"
                : sizes.input.includes("px-3")
                ? "pr-3"
                : "pr-4",
              // When label is floating, add top padding to make room
              label && "pt-4 pb-1",
              className
            )}
            {...rest}
          />

          {/* Floating label */}
          {label && (
            <motion.label
              htmlFor={inputId}
              animate={{
                y: isFloating ? -10 : 0,
                scale: isFloating ? 0.78 : 1,
                color: error
                  ? "#E24B4A"
                  : focused
                  ? "#185FA5"
                  : "#9CA3AF",
              }}
              initial={false}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={cn(
                "absolute pointer-events-none origin-left font-body",
                "text-gray-400 select-none",
                leftIcon ? "left-10" : "left-4",
                sizes.label
              )}
              style={{ top: "50%", marginTop: "-0.6em" }}
            >
              {label}
            </motion.label>
          )}

          {/* Right icon / element */}
          {(rightIcon || rightElement) && (
            <span
              className={cn(
                "absolute right-3 flex items-center justify-center",
                "[&>svg]:w-4 [&>svg]:h-4 text-gray-400 dark:text-white/40"
              )}
              aria-hidden="true"
            >
              {rightElement ?? rightIcon}
            </span>
          )}
        </div>
      </motion.div>

      {/* Error message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            id={`${inputId}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-xs text-error font-body"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!error && hint && (
        <p
          id={`${inputId}-hint`}
          className="text-xs text-gray-400 dark:text-white/40 font-body"
        >
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
