import Link from "next/link";
import { signOutOfMarketingPortal } from "@/app/(en)/marketing/actions";

type MarketingPortalFrameProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
};

export default function MarketingPortalFrame({
  eyebrow,
  title,
  lede,
  children,
}: MarketingPortalFrameProps) {
  return (
    <section className="bg-sand/45 py-12 sm:py-16">
      <div className="wrap">
        <div className="flex flex-col gap-5 border-b border-beige pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-charcoal sm:text-5xl">
              {title}
            </h1>
            {lede ? (
              <p className="mt-3 max-w-3xl leading-relaxed text-cocoa">{lede}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/marketing" className="btn-outline">
              Portal home
            </Link>
            <form action={signOutOfMarketingPortal}>
              <button type="submit" className="btn-outline">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </section>
  );
}
