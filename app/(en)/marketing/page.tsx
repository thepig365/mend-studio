import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  auth,
  isMarketingAuthConfigured,
  marketingPortalEmail,
} from "@/auth";
import MarketingPortalWorkspace from "@/components/MarketingPortalWorkspace";
import { signOutOfMarketingPortal } from "./actions";

export const metadata: Metadata = {
  title: "Marketing Portal",
  description: "Private SEO and marketing workspace for Mend Beauty Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function MarketingPortalPage() {
  if (!isMarketingAuthConfigured()) {
    redirect("/marketing/login");
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (email !== marketingPortalEmail) {
    redirect("/marketing/login");
  }

  return (
    <section className="bg-sand/45 py-12 sm:py-16">
      <div className="wrap">
        <div className="flex flex-col gap-5 border-b border-beige pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Private workspace</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-charcoal sm:text-5xl">
              Marketing Portal
            </h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-cocoa">
              Plan and review Mend SEO, content, campaigns and reporting from
              one controlled workspace.
            </p>
          </div>
          <form action={signOutOfMarketingPortal}>
            <button type="submit" className="btn-outline">
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-2xl border border-gold/40 bg-white/70 p-5 text-sm leading-relaxed text-cocoa">
          <strong className="text-charcoal">Draft-only control:</strong> AI can
          prepare recommendations and copy, but cannot approve, publish, run
          advertising, change production settings or spend money.
        </div>

        <MarketingPortalWorkspace />
      </div>
    </section>
  );
}
