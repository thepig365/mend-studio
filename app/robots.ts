import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Answer-engine and AI crawlers are explicitly allowed, including training
// crawlers. The same private paths stay disallowed for every agent.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Googlebot",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "Diffbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/marketing", "/api/auth"],
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
        disallow: ["/marketing", "/api/auth"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
