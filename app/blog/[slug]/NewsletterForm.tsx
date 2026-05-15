"use client";

/**
 * Newsletter CTA on the article page. Pulled out as a client island so the
 * parent `app/blog/[slug]/page.tsx` can stay a Server Component — passing
 * an `onSubmit` handler from a Server Component into a JSX element fails to
 * prerender, which we hit the moment `generateStaticParams` started actually
 * building the route at compile time.
 */
export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="seu@email.com"
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-orbit-400/50"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl text-sm font-bold text-white font-body transition-all hover:opacity-90 shrink-0"
        style={{ background: "linear-gradient(135deg, #185FA5, #378ADD)" }}
      >
        Assinar
      </button>
    </form>
  );
}
