import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: false, // You can keep this if you specifically need it disabled
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // 1. FIX: Added Unsplash to allow external images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;