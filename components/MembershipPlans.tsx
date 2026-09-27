import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { chineseLocale } from "@/lib/i18n";
import { membershipTiers } from "@/lib/memberships";

const money = (value: number) => `$${value.toLocaleString("en-AU")}`;

export default function MembershipPlans({ locale = "en-AU" }: { locale?: Locale }) {
  const isZh = locale === chineseLocale;

  return (
    <section className="wrap py-16 sm:py-24">
      <div className="text-center">
        <p className="eyebrow">{isZh ? "尊享会员充值计划" : "Membership Recharge Plan"}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-5xl">
          {isZh ? "充值越多 · 尊享越多 · 美丽加倍" : "More Rewards · More Beauty · A Brighter You"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cocoa sm:text-base">
          {isZh
            ? "专属尊享优惠 · 升级美丽体验 · 生日专属礼遇 · 更贴心的服务"
            : "Exclusive Discounts · Premium Treatments · Birthday Gifts · Personalised Care"}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {membershipTiers.map((tier) => (
          <article key={tier.id} className="rounded-3xl border border-beige/70 bg-white/70 p-7 shadow-[0_18px_50px_-35px_rgba(70,60,48,0.35)] sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">{isZh ? tier.nameZh : `${tier.name} Member`}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-taupe">{isZh ? "充值金额" : "Top Up Amount"}</p>
            <h3 className="mt-3 font-display text-4xl font-medium text-charcoal">{money(tier.topUp)}</h3>
            <dl className="mt-7 border-t border-beige/70 pt-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{isZh ? "尊享优惠" : "Extra Value"}</dt>
                <dd className="mt-1 text-xl font-medium text-bronze">
                  {isZh ? `送 ${money(tier.bonus)}` : `${money(tier.bonus)} Bonus`} <span className="text-sm">({tier.bonusPercent}% Bonus)</span>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{isZh ? "会员赠送福利" : "Member Benefits (Gifted Items)"}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-cocoa">
                  <ul className="space-y-1.5">
                    {tier.gifts.map((gift) => <li key={gift.zh}>• {isZh ? gift.zh : gift.en}</li>)}
                  </ul>
                  <p className="mt-3 font-medium text-bronze">{isZh ? `（总价值${money(tier.giftedValue)}）` : `(Total value ${money(tier.giftedValue)})`}</p>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-espresso p-7 text-cream sm:p-10">
        <h3 className="font-display text-2xl font-medium">{isZh ? "生日月礼遇" : "Birthday-month benefit"}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/80">
          {isZh
            ? "所有会员生日当月可到店领取生日伴手礼一份（当月消费可享受1次7折优惠）。"
            : "All members receive a complimentary birthday gift during their birthday month and enjoy 30% off one service during that month."}
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link href={isZh ? "/zh/contact#booking-enquiry" : "/contact#booking-enquiry"} className="btn-gold">
          {isZh ? "咨询会员计划" : "Enquire about membership"}
        </Link>
      </div>

    </section>
  );
}
