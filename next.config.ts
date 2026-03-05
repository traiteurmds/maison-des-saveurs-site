import type { NextConfig } from "next";
import path from "path";

// CRITICAL: Use absolute path so Turbopack watches THIS project, not the parent.
// There is another package-lock.json in C:\Users\crypt; without an explicit root,
// Next.js picks that folder as root and file changes here are ignored.
const PROJECT_ROOT = path.resolve(__dirname);

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
