"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { isChinesePath } from "@/lib/i18n";

export default function SharePage() {
  const [status, setStatus] = useState("");
  const pathname = usePathname();
  const isChinese = isChinesePath(pathname);

  async function share() {
    const shareData = {
      title: document.title,
      text: isChinese ? "Mend Beauty Studio — Deepdene" : "Mend Beauty Studio — Balwyn",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setStatus(isChinese ? "页面已分享。" : "Page shared.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus(isChinese ? "页面链接已复制。" : "Page link copied.");
    } catch {
      setStatus(
        isChinese ? "当前浏览器无法使用分享功能。" : "Sharing is unavailable in this browser.",
      );
    }
  }

  return (
    <div className="mt-5">
      <button type="button" className="btn-outline-light px-5 py-2.5" onClick={share}>
        {isChinese ? "分享此页面" : "Share this page"}
      </button>
      <p className="mt-2 min-h-4 text-xs text-cream/60" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
