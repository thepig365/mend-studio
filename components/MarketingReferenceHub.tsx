"use client";

import { useMarketingLocale } from "@/components/MarketingLocale";
import { sanitizeDriveLibraryUrl } from "@/lib/marketing-drive-library";
import {
  approvalItems,
  complianceNotes,
  consentNotice,
  ctaExamples,
  customerFacingCopy,
  driveCopy,
  driveLibraryEnvName,
  gumtreeListingId,
  marketingReferenceDoc,
  materialFolders,
  materialLibraryRoot,
  prePromotionChecks,
  proposedLabel,
  publicChannels,
  routines,
  skillStandards,
  studioAddress,
  studioServices,
  trackingCaption,
  trackingColumns,
  trackingExampleNote,
  type Bilingual,
} from "@/lib/marketing-reference-hub";

const panelClass = "scroll-mt-24 rounded-3xl border border-beige bg-white/80 p-6 sm:p-8";
const nav = [
  ["marketing-skill-standards", "Marketing Skill Set & AI Quality Standards", "营销技能与 AI 质量标准"],
  ["marketing-material-library", "MEND Material Library Structure Reference", "MEND 素材库结构参考"],
  ["marketing-public-channels", "Verified Public Marketing & Classifieds Channels", "已核实的公开营销与分类信息渠道"],
  ["marketing-reference-routines", "Routines", "日常节奏"],
  ["marketing-owner-approval", "Owner approval", "店主审批"],
  ["marketing-lead-generation", "Detailed Lead Generation Plan", "获客执行方案"],
] as const;

function Quote({ en, zh }: Bilingual) {
  return (
    <div className="mt-3 rounded-2xl border border-beige bg-white p-4 text-sm leading-relaxed">
      <p lang="en-AU" className="text-charcoal">{en}</p>
      <p lang="zh-Hans" className="mt-2 text-cocoa">{zh}</p>
    </div>
  );
}

export default function MarketingReferenceHub({ driveLibraryUrl = null }: { driveLibraryUrl?: string | null }) {
  const { t } = useMarketingLocale();
  const driveHref = sanitizeDriveLibraryUrl(driveLibraryUrl);
  const copy = (item: Bilingual) => t(item.en, item.zh);

  return (
    <div id="marketing-reference-hub" className="mt-10 space-y-8" data-marketing-reference-hub="2026-11-26">
      <section className={`${panelClass} bg-sand/60`}>
        <p className="eyebrow">{t("Reference hub", "营销参考中心")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">{t("Marketing reference hub", "营销参考中心")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">
          {t(
            `This panel is the operator view of ${marketingReferenceDoc}, plus the lead-generation plan. Reading it does not publish, spend or change an account.`,
            `本面板对应 ${marketingReferenceDoc}，并包含获客执行方案。阅读本身不会发布、花费或更改账户。`,
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{t(`One studio: ${studioAddress}.`, `只有一家门店：${studioAddress}。`)}</p>
        <h3 className="mt-6 text-lg font-medium text-charcoal">{t("Pre-promotion checklist", "发布前核对清单")}</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-cocoa">
          {prePromotionChecks.map((item) => <li key={item.en}>{copy(item)}</li>)}
        </ol>
        <nav aria-label={t("Marketing reference sections", "营销参考章节")} className="mt-6 flex flex-wrap gap-2">
          {nav.map(([id, en, zh]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-beige bg-white px-4 py-2 text-sm font-medium text-charcoal hover:border-gold focus-visible:outline-2 focus-visible:outline-gold">{t(en, zh)}</a>
          ))}
        </nav>
      </section>

      <section id="marketing-skill-standards" className={panelClass}>
        <p className="eyebrow">{t("Skill set", "营销技能")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("Marketing Skill Set & AI Quality Standards", "营销技能与 AI 质量标准")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {skillStandards.map((item) => (
            <article key={item.title.en} className="rounded-2xl bg-sand/60 p-5">
              <h3 className="font-medium text-charcoal">{copy(item.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">{copy(item.detail)}</p>
            </article>
          ))}
        </div>
        <h3 className="mt-6 text-lg font-medium text-charcoal">{t("Customer-facing lines already used on the website", "网站上已在使用的对客语句")}</h3>
        <Quote en={customerFacingCopy.taglineEn} zh={customerFacingCopy.taglineZh} />
        <Quote en={customerFacingCopy.serviceNoteEn} zh={customerFacingCopy.serviceNoteZh} />
        <Quote en={customerFacingCopy.serviceAreaEn} zh={customerFacingCopy.serviceAreaZh} />
        <ul className="mt-4 flex flex-wrap gap-2">
          {studioServices.map((service) => (
            <li key={service.name} className="rounded-full border border-beige px-3 py-1 text-xs text-cocoa">
              {service.name} · {service.zh}
              {service.note ? <span className="sr-only">{copy(service.note)}</span> : null}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{studioServices[0].note ? copy(studioServices[0].note) : null}</p>
      </section>

      <section id="marketing-material-library" className={panelClass}>
        <p className="eyebrow">{t("Material library", "素材库")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("MEND Material Library Structure Reference", "MEND 素材库结构参考")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">
          {t(
            `Local folder names, written without a personal username or disk path: ${materialLibraryRoot}`,
            `本地文件夹名称，不写个人用户名或磁盘路径：${materialLibraryRoot}`,
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{copy(driveCopy.git)} {copy(driveCopy.access)}</p>
        <div id="marketing-drive-library" className="mt-6 rounded-2xl border border-gold/40 bg-sand/40 p-5" data-drive-state={driveHref ? "configured" : "unconfigured"} data-drive-thumbnails="not-in-this-release">
          <h3 className="text-lg font-medium text-charcoal">{t("Google Drive material library", "Google Drive 素材库")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cocoa">{driveHref ? copy(driveCopy.configured) : copy(driveCopy.unconfigured)}</p>
          <p className="mt-3 text-xs font-medium text-bronze">{driveLibraryEnvName}</p>
          {driveHref ? <DriveAnchor href={driveHref} label={copy(driveCopy.open)} newTab={t(" (opens in a new tab)", "（在新标签页打开）")} /> : <p className="mt-4 text-sm font-medium text-charcoal">{copy(driveCopy.unconfiguredTitle)}</p>}
          <div className="mt-4 rounded-2xl border border-dashed border-beige bg-white/80 p-4">
            <p className="text-sm font-medium text-charcoal">{t("Thumbnail preview", "缩略图预览")}</p>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">{copy(driveCopy.thumbnails)}</p>
          </div>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {materialFolders.map((folder) => (
            <li key={folder.name} className="rounded-2xl border border-beige p-4">
              <h3 className="font-medium text-charcoal">{folder.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">{copy(folder.detail)}</p>
              {driveHref ? <DriveAnchor href={driveHref} label={copy(driveCopy.open)} newTab={t(" (opens in a new tab)", "（在新标签页打开）")} /> : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="marketing-public-channels" className={panelClass}>
        <p className="eyebrow">{t("Channels", "公开渠道")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("Verified Public Marketing & Classifieds Channels", "已核实的公开营销与分类信息渠道")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{t("External publishing, ad spend and account changes need Leon's explicit approval.", "对外发布、广告花费和账户变更须得到 Leon 的明确批准。")}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {publicChannels.map((channel) => (
            <li key={channel.id} className="rounded-2xl border border-beige p-4">
              <h3 className="font-medium text-charcoal">{copy(channel.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">{copy(channel.detail)}</p>
              {channel.href ? (
                <a href={channel.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-bronze underline">
                  {channel.href}
                  <span className="sr-only">{t(" (opens in a new tab)", "（在新标签页打开）")}</span>
                </a>
              ) : (
                <p className="mt-3 text-sm font-medium text-charcoal">{gumtreeListingId}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="marketing-reference-routines" className={panelClass}>
        <p className="eyebrow">{t("Australia/Melbourne", "澳大利亚／墨尔本")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("Routines", "日常节奏")}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-cocoa">
          {routines.map((item) => <li key={item.en}>{copy(item)}</li>)}
        </ul>
      </section>

      <section id="marketing-owner-approval" className={panelClass}>
        <p className="eyebrow">{t("Safety", "安全边界")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("Owner approval", "店主审批与安全边界")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{t("Leon must explicitly approve each of these. Do not self-approve, and do not buy Grok usage credits.", "以下各项须由 Leon 明确批准。不得自行批准，也不得购买 Grok 用量额度。")}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {approvalItems.map((item) => <li key={item.en} className="rounded-2xl bg-sand/60 px-4 py-3 text-sm text-charcoal">{copy(item)}</li>)}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-cocoa">{t("Read the source first. This public repository does not hold secrets, private budgets, or customer or staff records.", "先只读。这个公开仓库不存放密钥、私人预算、客户或员工记录。")}</p>
      </section>

      <section id="marketing-lead-generation" className={panelClass}>
        <p className="eyebrow">{t("Lead generation", "获客")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{t("Detailed Lead Generation Plan", "获客执行方案")}</h2>
        <div className="mt-6 space-y-6">
          <article>
            <h3 className="text-lg font-medium text-charcoal">{t("1. Single call to action", "1. 单一行动指引")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">{t("Every Facebook post and every Gumtree ad needs one clear next step: a message asking the guest to book, or the link where they choose a time. Do not publish a brand-only post with no booking or enquiry path. A chair-rental Gumtree ad uses the existing chair enquiry, not the beauty booking link.", "每条 Facebook 帖子和每则 Gumtree 广告只放一个明确的下一步：请客人发消息预约，或给出选择时间的链接。不要发布没有预约或咨询路径的纯品牌帖。美发工位的 Gumtree 广告使用现有的工位咨询路径，不用美容预约链接。")}</p>
            <ul className="mt-3 space-y-3">
              {ctaExamples.map((item) => (
                <li key={item.en}><Quote en={item.en} zh={item.zh} /></li>
              ))}
            </ul>
          </article>
          <article data-offer-status="proposed">
            <h3 className="text-lg font-medium text-charcoal">{t("2. Lead magnet", "2. 获客赠品")}</h3>
            <p className="mt-2 text-sm font-medium text-bronze">{proposedLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">{t("Proposed shape only: a complimentary cosmetic scalp check, or a first-visit trial, in exchange for a name and mobile number. It is not a medical examination. Leon must approve the exact terms before anyone uses it. Collect contact details only with an explicit consent checkbox.", "目前只是提议的形式：以免费的美容头皮咨询或首次到店体验，换取姓名和手机号。这不是医疗检查。Leon 核准具体条款之前，任何人都不得使用。收集联系方式时必须有明确的同意勾选。")}</p>
            <Quote en={consentNotice.en} zh={consentNotice.zh} />
          </article>
          <article data-offer-status="proposed">
            <h3 className="text-lg font-medium text-charcoal">{t("3. Referral", "3. 转介绍")}</h3>
            <p className="mt-2 text-sm font-medium text-bronze">{proposedLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">{t("Proposed shape only: one complimentary treatment for the referrer after the referred person is a new client, the booking is confirmed, and the visit is completed. Leon still has to set which treatment, the expiry and who is eligible. Do not publish this before that approval.", "目前只是提议的形式：被介绍的人是新客、预约已确认并且到店完成后，介绍人可获得一次免费护理。具体是哪项护理、有效期和谁符合条件，仍须 Leon 确定。在此之前不要对外发布。")}</p>
          </article>
          <article>
            <h3 className="text-lg font-medium text-charcoal">{t("4. Daily hand-filled tracking", "4. 每日手工记录")}</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left text-sm text-cocoa">
                <caption className="mb-3 text-left text-sm leading-relaxed text-cocoa">{copy(trackingCaption)}</caption>
                <thead>
                  <tr>
                    {trackingColumns.map((column) => (
                      <th key={column.en} scope="col" className="border border-beige bg-sand/70 px-3 py-2 text-xs font-medium text-charcoal">{copy(column)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-beige px-3 py-2">{t("Example", "示例")}</td>
                    <td className="border border-beige px-3 py-2">{t("Example post label", "示例帖子")}</td>
                    <td className="border border-beige px-3 py-2">—</td>
                    <td className="border border-beige px-3 py-2">—</td>
                    <td className="border border-beige px-3 py-2">—</td>
                    <td className="border border-beige px-3 py-2">—</td>
                    <td className="border border-beige px-3 py-2">—</td>
                    <td className="border border-beige px-3 py-2">{copy(trackingExampleNote)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <article>
            <h3 className="text-lg font-medium text-charcoal">{t("5. Australia compliance notes", "5. 澳大利亚合规要点")}</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {complianceNotes.map((item) => (
                <article key={item.title.en} className="rounded-2xl border border-beige p-4">
                  <h4 className="font-medium text-charcoal">{copy(item.title)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa">{copy(item.detail)}</p>
                </article>
              ))}
            </div>
          </article>
          <article>
            <h3 className="text-lg font-medium text-charcoal">{t("6. Monday review", "6. 每周复盘")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">{t("Every Monday in Australia/Melbourne, review which channel or post produced confirmed bookings and completed visits, what to repeat, and what to pause or stop. Repeating a post is not permission to spend.", "每个周一按 Australia/Melbourne 时间复盘：哪个渠道或哪条帖子带来了已确认预约和已完成到店，什么值得重复，什么应该暂停或停止。重复一条内容不等于可以花费。")}</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function DriveAnchor({ href, label, newTab }: { href: string; label: string; newTab: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="btn-outline mt-4">
      {label}
      <span className="sr-only">{newTab}</span>
    </a>
  );
}
