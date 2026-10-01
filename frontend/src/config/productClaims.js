// Gatekeeper for product claims. Every claim and its status lives in src/data/productCatalog.json
// (`features`), taken from the claim-validation section of the Final Revised product report:
// 'validated' claims may appear on the surfaces in `approvedFor`; 'prohibited' ones never appear.
// Surfaces: product_listing, product_page, seo.
import catalog from '../data/productCatalog.json'

const byId = Object.fromEntries(catalog.features.map((feature) => [feature.id, feature]))

// The claim's label if it may appear on `surface`, otherwise null.
export function claim(id, surface = 'product_listing') {
  const entry = byId[id]
  if (!entry || entry.status !== 'validated' || !entry.approvedFor.includes(surface)) return null
  return entry.label
}

// Labels of every claim approved for `surface`, in catalogue order.
export const claimsFor = (surface = 'product_listing') => catalog.features
  .filter((entry) => claim(entry.id, surface))
  .map((entry) => entry.label)
