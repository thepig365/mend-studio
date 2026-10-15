const files: Record<string, { href: string; en: string; zh: string }[]> = {
  hair: [{ href: "/menus/hair-atelier.pdf", en: "Hair Atelier menu (PDF)", zh: "美发菜单（PDF）" }],
  "head-spa": [{ href: "/menus/scalp-body.png", en: "Head spa and body menu", zh: "头疗与身体护理菜单" }],
  "body-care": [{ href: "/menus/scalp-body.png", en: "Head spa and body menu", zh: "头疗与身体护理菜单" }],
  "skin-facial": [{ href: "/menus/skin-collection.pdf", en: "Skin Collection menu (PDF)", zh: "肌肤研愈菜单（PDF）" }, { href: "/menus/customised-programs.png", en: "Customised Programs menu", zh: "定制疗程菜单" }],
  "hair-reduction": [{ href: "/menus/hair-reduction.png", en: "Hair Reduction menu", zh: "净肤脱毛菜单" }],
};
export default function MenuDownloads({ slug, chinese = false }: { slug: string; chinese?: boolean }) {
  if (!files[slug]) return null;
  return <div className="mb-8 flex flex-wrap gap-4">{files[slug].map(file => <a key={file.href} href={file.href} target="_blank" rel="noreferrer" className="text-sm text-bronze underline">{chinese ? file.zh : file.en}</a>)}</div>;
}
