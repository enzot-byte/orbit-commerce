"use client";

/**
 * Code-splitting wrapper for /blog's heavy client islands. The route is a
 * Server Component so `dynamic()` defined inline (as it was) does not split
 * chunks per Next 16 lazy-loading docs. Hosting the `dynamic()` calls in a
 * Client module gives the bundler a real boundary.
 *
 * Result: StarField (canvas), BlogSlider (Swiper carousel) and BlogClient
 * (filtered article grid with framer-motion) each become their own chunk
 * pulled in on demand instead of being baked into the route bundle.
 */

import dynamic from "next/dynamic";

export const LazyStarField = dynamic(
  () => import("@/components/shared/StarField"),
  { ssr: false }
);

export const LazyBlogSlider = dynamic(
  () => import("@/components/sections/BlogSlider")
);

export const LazyBlogClient = dynamic(() => import("./BlogClient"));
