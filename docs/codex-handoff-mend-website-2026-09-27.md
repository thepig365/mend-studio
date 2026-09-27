# Codex handoff: MEND website menus, memberships and QR codes

## Task and status

Owner: Leon. Target website: https://mendbeauty.com.au/
Repository: thepig365/mend-studio
Existing working branch: update/booking-qr-codes-20260927

Leon asked to update the website using five supplied promotional/menu posters and to put both supplied QR codes onto the website. His final clarification is authoritative: **the WeChat QR is 微信预约; the website QR is 官方网站.** He then asked to hand this task to Codex. Implement and test the changes; do not return another plan alone.

At handoff, the ChatGPT conversation had inspected repository metadata, package.json, AGENTS.md, README.md and components/Footer.tsx, and created the working branch. This handoff document is not an implementation. No application edits, deployment or Codex run are claimed by this handoff. Inspect the current git history and working tree before starting; preserve changes made by other work.

Work on the existing branch. Do not force-push, reset other work, merge into main or deploy production without an explicit deployment approval. Deliver a working preview and a PR or reviewable branch.

## Inputs and exact asset mapping

The accompanying `Mend_Codex_Handoff_2026-09-27.zip` contains this brief, a manifest and seven unmodified original JPEGs under `source-assets/`. These are source/reference inputs, not a claim that the original low-resolution posters are suitable as the website's only content.

| Packaged filename | Original conversation filename | Purpose |
| --- | --- | --- |
| membership-plan.jpg | bfd32d159d4781b9f44a189b8b217b7e.jpg | Membership tiers, bonuses and gifted services |
| hair-menu.jpg | 1876eb919741b6a6e5102ef3735a97b8.jpg | Hair Atelier menu |
| skin-menu.jpg | 3aeb533bb8ab8811e767b98113382f49.jpg | Skin Aesthetics menu |
| scalp-body-menu.jpg | a969cdaca9979e042ad5c05ff55cbfcb.jpg | Scalp & Mind Wellness and Eastern Wellness & Therapy |
| hair-reduction-menu.jpg | 845b79df4df0c09109b57c10258266db.jpg | Hair-reduction single-session and six-session prices |
| official-website-qr.jpg | 2d4f96386b5c48a26e6726b4e1dfa041.jpg | 官方网站 / Official Website |
| wechat-booking-qr.jpg | 4668d60c2d02843f77a703af446df9e7.jpg | 微信预约 / WeChat Booking |

Source images are NOT automatically present in another Codex conversation or in this repository. Locate the attached ZIP in your actual environment and extract it. Do not assume a ChatGPT sandbox path is a local Mac or Codex path. If the ZIP is unavailable, complete source inspection and other unblocked work, but report missing original inputs and do not claim to have uploaded or compared them.

Both QR payloads were decoded locally from the supplied originals with pyzbar on 2026-09-27:

- Official website: `https://mendbeauty.com.au/`
- WeChat booking: `https://u.wechat.com/kNVC5BSGLv-TksATEKFVjKs?s=2`

The WeChat account display name and in-app response have not been verified. Do not invent an account ID, guarantee automatic app-opening, or replace it with an unrelated account.

## 1. Inspect the existing application before editing

Read AGENTS.md and applicable nested instructions. Its Next.js warning requires reading relevant guides in `node_modules/next/dist/docs/` before writing code. Follow the installed version rather than remembered framework APIs.

The inspected package.json uses Next.js 16.2.12, React 19.2.4, TypeScript and Tailwind. Verify current versions. README describes English routes without a prefix and Chinese routes under `/zh`; keep this architecture and existing canonical URLs.

Inspect at least:

- lib/site.ts, lib/services.ts, lib/i18n and locale content definitions
- components/Footer.tsx, Header.tsx, service-page and contact components
- app/(en)/page.tsx and the actual Chinese home route
- existing services, memberships and contact pages in both languages
- existing booking configuration, scripts, analytics and image data
- docs/bilingual-site.md and any current brand/content rules

The existing booking flow uses `/book` and `/zh/book` as server-side handoffs to MaSe. **Preserve that functioning integration.** A QR panel belongs on a rendered page, not in a redirect-only route. Do not replace booking with a website-homepage QR or a mailto enquiry form.

## 2. First priority: publish-ready QR component

Implement a reusable bilingual component using the actual two supplied QR images as local static assets.

Exact labels:

| Code | Chinese | English |
| --- | --- | --- |
| WeChat | 微信预约 | WeChat Booking |
| Website | 官方网站 | Official Website |

Never label the website QR 微信预约 or 官网预约. It encodes the homepage, not a booking-specific URL. Keep the existing Book / 预约 button separate and routed to the established booking flow.

Place the full two-code panel in the homepage's lower booking/contact section and the contact page, in both languages. Add an appropriately compact version or access point in the shared footer; avoid duplicating oversized panels immediately adjacent to each other. Both codes must actually be available on the website, not just described in text.

Requirements:

- Equal-size square display cards and equal-size QR image areas, with adequate white quiet zones; do not crop, stretch, recolour, cover or round off QR modules.
- Keep code contrast black on white even where the surrounding design uses beige or brown.
- Desktop side-by-side layout; mobile layout that keeps codes readable without overflow. Prefer approximately 180-220 CSS-pixel code areas where space allows; stack when needed.
- Allow tapping/clicking to enlarge the original. Provide a save/download option useful for same-phone WeChat booking.
- Give concise mobile instructions: save the WeChat QR, then open WeChat Scan and choose the image from Photos. Do not promise every browser supports long-press recognition or universal-link launch.
- Accessible image descriptions, keyboard-accessible controls, visible focus, responsive loading and no third-party QR-generation endpoint dependency.
- Website button/link may lead to the official homepage, but must not be presented as confirmed appointment booking.
- Verify decoding from rendered screenshots at desktop and mobile sizes, not only from the originals. Compare exact payload strings above.

If original assets are unavailable, a correctly encoded locally generated QR can be a clearly reported temporary preview fallback; do not present it as the unmodified supplied original.

## 3. Update services and pricing as web content

Use the posters as new source inputs and build readable, searchable HTML service sections, not five giant poster images as the main UI. Maintain shared structured service data so Chinese and English display the same prices, durations, inclusions and qualifiers.

Organise the supplied offering into five recognisable groups while preserving existing useful URLs:

1. Hair Atelier / 美发设计中心
2. Skin Aesthetics / 肌肤管理中心
3. Scalp & Mind Wellness / 头皮护理与身心放松
4. Eastern Wellness & Therapy / 东方养生与身体护理
5. Hair Reduction / 净肤脱毛

Use the supplied Chinese titles as source wording, but reconcile public wording with existing brand rules; do not silently invent new medical promises. The scalp and body categories share one source poster but remain distinct website groups.

Preserve existing Brows & Lashes, Nails, Men's Grooming and other offerings unless the owner explicitly withdraws them. The five supplied groups are not an instruction to delete unrelated existing services or prices.

Map supplied items to existing IDs/routes before adding new pages. Add bilingual hair-reduction coverage if absent, following existing routing patterns, navigation, sitemap, canonical and alternate-language conventions. Maintain real booking links; do not fabricate service-specific MaSe IDs.

Transcribe all poster prices carefully, including `from` qualifiers, price ranges, add-ons and six-session totals. Verify amounts as AUD against existing business configuration and clearly label the currency. Do not invent missing hair-service durations, tax statements or inclusions. Poster list prices must not be presented as validated profitability or clinically proven results.

Some skin services are advertised with injectables/skin boosters, branded devices or strong therapeutic language. Keep unverified advanced treatments and unsupported efficacy claims in internal draft data until the owner has confirmed actual availability and completed appropriate practitioner/product/advertising review. Do not assume that a poster establishes device ownership, credentials, medical suitability or regulatory clearance. Do not independently promise universal skin-type suitability, hair regrowth, detoxification or guaranteed outcomes.

## 4. Membership page

Replace placeholder/coming-soon content with a reviewable bilingual membership presentation using the supplied tiers:

| Tier | Top-up | Advertised dollar bonus | Advertised gifted-service value |
| --- | ---: | ---: | ---: |
| Starter / 尝新会员 | 999 | 100 | 100 |
| Enjoy / 悦享会员 | 2000 | 268 | 248 |
| Premium / 臻享会员 | 5000 | 788 | 515 |
| Royal / 至臻会员 | 10000 | 1999 | 985 |

All members: complimentary birthday-month gift and 30% off one service during the birthday month, subject to confirmed terms.

Keep top-up, dollar bonus and complimentary-treatment value clearly separate. Do not count gifted-service value as cash credit. Do not assume every treatment accepts membership credit or bonuses.

Do not invent expiry periods, refunds, transferability, top-up rules, discount stacking or exclusions. Create an internal owner-review checklist for missing terms. Do not introduce payments, a prepaid wallet, subscriptions or a new checkout provider. Use a membership enquiry CTA while commercial terms remain unresolved. Where publishing would create an unclear offer, keep that membership detail in preview/draft rather than making up terms.

## 5. Known discrepancies: do not silently resolve

Record these in the PR/owner-review notes and internal data where useful:

- Premium gift: 韩国水光焕肤酸疗 is listed as 30 minutes in membership, but 20 minutes in the skin menu.
- Royal gift: 脱发焕活护理 is 75 minutes in membership, but 90 minutes in the scalp menu.
- The gifted 75-minute Korean classic head-spa name does not exactly match the published scalp menu. The Enjoy gift total of 248 minus the 50 scalp assessment implies a 198 head spa, while the two 75-minute scalp treatments are 199. Confirm mapping and value; do not silently change either source.
- The hair-reduction row has Chinese 全手臂/全小腿 but English Arms (Full) / Full Legs. Confirm whether the leg option means lower legs or full legs.
- Bonus percentages are rounded: 100/999 is approximately 10.01%, 268/2000 is 13.4%, 788/5000 is 15.76%, 1999/10000 is 19.99%. Prefer exact advertised dollar bonuses; do not display rounded percentages as exact promises.
- Membership expiry, refunds, discount stacking, sharing and service exclusions are unstated in the supplied poster.

Do the unambiguous QR and website work without making the owner repeat this conversation. Surface only genuine unresolved decisions. Retain known-good live information where its proposed replacement is ambiguous.

## 6. Visual approach

Align new sections with the supplied warm ivory, cream, sand, taupe and restrained bronze/brown palette. Maintain readable dark text, contrast and a calm premium layout. Avoid a wholesale redesign, logo replacement or new imagery generation unless necessary and separately approved. Do not portray stock/AI pictures as verified photos of staff, premises or completed customer work.

Make homepage copy explain that MEND combines hair, skin, scalp and body care. Keep contact information and opening hours from verified repository/live sources; do not invent opening dates, phone numbers, accounts or addresses. Preserve booking, enquiry, language-switching, navigation, SEO, analytics, gift-card and marketing-portal functions.

## 7. Tests and acceptance criteria

Use the repository's actual lockfile and package manager. Run the existing applicable checks, including:

```bash
npm run lint
npm run type-check
npm test
npm run build
```

Report real results and distinguish existing failures from regressions. Do not weaken tests merely to obtain a passing result. Add meaningful QR label/payload/location checks and bilingual pricing consistency coverage.

Manually/browser-test English and Chinese home, contact, services and memberships on desktop and narrow mobile widths. Test MaSe handoff, phone/email actions, QR enlargement/saving, language switching, navigation and broken links. Test rendered QR decoding and compare exact expected payloads.

Deliver:

1. Implemented code in the named branch, with focused commits and a PR or reviewable diff.
2. Preview URL if deployment access permits; otherwise a tested local preview and screenshots. Never invent a public preview.
3. Desktop and mobile screenshots, including both labelled QR codes and bilingual pages.
4. Changed-files summary, real test results and the concise owner-confirmation list.
5. Explicit status: implemented locally / committed / previewed / merged / live. These are separate stages. Do not call the production website updated until the deployment has actually been verified.

Start by inspecting the branch and extracting the attached source pack, then implement the QR component first.
