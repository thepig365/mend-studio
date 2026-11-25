"use client";

import { useEffect, useRef, useState } from "react";

type HeadSpaVideoProps = {
  sources: { mp4: string; webm?: string };
  poster: string;
  label: string;
  slotId: string;
  aspect?: string;
  className?: string;
  /** CSS object-position for cropped placements, e.g. "50% 30%". */
  focus?: string;
};

/**
 * Silent ambient clip: muted, inline, looped; the files carry no audio track.
 * - Sources are only attached once the clip is near the viewport (lazy).
 * - preload="metadata" so nothing heavy downloads before it is needed.
 * - Plays only while visible and only when the visitor has not asked for
 *   reduced motion; with reduced motion the poster stays and controls appear.
 */
export default function HeadSpaVideo({
  sources,
  poster,
  label,
  slotId,
  aspect = "aspect-[4/5]",
  className = "",
  focus,
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
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
        if (reducedMotion || !entry.isIntersecting) {
          video.pause();
        } else {
          video.play().catch(() => undefined);
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !nearViewport) return;
    video.load();
    if (!reducedMotion) video.play().catch(() => undefined);
  }, [nearViewport, reducedMotion]);

  return (
    <video
      ref={ref}
      className={`${aspect} ${className} w-full bg-sand object-cover`}
      data-video-slot={slotId}
      poster={poster}
      style={focus ? { objectPosition: focus } : undefined}
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
