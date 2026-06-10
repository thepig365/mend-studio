"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav, servicesNav, site } from "@/lib/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-beige/70 bg-cream/90 backdrop-blur">
      <div className="wrap flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-none" onClick={closeMobile}>
          <span className="font-display text-3xl font-medium tracking-wide text-charcoal">
            Mend
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-gold">
            Beauty Studio
          </span>
        </Link>

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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-beige text-charcoal lg:hidden"
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

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-beige/70 bg-cream lg:hidden"
        >
          <div className="wrap flex flex-col py-4">
            {mainNav.map((item) =>
              item.hasDropdown ? (
                <div key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left text-base text-charcoal"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    {item.label}
                    <svg
                      aria-hidden
                      className={`h-3.5 w-3.5 text-gold transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="mb-2 flex flex-col rounded-2xl bg-sand px-4 py-2">
                      <Link
                        href="/services"
                        className="py-2.5 text-sm text-cocoa"
                        onClick={closeMobile}
                      >
                        All Services
                      </Link>
                      {servicesNav.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          className="py-2.5 text-sm text-cocoa"
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
                  className="py-3 text-base text-charcoal"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              )
            )}
            <a href="#contact" className="btn-gold mt-3 w-full" onClick={closeMobile}>
              Book Now
            </a>
            <p className="mt-4 text-xs text-cocoa">
              {site.locationName} · {site.phone}
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
