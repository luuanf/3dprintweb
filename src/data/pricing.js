/** Preço e tamanho fixos para todas as peças. */
export const FIXED_SIZE_CM = 12;

/**
 * Preço original (cheio) e preço promocional (de/por).
 * Mantidos aqui pra ficar fácil subir/derrubar promoção.
 */
export const ORIGINAL_PRICE_CENTS = 17999;
export const FIXED_PRICE_CENTS = 11999;
export const PROMO_ACTIVE = ORIGINAL_PRICE_CENTS > FIXED_PRICE_CENTS;

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

function formatCents(cents) {
  return `R$${(cents / 100).toFixed(2).replace('.', ',')}`;
}

export function formatOriginalPrice() {
  return formatCents(ORIGINAL_PRICE_CENTS);
}

export function formatPromoPrice() {
  return formatCents(FIXED_PRICE_CENTS);
}

export function formatStartingPrice(category) {
  return formatCents(minPriceForCategory(category));
}

/**
 * Rótulo em texto puro usado em mensagens (WhatsApp, SEO, etc).
 * Quando a promo está ativa, retorna "de R$179,99 por R$119,99".
 * Caso contrário, devolve apenas o preço atual.
 */
export function formatPromoLabel() {
  if (!PROMO_ACTIVE) return formatPromoPrice();
  return `de ${formatOriginalPrice()} por ${formatPromoPrice()}`;
}
