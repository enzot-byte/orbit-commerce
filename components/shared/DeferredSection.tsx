"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * DeferredSection — gates a subtree behind an IntersectionObserver so its
 * children mount only when the viewport is about to reach it.
 *
 * Why on top of `next/dynamic`?
 *   `dynamic()` inside a Client Component splits the chunk, but Next still
 *   triggers the chunk fetch + hydration as soon as the wrapper component
 *   renders. With a 7-section home page that means every section's JS lands
 *   together. Wrapping each section in DeferredSection makes the chunk fetch
 *   wait until the section is ~`rootMargin` away from view, freeing the main
 *   thread and the network for the hero.
 *
 * Trade-off:
 *   The children are NOT rendered on the server. The wrapper emits only a
 *   skeleton placeholder with a fixed min-height (no CLS) and a non-essential
 *   text label, then upgrades client-side. For SEO-critical copy (Hero,
 *   above-fold) do NOT wrap — render those normally.
 *
 *   The `minHeight` prop is required so the placeholder reserves space that
 *   matches the eventual section height. Eyeball this from a real render.
 *
 * Reduced-motion:
 *   Honors `prefers-reduced-motion`. With it, the placeholder is mounted
 *   immediately on first paint (no IO wait, no skeleton shimmer).
 */
interface DeferredSectionProps {
  children: ReactNode;
  /** Minimum reserved height in px to avoid layout shift while loading. */
  minHeight: number;
  /** Margin around viewport that still counts as "near". Default: 600px. */
  rootMargin?: string;
  /** Optional accessible label shown to screen readers while loading. */
  label?: string;
}

export function DeferredSection({
  children,
  minHeight,
  rootMargin = "600px",
  label = "Carregando seção…",
}: DeferredSectionProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mounted) return;
    if (typeof IntersectionObserver === "undefined") {
      // Old browser fallback — render immediately rather than never.
      setMounted(true);
      return;
    }
    // If the user explicitly opted into less motion, mount immediately —
    // we don't want a fallback shimmer doing more work than the content.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  if (mounted) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      role="presentation"
      aria-busy="true"
      aria-label={label}
      className="deferred-section-placeholder"
      style={{ minHeight }}
    />
  );
}
