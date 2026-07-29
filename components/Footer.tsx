"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import SharePage from "@/components/SharePage";
import SocialLinks from "@/components/SocialLinks";
import {
  chineseLocale,
  isChinesePath,
  localePath,
  navByLocale,
  servicesNavByLocale,
  ui,
} from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();
  const locale = isChinesePath(pathname) ? chineseLocale : "en-AU";
  const copy = ui[locale];
  const mainNav = navByLocale[locale];
  const servicesNav = servicesNavByLocale[locale];

  return (
    <footer className="bg-charcoal pb-20 text-cream lg:pb-0">
      {/* Contact details and non-booking enquiry routes remain available here. */}
      <div id="contact" className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo
            variant="stacked"
            tone="light"
            href={localePath("/", locale)}
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {locale === chineseLocale
              ? "修护秀发，焕亮肌肤，重拾自信光彩。"
              : site.tagline}
          </p>
          <p className="mt-3 text-sm text-cream/70">
            {locale === chineseLocale
              ? "美发 · 头疗 · 皮肤管理 · 身体护理 · 眉睫"
              : site.positioning}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {copy.services}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {servicesNav.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="text-sm text-cream/80 transition-colors hover:text-gold"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {locale === chineseLocale ? "网站导航" : "Explore"}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {mainNav
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href={localePath("/our-story", locale)}
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                {locale === chineseLocale ? "品牌宣言" : "Our Philosophy"}
              </Link>
            </li>
            <li>
              <Link
                href={localePath("/policies", locale)}
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                {copy.policies}
              </Link>
            </li>
            <li>
              <Link
                href="/marketing"
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                Marketing Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {copy.visitUs}
          </h2>
          <address className="mt-5 space-y-2.5 text-sm not-italic text-cream/80">
            <p className="font-medium text-cream">{site.locationName}</p>
            <p>{site.address}</p>
            <p>
              {copy.phone}:{" "}
              <a href={site.phoneHref} className="transition-colors hover:text-gold">
                {site.phone}
              </a>
            </p>
            <p>
              {copy.email}:{" "}
              <a href={site.emailHref} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </p>
            <p>WeChat: {site.wechat}</p>
          </address>
          <a href={localePath("/book", locale)} className="btn-gold mt-6 px-6 py-2.5">
            {copy.bookAppointment}
          </a>
          <SharePage />
          <SocialLinks locale={locale} />
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {copy.rights}
          </p>
          <p>{site.locationName} · {site.region}</p>
        </div>
        <div className="wrap pb-6">
          <p className="text-[0.65rem] leading-relaxed text-cream/40">
            {copy.temporaryImages}
          </p>
        </div>
      </div>
    </footer>
  );
}
