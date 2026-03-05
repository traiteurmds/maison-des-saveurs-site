import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Maison Des Saveurs | Traiteur mariage Lyon & Traiteur événementiel Villeurbanne",
  description:
    "Traiteur mariage Lyon et traiteur événementiel Villeurbanne. Cuisine d'exception pour mariages et événements privés. Réceptions sur mesure à Lyon et alentours.",
  keywords: [
    "traiteur mariage Lyon",
    "traiteur Villeurbanne",
    "traiteur événementiel Lyon",
    "traiteur mariage Villeurbanne",
    "réception mariage Lyon",
  ],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/logo-share.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Maison Des Saveurs",
    title: "Maison Des Saveurs | Traiteur mariage Lyon & Traiteur événementiel Villeurbanne",
    description:
      "Traiteur mariage Lyon et traiteur événementiel Villeurbanne. Cuisine d'exception pour mariages et événements privés. Réceptions sur mesure à Lyon et alentours.",
    images: [
      {
        url: "/logo-share.png",
        width: 1200,
        height: 630,
        alt: "Maison Des Saveurs - Traiteur mariage Lyon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Des Saveurs | Traiteur mariage Lyon & Traiteur événementiel Villeurbanne",
    description:
      "Traiteur mariage Lyon et traiteur événementiel Villeurbanne. Cuisine d'exception pour mariages et événements privés.",
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
