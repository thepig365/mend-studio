import { site } from "@/lib/site";

type SocialLinksProps = {
  locale?: "en-AU" | "zh-Hans";
};

const socialLinks = [
  {
    label: "Facebook",
    href: site.socialProfiles.facebook,
    icon: (
      <path
        d="M14.5 8.5h3V5h-3c-3 0-5 1.9-5 5v2H6v3.5h3.5V24H13v-8.5h3.2l.6-3.5H13v-1.7c0-1.2.4-1.8 1.5-1.8Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Instagram",
    href: site.socialProfiles.instagram,
    icon: (
      <>
        <rect
          x="5.5"
          y="5.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="14"
          cy="14"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="19.2" cy="8.9" r="1.1" fill="currentColor" />
      </>
    ),
  },
];

export default function SocialLinks({
  locale = "en-AU",
}: SocialLinksProps) {
  return (
    <div className="mt-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
        {locale === "zh-Hans" ? "关注我们" : "Follow Mend"}
      </p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {socialLinks.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.label} — Mend Beauty Studio`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 28 28"
                className="h-5 w-5"
              >
                {social.icon}
              </svg>
              <span>{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
