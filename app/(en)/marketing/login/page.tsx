import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  auth,
  isMarketingAuthConfigured,
  marketingPortalEmail,
} from "@/auth";
import { signInToMarketingPortal } from "../actions";

type MarketingLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const marketingLoginErrors: Record<string, string> = {
  AccessDenied:
    "Access was not granted. Choose hello@mendbeauty.com.au and try again.",
  OAuthAccountNotLinked:
    "This Google account is not linked to the authorised Marketing Portal identity.",
  OAuthCallback:
    "Google returned an incomplete sign-in response. Please try again.",
  OAuthSignin: "Google sign-in could not be started. Please try again.",
};

export const metadata: Metadata = {
  title: "Marketing Portal Sign In",
  description: "Private marketing workspace for Mend Beauty Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function MarketingLoginPage({
  searchParams,
}: MarketingLoginPageProps) {
  const { error } = await searchParams;
  const configured = isMarketingAuthConfigured();
  const session = configured ? await auth() : null;

  if (session?.user?.email?.toLowerCase() === marketingPortalEmail) {
    redirect("/marketing");
  }

  return (
    <section className="wrap py-16 sm:py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-beige bg-white/70 p-7 shadow-sm sm:p-10">
        <p className="eyebrow">Mend Beauty Studio</p>
        <h1 className="mt-4 font-display text-4xl font-medium text-charcoal sm:text-5xl">
          Marketing Portal
        </h1>
        <p className="mt-5 leading-relaxed text-cocoa">
          Private workspace for authorised SEO, content, local-search and
          campaign planning.
        </p>

        <div className="mt-8 rounded-2xl border border-beige/80 bg-sand/70 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze">
            Authorised identity
          </p>
          <p className="mt-2 font-medium text-charcoal">
            {marketingPortalEmail}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cocoa">
            Google verifies the account. Mend does not receive or store the
            Google password.
          </p>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-gold/50 bg-gold/10 p-5 text-sm leading-relaxed text-charcoal"
          >
            {marketingLoginErrors[error] ||
              "Google sign-in could not be completed. Please try again with the authorised account."}
          </div>
        ) : null}

        {configured ? (
          <form action={signInToMarketingPortal} className="mt-8">
            <button type="submit" className="btn-primary w-full">
              Continue with Google
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-cocoa"
          >
            Secure login is awaiting its server-side Google OAuth
            configuration. No credentials have been placed in the website.
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed text-taupe">
          Access attempts from any other Google account are rejected. This
          portal is excluded from search indexing.
        </p>
      </div>
    </section>
  );
}
