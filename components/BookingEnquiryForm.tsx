"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const topics = [
  "Booking — Hair",
  "Booking — Head Spa & Scalp Care",
  "Booking — Skin & Facial",
  "Booking — Body Care",
  "Booking — Brows & Lashes",
  "Semi-Permanent Beauty Consultation",
  "Gift Cards",
  "Memberships",
  "Careers / Rent a Space",
  "Other",
] as const;

const fieldClass =
  "rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30";

function enquiryText(formData: FormData) {
  return [
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Email: ${formData.get("email")}`,
    `Enquiry: ${formData.get("topic")}`,
    "",
    "Message:",
    String(formData.get("message") ?? ""),
  ].join("\n");
}

export default function BookingEnquiryForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const topic = String(formData.get("topic") ?? "Website enquiry");
    const subject = `Mend Beauty Studio enquiry — ${topic}`;
    const body = enquiryText(formData);

    setStatus(
      "Your email app should now open. Please review the enquiry and press Send in your email app.",
    );
    window.location.assign(
      `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  async function copyEnquiry(form: HTMLFormElement | null) {
    if (!form) {
      return;
    }
    if (!form.reportValidity()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(enquiryText(new FormData(form)));
      setStatus(
        `Enquiry details copied. Email them to ${site.email}, or call ${site.phone}.`,
      );
    } catch {
      setStatus(
        `Copying was unavailable. Please email ${site.email}, or call ${site.phone}.`,
      );
    }
  }

  return (
    <div
      id="booking-enquiry"
      className="scroll-mt-36 rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10"
    >
      <p className="eyebrow">Book or enquire</p>
      <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
        Send an enquiry
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cocoa">
        Complete the details below and continue in your email app. This is an enquiry
        only; our team will contact you to confirm availability.
      </p>

      <form
        className="mt-8 grid gap-5"
        aria-label="Booking enquiry form"
        onSubmit={handleSubmit}
        onReset={() => setStatus("")}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your name"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            Phone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              maxLength={40}
              placeholder="Your phone number"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          What are you interested in?
          <select name="topic" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a topic
            </option>
            {topics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          Message
          <textarea
            name="message"
            rows={5}
            required
            maxLength={1000}
            placeholder="Tell us which service, date or information you are looking for…"
            className={`resize-none ${fieldClass}`}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Continue in email
          </button>
          <button
            type="button"
            className="btn-outline w-full sm:w-auto"
            onClick={(event) => {
              void copyEnquiry(event.currentTarget.form);
            }}
          >
            Copy enquiry details
          </button>
        </div>

        <p className="text-xs leading-relaxed text-taupe">
          No information is stored by this website. Your email app will open so you can
          review the message before sending it to{" "}
          <a className="font-medium text-bronze hover:text-gold" href={site.emailHref}>
            {site.email}
          </a>
          .
        </p>
        <p className="text-sm leading-relaxed text-cocoa" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </div>
  );
}
