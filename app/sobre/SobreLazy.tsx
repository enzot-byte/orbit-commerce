"use client";

/**
 * Code-splitting wrapper for /sobre's WebGL background. Hosted in a Client
 * module so `next/dynamic` actually splits the three.js + FloatingLines
 * chunk away from the route's main bundle (Server-Component `dynamic()` is
 * a no-op for code splitting per Next 16 lazy-loading docs).
 *
 * ssr:false — three.js boots up in WebGL and can't render server-side; no
 * SEO content here (it's a decorative background).
 */

import dynamic from "next/dynamic";

export const LazyFloatingLinesBg = dynamic(
  () => import("@/components/shared/FloatingLinesBg"),
  { ssr: false }
);
