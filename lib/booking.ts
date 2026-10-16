export const defaultMaseBookingUrl =
  "https://clients.mase.cloud/shopDetail?custId=MENDBEAUTY&compId=579514834843697153";

export const booking = {
  provider: "MaSe",
  url: process.env.MASE_BOOKING_URL ?? defaultMaseBookingUrl,
  cancellationNoticeHours: 24,
  openingHoursSummary:
    "Open 10:00 am – 6:00 pm Monday through Saturday. Closed Sunday.",
} as const;
