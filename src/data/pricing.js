/** Preço e tamanho fixos para todas as peças. */
export const FIXED_SIZE_CM = 12;
export const FIXED_PRICE_CENTS = 17999;

export const CATEGORY_BASE_PRICES = {
  boneco: FIXED_PRICE_CENTS,
  pet: FIXED_PRICE_CENTS,
};

export function supportsPieceSize() {
  return false;
}

export function getPriceForSize(category) {
  return CATEGORY_BASE_PRICES[category] ?? FIXED_PRICE_CENTS;
}

export function minPriceForCategory(category) {
  return CATEGORY_BASE_PRICES[category] ?? FIXED_PRICE_CENTS;
}

export function formatSizeCmLabel(sizeCm = FIXED_SIZE_CM) {
  return `${sizeCm} cm`;
}

export function formatStartingPrice(category) {
  const cents = minPriceForCategory(category);
  return `R$${(cents / 100).toFixed(2).replace('.', ',')}`;
}
