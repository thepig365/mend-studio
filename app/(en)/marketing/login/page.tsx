import { MarketingText } from "@/components/MarketingLocale";
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

const marketingLoginErrorsZh: Record<string, string> = {
  AccessDenied: "未获得访问权限。请选择 hello@mendbeauty.com.au 并重试。",
  OAuthAccountNotLinked: "此 Google 账户未关联到获授权的营销工作台身份。",
  OAuthCallback: "Google 返回的登录响应不完整。请重试。",
  OAuthSignin: "无法启动 Google 登录。请重试。",
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
          <MarketingText en="Marketing Portal" zh="营销工作台" />
        </h1>
        <p className="mt-5 leading-relaxed text-cocoa">
          <MarketingText en="Private workspace for authorised SEO, content, local-search and campaign planning." zh="供授权人员进行 SEO、内容、本地搜索和营销活动规划的私密工作空间。" />
        </p>

        <div className="mt-8 rounded-2xl border border-beige/80 bg-sand/70 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze">
            <MarketingText en="Authorised identity" zh="授权账户" />
          </p>
          <p className="mt-2 font-medium text-charcoal">
            {marketingPortalEmail}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cocoa">
            <MarketingText en="Google verifies the account. Mend does not receive or store the Google password." zh="Google 负责验证账户。Mend 不会接收或存储 Google 密码。" />
          </p>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-gold/50 bg-gold/10 p-5 text-sm leading-relaxed text-charcoal"
          >
            {<MarketingText en={marketingLoginErrors[error] || "Google sign-in could not be completed. Please try again with the authorised account."} zh={marketingLoginErrorsZh[error] || "未能完成 Google 登录。请使用授权账户重试。"} />}
          </div>
        ) : null}

        {configured ? (
          <form action={signInToMarketingPortal} className="mt-8">
            <button type="submit" className="btn-primary w-full">
              <MarketingText en="Continue with Google" zh="使用 Google 继续" />
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-cocoa"
          >
            <MarketingText en="Secure login is awaiting its server-side Google OAuth configuration. No credentials have been placed in the website." zh="安全登录正在等待服务器端的 Google OAuth 配置。网站中未放置任何登录凭据。" />
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed text-taupe">
          <MarketingText en="Access attempts from any other Google account are rejected. This portal is excluded from search indexing." zh="其他 Google 账户的访问尝试将被拒绝。此工作台不参与搜索引擎索引。" />
        </p>
      </div>
    </section>
  );
}
