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

type ChinesePageMetadataInput = Omit<PageMetadataInput, "path"> & {
  /** English route path. The Chinese canonical is generated under /zh. */
  path: string;
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
  const chineseUrl =
    path === "/" ? `${site.url}/zh` : `${site.url}/zh${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-AU": canonical,
        "zh-Hans": chineseUrl,
        "x-default": canonical,
      },
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

export function chinesePageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: ChinesePageMetadataInput): Metadata {
  const englishUrl = path === "/" ? site.url : `${site.url}${path}`;
  const chinesePath = path === "/" ? "/zh" : `/zh${path}`;
  const canonical = `${site.url}${chinesePath}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-AU": englishUrl,
        "zh-Hans": canonical,
        "x-default": englishUrl,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "zh_CN",
      alternateLocale: ["en_AU"],
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
