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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Transparent on dark hero pages (home), solid on others
  const isHome = pathname === "/";
  const bgScrolled = isHome
    ? "rgba(10,10,15,0.85)"
    : "rgba(255,255,255,0.92)";
  const bgDefault = isHome ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)";
  const linkColor = isHome
    ? "text-white hover:text-white"
    : "text-gray-800 hover:text-gray-900 dark:text-white/95 dark:hover:text-white";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-30"
        animate={{ backdropFilter: scrolled ? "blur(16px)" : "blur(0px)" }}
        style={{
          backgroundColor: scrolled ? bgScrolled : bgDefault,
          borderBottom: scrolled
            ? isHome
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
          transition: "background-color 0.3s, border-color 0.3s",
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
                        ? isHome
                          ? "text-white"
                          : "text-[#5B3FD8] dark:text-[#9B7BFF]"
                        : linkColor
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-lg -z-10",
                          isHome ? "bg-white/15" : "bg-[#5B3FD8]/10 dark:bg-[#9B7BFF]/15"
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
                  "inline-flex items-center h-8 px-3 rounded-lg text-sm font-medium transition-colors",
                  isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-orbit-600 hover:bg-orbit-50 dark:text-orbit-400 dark:hover:bg-orbit-900/30"
                )}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="inline-flex items-center h-10 px-5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_4px_rgba(91,63,216,0.45)]"
                style={{
                  background: "linear-gradient(135deg, #5B3FD8 0%, #9B7BFF 100%)",
                }}
              >
                Começar grátis
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={cn(
                "md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors",
                isHome
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orbit-400"
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
