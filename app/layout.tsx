import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import WhatsAppButton from "./components/WhatsAppButton";
import MaintenancePage from "./components/MaintenancePage";
import { MAINTENANCE_MODE } from "./config/maintenance";

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

const SITE_URL = "https://mds-traiteur.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traiteur Marocain à Lyon | Maison des Saveurs",
    template: "%s | Maison des Saveurs",
  },
  description:
    "Maison des Saveurs, traiteur marocain à Lyon. Couscous, tajines, pâtisseries marocaines pour mariages, événements et réceptions.",
  keywords: [
    "traiteur marocain lyon",
    "traiteur lyon",
    "traiteur oriental lyon",
    "couscous lyon événement",
    "traiteur villeurbanne",
    "traiteur halal lyon",
    "traiteur mariage lyon",
    "buffet mariage lyon",
    "traiteur evenement lyon",
    "traiteur anniversaire lyon",
    "traiteur entreprise lyon",
    "buffet marocain lyon",
    "cuisine marocaine lyon",
    "traiteur evenementiel lyon",
  ],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Traiteur Marocain à Lyon | Maison des Saveurs",
    description: "Maison des Saveurs, traiteur marocain à Lyon. Couscous, tajines, pâtisseries marocaines pour mariages, événements et réceptions.",
    url: SITE_URL,
    siteName: "Maison des Saveurs",
    images: [
      {
        url: "/logo-share.png",
        width: 1200,
        height: 630,
        alt: "Maison des Saveurs - Traiteur marocain Lyon",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traiteur Marocain à Lyon | Maison des Saveurs",
    description: "Maison des Saveurs, traiteur marocain à Lyon. Couscous, tajines, pâtisseries marocaines pour mariages et réceptions.",
    images: ["/logo-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": "https://mds-traiteur.fr/#organization",
    name: "Maison des Saveurs",
    alternateName: "MDS Traiteur",
    description:
      "Traiteur marocain d'exception à Lyon. Catering pour mariages, événements et réceptions. Cuisine marocaine traditionnelle.",
    url: "https://mds-traiteur.fr",
    image: "https://mds-traiteur.fr/logo-share.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lyon",
      addressRegion: "Auvergne-Rhône-Alpes",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Lyon" },
      { "@type": "City", name: "Villeurbanne" },
      { "@type": "AdministrativeArea", name: "Métropole de Lyon" },
    ],
    priceRange: "€€",
    telephone: "+33758639734",
    email: "contact.mds.traiteur@gmail.com",
    servingCuisine: "Moroccan",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services traiteur",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur mariage Lyon" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur événements et réceptions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cuisine marocaine traditionnelle" } },
      ],
    },
  };

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
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
