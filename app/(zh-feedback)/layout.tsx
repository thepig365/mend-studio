import FeedbackDocument from "@/components/feedback/FeedbackDocument";
import { chineseRootMetadata, viewport as sharedViewport } from "@/lib/root-metadata";
import "../globals.css";
export const metadata = chineseRootMetadata;
export const viewport = sharedViewport;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <FeedbackDocument lang="zh-Hans">{children}</FeedbackDocument>;
}
