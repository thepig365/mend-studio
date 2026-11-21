import { submitFeedback } from "@/lib/feedback/http";
import { isFeedbackConfigured, saveFeedback } from "@/lib/feedback/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return submitFeedback(request, {
    configured: isFeedbackConfigured,
    secret: () => process.env.AUTH_SECRET || "",
    save: saveFeedback,
    production: process.env.NODE_ENV === "production",
  });
}
