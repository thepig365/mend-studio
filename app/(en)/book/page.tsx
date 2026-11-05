import { redirect } from "next/navigation";
import { booking } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book",
  description:
    "Book hair, head spa, scalp care, skin, body, brows and lashes services at Mend Beauty Studio in Deepdene.",
  path: "/book",
});

export default function BookPage() {
  // Do not append utm_* here. The MaSe URL already depends on custId and
  // compId, and extra query parameters were not verified against the booking
  // flow. book_click records campaign parameters from the Mend page instead.
  redirect(booking.url);
}
