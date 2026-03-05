import type { NextConfig } from "next";
import path from "path";

// Chemin ABSOLU du projet — obligatoire car un package-lock.json dans C:\Users\crypt
// fait que Next.js prend le mauvais dossier comme racine et ne surveille pas ce projet.
const PROJECT_ROOT = path.resolve(
  "C:\\Users\\crypt\\Desktop\\MDS\\maison-des-saveurs-site"
);

const nextConfig: NextConfig = {
  turbopack: {
    root: PROJECT_ROOT,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
