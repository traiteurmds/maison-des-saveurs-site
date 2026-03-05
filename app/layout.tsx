import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

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

const SITE_URL = "https://mds-traiteur.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title:
    "Maison des Saveurs | Traiteur Marocain Halal à Lyon – Mariage, Buffet & Événements",
  description:
    "Maison des Saveurs est un traiteur marocain halal à Lyon spécialisé dans les buffets gourmands, mariages, anniversaires et événements professionnels. Cuisine marocaine traditionnelle faite maison avec des ingrédients de qualité.",
  keywords: [
    "traiteur lyon",
    "traiteur villeurbanne",
    "traiteur marocain lyon",
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
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Maison des Saveurs | Traiteur Marocain Halal à Lyon",
    description:
      "Maison des Saveurs est un traiteur marocain halal à Lyon spécialisé dans les buffets gourmands, mariages, anniversaires et événements professionnels.",
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
    title: "Maison des Saveurs | Traiteur Marocain Halal à Lyon",
    description:
      "Traiteur marocain halal à Lyon : buffets gourmands, mariages, anniversaires et événements professionnels. Cuisine marocaine traditionnelle faite maison.",
    images: ["/logo-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
