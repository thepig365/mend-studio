import { site } from "@/lib/site";
import { localePath, ui, type Locale } from "@/lib/i18n";

type ContactCardProps = {
  showHours?: boolean;
  locale?: Locale;
};

export default function ContactCard({
  showHours = false,
  locale = "en-AU",
}: ContactCardProps) {
  const isChinese = locale === "zh-Hans";
  const copy = ui[locale];
  const hours = isChinese
    ? [
        { days: "星期一至星期二", time: "上午 9:00–下午 5:00" },
        { days: "星期三", time: "休息" },
        { days: "星期四至星期日", time: "上午 9:00–下午 5:00" },
      ]
    : site.hours;

  return (
    <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-9">
      <p className="eyebrow">{copy.visitUs}</p>
      <h3 className="mt-3 font-display text-2xl font-medium text-charcoal">
        {site.locationName}
      </h3>
      <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-cocoa">
        <p>{site.address}</p>
        <p>
          {copy.phone}:{" "}
          <a href={site.phoneHref} className="font-medium text-bronze hover:text-gold">
            {site.phone}
          </a>
        </p>
        <p>
          WeChat: <span className="font-medium text-bronze">{site.wechat}</span>
        </p>
        <p>
          {copy.email}:{" "}
          <a href={site.emailHref} className="font-medium text-bronze hover:text-gold">
            {site.email}
          </a>
        </p>
      </address>

      {showHours && (
        <div className="mt-7 border-t border-beige/70 pt-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
            {copy.openingHours}
          </p>
          <ul className="mt-4 space-y-2">
            {hours.map((slot) => (
              <li key={slot.days} className="flex justify-between gap-4 text-sm text-cocoa">
                <span>{slot.days}</span>
                <span className="text-charcoal">{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-taupe">
            {isChinese
              ? "建议提前预约。公共假期营业时间可能有所调整。"
              : site.hoursNote}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a href={localePath("/book", locale)} className="btn-primary w-full sm:w-auto">
          {copy.bookAppointment}
        </a>
        <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
          {copy.callNow}
        </a>
      </div>
    </div>
  );
}
