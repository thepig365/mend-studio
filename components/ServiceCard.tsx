import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  linkLabel?: string;
};

export default function ServiceCard({
  title,
  description,
  href,
  image,
  imageAlt,
  linkLabel = "Explore",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-beige/70 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-charcoal/10"
    >
      {image && (
        <div className="overflow-hidden">
          {/* Temporary stock image — replace with professional Mend Beauty Studio photography. */}
          <ResponsiveImage
            src={image}
            alt={imageAlt ?? title}
            aspect="aspect-[4/3]"
            rounded="rounded-none"
            overlay
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="font-display text-xl font-medium text-charcoal sm:text-2xl">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-bronze">
          {linkLabel}
          <svg aria-hidden className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
