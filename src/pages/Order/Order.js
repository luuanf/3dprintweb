import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineCamera,
} from 'react-icons/hi';
import { getCategoryBySlug } from '../../data/products';
import { FIXED_SIZE_CM, FIXED_PRICE_CENTS } from '../../data/pricing';
import { useCart } from '../../context/CartContext';
import SEO from '../../components/common/SEO';
import './Order.css';

function Order() {
  const { slug } = useParams();
  const product = getCategoryBySlug(slug);
  const { addItem, formatPrice } = useCart();
  const navigate = useNavigate();

  const [notes, setNotes] = useState('');

  const handleAddToCart = () => {
    addItem({
      category: product.id,
      notes,
    });
    navigate('/carrinho');
  };

  if (!product) return <Navigate to="/" replace />;

  const priceDisplay = formatPrice(FIXED_PRICE_CENTS);

  return (
    <div className="order-page">
      <SEO
        title={`Personalizar ${product.name}`}
        description={`Preencha os detalhes pra personalizar sua ${product.name.toLowerCase()} e finalizar o pedido.`}
        path={`/pedido/${product.slug}`}
        noIndex
      />
      <section className="order-header-section">
        <div className="container">
          <Link to={`/${product.slug}`} className="order-back">
            <HiOutlineArrowLeft /> Voltar para {product.name}
          </Link>

          <motion.div
            className="order-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="order-header__tag">{product.heroSubtitle}</span>
            <h1 className="order-header__title">
              Personalizar <em>{product.name}</em>
            </h1>
            <p className="order-header__price">{priceDisplay}</p>
          </motion.div>
        </div>
      </section>

      <section className="order-content">
        <div className="container">
          <div className="order-grid">
            <motion.div
              className="order-info-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="order-step">
                <span className="order-step__num">01</span>
                <span className="order-step__label">Como funciona</span>
              </div>

              <div className="order-info-card">
                <div className="order-info-card__icon">
                  <HiOutlineCamera />
                </div>
                <h3 className="order-info-card__title">
                  Sem anexo de foto por aqui
                </h3>
                <p className="order-info-card__text">
                  Para deixar tudo mais rápido e pessoal, a foto é combinada
                  direto com a gente depois. Assim que recebemos seu pedido,
                  entramos em contato pelo WhatsApp ou e-mail para:
                </p>
                <ul className="order-info-card__list">
                  <li>pedir as fotos de referência que você tiver;</li>
                  <li>alinhar detalhes de pose, roupa e expressão;</li>
                  <li>combinar prazo, forma de pagamento e entrega.</li>
                </ul>
                <p className="order-info-card__hint">
                  No próximo passo é só deixar suas observações e adicionar ao
                  carrinho.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="order-form-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="order-step">
                <span className="order-step__num">02</span>
                <span className="order-step__label">Detalhes do pedido</span>
              </div>

              <div className="order-details">
                <div className="order-form__group">
                  <label className="order-form__label">Observações</label>
                  <textarea
                    className="order-form__textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Conte pra gente: pose, roupa, acessórios, alguma referência que gostaria que lembrássemos..."
                    rows={6}
                  />
                </div>

                <div className="order-summary-box">
                  <div className="order-summary-box__row">
                    <span>Produto</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="order-summary-box__row">
                    <span>Preço</span>
                    <span className="order-summary-box__price">{priceDisplay}</span>
                  </div>
                  <div className="order-summary-box__row">
                    <span>Tamanho</span>
                    <span>{FIXED_SIZE_CM} cm</span>
                  </div>
                </div>

                <button
                  className="order-add-cart"
                  onClick={handleAddToCart}
                >
                  <HiOutlineShoppingBag /> Adicionar ao carrinho
                </button>

                <p className="order-form__note">
                  Depois de adicionar ao carrinho, é só revisar e enviar o
                  pedido. A gente te chama para combinar o resto — sem
                  pagamento online nesta etapa.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Order;
