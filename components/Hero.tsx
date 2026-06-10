import ResponsiveImage from "@/components/ResponsiveImage";

export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "gold" | "outline";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lead?: string;
  body?: string;
  actions?: HeroAction[];
  image?: string;
  imageAlt?: string;
  /** Tailwind aspect-ratio class for the hero image (default 4:3) */
  imageAspect?: string;
};

const actionClass: Record<NonNullable<HeroAction["variant"]>, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  outline: "btn-outline",
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  lead,
  body,
  actions,
  image,
  imageAlt,
  imageAspect = "aspect-[4/3]",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div
        className={`wrap grid items-center gap-12 py-16 sm:py-20 lg:py-24 ${
          image ? "lg:grid-cols-[1.1fr_1fr]" : ""
        }`}
      >
        <div className={image ? "" : "mx-auto max-w-3xl text-center"}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-gold">
              {subtitle}
            </p>
          )}
          {lead && (
            <p className="mt-5 font-display text-2xl italic leading-snug text-cocoa sm:text-3xl">
              {lead}
            </p>
          )}
          {body && (
            <p className={`mt-5 text-base leading-relaxed text-cocoa ${image ? "max-w-xl" : ""}`}>
              {body}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div
              className={`mt-8 flex flex-wrap gap-3 ${image ? "" : "justify-center"}`}
            >
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={actionClass[action.variant ?? "outline"]}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {image && (
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gold/10" aria-hidden />
            <ResponsiveImage
              src={image}
              alt={imageAlt ?? ""}
              aspect={imageAspect}
              rounded="rounded-[2rem]"
              overlay
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-xl shadow-charcoal/10"
            />
          </div>
        )}
      </div>
    </section>
  );
}
