import Image from "next/image";
import Link from "next/link";
import MendMonogram from "@/components/brand/MendMonogram";

// Full-width homepage hero banner over the real Mend Beauty Studio interior photo.
export default function HomeHero() {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden sm:min-h-[78vh]">
      <Image
        src="/images/mend-beauty-hero.png"
        alt="Mend Beauty Studio Balwyn salon interior"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Warm gradients for text readability over the bright interior */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-charcoal/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-transparent to-transparent"
      />
      {/* Decorative watermark — low opacity, does not compete with headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] sm:right-[12%] sm:top-[22%]"
      >
        <MendMonogram
          className="h-32 w-32 text-cream opacity-[0.06] sm:h-48 sm:w-48 lg:h-56 lg:w-56"
        />
      </div>
      <div className="wrap relative pb-12 pt-28 sm:pb-24 sm:pt-56">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-cream/90 sm:text-xs sm:tracking-[0.25em]">
          Mend Beauty Studio — Balwyn
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[1.75rem] font-medium leading-[1.15] text-cream sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">
          Mend your hair. Refresh your skin. Renew your look.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/90 sm:mt-5 sm:text-lg">
          Premium hair, head spa, skin and beauty care in Balwyn.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <a
            href="/contact#booking-enquiry"
            className="btn-gold w-full py-3.5 sm:w-auto"
          >
            Book an Appointment
          </a>
          <Link href="/services" className="btn-outline-light w-full py-3.5 sm:w-auto">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
