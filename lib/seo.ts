import type { Metadata } from "next";
import { site } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/" or "/services/hair". */
  path: string;
  /**
   * Set true when `title` is already the complete, final title (e.g. the
   * homepage's title already includes the brand name). This bypasses the
   * root layout's `%s | Mend Beauty Studio` template via `title.absolute`,
   * preventing a duplicated "... | Mend Beauty Studio | Mend Beauty Studio"
   * tag. Leave unset for normal pages, which rely on the template.
   */
  absoluteTitle?: boolean;
};

const socialImage = {
  url: `${site.url}/images/mend-beauty-logo.png`,
  width: 1024,
  height: 1024,
  alt: site.name,
};

/** Shared canonical + OpenGraph + Twitter metadata for a page. Title and description are passed through unchanged. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const canonical = path === "/" ? site.url : `${site.url}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
