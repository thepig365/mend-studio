type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = tone === "dark" ? "text-cream" : "text-charcoal";
  const bodyColor = tone === "dark" ? "text-cream/75" : "text-cocoa";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {body && <p className={`mt-4 text-base leading-relaxed ${bodyColor}`}>{body}</p>}
    </div>
  );
}
