import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineCheck,
  HiOutlinePaperAirplane,
} from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orders';
import SEO from '../../components/common/SEO';
import './Checkout.css';

function Checkout() {
  const { items, totalPrice, formatPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderResult, setOrderResult] = useState(null);

  if (items.length === 0 && !orderResult) {
    return <Navigate to="/carrinho" replace />;
  }

  const handleCustomerChange = (e) =>
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const canSubmit =
    customer.name.trim() &&
    customer.email.trim() &&
    customer.phone.trim() &&
    !isSubmitting;

  const handleSubmitOrder = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await createOrder({ customer, items });
      setOrderResult(result);
      clearCart();
    } catch (err) {
      console.error(err);
      setSubmitError(
        'Não foi possível enviar seu pedido agora. Tente novamente em instantes.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderResult) {
    return (
      <div className="checkout-page">
        <SEO
          title="Pedido confirmado"
          description="Seu pedido foi registrado com sucesso."
          path="/checkout"
          noIndex
        />
        <div className="checkout-success">
          <motion.div
            className="checkout-success__inner container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="checkout-success__icon"><HiOutlineCheck /></div>
            <h2 className="checkout-success__title">Deu tudo certo por aqui!</h2>
            <p className="checkout-success__order-id">
              Seu pedido é o <strong>{orderResult.orderId}</strong>
            </p>
            <p className="checkout-success__text">
              Já recebemos seu pedido aqui. Em breve a gente te chama no
              WhatsApp <strong>{customer.phone}</strong> pra pedir as fotos de
              referência, alinhar detalhes da peça e combinar prazo e
              pagamento.
            </p>
            <p className="checkout-success__subtext">
              Guarda esse número com você — a gente vai usar ele pra combinar
              tudo no WhatsApp.
            </p>
            <div className="checkout-success__actions">
              <button onClick={() => navigate('/')} className="checkout-success__btn">
                Voltar para a loja
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <SEO
        title="Finalizar pedido"
        description="Preencha seus dados de contato e endereço pra finalizar o pedido da sua miniatura personalizada."
        path="/checkout"
        noIndex
      />
      <section className="checkout-section">
        <div className="container">
          <Link to="/carrinho" className="checkout-back">
            <HiOutlineArrowLeft /> Voltar ao carrinho
          </Link>

          <motion.div
            className="checkout-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="checkout-title">Finalizar pedido</h1>
            <p className="checkout-subtitle">
              Deixa seus dados aqui pra gente te chamar no WhatsApp — não tem
              pagamento online nesta etapa, combinamos tudo na conversa.
            </p>
          </motion.div>

          <div className="checkout-layout">
            <motion.div
              className="checkout-form-area"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="checkout-form__title">Seus dados</h2>

              <div className="checkout-form__grid">
                <div className="checkout-form__group checkout-form__group--full">
                  <label className="checkout-form__label">Nome completo *</label>
                  <input
                    className="checkout-form__input"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="checkout-form__group">
                  <label className="checkout-form__label">E-mail *</label>
                  <input
                    className="checkout-form__input"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="checkout-form__group">
                  <label className="checkout-form__label">WhatsApp *</label>
                  <input
                    className="checkout-form__input"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <h3 className="checkout-form__subtitle">Endereço para entrega</h3>
              <div className="checkout-form__grid">
                <div className="checkout-form__group checkout-form__group--full">
                  <label className="checkout-form__label">Endereço</label>
                  <input
                    className="checkout-form__input"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Cidade</label>
                  <input
                    className="checkout-form__input"
                    name="city"
                    value={customer.city}
                    onChange={handleCustomerChange}
                    placeholder="Cidade"
                  />
                </div>
                <div className="checkout-form__group--half">
                  <label className="checkout-form__label">Estado</label>
                  <input
                    className="checkout-form__input"
                    name="state"
                    value={customer.state}
                    onChange={handleCustomerChange}
                    placeholder="UF"
                    maxLength={2}
                  />
                </div>
                <div className="checkout-form__group--half">
                  <label className="checkout-form__label">CEP</label>
                  <input
                    className="checkout-form__input"
                    name="zip"
                    value={customer.zip}
                    onChange={handleCustomerChange}
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <h3 className="checkout-form__subtitle">Observações gerais</h3>
              <div className="checkout-form__grid">
                <div className="checkout-form__group checkout-form__group--full">
                  <textarea
                    className="checkout-form__input checkout-form__textarea"
                    name="notes"
                    value={customer.notes}
                    onChange={handleCustomerChange}
                    placeholder="Prazo desejado, preferências de contato ou qualquer detalhe importante..."
                    rows={4}
                  />
                </div>
              </div>

              {submitError && (
                <div className="checkout-error">{submitError}</div>
              )}

              <button
                className="checkout-form__next"
                onClick={handleSubmitOrder}
                disabled={!canSubmit}
              >
                <HiOutlinePaperAirplane />
                {isSubmitting ? 'Enviando...' : 'Enviar pedido'}
              </button>

              <p className="checkout-form__secure">
                * Campos obrigatórios. A gente entra em contato pelo WhatsApp
                pra pedir as fotos, alinhar detalhes e combinar o pagamento.
              </p>
            </motion.div>

            <motion.div
              className="checkout-sidebar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h3 className="checkout-sidebar__title">Seu pedido</h3>
              <div className="checkout-sidebar__items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-sidebar__item">
                    <div className="checkout-sidebar__item-thumb">
                      <span>{item.name.charAt(0)}</span>
                    </div>
                    <div className="checkout-sidebar__item-info">
                      <span className="checkout-sidebar__item-name">{item.name}</span>
                      <span className="checkout-sidebar__item-qty">
                        Qtd: {item.quantity}
                      </span>
                    </div>
                    <span className="checkout-sidebar__item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="checkout-sidebar__divider" />
              <div className="checkout-sidebar__total">
                <span>Total estimado</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <p className="checkout-sidebar__note">
                O valor final pode mudar um pouquinho dependendo dos detalhes combinados depois.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
