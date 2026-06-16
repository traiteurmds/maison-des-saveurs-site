import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Providers from "./components/Providers";
import MaintenancePage from "./components/MaintenancePage";
import { MAINTENANCE_MODE } from "./config/maintenance";
import { Analytics } from "@vercel/analytics/next";
import { getStructuredDataGraph } from "./lib/structured-data";
import { SEO_KEYWORDS, SITE_URL } from "./lib/site-seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traiteur Marocain Halal Lyon | Mariage, Buffet & Entreprise",
    template: "%s | Maison des Saveurs",
  },
  description:
    "Traiteur halal à Lyon pour mariages, buffets, entreprises et événements privés. Cuisine maison, dressage élégant et devis rapide.",
  keywords: [...SEO_KEYWORDS],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-ms.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-ms.png",
    apple: "/favicon-ms.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Traiteur Marocain Halal Lyon | Mariage, Buffet & Entreprise",
    description:
      "Traiteur halal à Lyon pour mariages, buffets, entreprises et événements privés. Cuisine maison, dressage élégant et devis rapide.",
    url: SITE_URL,
    siteName: "Maison des Saveurs",
    images: [
      {
        url: "/logo-share.png",
        width: 1200,
        height: 630,
        alt: "Maison Des Saveurs - Traiteur halal Lyon",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traiteur Marocain Halal Lyon | Mariage, Buffet & Entreprise",
    description:
      "Traiteur halal à Lyon pour mariages, buffets, entreprises et événements privés. Cuisine maison, dressage élégant et devis rapide.",
    images: ["/logo-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredDataGraph();

  if (MAINTENANCE_MODE) {
    return (
      <html lang="fr" className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} ${inter.variable}`}>
        <body className="antialiased">
          <MaintenancePage />
        </body>
      </html>
    );
  }

  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-mds-bg pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-mds-text antialiased lg:pb-0">
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(structuredData)}
        </script>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
