"use client";

/**
 * Below-fold sections of the home page, hosted in a Client Component so
 * `next/dynamic` actually splits each section into its own chunk (per Next 16
 * lazy-loading docs: Server-Component dynamic() doesn't auto-split).
 *
 * Note: a previous iteration also wrapped each section in <DeferredSection>
 * to gate mount on IntersectionObserver. That caused a layout-shift bug in
 * sections with scroll-linked animations (HowItWorks / Pricing use
 * useScroll + useTransform): the placeholder's `minHeight` was an eyeball
 * estimate, so when the real section mounted, the page jumped by hundreds
 * of px and earlier steps' fade-in animations didn't trigger because the
 * user had already "scrolled past" them in absolute Y.
 *
 * The current design keeps chunk splitting (real perf win) but mounts each
 * section through normal SSR + hydration. We lose the deferred-mount JS
 * savings but gain back the integrity of every section's scroll behavior.
 */

import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const ToolsPreview = dynamic(() => import("@/components/sections/ToolsPreview"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const EbookCapture = dynamic(() => import("@/components/sections/EbookCapture"));

export function HomeBelowFold({
  coursesPreview,
}: {
  coursesPreview: React.ReactNode;
}) {
  return (
    <>
      <HowItWorks />
      <ToolsPreview />
      {/* CoursesPreview is server-rendered (no client deps) — pass through. */}
      {coursesPreview}
      <Testimonials />
      <Pricing />
      <EbookCapture />
    </>
  );
}
