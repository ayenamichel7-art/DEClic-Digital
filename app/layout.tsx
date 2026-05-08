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
  metadataBase: new URL('https://de-clic-digital.vercel.app'),
  title: "DEClic Digital 2026 — L'événement Numérique au Bénin",
  description:
    "Apprenez à vendre efficacement sur Internet. Rejoignez +500 participants le 20 juin 2026 à Cotonou pour l'événement numérique de l'année.",
  openGraph: {
    title: "DEClic Digital 2026 — Inscrivez-vous maintenant !",
    description:
      "Propulsez votre business avec les meilleures stratégies de vente en ligne. Networking, mentorat et opportunités uniques.",
    images: ["/og-image.png"],
    type: "website",
    locale: "fr_FR",
    siteName: "DEClic Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEClic Digital 2026",
    description:
      "L'élite du commerce en ligne se réunit à Cotonou. Ne manquez pas votre chance !",
    images: ["/og-image.png"],
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
