"use client";

/**
 * Below-fold sections of the home page, hosted in a Client Component so
 * `next/dynamic` actually splits each section into its own chunk (per Next 16
 * lazy-loading docs: Server-Component dynamic() doesn't auto-split).
 *
 * Each section is wrapped in DeferredSection so:
 *  1) the chunk fetch is delayed until the section is ~600px from the
 *     viewport — the hero gets the main thread and the network for itself;
 *  2) framer-motion / IntersectionObservers / scroll listeners inside each
 *     section don't boot up before they're needed.
 *
 * The trade-off is that the section's HTML isn't in the initial document.
 * For the home page that's fine — the SEO-anchor pages (/, /planos, /blog,
 * etc.) keep their own SSR; the home page's role is to funnel users into
 * those pages, not to rank for individual section copy.
 *
 * `minHeight` values are eyeballed estimates that reserve roughly the right
 * vertical space so the placeholder doesn't cause CLS when the real content
 * mounts. Tune after a visual pass.
 */

import dynamic from "next/dynamic";
import { DeferredSection } from "@/components/shared/DeferredSection";

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
      <DeferredSection minHeight={720} label="Carregando seção 'Como funciona'">
        <HowItWorks />
      </DeferredSection>

      <DeferredSection minHeight={760} label="Carregando ferramentas">
        <ToolsPreview />
      </DeferredSection>

      {/* CoursesPreview is server-rendered (no client deps) — pass through. */}
      {coursesPreview}

      <DeferredSection minHeight={640} label="Carregando depoimentos">
        <Testimonials />
      </DeferredSection>

      <DeferredSection minHeight={800} label="Carregando planos">
        <Pricing />
      </DeferredSection>

      <DeferredSection minHeight={420} label="Carregando captura de ebook">
        <EbookCapture />
      </DeferredSection>
    </>
  );
}
