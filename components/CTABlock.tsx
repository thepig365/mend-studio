type CTAAction = {
  label: string;
  href: string;
  variant?: "primary" | "gold" | "outline" | "light" | "outline-light";
};

type CTABlockProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  actions: CTAAction[];
  tone?: "light" | "dark";
};

const lightActionClass: Record<string, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  outline: "btn-outline",
  light: "btn-light",
  "outline-light": "btn-outline-light",
};

export default function CTABlock({
  eyebrow,
  heading,
  body,
  actions,
  tone = "dark",
}: CTABlockProps) {
  const isDark = tone === "dark";
  return (
    <section className="wrap py-8">
      <div
        className={`rounded-[2.5rem] px-8 py-14 text-center sm:px-14 sm:py-16 ${
          isDark ? "bg-espresso text-cream" : "bg-linen text-charcoal"
        }`}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2
          className={`mx-auto mt-3 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl ${
            isDark ? "text-cream" : "text-charcoal"
          }`}
        >
          {heading}
        </h2>
        {body && (
          <p
            className={`mx-auto mt-4 max-w-xl text-base leading-relaxed ${
              isDark ? "text-cream/75" : "text-cocoa"
            }`}
          >
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={
                lightActionClass[action.variant ?? (isDark ? "light" : "primary")]
              }
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
