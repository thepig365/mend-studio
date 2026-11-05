import type { Locale } from "@/lib/i18n";
import { pricingNote } from "@/lib/services";
import { site } from "@/lib/site";

// Visible FAQ copy and FAQPage JSON-LD both read these strings.
// Sources: lib/site.ts, lib/anna-services.ts, lib/services.ts (pricing note),
// components/GettingHere.tsx, components/NearbySuburbs.tsx,
// components/ContactCard.tsx, components/ServicePage.tsx, components/HairVisitGuide.tsx.
// Appointment lengths that the menu does not list are omitted.

export type ServiceFaq = {
  heading: string;
  items: { question: string; answer: string }[];
};

const priceCaveatZh =
  "所示价格均为澳元；最终价格可能根据服务复杂度、头发长度、产品用量及个人适用性在咨询后调整。除展示价格外，不对税务处理作额外声明。";

function bookAnswer(locale: Locale, serviceLabel: string) {
  if (locale === "zh-Hans") {
    return `预约${serviceLabel}，请点击本页“预约”，或打开 ${site.url}/zh/book。预约页面会转到 MaSe，请在 MaSe 选择项目，并查看当前价格与可预约时间。也可致电 ${site.phone}、发送邮件至 ${site.email}，或通过微信 ${site.wechat} 联系。建议提前预约。门店星期一至星期六上午 10:00–下午 6:00 营业，星期日休息。公共假期营业时间可能有所调整。临时到店的空位可能有限。`;
  }
  return `To book ${serviceLabel}, use Book on this page or open ${site.url}/book. The booking page hands you to MaSe, where you select the service and check the current price and available times. You can also call ${site.phone}, email ${site.email}, or message WeChat ${site.wechat}. Appointments are recommended. The studio is open Monday to Saturday, 10:00 am – 6:00 pm, and closed Sunday. Public holiday hours may vary. Walk-in availability may be limited.`;
}

function whereAnswer(locale: Locale) {
  if (locale === "zh-Hans") {
    return `Mend Beauty Studio 位于 ${site.address}，在 Whitehorse Road 上、紧邻 Balwyn。门店位于 Balwyn 商业街与 Palace Balwyn 影院以西。从 Balwyn Shopping Centre（48 号站）乘 109 路电车向西 5 站，到 Deepdene Shopping Centre/Whitehorse Rd（43 号站）。我们欢迎来自 Balwyn、Kew、Camberwell、Canterbury、Surrey Hills 与 Mont Albert 的客人。这些附近区域不是分店。联系页面提供 Google 地图链接。`;
  }
  return `Mend Beauty Studio is at ${site.address}, on Whitehorse Road, just west of Balwyn's shopping strip and the Palace Balwyn cinema. Tram 109 runs west from Balwyn Shopping Centre (stop 48) to Deepdene Shopping Centre/Whitehorse Rd (stop 43), five stops. We welcome guests from Balwyn, Kew, Camberwell, Canterbury, Surrey Hills and Mont Albert. These nearby suburbs are not separate salon locations. The contact page includes a Google Maps link.`;
}

const serviceFaqs: Record<string, Record<Locale, ServiceFaq>> = {
  "head-spa": {
    "en-AU": {
      heading: "Head spa questions",
      items: [
        {
          question: "What does a head spa at Mend Beauty Studio involve?",
          answer:
            "A head spa is a cosmetic scalp-care and relaxation appointment, not medical diagnosis or treatment. Results vary. Express Head Spa takes 30 mins and is described as a refreshing first experience, haircut add-on or lunchtime pause. Korean Signature Head Spa takes 75 mins and lists deep scalp cleansing, head massage, neck and shoulder massage and water-circulation head spa. Aroma Healing Head Spa takes 90 mins, includes the Korean Signature Head Spa ritual, and lists aromatherapy oils, scalp essence infusion, neck and shoulder gua sha, warm compresses and relaxation ritual. MEND Signature Head Ritual takes 120 mins, builds on the Aroma Healing Head Spa, and lists hot stone therapy, scalp ampoule infusion, a warm hair-mask treatment, infrared scalp care, aromatherapy and blow-dry styling.",
        },
        {
          question: "How long does a head spa take?",
          answer:
            "Express Head Spa is 30 mins, Korean Signature Head Spa is 75 mins, Aroma Healing Head Spa is 90 mins, and MEND Signature Head Ritual is 120 mins.",
        },
        {
          question: "How much does a head spa cost?",
          answer: `Express Head Spa is $78, Korean Signature Head Spa is $198, Aroma Healing Head Spa is $268, and MEND Signature Head Ritual is $398. ${pricingNote}`,
        },
        {
          question: "Who is a head spa suited to?",
          answer:
            "Express Head Spa is described as a refreshing first experience, a haircut add-on or a lunchtime pause. The 75-minute, 90-minute and 120-minute rituals are longer scalp-care and relaxation appointments. Results vary, and these services are not medical diagnosis or treatment.",
        },
        {
          question: "How do I book a head spa?",
          answer: bookAnswer("en-AU", "a head spa"),
        },
        {
          question: "Where is the head spa, and how do I get there?",
          answer: whereAnswer("en-AU"),
        },
      ],
    },
    "zh-Hans": {
      heading: "头疗常见问题",
      items: [
        {
          question: "Mend Beauty Studio 的头疗包含什么？",
          answer:
            "头疗是美容型头皮护理与放松服务，并非医疗诊断或治疗，效果因人而异。快速头疗为 30 分钟，适合第一次体验、洗剪后加购或午休放松。韩式经典头疗为 75 分钟，列出的内容包括头皮深层清洁、头部按摩、肩颈按摩与水循环头疗。芳香疗愈深度睡眠头疗为 90 分钟，在韩式经典头疗基础上升级，并列出芳香精油、头皮精华导入、肩颈刮痧，以及热敷与睡眠放松流程。MEND臻选头疗为 120 分钟，在芳香疗愈头疗基础上升级，并列出热石护理、头皮安瓶导入、热敷护发、红外线头皮护理、芳疗与吹造型。",
        },
        {
          question: "头疗需要多长时间？",
          answer:
            "快速头疗为 30 分钟，韩式经典头疗为 75 分钟，芳香疗愈深度睡眠头疗为 90 分钟，MEND臻选头疗为 120 分钟。",
        },
        {
          question: "头疗怎么收费？",
          answer: `快速头疗 $78，韩式经典头疗 $198，芳香疗愈深度睡眠头疗 $268，MEND臻选头疗 $398。${priceCaveatZh}`,
        },
        {
          question: "头疗适合谁？",
          answer:
            "快速头疗适合第一次体验、洗剪后加购或午休放松。75 分钟、90 分钟和 120 分钟的项目是更长的头皮护理与放松服务。效果因人而异，这些服务并非医疗诊断或治疗。",
        },
        {
          question: "如何预约头疗？",
          answer: bookAnswer("zh-Hans", "头疗"),
        },
        {
          question: "头疗在哪里做？怎么到店？",
          answer: whereAnswer("zh-Hans"),
        },
      ],
    },
  },
  "hair-scalp-recovery": {
    "en-AU": {
      heading: "Scalp care questions",
      items: [
        {
          question: "What does scalp care at Mend Beauty Studio involve?",
          answer:
            "Scalp care covers cosmetic hair conditioning, scalp assessments and scalp-care rituals. The menu lists MEND AI Scalp Analysis, Hair & Scalp Wellness Assessment, Hydra Hair Ritual, Dandruff Control Ritual, Sensitive Scalp Care Ritual, Oily Scalp Balancing Ritual, Hair Loss Care Ritual, and Scalp Detox Ritual as an add-on. Hair and scalp care are cosmetic services, not medical diagnosis or treatment.",
        },
        {
          question: "How much does scalp care cost?",
          answer: `MEND AI Scalp Analysis is $50. Hair & Scalp Wellness Assessment is $50. Hydra Hair Ritual is $150. Dandruff Control Ritual, Sensitive Scalp Care Ritual, Oily Scalp Balancing Ritual and Hair Loss Care Ritual are $199 each. Scalp Detox Ritual is a $58 add-on. ${pricingNote}`,
        },
        {
          question: "How long does a scalp-care appointment take?",
          answer:
            "The scalp-care menu lists prices for these assessments and rituals. It does not list an appointment duration for them.",
        },
        {
          question: "How is scalp care different from a head spa?",
          answer:
            "Scalp care is the menu for hair conditioning, scalp assessments and cosmetic scalp-care rituals. Head spa is a separate menu for scalp cleansing, massage and relaxation, with its own durations and prices. Ask the studio team if you are unsure which care service to choose.",
        },
        {
          question: "How do I book scalp care?",
          answer: bookAnswer("en-AU", "scalp care"),
        },
        {
          question: "Where is scalp care offered, and how do I get there?",
          answer: whereAnswer("en-AU"),
        },
      ],
    },
    "zh-Hans": {
      heading: "头皮护理常见问题",
      items: [
        {
          question: "Mend Beauty Studio 的头皮护理包含什么？",
          answer:
            "头皮护理包括发质养护、头皮检测与美容型头皮护理。菜单列出 AI头皮检测分析、毛囊健康评估、Hydra Hair Ritual 水润舒缓发质护理、头屑净化护理、敏感头皮舒缓护理、油性头皮平衡护理、防脱强韧头皮护理，以及加购项目头皮毛孔净化。头皮与发质护理属于美容护理服务，并非医疗诊断或治疗。",
        },
        {
          question: "头皮护理怎么收费？",
          answer: `AI头皮检测分析 $50，毛囊健康评估 $50，Hydra Hair Ritual 水润舒缓发质护理 $150。头屑净化护理、敏感头皮舒缓护理、油性头皮平衡护理与防脱强韧头皮护理各为 $199。头皮毛孔净化为 $58 加购项目。${priceCaveatZh}`,
        },
        {
          question: "头皮护理需要多长时间？",
          answer: "头皮护理菜单列出了这些检测与护理的价格，没有列出对应的服务时长。",
        },
        {
          question: "头皮护理和头疗有什么不同？",
          answer:
            "头皮护理菜单包含发质养护、头皮检测与美容型头皮护理。头疗是另一份菜单，侧重清洁头皮、按摩与放松，时长和价格单独列出。不确定如何选择时，可先咨询店内团队。",
        },
        {
          question: "如何预约头皮护理？",
          answer: bookAnswer("zh-Hans", "头皮护理"),
        },
        {
          question: "头皮护理在哪里做？怎么到店？",
          answer: whereAnswer("zh-Hans"),
        },
      ],
    },
  },
  "skin-facial": {
    "en-AU": {
      heading: "Facial and skin care questions",
      items: [
        {
          question: "What does a facial at Mend Beauty Studio involve?",
          answer:
            "Facials and skin care are cosmetic appointments in the MEND Skin Collection. The menu includes MEND Skin Reset Treatment, essential facials, add-ons and seven customised programs. Treatments are tailored after consultation. Individual results vary.",
        },
        {
          question: "How long do facials take, and what do they cost?",
          answer: `MEND Skin Reset Treatment is $168 for 60 mins. Essential facials are listed from $198 to $498, with times of 75 mins, 90 mins or 100 mins. Add-ons are $69: LHALA Glass Skin Peel is 20 mins, and Facial Moxibustion Ritual, Radiance Eye Renewal Ritual and Neck Renewal Care are 30 mins each. ${pricingNote}`,
        },
        {
          question: "What do the customised skin programs include?",
          answer:
            "Signature Facial Program is $1299 for 6 sessions of personalised facial care, listing deep cleansing, targeted treatment and barrier care. Collagen Renewal Program is $1399 and lists 1 NIR session, 1 collagen essence treatment and 2 AXERRO sessions. Acne Reset Program is $2339 and lists 4 P198 sessions and 4 recovery treatments. Pigment Reset Program is $1999 and lists 4 DPL sessions and 4 LHALA sessions. Glass Skin Program is $2699 and lists 4 skin-booster sessions and 4 recovery treatments. Age-Defying Program is $3599 and is described as a 6-in-1 personalised program, with the full treatment plan arranged at consultation. MEND Bridal Journey is $4999 over 3 months / 90 days and is described as a personalised face-to-body bridal care journey. Individual results vary.",
        },
        {
          question: "Who are the facials suited to?",
          answer:
            "Treatments are tailored after consultation. Individual results vary.",
        },
        {
          question: "How do I book a facial?",
          answer: bookAnswer("en-AU", "a facial"),
        },
        {
          question: "Where are facials offered, and how do I get there?",
          answer: whereAnswer("en-AU"),
        },
      ],
    },
    "zh-Hans": {
      heading: "面部与肌肤护理常见问题",
      items: [
        {
          question: "Mend Beauty Studio 的面部护理包含什么？",
          answer:
            "面部与肌肤护理是 MEND 肌肤研愈系列中的美容护理，包括修复护理、基础护理、护理加项与七个定制疗程。护理需先咨询，效果因人而异。肌肤管理属于美容护理，不作医疗、祛斑保证、注射、独家性或抗衰保证声明。",
        },
        {
          question: "面部护理要多久，怎么收费？",
          answer: `修复护理为 $168、60 分钟。基础护理系列从 $198 到 $498，列出的时长为 75 分钟、90 分钟或 100 分钟。护理加项均为 $69：韩国水光焕肤酸疗为 20 分钟，脸部桃花灸、眼部护理与颈部护理各为 30 分钟。${priceCaveatZh}`,
        },
        {
          question: "定制疗程包含哪些内容？",
          answer:
            "定制修护面部护理计划为 $1299，是 6 次套餐，列出深层清洁、定制护理与修复养护。胶原抗衰计划为 $1399，列出 1 次 NIR、1 次胶原原液管理与 2 次 AXERRO。痘肌净化计划为 $2339，列出 4 次 P198 与 4 次修复护理。色素净肤计划为 $1999，列出 4 次 DPL 与 4 次 LHALA。水光肌焕肤计划为 $2699，列出 4 次水光针与 4 次修复护理。高阶年轻化计划为 $3599，是 6合1 套餐，具体护理安排于咨询时定制。新娘焕颜计划为 $4999，为 90天私人定制。效果因人而异。肌肤管理属于美容护理，不作医疗、祛斑保证、注射、独家性或抗衰保证声明。",
        },
        {
          question: "面部护理适合谁？",
          answer: "护理需先咨询，效果因人而异。",
        },
        {
          question: "如何预约面部护理？",
          answer: bookAnswer("zh-Hans", "面部与肌肤护理"),
        },
        {
          question: "面部护理在哪里做？怎么到店？",
          answer: whereAnswer("zh-Hans"),
        },
      ],
    },
  },
  "hair": {
    "en-AU": {
      heading: "Hair service questions",
      items: [
        {
          question: "What hair services does Mend Beauty Studio offer?",
          answer:
            "Hair Atelier lists scalp analysis, wash and styling, cuts, colour and foils, balayage, perms and straightening, scalp and hair rituals, and Glass Hair Premium Signature. The cut menu includes options for women, men and children. All appointments take place at our Deepdene studio.",
        },
        {
          question: "How much do haircuts and colour cost?",
          answer: `Published prices include Fringe Refresh (From $25), Gentleman’s Precision Cut (From $55), Ladies Signature Cut (From $75), Kid Signature Cut — 0–2 Years ($45), Kid Signature Cut — Ages 3–11 (From $50), Wash & Blow Dry (From $55), Signature Colour (From $180), Root Refresh (From $130) and Signature Balayage (From $350). Dimension Highlights — ¼ Head Foils are $120, Dimension Highlights — Half Head Foils are $150, and Dimension Highlights — Full Head Foils are $250. Where a starting price is shown, the final price may vary after consultation with hair length and service complexity. ${pricingNote}`,
        },
        {
          question: "How long do hair appointments take?",
          answer:
            "Glass Hair Premium Signature lists 120 mins and is priced at $399–$599. Other cuts, colour services and perms on this menu do not list a duration.",
        },
        {
          question: "Who can book a haircut?",
          answer:
            "The cut menu includes Ladies Signature Cut, Gentleman’s Precision Cut, Kid Signature Cut — 0–2 Years and Kid Signature Cut — Ages 3–11. Styling, colour and perm sections are listed separately on the same menu.",
        },
        {
          question: "How do I book a hair appointment?",
          answer: bookAnswer("en-AU", "a hair service"),
        },
        {
          question: "Where is the hair salon, and how do I get there?",
          answer: `All appointments take place at our Deepdene studio. ${whereAnswer("en-AU")}`,
        },
      ],
    },
    "zh-Hans": {
      heading: "美发常见问题",
      items: [
        {
          question: "Mend Beauty Studio 提供哪些美发服务？",
          answer:
            "Hair Atelier 菜单包括头皮检测、洗发造型、剪发、染发与挑染、渐变染、烫发与顺直造型、头皮与发质护理，以及头皮至发梢焕新护理（含剪发）。剪发包含女士、男士和儿童项目。所有预约服务均在 Deepdene 门店进行。",
        },
        {
          question: "剪发和染发怎么收费？",
          answer: `菜单价格包括刘海修剪（From $25）、男士精剪（From $55）、女士设计剪发（From $75）、儿童剪发（0–2岁）（$45）、儿童剪发（3岁及以上，12岁以下）（From $50）、洗发造型（From $55）、全头染发（From $180）、局部补染（From $130）和渐变染（From $350）。时尚挑染 · ¼头挑染为 $120，时尚挑染 · 半头挑染为 $150，时尚挑染 · 全头挑染为 $250。标注起价的项目，最终价格可能因发长、服务复杂度及咨询结果而调整。${priceCaveatZh}`,
        },
        {
          question: "美发预约要多久？",
          answer:
            "头皮至发梢焕新护理（含剪发）列出的时长为 120 分钟，价格为 $399–$599。本菜单上的其他剪发、染发和烫发项目没有列出时长。",
        },
        {
          question: "哪些客人可以预约剪发？",
          answer:
            "剪发菜单包括女士设计剪发、男士精剪、儿童剪发（0–2岁）以及儿童剪发（3岁及以上，12岁以下）。造型、染发和烫发在同一菜单的其他分组中。",
        },
        {
          question: "如何预约美发？",
          answer: bookAnswer("zh-Hans", "美发"),
        },
        {
          question: "美发沙龙在哪里？怎么到店？",
          answer: `所有预约服务均在 Deepdene 门店进行。${whereAnswer("zh-Hans")}`,
        },
      ],
    },
  },
  "body-care": {
    "en-AU": {
      heading: "Body care questions",
      items: [
        {
          question: "What does body care at Mend Beauty Studio involve?",
          answer:
            "Body care covers body therapy and signature massage for relaxation. The Body Therapy section lists Express Neck & Shoulder Therapy, Meridian Therapy, Circulation Therapy and Lymphatic Detox Therapy. The Signature Massage section lists Express Relaxation Massage, Aroma Healing Massage, Deep Sleep Massage and MEND Signature Body Ritual. Body services support relaxation and wellbeing. They do not diagnose or treat circulation disorders, sleep conditions or other medical concerns; ‘detox’ is retained only as the poster’s service name and is not a medical claim.",
        },
        {
          question: "How long does body care take, and what does it cost?",
          answer: `Express Neck & Shoulder Therapy and Express Relaxation Massage are $88 for 30 mins. Meridian Therapy and Aroma Healing Massage are $168 for 60 mins. Circulation Therapy, Lymphatic Detox Therapy and Deep Sleep Massage are $268 for 90 mins. MEND Signature Body Ritual is $348 for 120 mins. ${pricingNote}`,
        },
        {
          question: "Who is body care suited to?",
          answer:
            "The menu is for guests booking the listed body-therapy or signature-massage appointments. Body services support relaxation and wellbeing. They do not diagnose or treat circulation disorders, sleep conditions or other medical concerns.",
        },
        {
          question: "How do I book body care?",
          answer: bookAnswer("en-AU", "body care"),
        },
        {
          question: "Where is body care offered, and how do I get there?",
          answer: whereAnswer("en-AU"),
        },
      ],
    },
    "zh-Hans": {
      heading: "身体护理常见问题",
      items: [
        {
          question: "Mend Beauty Studio 的身体护理包含什么？",
          answer:
            "身体护理包括身体理疗与特色按摩，用于放松。身体理疗列出头肩颈舒缓、经络调理、气血循环调理和全身淋巴排毒调理。特色按摩列出快速舒缓按摩、芳香舒缓按摩、深度睡眠疗愈和全身焕活身心能量管理。身体护理支持放松与身心舒适，不诊断或治疗循环障碍、失眠或其他医疗问题，也不作医疗排毒声明。",
        },
        {
          question: "身体护理要多久，怎么收费？",
          answer: `头肩颈舒缓与快速舒缓按摩为 $88、30 分钟。经络调理与芳香舒缓按摩为 $168、60 分钟。气血循环调理、全身淋巴排毒调理与深度睡眠疗愈为 $268、90 分钟。全身焕活身心能量管理为 $348、120 分钟。${priceCaveatZh}`,
        },
        {
          question: "身体护理适合谁？",
          answer:
            "菜单供预约所列身体理疗或特色按摩的客人选择。身体护理支持放松与身心舒适，不诊断或治疗循环障碍、失眠或其他医疗问题，也不作医疗排毒声明。",
        },
        {
          question: "如何预约身体护理？",
          answer: bookAnswer("zh-Hans", "身体护理"),
        },
        {
          question: "身体护理在哪里做？怎么到店？",
          answer: whereAnswer("zh-Hans"),
        },
      ],
    },
  },
};

export function serviceFaq(slug: string, locale: Locale) {
  return serviceFaqs[slug]?.[locale];
}
