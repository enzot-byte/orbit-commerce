"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelLeft?: string;
  labelRight?: string;
  size?: "sm" | "md" | "lg";
  colorScheme?: "orbit" | "accent" | "success";
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const sizeConfig = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    thumbTranslate: 16, // px
    label: "text-xs",
    padding: "p-0.5",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-4.5 h-4.5",
    thumbTranslate: 20,
    label: "text-sm",
    padding: "p-[3px]",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-5 h-5",
    thumbTranslate: 28,
    label: "text-base",
    padding: "p-1",
  },
};

// ─── Color scheme ─────────────────────────────────────────────────────────────

const colorOn = {
  orbit: "bg-orbit-600",
  accent: "bg-accent-400",
  success: "bg-success",
};

const colorOff =
  "bg-gray-200 dark:bg-white/15";

// ─── Component ────────────────────────────────────────────────────────────────

export function Toggle({
  checked,
  onChange,
  label,
  labelLeft,
  labelRight,
  size = "md",
  colorScheme = "orbit",
  disabled = false,
  className,
  id: idProp,
  "aria-label": ariaLabel,
}: ToggleProps) {
  const generatedId = useId();
  const toggleId = idProp ?? generatedId;
  const cfg = sizeConfig[size];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const trackClasses = cn(
    "relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-in-out",
    "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orbit-400 focus-visible:ring-offset-2",
    cfg.track,
    cfg.padding,
    checked ? colorOn[colorScheme] : colorOff,
    disabled && "opacity-50 cursor-not-allowed"
  );

  const track = (
    <motion.button
      type="button"
      id={toggleId}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? label}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={handleKeyDown}
      className={trackClasses}
      animate={{ backgroundColor: checked ? getComputedColor(colorScheme) : "#E5E7EB" }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumb */}
      <motion.span
        className={cn(
          "block rounded-full bg-white shadow-md",
          cfg.thumb
        )}
        animate={{
          x: checked ? cfg.thumbTranslate : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        aria-hidden="true"
      />
    </motion.button>
  );

  // If there are bilateral labels or a single label above/beside
  if (labelLeft || labelRight) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 select-none",
          className
        )}
      >
        {labelLeft && (
          <span
            className={cn(
              cfg.label,
              "font-body transition-colors",
              !checked
                ? "text-gray-900 dark:text-white font-semibold"
                : "text-gray-400 dark:text-white/40"
            )}
          >
            {labelLeft}
          </span>
        )}
        {track}
        {labelRight && (
          <span
            className={cn(
              cfg.label,
              "font-body transition-colors",
              checked
                ? "text-gray-900 dark:text-white font-semibold"
                : "text-gray-400 dark:text-white/40"
            )}
          >
            {labelRight}
          </span>
        )}
      </div>
    );
  }

  if (label) {
    return (
      <div className={cn("inline-flex items-center gap-3 select-none", className)}>
        {track}
        <label
          htmlFor={toggleId}
          className={cn(
            cfg.label,
            "font-body text-gray-700 dark:text-white/80 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
      </div>
    );
  }

  return <div className={className}>{track}</div>;
}

// Helper — returns actual CSS color values for framer-motion animate
function getComputedColor(scheme: "orbit" | "accent" | "success") {
  switch (scheme) {
    case "orbit":
      return "#185FA5";
    case "accent":
      return "#EF9F27";
    case "success":
      return "#0F6E56";
  }
}
