export const hairOfferPopupSessionKey = "mend-first-hair-visit-popup-seen";
export const hairOfferPopupDelay = 6000;

// Keep automatic promotion discovery away from booking, contact, private
// routes, unrelated service pages and the promotion destination itself.
export function isHairOfferPopupRoute(pathname: string) {
  return ["/", "/zh", "/services/hair", "/zh/services/hair"].includes(pathname);
}
