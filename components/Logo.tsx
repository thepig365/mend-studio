import Image from "next/image";
import Link from "next/link";

type LogoVariant = "horizontal" | "stacked" | "icon";

type LogoProps = {
  /** horizontal = navbar · stacked = footer · icon = compact mark */
  variant?: LogoVariant;
  /** Retained for compatibility with existing callers. */
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

export default function Logo({
  variant = "horizontal",
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
          src="/images/mend-beauty-logo-transparent.png"
          alt=""
          width={696}
          height={1008}
          className="h-12 w-auto object-contain"
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
        <Image
          src="/images/mend-beauty-logo-transparent.png"
          alt=""
          width={696}
          height={1008}
          className="h-auto w-40 object-contain brightness-125 contrast-110 sm:w-44"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      onClick={onClick}
      aria-label="Mend Beauty Studio — Home"
    >
      <Image
        src="/images/mend-beauty-logo.png"
        alt=""
        width={1254}
        height={1254}
        priority
        className="h-24 w-24 shrink-0 rounded-2xl object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-28 sm:w-28"
      />
    </Link>
  );
}

/** Full stacked logo image for brand sections that need the official artwork. */
export function LogoStackedImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/mend-beauty-logo-transparent.png"
      alt="Mend Beauty Studio"
      width={696}
      height={1008}
      className={`h-auto w-28 object-contain sm:w-32 ${className}`}
    />
  );
}
