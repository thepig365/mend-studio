import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import BookingEnquiryForm from "@/components/BookingEnquiryForm";
import BrandManifestoPage from "@/components/BrandManifestoPage";
import ContactCard from "@/components/ContactCard";
import CTABlock from "@/components/CTABlock";
import GalleryPreview from "@/components/GalleryPreview";
import Hero from "@/components/Hero";
import HomeHero from "@/components/HomeHero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ServiceMenuSection from "@/src/components/ServiceMenuSection";
import { booking } from "@/lib/booking";
import { chinesePageMetadata } from "@/lib/seo";
import { galleryImages } from "@/lib/services";
import { site } from "@/lib/site";
import {
  getZhCategory,
  getZhMenuItemsForCategory,
  zhServiceCategories,
} from "@/lib/zh-services";
import { siteImages } from "@/src/data/images";

type ChinesePageProps = {
  params: Promise<{ slug?: string[] }>;
};

const serviceSlugs = new Set(zhServiceCategories.map((category) => category.slug));

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Mend Beauty Studio 中文网站｜美发、头疗、皮肤管理与美容护理",
    description:
      "Mend Beauty Studio 位于墨尔本 Deepdene，提供美发、头疗、头皮护理、韩式皮肤管理、身体护理及眉睫美容服务。",
  },
  "/services": {
    title: "服务项目",
    description: "查看 Mend Beauty Studio 的美发、头疗、皮肤管理、身体护理、眉睫、男士理容、美甲及半永久美容服务。",
  },
  "/book": {
    title: "预约",
    description: "通过 MaSe 查看 Mend Beauty Studio 的可预约服务与时间。",
  },
  "/gift-cards": {
    title: "礼品卡",
    description: "选购 Mend Beauty Studio 礼品卡，为亲友送上美发、美容与放松护理体验。",
  },
  "/memberships": {
    title: "会员计划｜即将推出",
    description: "登记 Mend Beauty Studio 头疗、皮肤管理及日常美容维护会员计划的意向。",
  },
  "/careers": {
    title: "招聘与场地合作",
    description: "了解 Mend Beauty Studio 的沙龙经理、美发师、租椅及美容护理房合作机会。",
  },
  "/contact": {
    title: "联系我们",
    description: `联系 Mend Beauty Studio。电话 ${site.phone}，地址 ${site.address}。`,
  },
  "/our-story": {
    title: "品牌宣言",
    description:
      "了解 MEND 品牌宣言：以专业美容护理为基础，连接自信、平静、艺术、自然与社区的 Beauty & Mind 理念。",
  },
  "/policies": {
    title: "服务政策",
    description: "查看 Mend Beauty Studio 的预约、取消、迟到、健康适用性、头疗、半永久美容及礼品卡政策。",
  },
};

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["services"] },
    ...zhServiceCategories.map((category) => ({
      slug: ["services", category.slug],
    })),
    { slug: ["book"] },
    { slug: ["gift-cards"] },
    { slug: ["memberships"] },
    { slug: ["careers"] },
    { slug: ["contact"] },
    { slug: ["our-story"] },
    { slug: ["policies"] },
  ];
}

export async function generateMetadata({
  params,
}: ChinesePageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`.replace(/\/$/, "") || "/";

  if (slug[0] === "services" && slug[1] && serviceSlugs.has(slug[1])) {
    const category = getZhCategory(slug[1]);
    return chinesePageMetadata({
      title: category.title,
      description: category.excerpt,
      path,
    });
  }

  const entry = routeMetadata[path];
  if (!entry) return {};
  return chinesePageMetadata({
    ...entry,
    path,
    absoluteTitle: path === "/",
  });
}

export default async function ChinesePage({ params }: ChinesePageProps) {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`.replace(/\/$/, "") || "/";

  if (path === "/") return <ChineseHome />;
  if (path === "/services") return <ChineseServices />;
  if (slug[0] === "services" && slug[1] && serviceSlugs.has(slug[1])) {
    return <ChineseServiceDetail slug={slug[1]} />;
  }
  if (path === "/book") redirect(booking.url);
  if (path === "/gift-cards") return <ChineseGiftCards />;
  if (path === "/memberships") return <ChineseMemberships />;
  if (path === "/careers") return <ChineseCareers />;
  if (path === "/contact") return <ChineseContact />;
  if (path === "/our-story") return <BrandManifestoPage locale="zh-Hans" />;
  if (path === "/policies") return <ChinesePolicies />;

  notFound();
}

function ChineseHome() {
  return (
    <>
      <HomeHero locale="zh-Hans" />

      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="欢迎来到 Mend"
          title="墨尔本东区一站式美容护理空间"
          body="从美发染护、头疗和头皮护理，到韩式皮肤管理、身体护理与眉睫美容，Mend Beauty Studio 在舒适雅致的环境中，为您安排完整的日常美容护理。"
        />
      </section>

      <section className="bg-linen py-16 sm:py-24">
        <div className="wrap text-center">
          <p className="eyebrow">品牌宣言</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-charcoal sm:text-5xl">
            MEND，意为修复。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cocoa sm:text-lg">
            我们修复的不只是头发与肌肤，也希望为自信、平静与重新连接留出空间。
          </p>
          <Link href="/zh/our-story" className="btn-outline mt-8">
            了解 MEND 品牌理念
          </Link>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="服务范围"
            title="我们的服务"
            body="八大服务类别，在一个安静、舒适而专业的空间内完成。"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {zhServiceCategories.slice(0, 6).map((category) => (
              <ServiceCard
                key={category.slug}
                title={category.cardTitle}
                description={category.excerpt}
                href={`/zh/services/${category.slug}`}
                image={category.image}
                imageAlt={category.title}
                linkLabel="查看服务"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/zh/services" className="btn-outline">
              查看全部服务
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="为什么选择 Mend"
            title="从空间到护理，每个细节都经过认真考虑"
            body="专业美发区、独立头疗位及私人护理房，让美发、头皮、肌肤与身体护理可以在同一空间内舒适完成。"
            align="left"
          />
          <ul className="mt-8 space-y-4 text-sm leading-relaxed text-cocoa">
            <li>8 个专业美发工作位</li>
            <li>2 个独立头疗护理位</li>
            <li>3 间私人护理房</li>
            <li>韩式美容专业支持</li>
            <li>优质产品与安静舒适的沙龙环境</li>
          </ul>
        </div>
        <GalleryPreview images={galleryImages} />
      </section>

      <section className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="到店体验"
            title="欢迎来到 Deepdene"
            body="如需预约、咨询或选择服务，请致电、发送邮件或使用预约页面。"
            align="left"
          />
        </div>
        <ContactCard showHours locale="zh-Hans" />
      </section>

      <CTABlock
        eyebrow="Mend Beauty Studio"
        heading="修护秀发，焕亮肌肤，重拾自信光彩。"
        body="现在预约美发、头疗、皮肤管理或美容护理。"
        actions={[
          { label: "预约", href: "/zh/book", variant: "light" },
          { label: "查看服务", href: "/zh/services", variant: "outline-light" },
        ]}
      />
    </>
  );
}

function ChineseServices() {
  return (
    <>
      <Hero
        eyebrow="我们的服务"
        title="一间工作室，满足您的日常美容护理需求"
        body="美发、头疗、皮肤管理、身体护理、眉睫及更多服务，均以专业、舒适和细致的体验为核心。"
        actions={[
          { label: "预约", href: "/zh/book", variant: "gold" },
          { label: "礼品卡", href: "/zh/gift-cards", variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zhServiceCategories.map((category) => (
            <ServiceCard
              key={category.slug}
              title={category.cardTitle}
              description={category.excerpt}
              href={`/zh/services/${category.slug}`}
              image={category.image}
              imageAlt={category.title}
              linkLabel="查看服务"
            />
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-taupe">
          所有价格均含 GST。最终价格可能根据服务复杂度、头发长度、产品用量及个人适用性在咨询后调整。
        </p>
      </section>
      <CTABlock
        eyebrow="不确定从哪里开始？"
        heading="告诉我们您的需要，我们会协助选择"
        body="如需了解适合的美发、头皮、肌肤或美容项目，请致电或发送咨询。"
        actions={[
          { label: "预约", href: "/zh/book", variant: "light" },
          { label: "联系我们", href: "/zh/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}

function ChineseServiceDetail({ slug }: { slug: string }) {
  const category = getZhCategory(slug);
  const menu = getZhMenuItemsForCategory(slug);
  const isSemiPermanent = slug === "semi-permanent";

  return (
    <>
      <Hero
        eyebrow="服务项目"
        title={category.title}
        body={category.intro}
        image={category.image}
        imageAlt={category.title}
        actions={[
          { label: "预约", href: "/zh/book", variant: "gold" },
          { label: "全部服务", href: "/zh/services", variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-20">
        <ServiceMenuSection
          items={menu.items}
          title={isSemiPermanent ? "咨询与服务项目" : "项目与价格"}
          locale="zh-Hans"
        />
        {menu.secondaryItems.length > 0 && (
          <div className="mt-10">
            <ServiceMenuSection
              items={menu.secondaryItems}
              title={category.secondaryTitle ?? "其他可选项目"}
              locale="zh-Hans"
            />
          </div>
        )}
        {category.notes && category.notes.length > 0 && (
          <div className="mt-10 rounded-3xl bg-sand p-7 sm:p-8">
            {category.notes.map((note) => (
              <p key={note} className="text-sm leading-relaxed text-cocoa">
                {note}
              </p>
            ))}
          </div>
        )}
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-taupe">
          所有价格均含 GST。最终价格可能根据服务复杂度、头发长度、产品用量及个人适用性在咨询后调整。
        </p>
        <div className="mt-6 text-center">
          <Link href="/zh/book" className="btn-gold">
            预约
          </Link>
        </div>
      </section>
      <CTABlock
        eyebrow="准备好了吗？"
        heading="预约到访 Mend Beauty Studio"
        body="建议提前预约；如需协助选择项目，请先联系我们。"
        actions={[
          { label: "预约", href: "/zh/book", variant: "light" },
          { label: "联系我们", href: "/zh/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}

function ChineseGiftCards() {
  const ideas = [
    ["头疗放松体验", "舒缓头疗护理，为亲友送上一段安静放松的时间。", "A$98 起"],
    ["韩式肌肤焕亮", "韩式皮肤管理或补水焕亮面部护理。", "A$98 起"],
    ["身体护理与放松", "私人护理房内的身体磨砂或舒缓护理。", "A$145 起"],
    ["秀发修护", "修护型秀发护理，并可咨询头皮护理组合。", "A$85 起"],
    ["自选金额", "让收礼人从完整服务项目中自行选择。", "金额自选"],
  ];
  return (
    <>
      <Hero
        eyebrow="礼品卡"
        title="送上一份焕新与放松"
        body="Mend 礼品卡适合生日、母亲节、圣诞节、纪念日，或送给任何需要休息和焕新的亲友。"
        image={siteImages.giftCards.src}
        imageAlt="Mend Beauty Studio 礼品卡"
        actions={[
          { label: "咨询购买", href: "/zh/contact#booking-enquiry", variant: "gold" },
          { label: "查看服务", href: "/zh/services", variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <SectionHeading eyebrow="礼品建议" title="值得记住的护理体验" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map(([title, description, price]) => (
            <article key={title} className="flex h-full flex-col rounded-3xl border border-beige/70 bg-white/60 p-7">
              <h2 className="font-display text-2xl font-medium text-charcoal">{title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa">{description}</p>
              <p className="mt-6 border-t border-beige/70 pt-5 text-sm font-medium text-bronze">{price}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-taupe">
          礼品卡适用相关政策及购买时注明的有效期。请在购买前查看服务政策。
        </p>
      </section>
    </>
  );
}

function ChineseMemberships() {
  return (
    <>
      <Hero
        eyebrow="即将推出"
        title="会员计划即将推出"
        body="头疗、皮肤焕亮、美发维护及日常美容会员计划正在准备中。您可以先登记意向，计划开放后我们会通知您。"
        image={siteImages.memberships.src}
        imageAlt="Mend Beauty Studio 会员计划"
        actions={[
          { label: "登记意向", href: "/zh/contact#booking-enquiry", variant: "gold" },
          { label: "查看服务", href: "/zh/services", variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="计划中的会员项目"
          title="让日常美容维护更轻松"
          body="计划中的方向包括头疗、皮肤焕亮、美发颜色维护与日常美容护理。具体内容、价格和权益将在推出前公布。"
        />
      </section>
    </>
  );
}

function ChineseCareers() {
  const opportunities = [
    ["沙龙经理", "适合具备团队管理及业务发展经验的专业人士。"],
    ["美发师", "欢迎重视专业服务、顾客体验与持续成长的美发师。"],
    ["租椅合作", "适合希望在优质沙龙环境内经营个人客户的独立美发师。"],
    ["美容护理房合作", "为合适的独立美容或护理专业人士提供私人空间合作机会。"],
  ];
  return (
    <>
      <Hero
        eyebrow="招聘与场地合作"
        title="加入 Mend Beauty Studio"
        body="我们欢迎沙龙经理、美发师、美容专业人士及寻找优质工作空间的独立经营者表达合作意向。"
        image={siteImages.careers.src}
        imageAlt="加入 Mend Beauty Studio"
        actions={[
          { label: "表达意向", href: "/zh/contact#booking-enquiry", variant: "gold" },
          { label: "联系我们", href: "/zh/contact", variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <SectionHeading eyebrow="当前机会" title="四种合作方式" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {opportunities.map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-9">
              <h2 className="font-display text-2xl font-medium text-charcoal">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">{body}</p>
              <Link className="btn-outline mt-6" href="/zh/contact#booking-enquiry">
                表达意向
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ChineseContact() {
  return (
    <>
      <Hero
        eyebrow="联系我们"
        title="期待收到您的消息"
        body="无论是预约、礼品卡、项目咨询或合作机会，都可以致电、发送邮件或填写下方咨询内容。"
        image={siteImages.contact.src}
        imageAlt="Mend Beauty Studio 店内环境"
        imageAspect="aspect-[3/4]"
        actions={[
          { label: "立即致电", href: site.phoneHref, variant: "gold" },
          { label: "查看服务", href: "/zh/services", variant: "outline" },
        ]}
      />
      <section className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <ContactCard showHours locale="zh-Hans" />
          <div className="rounded-3xl border border-beige bg-sand p-8 text-center">
            <p className="font-display text-xl font-medium text-cocoa">规划到店路线</p>
            <p className="mt-2 text-sm text-taupe">{site.address}</p>
            <a className="btn-outline mt-6" href={site.mapsHref} target="_blank" rel="noreferrer">
              在 Google 地图中打开
            </a>
          </div>
        </div>
        <BookingEnquiryForm locale="zh-Hans" />
      </section>
    </>
  );
}

const policies = [
  {
    title: "预约政策",
    paragraphs: [
      "可通过电话、微信或到店预约。染发、头疗及护理房服务等部分项目可能需要支付订金以保留预约。",
      "预约时请告知相关敏感情况、过敏史或个人偏好，以便我们准备合适的服务。",
    ],
  },
  {
    title: "取消政策",
    paragraphs: [
      "如需取消或改期，请至少提前 24 小时通知我们。",
      "少于 24 小时取消或未到店，可能产生取消费用或损失订金；多次未到店可能需要预付未来预约。",
    ],
  },
  {
    title: "迟到政策",
    paragraphs: [
      "如可能迟到，请尽快致电。超过 15 分钟可能需要缩短或重新安排服务，以免影响其他顾客。",
      "因迟到而缩短的服务仍可能按原预约价格收费。",
    ],
  },
  {
    title: "健康与适用性",
    paragraphs: [
      "我们的项目属于美容、理容与放松服务，并非医疗治疗。服务前请告知肌肤或头皮状况、过敏、怀孕或近期治疗情况。",
      "染色、睫毛提升或定型项目可能需要皮肤测试；如当天情况不适合，我们可能调整或拒绝服务。",
    ],
  },
  {
    title: "头疗与头皮护理说明",
    paragraphs: [
      "头疗与头皮护理旨在支持头皮健康、焕活秀发并提供放松体验。",
      "相关服务不会诊断、治疗或治愈任何医疗或皮肤科疾病，包括脱发。持续的头皮或头发问题应咨询合资格的健康专业人士，个人体验与结果会有差异。",
    ],
  },
  {
    title: "半永久美容咨询政策",
    paragraphs: [
      "半永久美容仅限咨询后预约，并需完成适用性评估。",
      "咨询会讨论个人偏好、适用性及术后护理；顾客没有继续进行的义务。如不适合，我们可能拒绝服务。效果因人而异并会随时间淡化。",
    ],
  },
  {
    title: "礼品卡政策",
    paragraphs: [
      "Mend 礼品卡可按预约情况用于 Mend Beauty Studio 的服务项目。",
      "礼品卡有效期以购买时注明为准，并遵守澳大利亚礼品卡规定；不可兑换现金，遗失或被盗的礼品卡可能无法补发。",
    ],
  },
];

function ChinesePolicies() {
  return (
    <>
      <Hero
        eyebrow="工作室政策"
        title="服务政策"
        body="以下清晰、公平的安排帮助我们照顾每位顾客。政策目前仍处于审核稿阶段，并可能在正式开业前后更新。"
      />
      <section className="wrap py-16 sm:py-20">
        <div className="space-y-10">
          {policies.map((policy) => (
            <article key={policy.title} className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
              <h2 className="font-display text-2xl font-medium text-charcoal sm:text-3xl">{policy.title}</h2>
              {policy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-sm leading-relaxed text-cocoa">{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
        <p className="mt-12 text-xs leading-relaxed text-taupe">
          最后更新：审核稿。如对政策有疑问，请在到店前联系我们。
        </p>
      </section>
    </>
  );
}
