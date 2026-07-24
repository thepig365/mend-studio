type CareerCardProps = {
  title: string;
  type: string;
  summary: string;
  highlights?: string[];
};

export default function CareerCard({ title, type, summary, highlights }: CareerCardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">{type}</p>
      <h3 className="mt-3 font-display text-2xl font-medium text-charcoal">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-cocoa">{summary}</p>
      {highlights && highlights.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-cocoa">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {highlight}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-6">
        <a
          href="/contact#booking-enquiry"
          className="btn-outline px-6 py-2.5 text-xs"
        >
          Express Interest
        </a>
      </div>
    </div>
  );
}
