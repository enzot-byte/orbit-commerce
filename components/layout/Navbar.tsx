"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/components/providers/ThemeProvider";

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Sobre", href: "/sobre" },
  { label: "Planos", href: "/planos" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Cursos", href: "/cursos" },
  { label: "Blog", href: "/blog" },
  { label: "Redes", href: "/redes" },
] as const;

// ─── Theme Toggle (CSS-only, no framer-motion) ────────────────────────────────

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-all duration-200",
        "text-gray-600 dark:text-white/70",
        "hover:bg-gray-100 dark:hover:bg-white/10",
        "active:scale-95 hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-orbit-400",
        compact ? "w-8 h-8" : "w-9 h-9"
      )}
    >
      {/* Both icons rendered, fade/rotate between them based on theme. The
          previous AnimatePresence + 2 motion.span layers cost more than the
          icon swap itself. */}
      <Sun
        className={cn(
          "absolute w-4 h-4 transition-all duration-200",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        )}
      />
      <Moon
        className={cn(
          "absolute w-4 h-4 transition-all duration-200",
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        )}
      />
    </button>
  );
}

// ─── Mobile Drawer (CSS transforms, no AnimatePresence) ──────────────────────

function MobileDrawer({
  open,
  onClose,
  pathname,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  /** Hamburger button to send focus back to on close. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Scroll lock on body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus management: move focus to the close button when drawer opens,
  // and return to the hamburger when it closes. Without this, keyboard /
  // screen reader users land back at the top of the page after each toggle.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      // Wait one frame for the drawer to be rendered + transitioned in.
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else if (!open && wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open, triggerRef]);

  // Lightweight focus trap — when Tab/Shift+Tab is pressed inside the drawer
  // and we're at the end/start of the focusable elements, wrap around. Stops
  // the user from tabbing out into the hidden page underneath.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  // Backdrop + drawer are always mounted (so transitions fire on close too).
  // We pair pointer-events suppression with `inert` on the drawer when
  // closed — that takes the entire subtree out of the focus/AT order so
  // links can't be tabbed to behind the scenes.
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        id="primary-mobile-drawer"
        // React 19+ ships `inert` as a first-class prop; when true the
        // browser refuses focus + AT events for the entire subtree. Pair
        // it with `aria-hidden` for older AT that doesn't yet honor inert.
        inert={!open}
        onKeyDown={onKeyDown}
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-dark-surface",
          "border-l border-gray-100 dark:border-white/10 flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <Logo size="sm" variant="full" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-700 dark:text-white/60 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className="drawer-link-item"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center h-11 px-4 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orbit-50 text-orbit-600 dark:bg-orbit-900/40 dark:text-orbit-400"
                        : "text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orbit-600 dark:bg-orbit-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer CTAs */}
        <div className="px-4 pb-8 pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs text-gray-400 dark:text-white/40">Aparência</span>
            <ThemeToggle compact />
          </div>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center justify-center w-full h-10 px-5 rounded-xl text-sm font-medium text-orbit-600 dark:text-orbit-400 hover:bg-orbit-50 dark:hover:bg-orbit-900/30 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            onClick={onClose}
            className="flex items-center justify-center w-full h-10 px-5 rounded-xl text-sm font-semibold bg-accent-400 text-dark hover:bg-accent-600 transition-colors"
          >
            Começar grátis
          </Link>
        </div>
      </aside>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Throttle scroll handler with rAF and short-circuit when the boolean
  // doesn't actually change. Previously this called setState on every scroll
  // event (~once per frame at minimum), forcing React to re-evaluate the
  // header tree even when the visible state was the same.
  useEffect(() => {
    let raf = 0;
    let last = false;
    const tick = () => {
      raf = 0;
      const next = window.scrollY > 16;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    const handler = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // ── Automatic theme-aware chrome ────────────────────────────────────────
  const isDark = theme === "dark";
  const bgColor = isDark
    ? scrolled
      ? "rgba(10,10,15,0.92)"
      : "rgba(10,10,15,0.40)"
    : scrolled
    ? "rgba(255,255,255,0.92)"
    : "rgba(255,255,255,0.7)";

  const borderColor = isDark
    ? scrolled
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.02)"
    : scrolled
    ? "rgba(15,23,42,0.08)"
    : "rgba(15,23,42,0.04)";

  const linkColor = isDark
    ? "text-white/90 hover:text-white"
    : "text-gray-800 hover:text-gray-950";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30"
        style={{
          backgroundColor: bgColor,
          borderBottom: `1px solid ${borderColor}`,
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "blur(10px)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "blur(10px)",
          transition: "background-color 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div className="container-orbit">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" aria-label="Sellerverse — página inicial" className="shrink-0">
              <Logo size="md" variant="full" />
            </Link>

            {/* Desktop nav — active pill keeps framer-motion for layoutId
                shared-element transition (worth the dep here since CSS can't
                cleanly animate position between sibling DOM nodes) */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-[15px] font-semibold transition-colors",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-[#5B3FD8]"
                        : linkColor
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-lg -z-10",
                          isDark ? "bg-white/12" : "bg-[#5B3FD8]/12"
                        )}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center h-9 px-4 rounded-lg text-sm font-semibold transition-colors",
                  isDark
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-[#5B3FD8] hover:bg-[#5B3FD8]/10"
                )}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="relative inline-flex items-center h-10 px-5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                  boxShadow: "0 0 20px rgba(91,63,216,0.3)",
                }}
              >
                <span className="relative z-10">Começar grátis</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              className={cn(
                "md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors",
                isDark
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3FD8]"
              )}
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={drawerOpen}
              aria-controls="primary-mobile-drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        pathname={pathname}
        triggerRef={hamburgerRef}
      />
    </>
  );
}

export default Navbar;
