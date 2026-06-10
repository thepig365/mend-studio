import { site } from "@/lib/site";

type ContactCardProps = {
  showHours?: boolean;
};

export default function ContactCard({ showHours = false }: ContactCardProps) {
  return (
    <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-9">
      <p className="eyebrow">Visit Us</p>
      <h3 className="mt-3 font-display text-2xl font-medium text-charcoal">
        {site.locationName}
      </h3>
      <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-cocoa">
        <p>{site.address}</p>
        <p>
          Phone:{" "}
          <a href={site.phoneHref} className="font-medium text-bronze hover:text-gold">
            {site.phone}
          </a>
        </p>
        <p>
          WeChat: <span className="font-medium text-bronze">{site.wechat}</span>
        </p>
      </address>

      {showHours && (
        <div className="mt-7 border-t border-beige/70 pt-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
            Opening Hours
          </p>
          <ul className="mt-4 space-y-2">
            {site.hours.map((slot) => (
              <li key={slot.days} className="flex justify-between gap-4 text-sm text-cocoa">
                <span>{slot.days}</span>
                <span className="text-charcoal">{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-taupe">{site.hoursNote}</p>
        </div>
      )}

      <a href={site.phoneHref} className="btn-primary mt-7 w-full sm:w-auto">
        Book Now
      </a>
    </div>
  );
}
