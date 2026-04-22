import React from 'react';
import {
  PROMO_ACTIVE,
  formatOriginalPrice,
  formatPromoPrice,
} from '../../data/pricing';
import './PriceTag.css';

/**
 * PriceTag renderiza o preço promocional com o preço original riscado.
 *
 * Props:
 *  - size: 'sm' | 'md' | 'lg' (default 'md')
 *  - layout: 'inline' | 'stack' (default 'inline')
 *  - showBadge: se true, mostra um selo "PROMO" (default true quando promo ativa)
 *  - className: classes extras
 */
function PriceTag({
  size = 'md',
  layout = 'inline',
  showBadge = true,
  className = '',
}) {
  const classes = [
    'price-tag',
    `price-tag--${size}`,
    `price-tag--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!PROMO_ACTIVE) {
    return <span className={classes}>{formatPromoPrice()}</span>;
  }

  return (
    <span className={classes}>
      <span className="price-tag__old">{formatOriginalPrice()}</span>
      <span className="price-tag__new">{formatPromoPrice()}</span>
      {showBadge && (
        <span className="price-tag__badge" aria-label="Preço promocional">
          Promo
        </span>
      )}
    </span>
  );
}

export default PriceTag;
