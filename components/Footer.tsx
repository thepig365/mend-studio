import Link from "next/link";
import Logo from "@/components/Logo";
import { mainNav, servicesNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal pb-20 text-cream lg:pb-0">
      {/* Contact anchor — Book Now buttons across the site land here */}
      <div id="contact" className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="stacked" tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {site.tagline}
          </p>
          <p className="mt-3 text-sm text-cream/70">{site.positioning}</p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Services
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
            Explore
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
                href="/policies"
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                Policies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Visit Us
          </h2>
          <address className="mt-5 space-y-2.5 text-sm not-italic text-cream/80">
            <p className="font-medium text-cream">{site.locationName}</p>
            <p>{site.address}</p>
            <p>
              Phone:{" "}
              <a href={site.phoneHref} className="transition-colors hover:text-gold">
                {site.phone}
              </a>
            </p>
            <p>WeChat: {site.wechat}</p>
          </address>
          <a href={site.phoneHref} className="btn-gold mt-6 px-6 py-2.5">
            Book Now
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.locationName} · {site.region}</p>
        </div>
        <div className="wrap pb-6">
          <p className="text-[0.65rem] leading-relaxed text-cream/40">
            Some images are temporary stock images used for illustration only and will be
            replaced with professional Mend Beauty Studio photography.
          </p>
        </div>
      </div>
    </footer>
  );
}
