import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary stock images are served from Unsplash / Pexels until
    // professional Mend Beauty Studio photography replaces them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
