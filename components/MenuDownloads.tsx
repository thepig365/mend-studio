const files: Record<string, { href: string; en: string; zh: string }[]> = {
  hair: [{ href: "/menus/hair-atelier.pdf", en: "Hair Atelier menu (PDF)", zh: "美发菜单（PDF）" }],
  "skin-facial": [{ href: "/menus/skin-collection.pdf", en: "Skin Collection menu (PDF)", zh: "肌肤研愈菜单（PDF）" }, { href: "/menus/customised-programs.png", en: "Customised Programs menu", zh: "定制疗程菜单" }],
  "hair-reduction": [{ href: "/menus/hair-reduction.png", en: "Hair Reduction menu", zh: "净肤脱毛菜单" }],
};

// The previous scalp-body poster is not offered for download. It cannot be
// corrected from the existing artwork, so the link is withheld until a
// replacement poster is supplied. On-page prices stay authoritative.
const pendingPoster = new Set(["head-spa", "body-care"]);
const pendingCopy = {
  en: "The printable head spa and body menu is pending replacement and is not available to download. Please use the prices on this page.",
  zh: "头疗与身体护理的可下载菜单正在更换，暂不可下载。请以本页价格为准。",
};

export default function MenuDownloads({ slug, chinese = false }: { slug: string; chinese?: boolean }) {
  const links = files[slug];
  const pending = pendingPoster.has(slug);
  if (!links && !pending) return null;
  return (
    <div className="mb-8">
      {links ? (
        <div className="flex flex-wrap gap-4">
          {links.map((file) => (
            <a key={file.href} href={file.href} target="_blank" rel="noreferrer" className="text-sm text-bronze underline">
              {chinese ? file.zh : file.en}
            </a>
          ))}
        </div>
      ) : null}
      {pending ? (
        <p className="max-w-3xl text-sm leading-relaxed text-cocoa">{chinese ? pendingCopy.zh : pendingCopy.en}</p>
      ) : null}
    </div>
  );
}
