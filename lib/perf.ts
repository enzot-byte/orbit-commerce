/**
 * Runtime perf hints — used by heavy visual effects (WebGL, canvas, rAF loops)
 * to back off on weak hardware, when the tab is hidden, or when the user
 * prefers reduced motion.
 *
 * All checks are SSR-safe and return conservative defaults on the server.
 */

export type DeviceTier = "low" | "mid" | "high";

/**
 * Best-effort device tier classification. Runs once per page load.
 * - low:  ≤4 cores or ≤4GB RAM, or any "Save-Data" hint, or "(prefers-reduced-motion)"
 * - high: ≥8 cores AND ≥8GB RAM
 * - mid:  everything else
 */
export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "mid";

  type NetInfo = { saveData?: boolean; effectiveType?: string };
  type NavExt = Navigator & {
    deviceMemory?: number;
    connection?: NetInfo;
  };
  const nav = navigator as NavExt;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }
  if (nav.connection?.saveData) return "low";

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;

  if (cores <= 4 || memory <= 4) return "low";
  if (cores >= 8 && memory >= 8) return "high";
  return "mid";
}

/**
 * Cap devicePixelRatio for heavy canvas/WebGL scenes. Retina screens default
 * to 2 or 3 and the GPU work scales quadratically — capping at 1.5 cuts
 * pixel shading by ~44% on a 2x display with no visible loss for backgrounds.
 */
export function getRenderDpr(tier: DeviceTier = getDeviceTier()): number {
  if (typeof window === "undefined") return 1;
  const native = window.devicePixelRatio || 1;
  if (tier === "low") return Math.min(native, 1);
  if (tier === "mid") return Math.min(native, 1.5);
  return Math.min(native, 2);
}

/** True if document is currently visible (rAF loops should gate on this). */
export function isVisible(): boolean {
  if (typeof document === "undefined") return true;
  return document.visibilityState === "visible";
}
