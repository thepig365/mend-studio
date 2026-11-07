import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Title and meta description only. The visible H1 stays the existing category
// title. New copy uses the published studio address and basic men's haircut /
// grooming wording. Combination services and parking stay out of this copy:
// they were not reconfirmed in MaSe. The website menu is not a MaSe certification.
export const mensGroomingSeo: Record<Locale, { title: string; description: string }> = {
  "en-AU": {
    title: "Men’s Grooming near Balwyn, Deepdene",
    description: `Men’s haircuts and grooming near Balwyn at Mend Beauty Studio, ${site.address}. Use Book to open the existing booking page.`,
  },
  "zh-Hans": {
    title: "紧邻 Balwyn 的 Deepdene 男士理容",
    description: `男士剪发与理容，地点为紧邻 Balwyn 的 ${site.address}。点击“预约”打开现有预约页面。`,
  },
};
