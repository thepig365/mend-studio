// Chair-let enquiries only. Every other route keeps the studio number in lib/site.ts.
export const chairRentalPath = "/chair-rental";

export const chairRentalPhone = {
  display: "0499 666 688",
  href: "tel:+61499666688",
} as const;

export function isChairRentalPath(pathname: string) {
  const path = (pathname.split(/[?#]/)[0] ?? "").replace(/\/+$/, "") || "/";
  return path === chairRentalPath || path === `/zh${chairRentalPath}`;
}

// Null on every route except the English and Chinese chair-rental landings.
export function chairRentalPhoneForPath(pathname: string) {
  return isChairRentalPath(pathname) ? chairRentalPhone : null;
}
