"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { mainNav, servicesNav, site } from "@/lib/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-beige/70 bg-cream/95 backdrop-blur-md safe-top">
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Logo onClick={closeMobile} />

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 py-2 text-sm tracking-wide text-charcoal transition-colors hover:text-bronze"
                >
                  {item.label}
                  <svg
                    aria-hidden
                    className="h-3 w-3 text-gold transition-transform group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-beige bg-cream shadow-lg shadow-charcoal/10">
                    {servicesNav.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        className="block px-5 py-3 text-sm text-charcoal transition-colors hover:bg-sand hover:text-bronze"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-sm tracking-wide text-charcoal transition-colors hover:text-bronze"
              >
                {item.label}
              </Link>
            )
          )}
          <a href="#contact" className="btn-gold px-6 py-2.5">
            Book Now
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-beige text-charcoal transition-colors hover:border-gold lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <svg aria-hidden className="h-5 w-5" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden className="h-5 w-5" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-50 flex flex-col bg-cream lg:hidden safe-top">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col overflow-y-auto overscroll-contain"
          >
            <div className="wrap flex flex-col py-2 pb-28">
              {mainNav.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label} className="border-b border-beige/50">
                    <button
                      type="button"
                      className="flex w-full min-h-[3rem] items-center justify-between py-3 text-left text-base font-medium text-charcoal"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((open) => !open)}
                    >
                      {item.label}
                      <svg
                        aria-hidden
                        className={`h-4 w-4 text-gold transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="mb-3 flex flex-col rounded-2xl bg-sand px-4 py-2">
                        <Link
                          href="/services"
                          className="min-h-[2.75rem] py-2.5 text-sm font-medium text-charcoal"
                          onClick={closeMobile}
                        >
                          All Services
                        </Link>
                        {servicesNav.map((service) => (
                          <Link
                            key={service.label}
                            href={service.href}
                            className="min-h-[2.75rem] py-2.5 text-sm text-cocoa"
                            onClick={closeMobile}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="min-h-[3rem] border-b border-beige/50 py-3 text-base font-medium text-charcoal"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-6 space-y-3">
                <a href="#contact" className="btn-gold w-full py-3.5" onClick={closeMobile}>
                  Book an Appointment
                </a>
                <a href={site.phoneHref} className="btn-outline w-full py-3.5">
                  Call {site.phone}
                </a>
              </div>

              <div className="mt-8 rounded-2xl bg-sand/80 px-5 py-4 text-sm text-cocoa">
                <p className="font-medium text-charcoal">{site.locationName}</p>
                <p className="mt-1">{site.address}</p>
                <p className="mt-2">WeChat: {site.wechat}</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
