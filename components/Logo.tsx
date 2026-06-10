import Image from "next/image";
import Link from "next/link";
import MendMonogram from "@/components/brand/MendMonogram";

type LogoVariant = "horizontal" | "stacked" | "icon";

type LogoProps = {
  /** horizontal = navbar · stacked = footer · icon = compact mark */
  variant?: LogoVariant;
  /** light = cream/gold on dark backgrounds (e.g. footer) */
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

export default function Logo({
  variant = "horizontal",
  tone = "dark",
  className = "",
  onClick,
}: LogoProps) {
  const isLight = tone === "light";
  const nameClass = isLight ? "text-cream" : "text-charcoal";
  const subClass = isLight ? "text-gold" : "text-gold";
  if (variant === "icon") {
    return (
      <Link
        href="/"
        className={`inline-flex shrink-0 items-center ${className}`}
        onClick={onClick}
        aria-label="Mend Beauty Studio — Home"
      >
        <MendMonogram className="h-9 w-9 text-charcoal" />
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link
        href="/"
        className={`inline-flex shrink-0 flex-col items-center text-center ${className}`}
        onClick={onClick}
        aria-label="Mend Beauty Studio — Home"
      >
        <MendMonogram className={`h-14 w-14 ${nameClass}`} />
        <span className={`mt-2 font-display text-2xl font-medium leading-none ${nameClass}`}>
          Mend
        </span>
        <span className={`mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.38em] ${subClass}`}>
          Beauty Studio
        </span>
      </Link>
    );
  }

  // Horizontal navbar lockup — monogram + wordmark, no image block.
  return (
    <Link
      href="/"
      className={`logo-plaque group inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`}
      onClick={onClick}
      aria-label="Mend Beauty Studio — Home"
    >
      <MendMonogram
        className="h-8 w-8 shrink-0 text-charcoal transition-transform duration-200 group-hover:scale-[1.02] sm:h-9 sm:w-9"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-medium tracking-wide text-charcoal sm:text-xl">
          Mend
        </span>
        <span className="mt-0.5 text-[0.5rem] font-medium uppercase tracking-[0.32em] text-gold sm:text-[0.55rem] sm:tracking-[0.36em]">
          Beauty Studio
        </span>
      </span>
    </Link>
  );
}

/** Full stacked logo image for brand sections that need the official artwork. */
export function LogoStackedImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/mend-beauty-logo.png"
      alt="Mend Beauty Studio"
      width={160}
      height={160}
      className={`h-auto w-28 object-contain sm:w-32 ${className}`}
    />
  );
}
