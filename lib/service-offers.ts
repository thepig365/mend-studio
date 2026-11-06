// AUD Offer / AggregateOffer objects for service JSON-LD.
// Only price strings already published on the menu are parsed. Anything else
// is left as prose in the service description so we do not invent a number.

type AudOffer = {
  "@type": "Offer" | "AggregateOffer";
  priceCurrency: "AUD";
  price?: string;
  lowPrice?: string;
  highPrice?: string;
  name?: string;
  description?: string;
};

export function audOffers(price: string): AudOffer | AudOffer[] | undefined {
  const trimmed = price.trim();

  const range = trimmed.match(/^\$(\d+)[–-]\$(\d+)$/);
  if (range) {
    return {
      "@type": "AggregateOffer",
      lowPrice: range[1],
      highPrice: range[2],
      priceCurrency: "AUD",
    };
  }

  const from = trimmed.match(/^From \$(\d+)$/);
  if (from) {
    return {
      "@type": "AggregateOffer",
      lowPrice: from[1],
      priceCurrency: "AUD",
    };
  }

  const exact = trimmed.match(/^\$(\d+)$/);
  if (exact) {
    return {
      "@type": "Offer",
      price: exact[1],
      priceCurrency: "AUD",
    };
  }

  // "$39 single · $199 / 6 sessions" — middle dot is U+00B7, as published.
  const course = trimmed.match(/^\$(\d+) single \u00b7 \$(\d+) \/ 6 sessions$/);
  if (course) {
    return [
      {
        "@type": "Offer",
        name: "Single session",
        price: course[1],
        priceCurrency: "AUD",
      },
      {
        "@type": "Offer",
        name: "6 sessions",
        price: course[2],
        priceCurrency: "AUD",
      },
    ];
  }

  const redeemable = trimmed.match(/^\$(\d+) redeemable$/);
  if (redeemable) {
    return {
      "@type": "Offer",
      price: redeemable[1],
      priceCurrency: "AUD",
      description: "Redeemable against your treatment if you proceed.",
    };
  }

  return undefined;
}
