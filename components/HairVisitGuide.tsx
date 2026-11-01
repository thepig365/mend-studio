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
    <p className="mt-5 text-sm leading-relaxed text-cocoa">
      {locale === "zh-Hans" ? "想先了解发型师？" : "Get to know your hairdresser. "}
      <a className={textLink} href="#meet-mejin">{locale === "zh-Hans" ? "认识 Mejin Shick" : "Meet Mejin Shick"}</a>
    </p>
    <nav className="mt-6 flex flex-wrap gap-3" aria-label={locale === "zh-Hans" ? "美发项目快捷导航" : "Hair service shortcuts"}>
      {promotionServiceLinks.map((service, index) => <a className="btn-outline min-h-11 px-5 py-2" key={service.anchor} href={`#${service.anchor}`}>{copy.serviceLabels[index]}</a>)}
    </nav>
    <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label={locale === "zh-Hans" ? "到店与护理指南" : "Visit and care guide"}>
      <a className={`inline-flex min-h-11 items-center ${textLink}`} href="#hair-visit">{locale === "zh-Hans" ? "规划 Deepdene 到店行程" : "Plan your visit to Deepdene"}</a>
      <a className={`inline-flex min-h-11 items-center ${textLink}`} href="#hair-care-options">{locale === "zh-Hans" ? "了解 Head Spa 与头皮护理" : "Head Spa & scalp care options"}</a>
    </nav>
  </div>;
}

export default function HairVisitGuide({ locale }: { locale: Locale }) {
  const zh = locale === "zh-Hans";
  return <section id="hair-visit" className="scroll-mt-36 bg-sand py-16 sm:py-20" aria-labelledby="hair-visit-heading">
    <div className="wrap grid gap-10 lg:grid-cols-2">
      <div>
        <p className="eyebrow">{zh ? "到店信息" : "PLAN YOUR VISIT"}</p>
        <h2 id="hair-visit-heading" className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">{zh ? "到访 Deepdene 美发沙龙" : "Visit our Deepdene hair salon"}</h2>
        <p className="mt-5 text-base leading-relaxed text-cocoa">{zh ? "正在 Canterbury、Surrey Hills、Balwyn、Kew、Camberwell 或 Mont Albert 附近寻找美发沙龙？欢迎来到 MEND 位于 Deepdene 的 Hair Atelier，了解剪发、染发、造型与烫发项目。所有预约服务均在 Deepdene 门店进行。" : "Looking for a hair salon near Canterbury, Surrey Hills, Balwyn, Kew, Camberwell or Mont Albert? MEND welcomes you to Hair Atelier in Deepdene for cuts, colour, styling and perms. All appointments take place at our Deepdene studio."}</p>
        <address className="mt-5 text-base not-italic leading-relaxed text-cocoa">MEND Beauty Studio<br/>{site.address}</address>
        <div className="mt-6 flex flex-wrap gap-3"><a className="btn-outline" href={site.mapsHref} target="_blank" rel="noopener noreferrer">{zh ? "查看地图与路线" : "Map & directions"}</a><a className="btn-outline" href={site.phoneHref}>{zh ? "致电" : "Call"} {site.phone}</a></div>
        <p className="mt-5 text-sm leading-relaxed text-cocoa">{zh ? "请使用地图规划前往上述地址的路线，出发前可查看" : "Use the map to plan your route to the address above, and check our "}<Link className={textLink} href={localePath("/contact", locale)}>{zh ? "营业时间与联系信息" : "opening hours and contact details"}</Link>{zh ? "。建议提前预约；不确定如何安排项目时，欢迎先致电咨询。" : " before travelling. Booking ahead is recommended; call us if you need help planning your appointment."}</p>
      </div>
      <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
        <h3 className="font-display text-2xl font-medium text-charcoal">{zh ? "选择适合您的美发项目" : "Choosing your hair service"}</h3>
        <div className="mt-5 space-y-5 text-sm leading-relaxed text-cocoa">
          <p>{zh ? "剪发菜单包含女士、男士及儿童项目；吹整与卷发造型列于" : "The cut menu includes options for women, men and children. Blow-dry and curl styling are listed under "}<a className={textLink} href="#menu-wash-blow-dry">{zh ? "造型服务" : "Styling"}</a>{zh ? "。" : "."}</p>
          <p>{zh ? "想调整发色或补染发根？查看" : "For a colour change or root refresh, browse "}<a className={textLink} href="#menu-signature-colour">{zh ? "染发与挑染项目" : "hair colour and foil highlights"}</a>{zh ? "；想改变头发的卷直形态，也可了解" : "; for a change in texture, explore "}<a className={textLink} href="#menu-classic-texture-perm">{zh ? "烫发与拉直项目" : "perms and straightening"}</a>{zh ? "。" : "."}</p>
          <p>{zh ? "想了解渐变染或韩式柔感烫？可查看 " : "Considering balayage or a Korean-style perm? See "}<a className={textLink} href="#service-signature-balayage">Signature Balayage{zh ? " 渐变染" : ""}</a>{zh ? "与 " : " and "}<a className={textLink} href="#service-korean-soft-wave">Korean Soft Wave{zh ? " 韩式柔感烫" : ""}</a>{zh ? "的项目说明与价格。" : " in the menu for the listed options and prices."}</p>
          <p>{zh ? "菜单中标注起价的项目，最终费用可能因发长、服务复杂度及咨询结果而调整。不确定选哪个项目时，欢迎先致电我们。" : "Where a starting price is shown, the final price may vary after consultation with hair length and service complexity. Call us if you are unsure which service to choose."}</p>
          <p>{zh ? "第一次来 MEND？查看" : "New to MEND? See the "}<Link className={textLink} href={localePath("/promotions/first-hair-visit", locale)}>{zh ? "新客首次到店美发五折优惠" : "50% off first hair visit offer"}</Link>{zh ? "，了解适用范围与预约方式。" : " for the scope and booking details."}</p>
        </div>
      </div>
      <div id="hair-care-options" className="scroll-mt-36 border-t border-beige pt-10 lg:col-span-2">
        <h3 className="font-display text-2xl font-medium text-charcoal">{zh ? "Head Spa 与头皮护理，如何选择？" : "Head Spa or scalp care?"}</h3>
        <div className="mt-5 grid gap-8 text-sm leading-relaxed text-cocoa sm:grid-cols-2">
          <div>
            <p>{zh ? "想安排一段清洁头皮、按摩与放松的时间？Head Spa 提供独立的头疗菜单，包括 Korean Signature Head Spa 韩式经典头疗。各项目的包含内容与时长请以该菜单为准。" : "For scalp cleansing, massage and time to unwind, explore the separate Head Spa menu, including Korean Signature Head Spa. Each ritual lists its own inclusions and duration."}</p>
            <Link className={`mt-3 inline-flex min-h-11 items-center ${textLink}`} href={localePath("/services/head-spa", locale)}>{zh ? "查看 Head Spa 头疗项目" : "Explore head spa treatments"}</Link>
          </div>
          <div>
            <p>{zh ? "如果更关注发质养护或日常头皮护理，可查看 Hair & Scalp Recovery 头皮健康管理菜单中的护理选项。不确定如何选择时，可先咨询店内团队。" : "For hair conditioning or cosmetic scalp-care options, browse the Hair & Scalp Recovery menu. Ask our team if you are unsure which care service to choose."}</p>
            <Link className={`mt-3 inline-flex min-h-11 items-center ${textLink}`} href={localePath("/services/hair-scalp-recovery", locale)}>{zh ? "查看头皮与发质护理项目" : "Explore scalp care"}</Link>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-cocoa">{zh ? "头疗与头皮护理属于美容护理和放松服务，并非医疗诊断或治疗。请分别查看各项目的价格与预约说明。" : "Head Spa and scalp care are cosmetic care and relaxation services, not medical diagnosis or treatment. Check each menu for its prices and booking details."}</p>
      </div>
    </div>
  </section>;
}
