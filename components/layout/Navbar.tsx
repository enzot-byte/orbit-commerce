"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-colors",
        "text-gray-600 dark:text-white/70",
        "hover:bg-gray-100 dark:hover:bg-white/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-orbit-400",
        compact ? "w-8 h-8" : "w-9 h-9"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-dark-surface border-l border-gray-100 dark:border-white/10 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
              <Logo size="sm" variant="full" />
              <button
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
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
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
                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orbit-600 dark:bg-orbit-400" />}
                      </Link>
                    </motion.li>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // ── Automatic theme-aware chrome ────────────────────────────────────────
  // Rule: the navbar ALWAYS has a soft backdrop so text is legible over any
  // page background (dark hero, white panels, half-and-half layouts).
  // It just gets slightly more opaque once the user scrolls. Color follows
  // the active theme, not the pathname — this avoids the "invisible header"
  // flash during dark/light transitions.
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
      <motion.header
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

            {/* Desktop nav */}
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
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} pathname={pathname} />
    </>
  );
}

export default Navbar;
