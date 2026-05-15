"use client";

import React, { useId } from "react";
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
    thumbTranslate: 16,
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

const colorOn = {
  orbit: "bg-orbit-600",
  accent: "bg-accent-400",
  success: "bg-success",
};

const colorOff = "bg-gray-200 dark:bg-white/15";

// ─── Component ────────────────────────────────────────────────────────────────

// Thumb transition cubic-bezier approximates the previous framer-motion spring
// (stiffness 500 / damping 30) — overshoot is barely perceptible at this scale
// so a single ease-out feels identical and costs zero JS.
const THUMB_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

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
    <button
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
    >
      <span
        className={cn(
          "block rounded-full bg-white shadow-md motion-reduce:transition-none",
          cfg.thumb
        )}
        style={{
          transform: `translateX(${checked ? cfg.thumbTranslate : 0}px)`,
          transition: `transform 220ms ${THUMB_EASE}`,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </button>
  );

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
