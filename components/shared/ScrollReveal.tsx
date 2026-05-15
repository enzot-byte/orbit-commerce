"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  index?: number;
}

/**
 * Lightweight scroll-reveal — previously this wrapped framer-motion
 * (useInView + motion.div) for every section. With ~18 usage sites and
 * dashboards stacking 6+ in a single render, that meant dozens of separate
 * motion contexts and intersection observers per page.
 *
 * Now: pure CSS transition + ONE shared IntersectionObserver across all
 * instances on the page. Each element flips a `data-revealed` attribute
 * when intersecting and CSS handles the transform/opacity/timing.
 *
 * The API is unchanged so existing call sites keep working.
 */

type ObserveTarget = {
  el: HTMLDivElement;
  once: boolean;
};

let sharedObserver: IntersectionObserver | null = null;
const targets = new WeakMap<Element, ObserveTarget>();

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = targets.get(entry.target);
        if (!target) continue;
        if (entry.isIntersecting) {
          target.el.dataset.revealed = "true";
          if (target.once) {
            sharedObserver?.unobserve(target.el);
            targets.delete(target.el);
          }
        } else if (!target.once) {
          target.el.dataset.revealed = "false";
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -60px 0px" }
  );
  return sharedObserver;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  index = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: just reveal immediately, skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.revealed = "true";
      return;
    }
    targets.set(el, { el, once });
    const observer = getObserver();
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      targets.delete(el);
    };
  }, [once]);

  const totalDelay = (delay + index * 0.1) * 1000;

  return (
    <div
      ref={ref}
      data-direction={direction}
      data-revealed="false"
      className={cn("scroll-reveal", className)}
      style={{ transitionDelay: `${totalDelay}ms` }}
    >
      {children}
    </div>
  );
}
