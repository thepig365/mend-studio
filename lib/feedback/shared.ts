// Names must come from a published MEND profile or an owner-approved staff list.
export const feedbackProviders = [
  { id: "mejin-shick", name: "Mejin Shick", source: "/team/mejin-shick" },
] as const;

export const feedbackCopy = {
  en: {
    title: "How was your visit?",
    intro: "Your experience is at the heart of every service we provide.",
    purpose: "Your feedback is private and helps us improve our service and recognise our team. It is not a public review.",
    rating: "Your experience (required)",
    ratings: ["Very dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very satisfied"],
    provider: "Who looked after you?",
    unsure: "Not sure / someone else",
    initials: "Initials (optional)",
    comment: "A short comment (optional)",
    note: "Please do not include contact details, health information or other private information.",
    limit: "Up to 500 characters",
    submit: "Send feedback",
    sending: "Sending…",
    success: "Thank you. Your feedback has been received.",
    successDetail: "We appreciate your time and will use your feedback to care for our customers and recognise our team.",
    error: "We could not confirm your feedback was received. Please try again. Retrying will not send it twice.",
    invalid: "Please choose one rating and check the length of your initials and comment.",
    rate: "There have been several submissions from this connection. Please try again in an hour.",
    unavailable: "Feedback is temporarily unavailable. Please try again later.",
    home: "Back to MEND",
    nojs: "Please enable JavaScript to send this feedback form.",
  },
  zh: {
    title: "这次体验，您满意吗？",
    intro: "让每一位顾客拥有满意的体验，是 MEND 提供服务的首要目标。",
    purpose: "您的反馈仅供内部使用，帮助我们改善服务并认可团队的付出，不会作为公开评价发布。",
    rating: "您的体验（必选）",
    ratings: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
    provider: "哪位同事为您提供了服务？",
    unsure: "不确定 / 其他同事",
    initials: "姓名首字母（选填）",
    comment: "一句意见或建议（选填）",
    note: "请勿填写联系方式、健康信息或其他私人信息。",
    limit: "最多 500 字",
    submit: "提交反馈",
    sending: "正在提交…",
    success: "感谢您，您的反馈已收到。",
    successDetail: "谢谢您抽出时间，帮助我们改善顾客体验并认可团队的付出。",
    error: "暂时无法确认反馈是否已收到，请重试。重试不会重复提交。",
    invalid: "请选择一个评分，并检查姓名首字母及意见的长度。",
    rate: "此网络连接已提交多次反馈，请一小时后再试。",
    unavailable: "反馈服务暂时无法使用，请稍后再试。",
    home: "返回 MEND 首页",
    nojs: "请启用 JavaScript 后提交反馈表。",
  },
} as const;

export type FeedbackLocale = keyof typeof feedbackCopy;
export type FeedbackInput = {
  submissionId: string;
  rating: number;
  providerId: string | null;
  locale: FeedbackLocale;
  initials: string;
  comment: string;
};

export function validateFeedback(value: unknown): FeedbackInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const allowed = ["submissionId", "rating", "providerId", "locale", "initials", "comment", "website"];
  if (Object.keys(v).some((k) => !allowed.includes(k))) return null;
  if (typeof v.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.submissionId)) return null;
  if (typeof v.rating !== "number" || !Number.isInteger(v.rating) || v.rating < 1 || v.rating > 5) return null;
  if (v.locale !== "en" && v.locale !== "zh") return null;
  if (v.providerId !== null && !feedbackProviders.some((p) => p.id === v.providerId)) return null;
  if (typeof v.initials !== "string" || v.initials.length > 20 || typeof v.comment !== "string" || v.comment.length > 500) return null;
  if (v.website !== "") return null; // Honeypot; never pretend a rejected form was saved.
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v.initials + v.comment)) return null;
  return { submissionId: v.submissionId.toLowerCase(), rating: v.rating, providerId: v.providerId as string | null, locale: v.locale, initials: v.initials.trim(), comment: v.comment.trim() };
}

export function isFeedbackStaff(email: string | null | undefined, allowedEmail: string) {
  return Boolean(email && allowedEmail && email.trim().toLowerCase() === allowedEmail.trim().toLowerCase());
}
