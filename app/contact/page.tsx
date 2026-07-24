import Hero from "@/components/Hero";
import ContactCard from "@/components/ContactCard";
import BookingEnquiryForm from "@/components/BookingEnquiryForm";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact Mend Beauty Studio — Balwyn. Phone ${site.phone}, WeChat ${site.wechat}. ${site.address}. Book hair, head spa, skin, body, brows and lashes services.`,
  path: "/contact",
});

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

          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-beige bg-sand">
            <div className="text-center">
              <p className="font-display text-xl font-medium text-cocoa">Plan your visit</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-taupe">
                {site.address}
              </p>
              <a
                className="btn-outline mt-6"
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <BookingEnquiryForm />
      </section>
    </>
  );
}
