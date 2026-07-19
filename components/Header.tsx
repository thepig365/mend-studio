"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { mainNav, servicesNav, site } from "@/lib/site";

function isNavActive(pathname: string, href: string, hasDropdown?: boolean) {
  if (href === "/") return pathname === "/";
  if (hasDropdown) return pathname === href || pathname.startsWith(`${href}/`);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const navLinkClass = (href: string, hasDropdown?: boolean) =>
    isNavActive(pathname, href, hasDropdown) ? "nav-link nav-link-active" : "nav-link";

  const mobileLinkClass = (href: string, hasDropdown?: boolean) =>
    isNavActive(pathname, href, hasDropdown)
      ? "mobile-nav-link mobile-nav-link-active"
      : "mobile-nav-link";

  return (
    <header className="site-header sticky top-0 z-[70] safe-top">
      <div className="wrap flex h-28 items-center justify-start gap-3 sm:h-32">
        <Logo variant="horizontal" onClick={closeMobile} />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="ml-auto hidden min-w-0 items-center gap-1 lg:flex xl:gap-2 [&_.nav-link]:px-3.5 [&_.nav-link]:text-sm xl:[&_.nav-link]:px-[1.125rem] xl:[&_.nav-link]:py-2.5 xl:[&_.nav-link]:text-base"
        >
          {mainNav.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="group relative">
                <Link href={item.href} className={navLinkClass(item.href, true)}>
                  {item.label}
                  <svg
                    aria-hidden
                    className="h-3 w-3 text-gold transition-transform duration-200 group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                <div
                  className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                >
                  <div
                    className="overflow-hidden rounded-2xl border border-beige/80 bg-cream/95 shadow-[0_8px_28px_-8px_rgba(51,46,38,0.14)] backdrop-blur-md"
                  >
                    {servicesNav.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        className="block px-5 py-3 text-sm text-cocoa transition-all duration-200 hover:bg-linen/80 hover:text-charcoal"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={navLinkClass(item.href)}>
                {item.label}
              </Link>
            )
          )}
          <a
            href="#contact"
            className="btn-book ml-2 px-5 py-2.5 text-sm xl:ml-3 xl:px-7 xl:py-3 xl:text-base"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile menu toggle — hamburger ↔ close */}
        <button
          type="button"
          className={`menu-toggle ml-auto shrink-0 lg:ml-4 ${mobileOpen ? "menu-toggle-open" : ""}`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="relative block h-5 w-5" aria-hidden>
            <span
              className={`absolute left-0 top-1 block h-[1.5px] w-5 bg-current transition-all duration-200 ${
                mobileOpen ? "top-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] block h-[1.5px] w-5 bg-current transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[17px] block h-[1.5px] w-5 bg-current transition-all duration-200 ${
                mobileOpen ? "top-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile nav panel — sits below header bar; toggle stays visible */}
      <div
        id="mobile-nav-panel"
        className={`mobile-nav-panel fixed inset-x-0 bottom-0 top-28 z-[65] flex flex-col transition-all duration-300 ease-out sm:top-32 ${
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col overflow-y-auto overscroll-contain"
        >
          <div className="wrap flex flex-col py-3 pb-28">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={mobileLinkClass(item.href, item.hasDropdown)}
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            ))}

            <div className="mobile-nav-card mt-3 flex flex-col gap-0.5 py-2">
              <p className="px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-gold">
                All Services
              </p>
              {servicesNav.map((service) => (
                <Link
                  key={service.label}
                  href={service.href}
                  className="mobile-nav-link min-h-[2.75rem] text-sm text-cocoa"
                  onClick={closeMobile}
                >
                  {service.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <a href="#contact" className="btn-book w-full py-3.5" onClick={closeMobile}>
                Book an Appointment
              </a>
              <a href={site.phoneHref} className="btn-outline w-full py-3.5 text-center">
                Call {site.phone}
              </a>
            </div>

            <div className="mobile-nav-card mt-6 text-sm text-cocoa">
              <p className="font-medium text-charcoal">{site.locationName}</p>
              <p className="mt-1">{site.address}</p>
              <p className="mt-2">WeChat: {site.wechat}</p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
