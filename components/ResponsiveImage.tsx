import Image from "next/image";

// Temporary stock image — replace with professional Mend Beauty Studio photography.
// Single reusable image component: fixed aspect ratio (no layout shift),
// object-cover (no stretching), optional soft overlay for text readability.

type ResponsiveImageProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]" */
  aspect?: string;
  /** Tailwind border-radius class */
  rounded?: string;
  /** Adds a subtle warm gradient overlay for readability */
  overlay?: boolean;
  /** next/image sizes hint */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export default function ResponsiveImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  rounded = "rounded-3xl",
  overlay = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className = "",
}: ResponsiveImageProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-linen ${aspect} ${rounded} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-charcoal/5"
        />
      )}
    </div>
  );
}
