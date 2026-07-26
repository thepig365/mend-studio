export type ExperienceEvent =
  | "journey_started"
  | "journey_completed"
  | "service_viewed"
  | "booking_clicked"
  | "consultation_clicked";

/**
 * Provider-neutral, privacy-safe event hook. It records only controlled event
 * names and catalogue identifiers; no free text or personal data is accepted.
 * A consent-gated analytics provider can subscribe to this event in future.
 */
export function trackExperienceEvent(
  name: ExperienceEvent,
  detail: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("mend:experience", {
      detail: { name, ...detail },
    }),
  );
}
