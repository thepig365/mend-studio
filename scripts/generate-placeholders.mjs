// Generates soft, warm-toned placeholder SVGs into /public/images.
// Run with: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public", "images");
mkdirSync(outDir, { recursive: true });

const palettes = [
  ["#F5EFE6", "#D9C6A8"],
  ["#EFE6D8", "#C8B69D"],
  ["#F3EAE0", "#CBAD86"],
  ["#F0E8DC", "#BFA77F"],
  ["#F6F0E7", "#D2BD9C"],
];

const images = [
  ["hero", "Mend Beauty Studio", 1600, 1100],
  ["hair", "Hair Services", 1200, 900],
  ["head-spa", "Head Spa & Scalp Care", 1200, 900],
  ["skin", "Skin & Facial", 1200, 900],
  ["body", "Body Care", 1200, 900],
  ["brows", "Brows & Lashes", 1200, 900],
  ["mens", "Men's Grooming", 1200, 900],
  ["semi-permanent", "Semi-Permanent Beauty", 1200, 900],
  ["nails", "Nails", 1200, 900],
  ["gift-card", "Gift Cards", 1200, 900],
  ["memberships", "Memberships", 1200, 900],
  ["careers", "Careers", 1200, 900],
  ["signature-head-spa", "Signature Head Spa", 1200, 900],
  ["signature-blowdry", "Head Spa + Blow Dry", 1200, 900],
  ["signature-glow", "Korean Skin Glow", 1200, 900],
  ["signature-body", "Body Scrub & Relaxation", 1200, 900],
  ["signature-lash", "Lash Lift + Brow Lamination", 1200, 900],
  ["signature-repair", "Hair Repair + Scalp Care", 1200, 900],
  ["studio-1", "Studio", 1200, 900],
  ["studio-2", "Studio", 1200, 900],
  ["studio-3", "Studio", 1200, 900],
  ["studio-4", "Studio", 1200, 900],
];

function svg(label, w, h, [from, to], seed) {
  const cx1 = w * (0.2 + 0.15 * Math.sin(seed));
  const cy1 = h * 0.25;
  const cx2 = w * (0.8 - 0.1 * Math.cos(seed));
  const cy2 = h * 0.78;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${cx1.toFixed(0)}" cy="${cy1.toFixed(0)}" r="${(h * 0.32).toFixed(0)}" fill="#FFFFFF" opacity="0.16"/>
  <circle cx="${cx2.toFixed(0)}" cy="${cy2.toFixed(0)}" r="${(h * 0.42).toFixed(0)}" fill="#8A6F4D" opacity="0.08"/>
  <text x="${w / 2}" y="${h / 2 + 14}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(h * 0.05)}" letter-spacing="6" fill="#74614B" opacity="0.55">${label.toUpperCase()}</text>
</svg>
`;
}

images.forEach(([name, label, w, h], i) => {
  writeFileSync(join(outDir, `${name}.svg`), svg(label, w, h, palettes[i % palettes.length], i + 1));
});

console.log(`Generated ${images.length} placeholder images in public/images`);
