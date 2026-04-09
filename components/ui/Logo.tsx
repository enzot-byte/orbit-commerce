import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "text";
  className?: string;
  tagline?: boolean;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const sizeConfig = {
  sm: {
    iconSize: 28,
    textSeller: "text-base",
    textVerse: "text-base",
    taglineClass: "text-[8px]",
    gap: "gap-2",
  },
  md: {
    iconSize: 40,
    textSeller: "text-xl",
    textVerse: "text-xl",
    taglineClass: "text-[9px]",
    gap: "gap-3",
  },
  lg: {
    iconSize: 56,
    textSeller: "text-3xl",
    textVerse: "text-3xl",
    taglineClass: "text-[11px]",
    gap: "gap-4",
  },
};

// Brand purple used for the "verse" half of the wordmark.
export const BRAND_PURPLE = "#5B3FD8";

// ─── SVG Icon ─────────────────────────────────────────────────────────────────

function OrbitIcon({ size }: { size: number }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const rx1 = s * 0.42; // outer ellipse x-radius
  const ry1 = s * 0.16; // outer ellipse y-radius
  const centralR = s * 0.11;
  const satelliteR = s * 0.055;
  // Satellite is on the outer ellipse's right vertex (rotated -25°)
  const satAngleDeg = -25;
  const satAngleRad = (satAngleDeg * Math.PI) / 180;
  const satX = cx + rx1 * Math.cos(satAngleRad);
  const satY = cy + ry1 * Math.sin(satAngleRad);

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background rounded rect */}
      <rect
        x="0"
        y="0"
        width={s}
        height={s}
        rx={s * 0.25}
        fill="#185FA5"
      />

      {/* First orbital ellipse — rotated -25° */}
      <g transform={`rotate(-25, ${cx}, ${cy})`}>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx1}
          ry={ry1}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={s * 0.028}
          fill="none"
        />
      </g>

      {/* Second orbital ellipse — rotated +25° */}
      <g transform={`rotate(25, ${cx}, ${cy})`}>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx1}
          ry={ry1}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={s * 0.022}
          fill="none"
        />
      </g>

      {/* Central solid circle */}
      <circle cx={cx} cy={cy} r={centralR} fill="white" />

      {/* Satellite dot on the first orbital */}
      <circle
        cx={satX}
        cy={satY}
        r={satelliteR}
        fill="#EF9F27"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Logo({
  size = "md",
  variant = "full",
  className,
  tagline = false,
}: LogoProps) {
  const cfg = sizeConfig[size];

  const iconEl = <OrbitIcon size={cfg.iconSize} />;

  const textEl = (
    <span className="flex flex-col leading-none">
      <span className="flex items-baseline gap-0">
        <span
          className={cn(
            cfg.textSeller,
            "font-display font-bold text-gray-900 dark:text-white tracking-tight"
          )}
        >
          Seller
        </span>
        <span
          className={cn(
            cfg.textVerse,
            "font-display font-bold tracking-tight"
          )}
          style={{ color: BRAND_PURPLE }}
        >
          verse
        </span>
      </span>
      {tagline && (
        <span
          className={cn(
            cfg.taglineClass,
            "font-body font-medium text-gray-400 dark:text-white/40 uppercase tracking-[3px] mt-0.5"
          )}
        >
          SEU UNIVERSO DE VENDAS
        </span>
      )}
    </span>
  );

  if (variant === "icon") {
    return (
      <span
        className={cn("inline-flex items-center", className)}
        aria-label="Sellerverse"
      >
        {iconEl}
      </span>
    );
  }

  if (variant === "text") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        {textEl}
      </span>
    );
  }

  // "full" = icon + text
  return (
    <span
      className={cn(
        "inline-flex items-center",
        cfg.gap,
        className
      )}
      aria-label="Sellerverse"
    >
      {iconEl}
      {textEl}
    </span>
  );
}
