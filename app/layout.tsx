import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import MaintenancePage from "./components/MaintenancePage";
import { MAINTENANCE_MODE } from "./config/maintenance";
import { getStructuredDataJson } from "./lib/structured-data";
import { SEO_KEYWORDS, SITE_URL } from "./lib/site-seo";

const display = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0e0c",
};

const DESCRIPTION =
  "Traiteur marocain halal à Lyon : mariages, hlel, naissances, buffets et repas d'entreprise. Couscous, pastilla, salade royale, service et vaisselle. Devis rapide sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traiteur marocain halal à Lyon | Maison Des Saveurs",
    template: "%s | Maison Des Saveurs",
  },
  description: DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Traiteur marocain halal à Lyon | Maison Des Saveurs",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Maison Des Saveurs",
    images: [{ url: "/logo-share.png", width: 1536, height: 1024, alt: "Maison Des Saveurs, traiteur marocain halal à Lyon" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traiteur marocain halal à Lyon | Maison Des Saveurs",
    description: DESCRIPTION,
    images: ["/logo-share.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${display.variable} ${body.variable}`;

  if (MAINTENANCE_MODE) {
    return (
      <html lang="fr" className={fontVars}>
        <body className="antialiased">
          <MaintenancePage />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </body>
      </html>
    );
  }

  return (
    <html lang="fr" className={fontVars}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: getStructuredDataJson() }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Aller au contenu
        </a>
        <Providers>
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
