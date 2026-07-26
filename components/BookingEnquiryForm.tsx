"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const topics = [
  "Booking — Hair",
  "Booking — Head Spa & Scalp Care",
  "Booking — Skin & Facial",
  "Booking — Body Care",
  "Booking — Brows & Lashes",
  "Semi-Permanent Beauty Consultation",
  "Gift Cards",
  "Memberships",
  "Careers / Rent a Space",
  "Other",
] as const;

const chineseTopics = [
  "预约—美发",
  "预约—头疗与头皮护理",
  "预约—皮肤管理与面部护理",
  "预约—身体护理",
  "预约—眉睫护理",
  "半永久美容咨询",
  "礼品卡",
  "会员计划",
  "招聘／场地合作",
  "其他",
] as const;

const fieldClass =
  "rounded-2xl border border-beige bg-cream px-5 py-3.5 text-sm font-normal text-charcoal placeholder:text-taupe focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30";

function enquiryText(formData: FormData) {
  return [
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Email: ${formData.get("email")}`,
    `Enquiry: ${formData.get("topic")}`,
    "",
    "Message:",
    String(formData.get("message") ?? ""),
  ].join("\n");
}

type BookingEnquiryFormProps = {
  locale?: "en-AU" | "zh-Hans";
};

export default function BookingEnquiryForm({
  locale = "en-AU",
}: BookingEnquiryFormProps) {
  const [status, setStatus] = useState("");
  const isChinese = locale === "zh-Hans";
  const availableTopics = isChinese ? chineseTopics : topics;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const topic = String(
      formData.get("topic") ?? (isChinese ? "网站咨询" : "Website enquiry"),
    );
    const subject = `Mend Beauty Studio ${isChinese ? "咨询" : "enquiry"} — ${topic}`;
    const body = enquiryText(formData);

    setStatus(
      isChinese
        ? "电子邮件应用应已打开。请检查咨询内容，然后在邮件应用中点击发送。"
        : "Your email app should now open. Please review the enquiry and press Send in your email app.",
    );
    window.location.assign(
      `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  async function copyEnquiry(form: HTMLFormElement | null) {
    if (!form) {
      return;
    }
    if (!form.reportValidity()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(enquiryText(new FormData(form)));
      setStatus(
        isChinese
          ? `咨询内容已复制。请发送至 ${site.email}，或致电 ${site.phone}。`
          : `Enquiry details copied. Email them to ${site.email}, or call ${site.phone}.`,
      );
    } catch {
      setStatus(
        isChinese
          ? `无法复制。请发送邮件至 ${site.email}，或致电 ${site.phone}。`
          : `Copying was unavailable. Please email ${site.email}, or call ${site.phone}.`,
      );
    }
  }

  return (
    <div
      id="booking-enquiry"
      className="scroll-mt-36 rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10"
    >
      <p className="eyebrow">{isChinese ? "预约或咨询" : "Book or enquire"}</p>
      <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
        {isChinese ? "发送咨询" : "Send an enquiry"}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cocoa">
        {isChinese
          ? "填写以下资料后，系统会打开您的电子邮件应用。这只是预约咨询；我们的团队会联系您确认时间。"
          : "Complete the details below and continue in your email app. This is an enquiry only; our team will contact you to confirm availability."}
      </p>

      <form
        className="mt-8 grid gap-5"
        aria-label={isChinese ? "预约咨询表格" : "Booking enquiry form"}
        onSubmit={handleSubmit}
        onReset={() => setStatus("")}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {isChinese ? "姓名" : "Name"}
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder={isChinese ? "您的姓名" : "Your name"}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            {isChinese ? "电话" : "Phone"}
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              maxLength={40}
              placeholder={isChinese ? "您的电话号码" : "Your phone number"}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {isChinese ? "电子邮箱" : "Email"}
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {isChinese ? "您想咨询什么？" : "What are you interested in?"}
          <select name="topic" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              {isChinese ? "请选择项目" : "Select a topic"}
            </option>
            {availableTopics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal">
          {isChinese ? "留言" : "Message"}
          <textarea
            name="message"
            rows={5}
            required
            maxLength={1000}
            placeholder={
              isChinese
                ? "请告诉我们您想了解的服务、日期或其他信息……"
                : "Tell us which service, date or information you are looking for…"
            }
            className={`resize-none ${fieldClass}`}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {isChinese ? "在邮件中继续" : "Continue in email"}
          </button>
          <button
            type="button"
            className="btn-outline w-full sm:w-auto"
            onClick={(event) => {
              void copyEnquiry(event.currentTarget.form);
            }}
          >
            {isChinese ? "复制咨询内容" : "Copy enquiry details"}
          </button>
        </div>

        <p className="text-xs leading-relaxed text-taupe">
          {isChinese
            ? "本网站不会储存您填写的资料。电子邮件应用会打开，您可以检查内容后发送至 "
            : "No information is stored by this website. Your email app will open so you can review the message before sending it to "}
          <a className="font-medium text-bronze hover:text-gold" href={site.emailHref}>
            {site.email}
          </a>
          {isChinese ? "。" : "."}
        </p>
        <p className="text-sm leading-relaxed text-cocoa" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </div>
  );
}
