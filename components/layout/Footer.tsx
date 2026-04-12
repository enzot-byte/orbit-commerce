import React from "react";
import { Logo } from "@/components/ui/Logo";

// ─── Link columns data ────────────────────────────────────────────────────────

const COLUMNS = [
  {
    title: "Produto",
    links: [
      { label: "Visão geral", href: "#" },
      { label: "Funcionalidades", href: "#" },
      { label: "Planos e preços", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Integrações", href: "#" },
      { label: "API", href: "#" },
      { label: "Status", href: "#" },
      { label: "Documentação", href: "#" },
      { label: "Ferramentas gratuitas", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Imprensa", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { label: "Cursos", href: "#" },
      { label: "Comunidade Discord", href: "#" },
      { label: "Afiliados", href: "#" },
      { label: "Parceiros", href: "#" },
      { label: "Cases de sucesso", href: "#" },
    ],
  },
] as const;

// ─── Social icons (inline SVG — brand-accurate, no icon lib dependency) ──────

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sellerverseoficial",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCksiby6SGhom0AzUhKEQr6g",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/sellerverseofc",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
] as const;

// ─── Marketplace logos (text-based) ──────────────────────────────────────────

const MARKETPLACES = [
  "Mercado Livre",
  "Shopee",
  "Amazon",
  "Magazine Luiza",
  "SHEIN",
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold font-display text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm font-body text-white/40 hover:text-[#9B7BFF] transition-colors duration-150"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-xl text-white/40 hover:text-[#9B7BFF] bg-white/5 hover:bg-[#5B3FD8]/15 transition-colors duration-150"
    >
      {icon}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="font-body"
      style={{
        backgroundColor: "#0A0A0F",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Rodapé do site"
    >
      {/* Marketplace strip */}
      <div
        style={{
          backgroundColor: "#0F0F1A",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container-orbit py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs text-white/25 uppercase tracking-widest font-medium shrink-0">
              Integra com
            </span>
            {MARKETPLACES.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-white/45 hover:text-[#9B7BFF] transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container-orbit py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Left: Logo + tagline + socials */}
          <div className="space-y-6">
            <Logo size="md" variant="full" tagline />

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              A plataforma completa para sellers que querem escalar no e-commerce
              brasileiro. Gerencie, analise e cresça com inteligência.
            </p>

            {/* Social links */}
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest font-medium mb-3">
                Siga-nos
              </p>
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <SocialLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Link columns grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <FooterLinkColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          backgroundColor: "rgba(15,15,26,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="container-orbit py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <p className="text-xs text-white/25 text-center sm:text-left">
              &copy; {year} Sellerverse. Todos os direitos reservados.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-4">
              {[
                { label: "Privacidade", href: "#" },
                { label: "Termos de uso", href: "#" },
                { label: "Cookies", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs text-white/25 hover:text-[#9B7BFF] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Made in Brazil badge */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-white/25">
                Feito com
              </span>
              <span aria-label="amor" role="img" className="text-sm">
                🇧🇷
              </span>
              <span className="text-xs text-white/25">
                no Brasil
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
