import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEClic Digital 2026 — Cotonou, Bénin",
  description:
    "L'événement de référence pour apprendre à vendre efficacement sur Internet. Rejoignez +500 participants le 20 juin 2026 à Cotonou.",
  openGraph: {
    title: "DEClic Digital 2026 — Cotonou, Bénin",
    description:
      "L'événement de référence pour propulser votre entreprise sur Internet. Stratégies concrètes, networking, mentorat.",
    images: ["/hero.png"],
    type: "website",
    locale: "fr_FR",
    siteName: "DEClic Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEClic Digital 2026",
    description:
      "Apprenez les stratégies qui génèrent des résultats concrets et rejoignez l'élite du commerce en ligne.",
    images: ["/hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
