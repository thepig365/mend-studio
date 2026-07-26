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
  redirect(booking.url);
}
