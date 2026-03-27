import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineCheck,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineQrcode,
} from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const INSTALLMENT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Checkout() {
  const { items, totalPrice, formatPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  if (items.length === 0 && !orderResult) {
    return <Navigate to="/carrinho" replace />;
  }

  const handleCustomerChange = (e) =>
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(.{4})/g, '$1 ').trim();
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const canProceedStep1 = customer.name && customer.email && customer.phone;
  const canProceedStep2 =
    paymentMethod === 'pix' ||
    (card.number.replace(/\s/g, '').length >= 13 && card.name && card.expiry.length === 5 && card.cvv.length >= 3);

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    const orderPayload = {
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      items: items.map((item) => ({
        category: item.category,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        notes: item.notes,
        size_cm: item.sizeCm ?? null,
        photo_file_id: item.photoFileId || '',
        preview_url: item.previewUrl || '',
      })),
      payment: {
        method: paymentMethod,
        card_last4: paymentMethod === 'credit_card' ? card.number.replace(/\s/g, '').slice(-4) : '',
        installments: paymentMethod === 'credit_card' ? installments : 1,
      },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erro ao criar pedido.');
      setOrderResult(data);
      setStep(3);
      clearCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3 && orderResult) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <motion.div
            className="checkout-success__inner container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="checkout-success__icon"><HiOutlineCheck /></div>
            <h2 className="checkout-success__title">Pedido confirmado!</h2>
            <p className="checkout-success__order-id">
              Número do pedido: <strong>{orderResult.order_id}</strong>
            </p>
            <p className="checkout-success__text">
              {paymentMethod === 'pix'
                ? 'Enviaremos o QR Code do Pix para seu e-mail em instantes.'
                : `Pagamento aprovado • ${installments}× de ${formatPrice(Math.ceil(totalPrice / installments))}`
              }
            </p>
            <p className="checkout-success__text">
              Total: <strong>{orderResult.total_formatted}</strong>
            </p>
            <p className="checkout-success__subtext">
              Entraremos em contato pelo e-mail <strong>{customer.email}</strong> com os próximos passos
              e acompanhamento da produção.
            </p>
            <div className="checkout-success__actions">
              <Link to="/rastreio" className="checkout-success__btn">
                Acompanhar pedido
              </Link>
              <button onClick={() => navigate('/')} className="checkout-success__btn checkout-success__btn--secondary">
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
      <section className="checkout-section">
        <div className="container">
          <Link to="/carrinho" className="checkout-back">
            <HiOutlineArrowLeft /> Voltar ao carrinho
          </Link>

          <div className="checkout-steps">
            <div className={`checkout-steps__item ${step >= 1 ? 'checkout-steps__item--active' : ''}`}>
              <span className="checkout-steps__num">1</span>
              <span className="checkout-steps__label">Dados</span>
            </div>
            <div className="checkout-steps__line" />
            <div className={`checkout-steps__item ${step >= 2 ? 'checkout-steps__item--active' : ''}`}>
              <span className="checkout-steps__num">2</span>
              <span className="checkout-steps__label">Pagamento</span>
            </div>
            <div className="checkout-steps__line" />
            <div className={`checkout-steps__item ${step >= 3 ? 'checkout-steps__item--active' : ''}`}>
              <span className="checkout-steps__num">3</span>
              <span className="checkout-steps__label">Confirmação</span>
            </div>
          </div>

          <div className="checkout-layout">
            <div className="checkout-form-area">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="checkout-form__title">Informações pessoais</h2>

                  <div className="checkout-form__grid">
                    <div className="checkout-form__group checkout-form__group--full">
                      <label className="checkout-form__label">Nome completo</label>
                      <input className="checkout-form__input" name="name" value={customer.name} onChange={handleCustomerChange} placeholder="Seu nome" required />
                    </div>
                    <div className="checkout-form__group">
                      <label className="checkout-form__label">E-mail</label>
                      <input className="checkout-form__input" type="email" name="email" value={customer.email} onChange={handleCustomerChange} placeholder="seu@email.com" required />
                    </div>
                    <div className="checkout-form__group">
                      <label className="checkout-form__label">WhatsApp</label>
                      <input className="checkout-form__input" type="tel" name="phone" value={customer.phone} onChange={handleCustomerChange} placeholder="(00) 00000-0000" required />
                    </div>
                  </div>

                  <h3 className="checkout-form__subtitle">Endereço de entrega</h3>
                  <div className="checkout-form__grid">
                    <div className="checkout-form__group checkout-form__group--full">
                      <label className="checkout-form__label">Endereço</label>
                      <input className="checkout-form__input" name="address" value={customer.address} onChange={handleCustomerChange} placeholder="Rua, número, complemento" />
                    </div>
                    <div className="checkout-form__group">
                      <label className="checkout-form__label">Cidade</label>
                      <input className="checkout-form__input" name="city" value={customer.city} onChange={handleCustomerChange} placeholder="Cidade" />
                    </div>
                    <div className="checkout-form__group--half">
                      <label className="checkout-form__label">Estado</label>
                      <input className="checkout-form__input" name="state" value={customer.state} onChange={handleCustomerChange} placeholder="UF" />
                    </div>
                    <div className="checkout-form__group--half">
                      <label className="checkout-form__label">CEP</label>
                      <input className="checkout-form__input" name="zip" value={customer.zip} onChange={handleCustomerChange} placeholder="00000-000" />
                    </div>
                  </div>

                  <button
                    className="checkout-form__next"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                  >
                    Continuar para pagamento
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="checkout-form__title">Forma de pagamento</h2>

                  <div className="checkout-payment-methods">
                    <button
                      className={`checkout-pm ${paymentMethod === 'credit_card' ? 'checkout-pm--active' : ''}`}
                      onClick={() => setPaymentMethod('credit_card')}
                    >
                      <HiOutlineCreditCard className="checkout-pm__icon" />
                      <div>
                        <span className="checkout-pm__label">Cartão de Crédito</span>
                        <span className="checkout-pm__desc">Até 12× sem juros</span>
                      </div>
                    </button>
                    <button
                      className={`checkout-pm ${paymentMethod === 'pix' ? 'checkout-pm--active' : ''}`}
                      onClick={() => setPaymentMethod('pix')}
                    >
                      <HiOutlineQrcode className="checkout-pm__icon" />
                      <div>
                        <span className="checkout-pm__label">Pix</span>
                        <span className="checkout-pm__desc">Aprovação instantânea</span>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'credit_card' && (
                    <div className="checkout-card-form">
                      <div className="checkout-form__group checkout-form__group--full">
                        <label className="checkout-form__label">Número do cartão</label>
                        <input className="checkout-form__input" name="number" value={card.number} onChange={handleCardChange} placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="checkout-form__group checkout-form__group--full">
                        <label className="checkout-form__label">Nome no cartão</label>
                        <input className="checkout-form__input" name="name" value={card.name} onChange={handleCardChange} placeholder="Como impresso no cartão" />
                      </div>
                      <div className="checkout-card-row">
                        <div className="checkout-form__group">
                          <label className="checkout-form__label">Validade</label>
                          <input className="checkout-form__input" name="expiry" value={card.expiry} onChange={handleCardChange} placeholder="MM/AA" />
                        </div>
                        <div className="checkout-form__group">
                          <label className="checkout-form__label">CVV</label>
                          <input className="checkout-form__input" name="cvv" value={card.cvv} onChange={handleCardChange} placeholder="000" type="password" />
                        </div>
                      </div>

                      <div className="checkout-form__group checkout-form__group--full">
                        <label className="checkout-form__label">Parcelas</label>
                        <select
                          className="checkout-form__input checkout-form__select"
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                        >
                          {INSTALLMENT_OPTIONS.map((n) => (
                            <option key={n} value={n}>
                              {n}× de {formatPrice(Math.ceil(totalPrice / n))} {n === 1 ? '(à vista)' : 'sem juros'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'pix' && (
                    <div className="checkout-pix-info">
                      <div className="checkout-pix-qr">
                        <HiOutlineQrcode />
                      </div>
                      <p className="checkout-pix-text">
                        O QR Code do Pix será gerado após a confirmação do pedido.
                        <br />Valor: <strong>{formatPrice(totalPrice)}</strong>
                      </p>
                    </div>
                  )}

                  <div className="checkout-form__actions">
                    <button className="checkout-form__back-btn" onClick={() => setStep(1)}>
                      <HiOutlineArrowLeft /> Voltar
                    </button>
                    <button
                      className="checkout-form__next"
                      onClick={handleSubmitOrder}
                      disabled={!canProceedStep2 || isProcessing}
                    >
                      <HiOutlineLockClosed />
                      {isProcessing ? 'Processando...' : `Pagar ${formatPrice(totalPrice)}`}
                    </button>
                  </div>

                  <p className="checkout-form__secure">
                    <HiOutlineLockClosed /> Pagamento 100% seguro • Dados criptografados
                  </p>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-sidebar">
              <h3 className="checkout-sidebar__title">Seu pedido</h3>
              <div className="checkout-sidebar__items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-sidebar__item">
                    <div className="checkout-sidebar__item-thumb">
                      {item.previewUrl ? (
                        <img src={item.previewUrl} alt={item.name} />
                      ) : (
                        <span>{item.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="checkout-sidebar__item-info">
                      <span className="checkout-sidebar__item-name">{item.name}</span>
                      <span className="checkout-sidebar__item-qty">
                        Qtd: {item.quantity}
                        {item.sizeCm != null ? ` · ${item.sizeCm} cm` : ''}
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
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
