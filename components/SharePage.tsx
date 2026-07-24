"use client";

import { useState } from "react";

export default function SharePage() {
  const [status, setStatus] = useState("");

  async function share() {
    const shareData = {
      title: document.title,
      text: "Mend Beauty Studio — Balwyn",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setStatus("Page shared.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Page link copied.");
    } catch {
      setStatus("Sharing is unavailable in this browser.");
    }
  }

  return (
    <div className="mt-5">
      <button type="button" className="btn-outline-light px-5 py-2.5" onClick={share}>
        Share this page
      </button>
      <p className="mt-2 min-h-4 text-xs text-cream/60" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
