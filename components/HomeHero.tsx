import Image from "next/image";
import Link from "next/link";

// Full-width homepage hero banner over the real Mend Beauty Studio interior photo.
export default function HomeHero() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[78vh]">
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
      <div className="wrap relative pb-16 pt-40 sm:pb-24 sm:pt-56">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-cream/90">
          Mend Beauty Studio — Balwyn
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-cream sm:text-5xl lg:text-6xl">
          Mend your hair. Refresh your skin. Renew your look.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
          Premium hair, head spa, skin and beauty care in Balwyn.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="btn-gold">
            Book an Appointment
          </a>
          <Link href="/services" className="btn-outline-light">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
