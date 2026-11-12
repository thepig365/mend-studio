import { localServiceCopy } from "@/lib/local-service-copy";

// Title and description for the men’s grooming pages. The H1 and nearby
// sentence live on the same local-service copy so the two cannot drift.
export const mensGroomingSeo = {
  "en-AU": {
    title: localServiceCopy["mens-grooming"]["en-AU"].title,
    description: localServiceCopy["mens-grooming"]["en-AU"].description,
  },
  "zh-Hans": {
    title: localServiceCopy["mens-grooming"]["zh-Hans"].title,
    description: localServiceCopy["mens-grooming"]["zh-Hans"].description,
  },
} as const;
