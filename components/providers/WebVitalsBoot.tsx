"use client";

import { useEffect } from "react";
import { bootWebVitals } from "@/lib/web-vitals";

/**
 * Tiny client island that boots the web-vitals observers on mount.
 * In production this component renders nothing and `bootWebVitals` is a
 * no-op (early-return when NODE_ENV !== 'development'). Adds zero weight
 * to the production bundle thanks to dead-code elimination.
 */
export function WebVitalsBoot() {
  useEffect(() => {
    bootWebVitals();
  }, []);
  return null;
}
