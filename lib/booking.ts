export const defaultMaseBookingUrl =
  "https://clients.mase.cloud/shopDetail?custId=MENDBEAUTY&compId=579514834843697153";

export const booking = {
  provider: "MaSe",
  url: process.env.NEXT_PUBLIC_MASE_BOOKING_URL ?? defaultMaseBookingUrl,
  cancellationNoticeHours: 24,
  openingHoursSummary:
    "Open 9:00 am – 5:00 pm Monday, Tuesday and Thursday through Sunday. Closed Wednesday.",
} as const;
