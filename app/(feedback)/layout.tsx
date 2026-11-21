import FeedbackDocument from "@/components/feedback/FeedbackDocument";
import { englishRootMetadata, viewport as sharedViewport } from "@/lib/root-metadata";
import "../globals.css";
export const metadata = englishRootMetadata;
export const viewport = sharedViewport;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <FeedbackDocument lang="en-AU">{children}</FeedbackDocument>;
}
