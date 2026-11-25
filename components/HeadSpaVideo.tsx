"use client";

import { useEffect, useRef, useState } from "react";

type HeadSpaVideoProps = {
  sources: { mp4: string; webm?: string } | null;
  poster: string | null;
  label: string;
  slotId: string;
  showPlaceholder: boolean;
  placeholderText: string;
  aspect?: string;
  className?: string;
};

/**
 * Silent ambient clip: muted, inline, looped, no sound controls needed.
 * - The file is only attached once the slot is near the viewport (lazy).
 * - preload="metadata" so nothing heavy downloads before it is needed.
 * - Plays only while visible and only when the visitor has not asked for
 *   reduced motion; with reduced motion the poster stays and controls appear.
 */
export default function HeadSpaVideo({
  sources,
  poster,
  label,
  slotId,
  showPlaceholder,
  placeholderText,
  aspect = "aspect-[4/5]",
  className = "",
}: HeadSpaVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !sources) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
        if (reducedMotion) {
          video.pause();
          return;
        }
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [sources, reducedMotion]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !nearViewport) return;
    video.load();
    if (!reducedMotion) video.play().catch(() => undefined);
  }, [nearViewport, reducedMotion]);

  if (!sources) {
    if (!showPlaceholder) return null;
    return (
      <div
        className={`${aspect} ${className} flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gold/50 bg-linen p-6 text-center`}
        data-video-slot={slotId}
        role="img"
        aria-label={label}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze">Video slot · {slotId}</span>
        <span className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa">{placeholderText}</span>
      </div>
    );
  }

  return (
    <video
      ref={ref}
      className={`${aspect} ${className} w-full rounded-[2rem] bg-sand object-cover`}
      data-video-slot={slotId}
      poster={poster ?? undefined}
      aria-label={label}
      title={label}
      muted
      playsInline
      loop
      preload="metadata"
      controls={reducedMotion}
      disablePictureInPicture
    >
      {nearViewport && sources.webm ? <source src={sources.webm} type="video/webm" /> : null}
      {nearViewport ? <source src={sources.mp4} type="video/mp4" /> : null}
    </video>
  );
}
