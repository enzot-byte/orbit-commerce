import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import CustomCursor from "@/components/shared/CustomCursor";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sellerverse — O ecossistema completo para sellers",
    template: "%s | Sellerverse",
  },
  description:
    "Comunidade, cursos, ferramentas e mentoria para sellers brasileiros escalar no e-commerce. Mercado Livre, Shopee, Amazon e muito mais.",
  keywords: [
    "ecommerce",
    "sellers",
    "mercado livre",
    "shopee",
    "amazon",
    "cursos",
    "comunidade",
    "ferramentas",
    "brasil",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sellerverse.com.br",
    siteName: "Sellerverse",
    title: "Sellerverse — O ecossistema completo para sellers",
    description:
      "Comunidade, cursos, ferramentas e mentoria para sellers brasileiros escalar no e-commerce.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sellerverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sellerverse",
    description: "O ecossistema completo para sellers de ecommerce.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
