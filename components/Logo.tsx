import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  /** Header uses a compact mark; footer uses the full lockup. */
  variant?: "header" | "footer";
  className?: string;
  onClick?: () => void;
};

const sizes = {
  header: { width: 200, height: 200, className: "h-12 w-auto sm:h-[3.25rem]" },
  footer: { width: 200, height: 200, className: "h-20 w-auto" },
};

export default function Logo({ variant = "header", className = "", onClick }: LogoProps) {
  const { width, height, className: sizeClass } = sizes[variant];

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      onClick={onClick}
      aria-label="Mend Beauty Studio — Home"
    >
      <Image
        src="/images/mend-beauty-logo.png"
        alt="Mend Beauty Studio"
        width={width}
        height={height}
        className={`${sizeClass} object-contain object-left`}
        priority={variant === "header"}
      />
    </Link>
  );
}
