import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ContactCard from "@/components/ContactCard";
import { site } from "@/lib/site";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mend Beauty Studio — Balwyn. Phone 0499 6666 88, WeChat lzho1223. Book hair, head spa, skin, body, brows and lashes services in Balwyn VIC 3103.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="We’d love to hear from you"
        body="Bookings, gift cards, consultations or career enquiries — call, message or send us a note below."
        image={siteImages.contact.src}
        imageAlt={siteImages.contact.alt}
        imageAspect="aspect-[3/4]"
        actions={[
          { label: "Call Now", href: site.phoneHref, variant: "gold" },
          { label: "View Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <ContactCard showHours />

          {/* Map placeholder */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-taupe bg-sand">
            <div className="text-center">
              <p className="font-display text-xl font-medium text-cocoa">Google Map</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-taupe">
                {site.address}
              </p>
            </div>
          </div>
        </div>

        {/* Static contact form */}
        <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
          <p className="eyebrow">Send a Message</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
            Contact form
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            Leave your details and we’ll get back to you as soon as we can. For urgent
            bookings, please call {site.phone}.
          </p>
          <form className="mt-8 grid gap-5" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-charcoal">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-charcoal">
                Phone
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  className="rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-charcoal">
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal">
              What are you interested in?
              <select
                name="topic"
                className="rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal focus:border-gold focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option>Booking — Hair</option>
                <option>Booking — Head Spa & Scalp Care</option>
                <option>Booking — Skin & Facial</option>
                <option>Booking — Body Care</option>
                <option>Booking — Brows & Lashes</option>
                <option>Semi-Permanent Beauty Consultation</option>
                <option>Gift Cards</option>
                <option>Memberships</option>
                <option>Careers / Rent a Space</option>
                <option>Other</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal">
              Message
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us a little about what you’re looking for…"
                className="resize-none rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none"
              />
            </label>
            <button type="button" className="btn-primary mt-2 w-full sm:w-auto">
              Send Message
            </button>
            <p className="text-xs leading-relaxed text-taupe">
              This form is for enquiries only and does not confirm a booking. We’ll be in
              touch to confirm details and availability.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
