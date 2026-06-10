import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABlock from "@/components/CTABlock";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Booking, cancellation, gift card and service policies for Mend Beauty Studio — Balwyn, including head spa and semi-permanent beauty consultation policies.",
};

const policies = [
  {
    title: "Booking Policy",
    paragraphs: [
      "Appointments can be made by phone, WeChat or in studio. Some services — including colour, head spa rituals and treatment room services — may require a deposit to secure your booking.",
      "Please let us know about any relevant sensitivities, allergies or preferences when booking so we can prepare the right service for you.",
    ],
  },
  {
    title: "Cancellation Policy",
    paragraphs: [
      "We understand plans change. We kindly ask for at least 24 hours’ notice to cancel or reschedule an appointment.",
      "Cancellations with less than 24 hours’ notice, or missed appointments, may result in a cancellation fee or loss of deposit. Repeated no-shows may require pre-payment for future bookings.",
    ],
  },
  {
    title: "Late Arrival Policy",
    paragraphs: [
      "If you are running late, please call us as soon as possible. We will always do our best to accommodate you.",
      "Arrivals more than 15 minutes late may require the service to be shortened or rescheduled so that other clients are not affected. Shortened services may still be charged at the full booked price.",
    ],
  },
  {
    title: "Health & Suitability",
    paragraphs: [
      "Our services are beauty, grooming and relaxation services, not medical treatments. Please tell us about any skin conditions, scalp sensitivities, allergies, pregnancy or recent procedures before your service.",
      "We may recommend a patch test for tinting, lifting or lamination services, and we reserve the right to adapt or decline a service where we believe it is not suitable on the day.",
    ],
  },
  {
    title: "Head Spa & Scalp Care Disclaimer",
    paragraphs: [
      "Our head spa and scalp care services are designed to support scalp health, refresh the hair and provide deep relaxation.",
      "They do not diagnose, treat or cure any medical or dermatological condition, including hair loss. If you have ongoing scalp or hair concerns, we recommend speaking with a qualified health professional. Individual experiences and results vary.",
    ],
  },
  {
    title: "Semi-Permanent Beauty Consultation Policy",
    paragraphs: [
      "Semi-permanent beauty services are available by consultation only and subject to suitability assessment.",
      "A personal consultation is required before any semi-permanent service can be booked. During the consultation we discuss your preferences, assess suitability and explain aftercare. There is no obligation to proceed, and we may decline a service where it is not suitable.",
      "Appearance outcomes vary between individuals and fade over time. We do not guarantee specific results.",
    ],
  },
  {
    title: "Gift Card Policy",
    paragraphs: [
      "Mend gift cards can be used across our service menu at Mend Beauty Studio — Balwyn, subject to availability and booking.",
      "Gift cards are valid for the period stated at the time of purchase (in accordance with Australian gift card regulations), are not redeemable for cash, and lost or stolen cards may not be replaceable. Please present your gift card at the time of your visit.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <Hero
        eyebrow="Studio Policies"
        title="Policies"
        body="Clear, fair guidelines that help us look after every client well. These policies are in draft form and may be updated before and after opening."
      />

      <section className="wrap py-16 sm:py-20">
        {/* In-page navigation */}
        <nav aria-label="Policy sections" className="mb-12 flex flex-wrap gap-2">
          {policies.map((policy) => (
            <a
              key={policy.title}
              href={`#${slugify(policy.title)}`}
              className="rounded-full border border-beige bg-white/60 px-4 py-2 text-xs font-medium tracking-wide text-cocoa transition-colors hover:border-gold hover:text-bronze"
            >
              {policy.title}
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          {policies.map((policy) => (
            <article
              key={policy.title}
              id={slugify(policy.title)}
              className="scroll-mt-28 rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10"
            >
              <h2 className="font-display text-2xl font-medium text-charcoal sm:text-3xl">
                {policy.title}
              </h2>
              {policy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-sm leading-relaxed text-cocoa">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>

        <p className="mt-12 text-xs leading-relaxed text-taupe">
          Last updated: draft for review. If you have any questions about these policies,
          please contact us before your visit.
        </p>
      </section>

      <CTABlock
        eyebrow="Questions?"
        heading="We’re happy to talk anything through"
        body="If anything here is unclear, call or message us — we’d rather you ask."
        actions={[
          { label: "Contact Us", href: "/contact", variant: "light" },
          { label: "Book Now", href: "#contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
