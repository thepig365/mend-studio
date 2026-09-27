import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { chineseLocale } from "@/lib/i18n";
import { qrCodes } from "@/lib/qr-codes";

type QrCodePanelProps = {
  locale?: Locale;
  compact?: boolean;
  className?: string;
};

export default function QrCodePanel({
  locale = "en-AU",
  compact = false,
  className = "",
}: QrCodePanelProps) {
  const isZh = locale === chineseLocale;

  return (
    <section
      id={compact ? undefined : "qr-connect"}
      aria-label={isZh ? "扫码联系与访问" : "Scan to connect"}
      className={`${compact ? "" : "rounded-[2rem] border border-beige/70 bg-linen/60 p-6 sm:p-8"} ${className}`}
    >
      {!compact && (
        <div className="mb-6 text-center">
          <p className="eyebrow">{isZh ? "扫码连接" : "Scan to connect"}</p>
          <h2 className="mt-2 font-display text-2xl font-medium text-charcoal sm:text-3xl">
            {isZh ? "微信预约与官方网站" : "WeChat booking and official website"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cocoa">
            {isZh
              ? "微信二维码用于预约咨询；官网二维码仅用于访问网站。现有 MaSe 在线预约流程保持不变。"
              : "Use WeChat for booking assistance. The website code only opens this site. The existing MaSe online booking flow remains available."}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-taupe">
            {isZh
              ? "同一部手机操作：先保存微信二维码，再打开微信“扫一扫”，从相册选择该图片。"
              : "On the same phone: save the WeChat code, open WeChat Scan, then choose the image from Photos."}
          </p>
        </div>
      )}

      <div className={`grid ${compact ? "grid-cols-2 gap-3" : "gap-5 sm:grid-cols-2"}`}>
        {qrCodes.map((code) => {
          const label = isZh ? code.label.zh : code.label.en;
          const description = isZh ? code.description.zh : code.description.en;
          const imageSize = compact ? 112 : 208;

          return (
            <article
              key={code.id}
              className={`flex flex-col items-center rounded-2xl bg-white text-center ${
                compact ? "p-3" : "border border-beige/60 p-5"
              }`}
            >
              <a
                href={code.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} — ${isZh ? "查看原图" : "view full-size code"}`}
                className="block rounded-xl bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Image
                  src={code.image}
                  alt={`${label} QR code`}
                  width={imageSize}
                  height={imageSize}
                  unoptimized
                  className={`${compact ? "h-24 w-24" : "h-44 w-44 sm:h-52 sm:w-52"} object-contain`}
                />
              </a>
              <h3 className={`${compact ? "mt-2 text-xs" : "mt-4 text-base"} font-medium text-charcoal`}>
                {label}
              </h3>
              {!compact && <p className="mt-2 text-xs leading-relaxed text-cocoa">{description}</p>}
              <div className={`${compact ? "mt-2" : "mt-4"} flex flex-wrap justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.14em]`}>
                <a className="text-bronze underline-offset-4 hover:underline" href={code.href} target="_blank" rel="noreferrer">
                  {isZh ? "打开" : "Open"}
                </a>
                <a className="text-bronze underline-offset-4 hover:underline" href={code.image} download>
                  {isZh ? "保存" : "Save"}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
