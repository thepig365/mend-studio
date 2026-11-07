import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Title and meta description only. The visible H1 stays the existing category title.
export const mensGroomingSeo: Record<Locale, { title: string; description: string }> = {
  "en-AU": {
    title: "Men’s Grooming near Balwyn, Deepdene",
    description: `Men’s haircuts and grooming near Balwyn at Mend Beauty Studio, ${site.address}.`,
  },
  "zh-Hans": {
    title: "Deepdene 男士理容，紧邻 Balwyn",
    description: `Mend Beauty Studio 提供男士剪发与理容，门店位于紧邻 Balwyn 的 ${site.address}。`,
  },
};
