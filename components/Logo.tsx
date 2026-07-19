import Image from "next/image";
import Link from "next/link";

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
  if (variant === "icon") {
    return (
      <Link
        href="/"
        className={`inline-flex shrink-0 items-center ${className}`}
        onClick={onClick}
        aria-label="Mend Beauty Studio — Home"
      >
        <Image
          src="/images/mend-beauty-logo.png"
          alt=""
          width={1254}
          height={1254}
          className="h-9 w-9 rounded-full bg-white object-contain"
        />
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
        <span
          className={`overflow-hidden rounded-2xl bg-white p-2 ${
            tone === "light" ? "ring-1 ring-cream/15" : "ring-1 ring-beige/70"
          }`}
        >
          <Image
            src="/images/mend-beauty-logo.png"
            alt=""
            width={1254}
            height={1254}
            className="h-auto w-40 object-contain sm:w-44"
          />
        </span>
      </Link>
    );
  }

  // The full approved lockup is too detailed to read at navbar height, so the
  // artwork is paired with a concise text lockup while remaining the source mark.
  return (
    <Link
      href="/"
      className={`logo-plaque group inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`}
      onClick={onClick}
      aria-label="Mend Beauty Studio — Home"
    >
      <Image
        src="/images/mend-beauty-logo.png"
        alt=""
        width={1254}
        height={1254}
        className="h-9 w-9 shrink-0 rounded-full bg-white object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-10 sm:w-10"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-medium tracking-[0.2em] text-charcoal sm:text-lg">
          MEND
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
