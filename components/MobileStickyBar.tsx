import { site } from "@/lib/site";

// Persistent mobile booking bar — visible on small screens only.
export default function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-beige/80 bg-cream/95 px-4 py-3 backdrop-blur-md safe-bottom lg:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a href={site.phoneHref} className="btn-outline flex-1 py-3 text-sm">
          Call
        </a>
        <a href="/contact#booking-enquiry" className="btn-gold flex-1 py-3 text-sm">
          Book Now
        </a>
      </div>
    </div>
  );
}
