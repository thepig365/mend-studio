import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skill markdown is read from disk inside the authenticated portal.
  // Keep those files in the serverless trace for the library routes only.
  outputFileTracingIncludes: {
    "/marketing/skills": ["./vendor/marketingskills/**/*"],
    "/marketing/skills/[slug]/[[...doc]]": ["./vendor/marketingskills/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/services/nails-semi-permanent",
        destination: "/services/semi-permanent",
        statusCode: 301,
      },
      {
        source: "/zh/services/nails-semi-permanent",
        destination: "/zh/services/semi-permanent",
        statusCode: 301,
      },
    ];
  },
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
