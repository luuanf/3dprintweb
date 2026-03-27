/** Preços em centavos (BRL). Chaveiros não usam tamanhos 7–15 cm. */
export const PIECE_SIZES_CM = [7, 10, 12, 15];

const PRICE_BY_SIZE = {
  funko: { 7: 15900, 10: 18900, 12: 21900, 15: 25900 },
  pet: { 7: 13900, 10: 15900, 12: 18900, 15: 21900 },
};

export const CATEGORY_BASE_PRICES = {
  funko: 18900,
  pet: 15900,
  keychain: 8900,
};

export function supportsPieceSize(category) {
  return category === 'funko' || category === 'pet';
}

export function getPriceForSize(category, sizeCm) {
  if (!supportsPieceSize(category)) return CATEGORY_BASE_PRICES[category] ?? 0;
  const row = PRICE_BY_SIZE[category];
  if (!row || row[sizeCm] == null) return CATEGORY_BASE_PRICES[category] ?? 0;
  return row[sizeCm];
}

export function minPriceForCategory(category) {
  if (supportsPieceSize(category)) {
    const row = PRICE_BY_SIZE[category];
    return Math.min(...PIECE_SIZES_CM.map((cm) => row[cm]));
  }
  return CATEGORY_BASE_PRICES[category] ?? 0;
}

export function formatSizeCmLabel(sizeCm) {
  if (sizeCm == null) return '';
  return `${sizeCm} cm`;
}

export function formatStartingPrice(category) {
  const cents = minPriceForCategory(category);
  return `A partir de R$${(cents / 100).toFixed(2).replace('.', ',')}`;
}
