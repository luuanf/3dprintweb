import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus, HiOutlineArrowLeft, HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/common/SEO';
import './Cart.css';

function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, formatPrice } = useCart();

  const seo = (
    <SEO
      title="Carrinho"
      description="Revise os itens selecionados e finalize o pedido."
      path="/carrinho"
      noIndex
    />
  );

  if (items.length === 0) {
    return (
      <div className="cart-page">
        {seo}
        <div className="cart-empty">
          <motion.div
            className="cart-empty__inner container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HiOutlineShoppingBag className="cart-empty__icon" />
            <h2 className="cart-empty__title">Seu carrinho tá vazio</h2>
            <p className="cart-empty__text">
              Dá uma passada nas categorias e escolhe a miniatura que tem mais a ver.
            </p>
            <Link to="/" className="cart-empty__btn">Ver produtos</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {seo}
      <section className="cart-section">
        <div className="container">
          <motion.div
            className="cart-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="cart-back">
              <HiOutlineArrowLeft /> Continuar comprando
            </Link>
            <h1 className="cart-title">Carrinho</h1>
            <p className="cart-count">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
          </motion.div>

          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="cart-item__image">
                    <div className="cart-item__placeholder">
                      <span>{item.name.charAt(0)}</span>
                    </div>
                  </div>

                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <span className="cart-item__category">{item.category}</span>
                    {item.sizeCm != null && <span className="cart-item__category">{item.sizeCm} cm</span>}
                    {item.notes && <p className="cart-item__notes">{item.notes}</p>}
                  </div>

                  <div className="cart-item__quantity">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <HiOutlineMinus />
                    </button>
                    <span className="cart-item__qty-value">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <HiOutlinePlus />
                    </button>
                  </div>

                  <div className="cart-item__price">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remover item"
                  >
                    <HiOutlineTrash />
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="cart-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="cart-summary__title">Resumo</h3>

              <div className="cart-summary__rows">
                {items.map((item) => (
                  <div key={item.id} className="cart-summary__row">
                    <span>
                      {item.name}
                      {item.sizeCm != null ? ` (${item.sizeCm} cm)` : ''}
                      {' '}× {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__total">
                <span>Total estimado</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <Link to="/checkout" className="cart-summary__checkout">
                Finalizar pedido
              </Link>

              <p className="cart-summary__note">
                Sem pagamento online por aqui — a gente combina o resto no WhatsApp.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
