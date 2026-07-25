import Link from "next/link";
import ContactCard from "@/components/ContactCard";
import { booking } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book hair, head spa, scalp care, skin, body, brows and lashes services at Mend Beauty Studio in Deepdene.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <section className="border-b border-beige/70 bg-linen">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">Online booking</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-charcoal sm:text-6xl">
            Choose your service and preferred time
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cocoa sm:text-lg">
            Continue to our secure MaSe booking service to view live availability.
            Your appointment is managed by Mend Beauty Studio, and your booking
            details are not stored by this website.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-gold w-full text-center sm:w-auto"
              href={booking.url}
              target="_blank"
              rel="noreferrer"
            >
              View available appointments
            </a>
            <a className="btn-outline w-full text-center sm:w-auto" href={site.phoneHref}>
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
          <p className="eyebrow">Before you book</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
            Helpful booking information
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-cocoa">
            <li>{booking.openingHoursSummary}</li>
            <li>
              Please allow at least {booking.cancellationNoticeHours} hours to cancel
              or reschedule where possible.
            </li>
            <li>
              If you are unsure which service suits you, call or send an enquiry
              before booking.
            </li>
            <li>
              Online availability is supplied by {booking.provider}. If it is
              temporarily unavailable, please contact the studio directly.
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/services">
              Explore services
            </Link>
            <Link className="btn-outline" href="/policies">
              Read studio policies
            </Link>
          </div>
        </div>

        <div>
          <ContactCard showHours />
          <div className="mt-6 rounded-3xl border border-beige/70 bg-sand p-7">
            <p className="text-sm leading-relaxed text-cocoa">
              Prefer to write to us? Use the enquiry form for consultations, gift
              cards, memberships or questions that do not need an immediate booking.
            </p>
            <Link className="btn-outline mt-5" href="/contact#booking-enquiry">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
