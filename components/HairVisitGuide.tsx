import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { hairPageCopy } from "@/lib/hair-page-copy";
import { localePath, type Locale } from "@/lib/i18n";
import { promotionServiceLinks } from "@/lib/promotion-service-links";
import { site } from "@/lib/site";

const textLink = "rounded-sm text-bronze underline underline-offset-4 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold";

export function HairMenuIntro({ locale }: { locale: Locale }) {
  const copy = hairPageCopy[locale];
  return <div className="mb-8 scroll-mt-36" id="hair-menu">
    <SectionHeading title={copy.menuHeading} body={copy.menuIntro} align="left"/>
    <nav className="mt-6 flex flex-wrap gap-3" aria-label={locale === "zh-Hans" ? "美发项目快捷导航" : "Hair service shortcuts"}>
      {promotionServiceLinks.map((service, index) => <a className="btn-outline min-h-11 px-5 py-2" key={service.anchor} href={`#${service.anchor}`}>{copy.serviceLabels[index]}</a>)}
    </nav>
  </div>;
}

export default function HairVisitGuide({ locale }: { locale: Locale }) {
  const zh = locale === "zh-Hans";
  const hairPath = localePath("/services/hair", locale);
  return <section className="bg-sand py-16 sm:py-20" aria-labelledby="hair-visit-heading">
    <div className="wrap grid gap-10 lg:grid-cols-2">
      <div>
        <p className="eyebrow">{zh ? "到店信息" : "PLAN YOUR VISIT"}</p>
        <h2 id="hair-visit-heading" className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">{zh ? "到访 Deepdene 美发沙龙" : "Visit our Deepdene hair salon"}</h2>
        <p className="mt-5 text-base leading-relaxed text-cocoa">{zh ? "从 Balwyn、Surrey Hills、Kew、Camberwell 或 Canterbury 附近来店？MEND 的门店位于 Deepdene，所有服务均在店内进行。" : "Planning a visit from nearby Balwyn, Surrey Hills, Kew, Camberwell or Canterbury? Find MEND on Whitehorse Road in Deepdene. All appointments take place at our studio."}</p>
        <address className="mt-5 text-base not-italic leading-relaxed text-cocoa">MEND Beauty Studio<br/>{site.address}</address>
        <div className="mt-6 flex flex-wrap gap-3"><a className="btn-outline" href={site.mapsHref} target="_blank" rel="noopener noreferrer">{zh ? "查看地图与路线" : "Map & directions"}</a><a className="btn-outline" href={site.phoneHref}>{zh ? "致电" : "Call"} {site.phone}</a></div>
        <p className="mt-5 text-sm leading-relaxed text-cocoa">{zh ? "建议提前预约。具体到店安排请查看" : "Booking ahead is recommended. For visit details, see our "}<Link className={textLink} href={localePath("/contact", locale)}>{zh ? "联系与到店信息" : "contact and visiting information"}</Link>{zh ? "。" : "."}</p>
      </div>
      <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
        <h3 className="font-display text-2xl font-medium text-charcoal">{zh ? "选择适合您的美发项目" : "Choosing your hair service"}</h3>
        <div className="mt-5 space-y-5 text-sm leading-relaxed text-cocoa">
          <p>{zh ? "剪发菜单包含女士、男士及儿童项目；吹整与卷发造型列于" : "The cut menu includes options for women, men and children. Blow-dry and curl styling are listed under "}<Link className={textLink} href={`${hairPath}#menu-wash-blow-dry`}>{zh ? "造型服务" : "Styling"}</Link>{zh ? "。" : "."}</p>
          <p>{zh ? "想了解渐变染或韩式柔感烫？可查看 " : "Considering balayage or a Korean-style perm? See "}<Link className={textLink} href={`${hairPath}#service-signature-balayage`}>Signature Balayage{zh ? " 渐变染" : ""}</Link>{zh ? "与 " : " and "}<Link className={textLink} href={`${hairPath}#service-korean-soft-wave`}>Korean Soft Wave{zh ? " 韩式柔感烫" : ""}</Link>{zh ? "的项目说明与价格。" : " in the menu for the listed options and prices."}</p>
          <p>{zh ? "菜单中标注起价的项目，最终费用可能因发长、服务复杂度及咨询结果而调整。不确定选哪个项目时，欢迎先致电我们。" : "Where a starting price is shown, the final price may vary after consultation with hair length and service complexity. Call us if you are unsure which service to choose."}</p>
          <p>{zh ? "如需了解以头皮护理为主的项目，可浏览" : "For scalp-focused options, explore "}<Link className={textLink} href={localePath("/services/hair-scalp-recovery", locale)}>{zh ? "头皮健康管理" : "Hair & Scalp Recovery"}</Link>{zh ? "。" : "."}</p>
          <p>{zh ? "第一次来 MEND？查看" : "New to MEND? See the "}<Link className={textLink} href={localePath("/promotions/first-hair-visit", locale)}>{zh ? "新客首次到店美发五折优惠" : "50% off first hair visit offer"}</Link>{zh ? "，了解适用范围与预约方式。" : " for the scope and booking details."}</p>
        </div>
      </div>
    </div>
  </section>;
}
