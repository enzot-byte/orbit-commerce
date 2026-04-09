"use client";

/**
 * SmoothScrollProvider — previously wrapped Lenis, which caused janky scroll
 * behavior on some pages (especially with absolutely positioned sections and
 * fixed headers). Native CSS `scroll-behavior: smooth` on <html> is applied
 * via globals.css and works buttery on modern browsers. This component is
 * now a pass-through kept for layout back-compat.
 */
interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <>{children}</>;
}
