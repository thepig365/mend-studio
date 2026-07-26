# Mend Beauty Studio bilingual website

## Purpose

The public website supports Australian English and Simplified Chinese without
using live machine translation in the visitor's browser.

- English remains on the established unprefixed URLs.
- Simplified Chinese uses the `/zh` prefix.
- Both languages use the same verified business facts, service prices, routes,
  images, booking provider, and contact details.
- Chinese copy is stored in the repository so it can be reviewed, versioned,
  tested, and indexed.

## Translation method

The initial Simplified Chinese copy was prepared with OpenAI/Codex as a draft.
It is not automatically published from an external translation service.

Before production publication:

1. A Mandarin-fluent reviewer checks naturalness and terminology.
2. Mend staff check every service name, description, price, duration, health
   statement, and booking instruction against the approved English source.
3. Brand and Anti-AI-Slop review is completed.
4. Leon gives final publication approval.

The AI does not approve its own translation.

## Locale model

| Locale | Public path | HTML language |
| --- | --- | --- |
| Australian English | `/...` | `en-AU` |
| Simplified Chinese | `/zh/...` | `zh-Hans` |

The language switcher retains the equivalent route where it exists. The site
does not force a language based on IP address or browser language.

## SEO

Every localized page provides:

- a self-referencing canonical URL;
- `hreflang` for `en-AU`, `zh-Hans`, and `x-default`;
- localized title, description, Open Graph locale, and share copy;
- both language URLs in `sitemap.xml`.

English slugs are retained inside `/zh` to keep route ownership and link
maintenance simple. The visible labels and page content are localized.

## Translation glossary

These terms are the current review draft, not an authority to rename approved
MaSe services:

| English | Simplified Chinese |
| --- | --- |
| Mend Beauty Studio | Mend Beauty Studio |
| Head Spa | 头疗 |
| Scalp Care | 头皮护理 |
| Skin & Facial | 皮肤管理与面部护理 |
| Body Care | 身体护理 |
| Brows & Lashes | 眉睫护理 |
| Men's Grooming | 男士理容 |
| Semi-Permanent Beauty | 半永久美容 |
| Book Now | 立即预约 |
| Gift Cards | 礼品卡 |

Brand names, personal names, product names, addresses, prices, and legal
entities are not translated unless an approved public Chinese form exists.

## MaSe handoff

The Chinese booking page explains that the user is leaving the Mend website
for MaSe. It uses the same confirmed MaSe URL as the English site. MaSe language
support must be verified separately before claiming that the external booking
flow is fully bilingual.

## Adding or changing content

1. Update the verified English source first.
2. Add or update the Chinese translation in the same task.
3. Keep prices, durations, contact details, and availability in one canonical
   source rather than duplicating operational data.
4. Run `npm run check:i18n`, `npm run lint`, and `npm run build`.
5. Review the equivalent English and Chinese routes at desktop and mobile
   widths.
6. Do not publish until the translation and public-output gates are approved.
