import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { chineseLocale } from "@/lib/i18n";
import { membershipReviewItems, membershipTiers } from "@/lib/memberships";

const money = (value: number) => `A$${value.toLocaleString("en-AU")}`;

export default function MembershipPlans({ locale = "en-AU" }: { locale?: Locale }) {
  const isZh = locale === chineseLocale;
  const reviewItems = isZh ? membershipReviewItems.zh : membershipReviewItems.en;

  return (
    <section className="wrap py-16 sm:py-24">
      <div className="text-center">
        <p className="eyebrow">{isZh ? "会员充值计划" : "Membership recharge plan"}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-5xl">
          {isZh ? "充值、赠送金额与服务赠礼分开说明" : "Top-up, bonus credit and gifted value—clearly separated"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cocoa sm:text-base">
          {isZh
            ? "以下金额按原始海报展示。服务赠礼价值不等同于现金余额；完整商业条款确认前，请先向门店咨询。"
            : "Amounts below follow the supplied poster. Gifted-service value is not cash credit. Please enquire while the full commercial terms are being confirmed."}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {membershipTiers.map((tier) => (
          <article key={tier.id} className="rounded-3xl border border-beige/70 bg-white/70 p-7 shadow-[0_18px_50px_-35px_rgba(70,60,48,0.35)] sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">{isZh ? tier.nameZh : `${tier.name} Member`}</p>
            <h3 className="mt-3 font-display text-4xl font-medium text-charcoal">{money(tier.topUp)}</h3>
            <dl className="mt-7 grid gap-4 border-t border-beige/70 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{isZh ? "广告赠送金额" : "Advertised bonus credit"}</dt>
                <dd className="mt-1 text-xl font-medium text-bronze">{money(tier.bonus)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{isZh ? "广告服务赠礼价值" : "Advertised gifted-service value"}</dt>
                <dd className="mt-1 text-xl font-medium text-bronze">{money(tier.giftedValue)}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-cocoa">
              {isZh ? "赠送金额、充值余额与服务赠礼价值为三项不同权益。" : "Top-up balance, bonus credit and gifted-service value are three separate benefits."}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-espresso p-7 text-cream sm:p-10">
        <h3 className="font-display text-2xl font-medium">{isZh ? "生日月礼遇" : "Birthday-month benefit"}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/80">
          {isZh
            ? "海报注明所有会员生日月可领取一份生日伴手礼，并可享一次单项服务七折。具体适用项目及条款待确认。"
            : "The poster advertises a complimentary birthday gift and 30% off one service during the birthday month for all members. Eligible services and full terms remain to be confirmed."}
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-gold/35 bg-sand p-7 sm:p-9">
        <p className="eyebrow">{isZh ? "待店主确认" : "Owner confirmation required"}</p>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cocoa">
          {reviewItems.map((reviewItem) => <li key={reviewItem}>• {reviewItem}</li>)}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-taupe">
          {isZh ? "在确认前，网页不把以上冲突项目或缺失条款表述为已生效承诺。" : "Until confirmed, the disputed inclusions and missing terms are not presented as settled promises."}
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
