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
    iconSize: 34,
    textSeller: "text-lg",
    textVerse: "text-lg",
    taglineClass: "text-[8px]",
    gap: "gap-2.5",
  },
  md: {
    iconSize: 48,
    textSeller: "text-2xl",
    textVerse: "text-2xl",
    taglineClass: "text-[10px]",
    gap: "gap-3",
  },
  lg: {
    iconSize: 64,
    textSeller: "text-4xl",
    textVerse: "text-4xl",
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
  const rx = s * 0.46;
  const ry = s * 0.17;
  const nucleusR = s * 0.11;
  const electronR = s * 0.055;

  // Three orbital rings at different tilts, each carrying one electron.
  // Rotation angle of each ring is driven by CSS keyframes (logo-atom-ring-*)
  // — see globals.css. Because the electron lives inside the rotating <g>,
  // it automatically travels the orbit, giving the scene an authentic
  // atom-like asymmetry (different speeds + directions per ring).
  const rings = [
    { tilt: -25, cls: "logo-atom-ring-a", dot: "#9B7BFF", strokeOpacity: 0.85 },
    { tilt: 28, cls: "logo-atom-ring-b", dot: "#C4B5FD", strokeOpacity: 0.55 },
    { tilt: 78, cls: "logo-atom-ring-c", dot: "#5B3FD8", strokeOpacity: 0.4 },
  ];

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Soft nucleus glow */}
      <defs>
        <radialGradient id="sv-nuc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(155,123,255,0.9)" />
          <stop offset="60%" stopColor="rgba(91,63,216,0.25)" />
          <stop offset="100%" stopColor="rgba(91,63,216,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={s * 0.32} fill="url(#sv-nuc-glow)" />

      {/* Orbital rings — each rotates independently via CSS keyframes */}
      {rings.map((r, i) => (
        <g
          key={i}
          className={r.cls}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <g transform={`rotate(${r.tilt}, ${cx}, ${cy})`}>
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              stroke={`rgba(196,181,253,${r.strokeOpacity})`}
              strokeWidth={s * 0.024}
              fill="none"
            />
            {/* Electron sits on the right vertex of the untilted ellipse.
                The parent <g> rotation + tilt produces the orbit. */}
            <circle
              cx={cx + rx}
              cy={cy}
              r={electronR}
              fill={r.dot}
            />
          </g>
        </g>
      ))}

      {/* Central nucleus — white core */}
      <circle cx={cx} cy={cy} r={nucleusR} fill="#ffffff" />
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
        "group/logo inline-flex items-center",
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
