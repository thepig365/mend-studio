// Public-safe operating guidance only. Never put private staff, customer or financial records here.
export const playbookVersion = "Working version · 23 October 2026";

export const strategyPrinciples = [
  { title: "A complete MEND experience", detail: "Present Korean-inspired hair, scalp, facial and body care together with skilled people, genuine care and the studio’s art and space. Show the experience, not only a treatment or discount." },
  { title: "Make every promise observable", detail: "Use real consultations, service steps, approved artist stories and practical first-visit information. Confirm people’s roles, quotations, image rights, prices and service limits before publication." },
  { title: "Local demand, clear next step", detail: "Start with useful Deepdene service information and nearby discovery. Each piece has one purpose and one relevant service or booking destination. Do not claim to operate in suburbs where there is no studio." },
  { title: "One paid test, only after approval", detail: "Hair, facial, head spa and body services are all candidates. Select one deliverable entry service using verified capacity, service quality and privately reviewed economics. No automatic boosts, discounts or spending." },
  { title: "Service quality before more traffic", detail: "Good marketing depends on supported staff, clear consultation, transparent pricing, calm handovers and useful aftercare. Resolve repeated service issues rather than masking them with more advertising." },
  { title: "Evidence, not vanity metrics", detail: "Separate reach, enquiries, confirmed bookings, attended visits and mature repeat visits. Establish a real baseline before setting targets. A booking-link click is not a completed booking." },
];

export const remoteRoles = [
  { role: "Marketing coordinator", responsibility: "Own the calendar, briefs, asset requests, task evidence and weekly report. Prepare content, SEO/AEO and channel improvements remotely; escalate decisions, not every small task." },
  { role: "Shop liaison · confirm assignee", responsibility: "Confirm service facts and capacity, gather permitted photos and practitioner answers, check customer-facing accuracy and relay service issues. This role is not assigned automatically." },
  { role: "Service practitioner / artist", responsibility: "Verify professional facts, quotations and the actual story; agree to any filming and artwork use. Capture must not interrupt care. Do not assume new marketing duties." },
  { role: "Authorised channel operator", responsibility: "Use approved individual access and publish only the approved version, scope and destination. Record the live link and inspect it on mobile. Existing channel leads retain their agreed remit." },
  { role: "Business approver", responsibility: "Decide positioning, resource limits and material commitments. Review a short decisions list; the coordinator owns routine follow-through. Private personnel and financial decisions stay outside this portal." },
];

export type PlanTask = { id: string; window: string; day: number; title: string; role: string; input: string; output: string; acceptance: string; metric: string };
export const planTasks: PlanTask[] = [
  { id: "START-01", window: "D1", day: 1, title: "Confirm remote owners and authorised access", role: "Marketing coordinator", input: "Confirmed coordinator, shop liaison and existing account administrators.", output: "An account-and-role checklist in the approved shared workspace; distinguish read and edit access.", acceptance: "Every workstream has an agreed owner. No password sharing or unapproved new access. Missing access stays blocked.", metric: "Unassigned tasks and access blockers." },
  { id: "FACT-01", window: "D1–2", day: 2, title: "Create one verified service fact sheet", role: "Shop liaison + coordinator", input: "Current website, MaSe menu and practitioner confirmation.", output: "Names, inclusions, duration, quote variables, address, opening hours, booking and cancellation rules with verifier/date.", acceptance: "Differences are resolved by the fact owner, not guessed. No customer records or payroll data in marketing files.", metric: "Unresolved differences and rechecked corrections." },
  { id: "BOOK-01", window: "D2", day: 2, title: "Check four service-to-booking journeys", role: "Website operator + shop liaison", input: "Hair, head spa, facial and body pages and correct booking destination.", output: "Mobile journey log: start URL, CTA, destination, visible steps and untested stages.", acceptance: "Correct studio and understandable next step. Do not create test bookings, occupy slots or pay without separate approval.", metric: "Broken or misleading journeys, not fictional conversion rates." },
  { id: "GBP-01", window: "D2–3", day: 3, title: "Prepare local profile accuracy fixes", role: "Authorised GBP operator", input: "Verified fact sheet, genuine photos and existing Business Profile access.", output: "Before/after checklist for hours, categories, services, photos and booking link.", acceptance: "Approved changes are checked in public Search/Maps. Pending moderation is not marked live. No keyword stuffing in the business name.", metric: "Corrected and verified facts; unresolved items." },
  { id: "SEO-01", window: "D3–4", day: 4, title: "Map search intent and page priorities", role: "SEO / website operator", input: "Current service pages and actual Search Console queries where accessible.", output: "One intent owner per service page; useful titles, internal links, first-visit details and genuine local context.", acceptance: "No duplicate suburb pages, invented search volumes or ranking guarantees. English and Chinese facts agree.", metric: "Changes verified and indexed pages observed, separately." },
  { id: "AEO-01", window: "D4–7", day: 7, title: "Prepare six practitioner-checked answers", role: "Coordinator + practitioner", input: "Real customer questions, verified service facts and source URLs.", output: "Short answer first, then process, suitability limits, price/duration rules and a relevant next step.", acceptance: "Facts checked and visible on the matching page. Structured data matches visible content. No medical promises or AI-citation guarantees.", metric: "Approved useful answers and remaining fact gaps." },
  { id: "MEASURE-01", window: "D4–7", day: 7, title: "Verify measurement before reporting results", role: "Analytics operator", input: "Authorised GA4, Search Console and booking-system read access.", output: "Capability sheet for consented page views, booking clicks, confirmed bookings and attended visits.", acceptance: "Observed, unsupported and unverified are distinct. No personal data in URLs. Do not call a link click revenue.", metric: "Verified signals, unknown sources and tracking gaps." },
  { id: "CONTENT-01", window: "D5–6", day: 6, title: "Produce practitioner and first-visit asset packs", role: "Coordinator + shop liaison", input: "Agreed filming window, service facts and separate organic/ad usage permissions.", output: "A stylist story and a practitioner story: main vertical edit, short cut, photos, captions, fact notes and rights record.", acceptance: "Real footage, readable captions, one CTA and no invented testimonial. Staff demos are labelled; service remains uninterrupted.", metric: "Complete usable packs, not raw clip count." },
  { id: "SERVICE-01", window: "D6", day: 6, title: "Rehearse the promise at the shop", role: "Shop liaison / training lead", input: "Confirmed reception coverage, service standards and staff feedback.", output: "A first-visit and issue-handling rehearsal with improvement owner and follow-up date.", acceptance: "Welcome, consent, quoted cost, comfort, aftercare and handover are clear. Staff have time, tools and support.", metric: "Resolved experience gaps and repeat issues." },
  { id: "META-01", window: "D7–8", day: 8, title: "Release approved practitioner stories", role: "Authorised FB / IG operator", input: "Approved edits, channel-specific captions, permissions and correct links.", output: "Separate FB/IG previews, publication record and mobile check.", acceptance: "Only authorised posts go live; otherwise keep ready for review. No automatic paid boost. Adapt the CTA to the actual account features.", metric: "48–72 hour engagement diagnostics plus traceable enquiries." },
  { id: "SOCIAL-01", window: "D7–14", day: 14, title: "Coordinate Chinese-channel material", role: "Coordinator + existing channel lead", input: "Approved shared facts and assets; channel lead’s agreed schedule.", output: "Optional material pack, confirmed handoff and useful question summary.", acceptance: "The existing lead owns voice and timing; do not assume extra duties or working external links. No private chat replication.", metric: "Useful enquiries and verified bookings, with unknown source retained." },
  { id: "ART-01", window: "D10–13", day: 13, title: "Tell the real art-and-space story", role: "Coordinator + artist / shop liaison", input: "Artist’s own account, confirmed role, actual works and image/artwork permissions.", output: "An approved art-and-space story showing what a visitor really experiences.", acceptance: "No invented origin story or artwork meaning; permissions cover the proposed channel and use. Missing approval means draft.", metric: "Usable story, audience questions and traceable interest." },
  { id: "ENQUIRY-01", window: "D9 onward", day: 9, title: "Close enquiry and service handoff gaps", role: "Reception lead + coordinator", input: "Authorised minimal aggregate status, not customer health or private chat records.", output: "Unresolved enquiry categories, responsible role and next action in the approved operating system.", acceptance: "No unverified appointment availability or price promises. Service complaints go to the shop, not public argument.", metric: "Enquiry → booking → attendance; each stage reported separately." },
  { id: "REVIEW-01", window: "D14", day: 14, title: "Deliver the first evidence-based review", role: "Marketing coordinator", input: "Live links, task evidence, channel snapshots and aggregate booking outcomes.", output: "What shipped, what is blocked, what was learned and decisions needed; next owner and deadline.", acceptance: "Small samples and missing data are explicit. No paid launch unless amount, window, operator and stop rules are separately approved.", metric: "Verified deliverables and customer outcomes, not guaranteed targets." },
  { id: "IMPROVE-01", window: "D15–21", day: 21, title: "Improve one variable and fill content gaps", role: "Coordinator + relevant operator", input: "Comparable content observations, genuine questions and service capacity.", output: "One focused improvement, one under-explained service story and follow-up checks.", acceptance: "Do not change offer, audience, page and creative all at once. Any paid test follows its approved window and limit.", metric: "Comparable observation periods and useful enquiries." },
  { id: "MONTH-01", window: "D22–30", day: 30, title: "Hand over a repeatable next-month plan", role: "Marketing coordinator", input: "Task record, source evidence, service feedback and private business review where authorised.", output: "Keep / change / stop / learn decisions, reusable calendar, assets and role handover.", acceptance: "No automatic additional spend or hiring. Future bookings are not attended visits; only mature cohorts support repeat-visit rates.", metric: "Delivery reliability, attended new clients and service/retention evidence." },
];

export const channelPlaybooks = [
  { title: "Google Business Profile / Maps", purpose: "Capture nearby intent with trustworthy facts and a usable booking route.", cadence: "Check feedback each staffed business day; review facts weekly and when hours or services change.", steps: ["Match the approved business fact sheet: name, address, phone, map pin, hours, categories and actual services.", "Use genuine exterior, interior, practitioner and approved art/space photos. Inspect public display after authorised changes.", "Prepare one useful update from the week’s real story. Link to a matching service page; do not invent offers.", "Invite genuine feedback neutrally. Never reward five-star reviews, named mentions, review volume or removal of criticism."], done: "Public evidence link or dated check; moderation-pending remains pending.", measure: "Profile actions and traceable enquiries; review count is context, not a reward target." },
  { title: "Instagram / Facebook", purpose: "Make people, care and the studio experience recognisable.", cadence: "Starter rhythm: two main short videos and one service explainer per week, adapted for both channels; adjust to real capacity.", steps: ["Choose one person, question or care detail per story; show real proof and one next step.", "Create a vertical main edit, short cut, usable photos, captions and rights/fact notes from the same capture.", "Adapt Facebook to a clear local context and link. Check the actual Instagram bio/Story link before writing the CTA.", "Get exact version and destination approval; inspect on mobile after publishing and review after 48–72 hours."], done: "Approved preview, usage permissions, live URL and working next step. Organic permission does not imply advertising permission.", measure: "Watch, save and share data diagnose content; enquiries, bookings and attendance establish business usefulness." },
  { title: "Chinese social / Xiaohongshu", purpose: "Support the existing channel lead with accurate material, without taking over their audience or account.", cadence: "Agree the handoff with the current lead; keep their established editorial rhythm.", steps: ["Supply verified service facts, approved footage and genuine customer questions, not a mandatory posting quota.", "Let the channel lead select title, tone, first image and platform-appropriate format.", "Use only features and enquiry routes actually available to that account; do not assume clickable external links.", "Share a brief aggregate learning summary. Keep private conversations in the authorised source system."], done: "Agreed handoff, approved content and actual publication record if published.", measure: "Useful questions, saved content and attributable enquiries/bookings; no fabricated reach or best-time claims." },
  { title: "Website / MaSe booking", purpose: "Make the promise understandable and the next action easy.", cadence: "Review key routes weekly and before each campaign launch or booking-link change.", steps: ["Keep one canonical service fact sheet. Explain actual inclusions, duration and quote rules without guessing.", "Send service content to the corresponding existing service page; art stories may lead to the studio story first.", "Check mobile navigation from page to correct booking destination without creating a real appointment.", "Use consistent UTMs on external campaign links only, never internal navigation; exclude names, contact details and health information."], done: "Start URL, destination, tested stages and limits recorded. Technical link success and analytics receipt are separate checks.", measure: "Consented website signals, booking-link clicks, actual bookings and attended visits remain separate." },
  { title: "Google Search advertising · approval required", purpose: "Test one deliverable entry service, not every service simultaneously.", cadence: "Prepare only; if separately approved, review spend and delivery each staffed day within the authorised window.", steps: ["Choose the service using verified capacity, a reliable experience and private economic review.", "Draft tightly relevant seed queries and exclusions for jobs, courses or equipment where irrelevant; do not invent volume.", "Prepare two evidence-based message angles with the same service and correct landing page.", "Do not launch until total limit, dates, payment method, operator, approvals and stop conditions are clear. Broken booking or exhausted capacity needs escalation."], done: "Reviewable campaign brief first; a generated draft is not a live campaign.", measure: "Actual spend and attributable attended new clients where available; costs and financial details stay in approved private systems." },
];

export const keywordMap = [
  { intent: "Find the studio", seeds: "MEND Beauty Studio; MEND Deepdene; MEND 美容", path: "/", check: "Consistent name, contact facts, story and service navigation." },
  { intent: "Hair service / local visit", seeds: "hair salon Deepdene; hairdresser Deepdene; Deepdene 美发", path: "/services/hair", check: "Actual practitioner, consultation, service choices and pricing rules." },
  { intent: "Head spa / first visit", seeds: "head spa Deepdene; scalp care Deepdene; Deepdene 头疗", path: "/services/head-spa", check: "Real process, inclusions, duration and non-medical care boundaries." },
  { intent: "Facial / skin care", seeds: "facial Deepdene; Korean skin management Deepdene; Deepdene 面部护理", path: "/services/skin-facial", check: "Actual techniques and suitability information confirmed by practitioner." },
  { intent: "Body care / relaxation", seeds: "body care Deepdene; relaxation massage Deepdene; Deepdene 身体护理", path: "/services/body-care", check: "Only currently provided services and accurate care language." },
  { intent: "Understand the art and people", seeds: "MEND studio story; MEND art space; MEND 团队", path: "/our-story", check: "Verified roles, real quotations and approved artwork/portrait use." },
];

export const seoSteps = [
  "Baseline: record the date, source and access limitations. Review actual Search Console queries and indexed URLs where available; a successful HTTP response is not evidence of Google indexing.",
  "Intent map: give each real service one primary page. Use Deepdene context naturally. Seed terms are hypotheses, not measured search demand. Do not mass-produce near-identical suburb pages.",
  "Page brief: clear title and H1, useful direct answer, actual service details, practitioner proof, first-visit logistics, relevant FAQ and one booking CTA. Add only facts verified by the shop.",
  "Internal links: link from service overview and related explanations to the right service; make English and Chinese counterparts consistent and review canonical / hreflang behaviour.",
  "Technical review: status codes, mobile layout, performance, descriptive images, crawl rules, canonical URLs, sitemap and structured data. Keep /marketing and auth routes out of indexing.",
  "Release and inspect: use the existing reviewed website workflow, inspect the live page, then request inspection through Search Console if authorised. Submission is not guaranteed indexing.",
  "Measure: compare similar time windows and distinguish branded/non-branded queries. Record impressions, clicks, CTR, query/page observations and customer outcomes with sample limitations.",
];

export const aeoSteps = [
  "Build a real question bank from approved aggregate enquiry themes: what happens, what is included, duration, cost variables, first-visit preparation, maintenance and when to ask a practitioner.",
  "Draft an answer-first block: a short direct answer, supporting details, limits, fact source, reviewer/date and one next action. Never invent suitability, contraindications or treatment claims.",
  "Attach the answer to the page that owns the intent. Keep visible text, business facts and appropriate structured data consistent. FAQ markup is not a promise of a rich result.",
  "Strengthen evidence: real practitioner identity and approved qualifications, genuine photos, useful process detail and trustworthy contact/location facts. Do not invent credentials or cite AI as evidence.",
  "Check discoverability separately from answer quality. AEO builds on useful crawlable content; special AI files, mass FAQ generation and paid tools are not prerequisites or guarantees.",
  "Use a fixed prompt set for manual observation. Record engine, date, wording, relevant location/context, whether MEND appears and the actual cited URL. Keep screenshots where permitted.",
  "Repeat comparable observations after changes, note variability and avoid declaring causation from one response. AI mentions, source citations, referral visits and completed bookings are four different outcomes.",
];

export const answerQuestions = [
  "What should I expect on my first visit to MEND in Deepdene?",
  "How do I choose between a head spa and another scalp-care service?",
  "What is included in this facial, and how is its price determined?",
  "How does a hair consultation help decide the right service?",
  "What body-care service is actually available, and how do I enquire?",
  "Where is MEND, how do I book, and what should I confirm beforehand?",
];

export const serviceStandards = [
  "Enquiry: clarify the service and preferred date; verify availability and quotation variables before promising anything.",
  "Arrival: welcome the guest, explain the flow and communicate delays rather than leaving people uncertain.",
  "Consultation: listen, repeat the goal, confirm the service, duration and cost before starting; respect refusal and privacy.",
  "During care: check comfort, hygiene and communication preferences; filming must never compromise the service.",
  "Departure: check the result together, explain the bill, offer one or two useful aftercare points and an optional next appointment.",
  "Aftercare: follow up only through consented, authorised channels and according to real care needs. Resolve issues before selling more.",
  "Staff support: provide fair and timely pay, realistic staffing, breaks, materials, training and a safe escalation route. Payroll and individual concerns remain private.",
  "Recognition: recognise verified care, teamwork, learning and problem resolution under a fair approved policy. Rewards never replace wages or depend on five-star reviews, customer name-checks or review quotas.",
];

export const metricDefinitions = [
  { name: "Qualified enquiry", definition: "A genuine relevant service enquiry in the period, deduplicated where possible. Spam and job enquiries are separate." },
  { name: "Confirmed booking", definition: "A booking actually confirmed in the booking system, not a website click or a proposed time." },
  { name: "Attended new client", definition: "A new client who actually attended. Cancelled, no-show and future appointments remain separate." },
  { name: "Enquiry → booking", definition: "Confirmed bookings from the same enquiry cohort ÷ qualified enquiries in that cohort. Report numerator, denominator and observation window." },
  { name: "Booking → attendance", definition: "Attended appointments ÷ appointments due in the same cohort; do not penalise future appointments as no-shows." },
  { name: "Paid acquisition cost", definition: "Authorised attributable media spend ÷ attributable attended new clients, where attribution is reliable. Report unknown source and small samples; private amounts stay outside this portal." },
  { name: "Rebooking vs repeat visit", definition: "A next appointment booked is intent. Actual repeat-visit rate uses clients with enough time to complete the relevant maintenance window, with a fixed cohort and definition." },
  { name: "SEO / AEO signals", definition: "Search impressions/clicks, observed AI mentions/citations and referral sessions are diagnostics, not proof of revenue or ranking guarantees." },
];

export const referenceLinks = [
  { label: "Google: people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
  { label: "Google: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
  { label: "Google: Business Profile updates", href: "https://support.google.com/business/answer/7342169?hl=en" },
  { label: "Google: genuine reviews", href: "https://support.google.com/business/answer/3474122?hl=en" },
  { label: "Google: UTM campaign parameters", href: "https://support.google.com/analytics/answer/10917952?hl=en" },
];

export const discoveryPrompts = [
  "Find me a hair studio in the Balwyn area.",
  "Find a hairdresser in Deepdene for a cut and colour. Include sources and booking links.",
  "Where can I get a Korean-style perm near Balwyn, Melbourne? Show sources and the actual suburb of each salon.",
  "Where can I book a head spa near Balwyn or Deepdene? Compare what is included and link to the current menus.",
  "Find a Korean facial near Deepdene, Melbourne, and explain what the service includes.",
  "Where can I book a relaxation massage or body treatment near Balwyn? Include the actual location and booking link.",
  "推荐 Balwyn 附近可预约的理发店，注明真实地址、服务特色和来源。",
  "Deepdene 附近有哪些提供理发、头疗、面部或身体护理的美容工作室？请按实际服务分别列出来源。",
];

export const aeoPlatformGuidance = [
  { title: "ChatGPT Search: eligibility is not recommendation", detail: "Check OAI-SearchBot rules, readable public pages and verified server/CDN evidence where authorised. A normal page response or spoofed user-agent does not prove the real crawler succeeded. OAI-SearchBot search access is separate from GPTBot training; do not change training choices or weaken WAF/security rules. Keep the marketing portal private." },
  { title: "Google AI: normal search foundations", detail: "Keep useful pages indexable with accurate visible facts and matching structured data. There is no required AI-only schema. Google AI clicks are included in Search Console Web totals, not a separate reliable AI acquisition report. Useful FAQs are for customers, not a promised rich-result display." },
  { title: "Controlled discovery observation", detail: "Run each non-brand prompt in a fresh search-enabled conversation without mentioning MEND first. Fix language, search mode and observable model choice. Record date/time in Australia/Melbourne, approximate location context and personalisation state without changing privacy settings. All prompts below are unexecuted until an operator records real evidence." },
  { title: "Score observations, not an alleged ranking", detail: "0: not mentioned. 1: mentioned without supporting citation. 2: mentioned with a valid supporting citation. 3: relevant citation plus correct location and usable booking route. Record factual errors separately. Report counts out of eight, not a platform ranking or guaranteed future recommendation rate." },
  { title: "Attribution has limits", detail: "Log the exact cited URL and actual referral/UTM data where present. A mention is not a click; a click is not a booking. Consent, copied links, app browsers and cross-domain booking can leave unknown attribution. Never label all direct traffic as AI or manufacture source parameters to create results." },
];
