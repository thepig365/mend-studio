"use client";

import { usePathname } from "next/navigation";
import { chineseLocale, isChinesePath, localePath, ui } from "@/lib/i18n";
import { site } from "@/lib/site";

// Persistent mobile booking bar — visible on small screens only.
export default function MobileStickyBar() {
  const pathname = usePathname();
  const locale = isChinesePath(pathname) ? chineseLocale : "en-AU";
  const copy = ui[locale];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-beige/80 bg-cream/95 px-4 py-3 backdrop-blur-md safe-bottom lg:hidden"
      role="region"
      aria-label={locale === chineseLocale ? "快捷操作" : "Quick actions"}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a href={site.phoneHref} className="btn-outline flex-1 py-3 text-sm">
          {copy.call}
        </a>
        <a href={localePath("/book", locale)} className="btn-gold flex-1 py-3 text-sm">
          {copy.bookNow}
        </a>
      </div>
    </div>
  );
}
