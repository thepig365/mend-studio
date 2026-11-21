"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { feedbackCopy, type FeedbackLocale } from "@/lib/feedback/shared";

export default function FeedbackForm({ locale }: { locale: FeedbackLocale }) {
  const copy = feedbackCopy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [retryLocked, setRetryLocked] = useState(false);
  const [ready, setReady] = useState(false);
  const inFlight = useRef(false);
  const submissionId = useRef<string | null>(null);
  const submittedBody = useRef<string | null>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || status === "success") return;
    inFlight.current = true;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (!submittedBody.current && (!String(values.get("providerName") || "").trim() || !String(values.get("initials") || "").trim())) {
      inFlight.current = false;
      setStatus("error");
      setMessage(copy.required);
      requestAnimationFrame(() => result.current?.focus());
      return;
    }
    // Freeze a possibly received submission for retries. Keep only in memory;
    // never put response content in browser storage, URLs, logs or analytics.
    if (!submittedBody.current) {
      submissionId.current ||= crypto.randomUUID();
      submittedBody.current = JSON.stringify({
        submissionId: submissionId.current,
        rating: Number(values.get("rating")),
        providerName: String(values.get("providerName") || ""),
        locale,
        initials: String(values.get("initials") || ""),
        comment: String(values.get("comment") || ""),
        website: String(values.get("website") || ""),
      });
    }
    setStatus("sending");
    setRetryLocked(true);
    setMessage("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: submittedBody.current, cache: "no-store", signal: AbortSignal.timeout(15000),
      });
      const body = await response.json();
      if (response.ok && body.code === "received") {
        form.reset();
        submittedBody.current = null;
        setStatus("success");
      } else {
        // Invalid requests cannot have been stored; allow correction. All other
        // failures retain the exact request so a lost acknowledgement is safe.
        if ([400, 413, 415].includes(response.status)) {
          submittedBody.current = null;
          setRetryLocked(false);
        }
        setStatus("error");
        setMessage(response.status === 429 ? copy.rate : body.code === "invalid" ? copy.invalid : copy.error);
      }
    } catch {
      setStatus("error");
      setMessage(copy.error);
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => result.current?.focus());
    }
  }

  if (status === "success") return (
    <div ref={result} tabIndex={-1} role="status" className="rounded-3xl border border-beige bg-sand p-7 outline-none">
      <h2 className="font-display text-3xl">{copy.success}</h2>
      <p className="mt-4 leading-relaxed text-cocoa">{copy.successDetail}</p>
    </div>
  );

  const locked = status === "sending" || retryLocked;
  const inputClass = "mt-2 block w-full rounded-xl border border-taupe bg-white px-4 py-3 text-base text-charcoal focus:outline-2 focus:outline-offset-2 focus:outline-bronze disabled:bg-sand";
  return (
    <form method="post" action="/api/feedback" onSubmit={submit} className="space-y-6" aria-busy={status === "sending"}>
      <fieldset disabled={locked} className="space-y-6 disabled:opacity-75">
        <fieldset>
          <legend className="font-medium text-charcoal">{copy.rating}</legend>
          <div className="mt-3 grid gap-2">
            {copy.ratings.map((label, index) => (
              <label key={label} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-beige bg-white px-4 py-3 text-charcoal has-checked:border-bronze has-checked:bg-sand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-bronze">
                <input type="radio" name="rating" value={index + 1} required className="h-5 w-5 accent-[#74614b]" />
                <span className="w-4 text-cocoa" aria-hidden="true">{index + 1}</span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block font-medium">{copy.provider}
          <input name="providerName" type="text" required onInvalid={(event) => event.currentTarget.setCustomValidity(copy.providerRequired)} onInput={(event) => event.currentTarget.setCustomValidity("")} maxLength={80} autoComplete="off" aria-describedby="feedback-provider-hint" className={inputClass} />
        </label>
        <p id="feedback-provider-hint" className="-mt-4 text-sm text-cocoa">{copy.providerHint}</p>
        <label className="block font-medium">{copy.initials}
          <input name="initials" type="text" required onInvalid={(event) => event.currentTarget.setCustomValidity(copy.initialsRequired)} onInput={(event) => event.currentTarget.setCustomValidity("")} maxLength={20} autoComplete="off" className={inputClass} />
        </label>
        <label className="block font-medium">{copy.comment}
          <textarea name="comment" rows={3} maxLength={500} aria-describedby="feedback-privacy feedback-limit" className={inputClass} />
        </label>
        <p id="feedback-limit" className="-mt-4 text-sm text-cocoa">{copy.limit}</p>
        <div className="hidden" aria-hidden="true">
          <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
        </div>
      </fieldset>
      <p id="feedback-privacy" className="text-sm leading-relaxed text-cocoa">{copy.note}</p>
      <div ref={result} tabIndex={-1} role={status === "error" ? "alert" : "status"} className="outline-none">
        {message && <p className="rounded-xl border border-bronze bg-sand p-4 text-charcoal">{message}</p>}
      </div>
      <button type="submit" disabled={!ready || status === "sending"} className="btn-primary min-h-12 w-full disabled:cursor-wait disabled:opacity-60">
        {status === "sending" ? copy.sending : copy.submit}
      </button>
      <noscript><p className="text-cocoa">{copy.nojs}</p></noscript>
    </form>
  );
}
