/**
 * Real performance metrics straight from the browser, logged to the
 * console in development so you can actually SEE if a change made the
 * page faster or slower instead of guessing.
 *
 * In production it's a no-op (the import is tree-shaken when
 * process.env.NODE_ENV !== 'development'). Vercel's built-in Real User
 * Monitoring already captures field metrics for prod traffic.
 *
 * Metrics tracked (Web Vitals 2024):
 *   LCP  — Largest Contentful Paint. Should be < 2.5s.
 *   INP  — Interaction to Next Paint. Should be < 200ms.
 *   CLS  — Cumulative Layout Shift. Should be < 0.1.
 *   FCP  — First Contentful Paint. Should be < 1.8s.
 *   TTFB — Time To First Byte. Should be < 800ms.
 *
 * Color coding (Apple-style traffic light):
 *   🟢 good       → product-grade fluidity
 *   🟡 needs work → noticeable on mid-tier hardware
 *   🔴 poor       → user-visible jank
 */

type MetricRating = "good" | "needs-improvement" | "poor";

interface Metric {
  name: "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
  value: number;
  rating: MetricRating;
}

// Thresholds straight from web.dev/vitals
const THRESHOLDS: Record<Metric["name"], [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

function rate(name: Metric["name"], value: number): MetricRating {
  const [good, poor] = THRESHOLDS[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

const COLORS: Record<MetricRating, string> = {
  good: "color:#10b981;font-weight:bold",
  "needs-improvement": "color:#EF9F27;font-weight:bold",
  poor: "color:#ef4444;font-weight:bold",
};

const EMOJI: Record<MetricRating, string> = {
  good: "🟢",
  "needs-improvement": "🟡",
  poor: "🔴",
};

function log(name: Metric["name"], value: number) {
  const rating = rate(name, value);
  const valueStr = name === "CLS" ? value.toFixed(3) : `${Math.round(value)}ms`;
  console.log(
    `%c${EMOJI[rating]} ${name}: ${valueStr}`,
    COLORS[rating]
  );
}

/**
 * Boot the observers. Safe to call multiple times — guarded by a flag.
 */
let booted = false;
export function bootWebVitals() {
  if (booted) return;
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "development") return;
  booted = true;

  // LCP — observes paint events on the largest content element
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1] as PerformanceEntry & {
        startTime: number;
      };
      if (last) log("LCP", last.startTime);
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    /* PerformanceObserver type not supported */
  }

  // FCP + TTFB from the navigation entry
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav) {
      log("TTFB", nav.responseStart - nav.requestStart);
    }
    const fcpObserver = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.name === "first-contentful-paint") log("FCP", e.startTime);
      }
    });
    fcpObserver.observe({ type: "paint", buffered: true });
  } catch {
    /* ignore */
  }

  // CLS — accumulates layout shifts that weren't user-triggered
  try {
    let cls = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];
    type LayoutShiftEntry = PerformanceEntry & {
      value: number;
      hadRecentInput: boolean;
    };
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShiftEntry[]) {
        if (entry.hadRecentInput) continue;
        const firstSession = sessionEntries[0];
        const lastSession = sessionEntries[sessionEntries.length - 1];
        if (
          sessionValue &&
          entry.startTime - lastSession.startTime < 1000 &&
          entry.startTime - firstSession.startTime < 5000
        ) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }
        if (sessionValue > cls) {
          cls = sessionValue;
          log("CLS", cls);
        }
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {
    /* ignore */
  }

  // INP — slowest interaction's delay-to-next-paint
  try {
    let worstINP = 0;
    type InteractionEntry = PerformanceEntry & {
      duration: number;
      interactionId?: number;
    };
    const interactionObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as InteractionEntry[]) {
        if (!entry.interactionId) continue;
        if (entry.duration > worstINP) {
          worstINP = entry.duration;
          log("INP", worstINP);
        }
      }
    });
    interactionObserver.observe({
      type: "event",
      buffered: true,
      durationThreshold: 16,
    } as PerformanceObserverInit);
  } catch {
    /* ignore */
  }
}
