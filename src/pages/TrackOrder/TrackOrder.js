import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineCheck, HiOutlineClock } from 'react-icons/hi';
import './TrackOrder.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const params = new URLSearchParams();
      if (email.trim()) params.set('email', email.trim());

      const res = await fetch(
        `${API_BASE_URL}/api/orders/track/${orderId.trim()}?${params.toString()}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Erro ao consultar pedido.');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="track-page">
      <section className="track-hero">
        <div className="container">
          <motion.div
            className="track-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="track-hero__label">Acompanhe seu pedido</span>
            <h1 className="track-hero__title">
              Onde está sua <em>miniatura?</em>
            </h1>
            <p className="track-hero__desc">
              Digite o código do pedido recebido por e-mail para acompanhar cada etapa da produção.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="track-search">
        <div className="container">
          <motion.form
            className="track-form"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="track-form__fields">
              <div className="track-form__group track-form__group--code">
                <label className="track-form__label">Código do pedido</label>
                <input
                  className="track-form__input"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  placeholder="MC-A1B2C3D4"
                  required
                />
              </div>
              <div className="track-form__group">
                <label className="track-form__label">E-mail (opcional)</label>
                <input
                  className="track-form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              <button
                type="submit"
                className="track-form__btn"
                disabled={!orderId.trim() || loading}
              >
                <HiOutlineSearch />
                {loading ? 'Buscando...' : 'Consultar'}
              </button>
            </div>
          </motion.form>

          {error && (
            <motion.div
              className="track-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {result && (
        <section className="track-result">
          <div className="container">
            <motion.div
              className="track-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="track-card__header">
                <div>
                  <span className="track-card__order-id">{result.order_id}</span>
                  <span className="track-card__date">{formatDate(result.created_at)}</span>
                </div>
                <div className="track-card__status-badge">
                  {result.status_label}
                </div>
              </div>

              <div className="track-card__info">
                <div className="track-card__info-item">
                  <span className="track-card__info-label">Cliente</span>
                  <span className="track-card__info-value">{result.customer_name}</span>
                </div>
                <div className="track-card__info-item">
                  <span className="track-card__info-label">Total</span>
                  <span className="track-card__info-value">{result.total_formatted}</span>
                </div>
                <div className="track-card__info-item">
                  <span className="track-card__info-label">Itens</span>
                  <span className="track-card__info-value">{result.items.length} produto(s)</span>
                </div>
              </div>

              <div className="track-items">
                {result.items.map((item, i) => (
                  <div key={i} className="track-items__item">
                    <span className="track-items__name">
                      {item.name}
                      {item.size_cm != null ? ` · ${item.size_cm} cm` : ''}
                    </span>
                    <span className="track-items__qty">Qtd: {item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="track-timeline">
                <h3 className="track-timeline__title">Progresso do pedido</h3>
                <div className="track-timeline__steps">
                  {result.timeline.map((step, i) => (
                    <div
                      key={step.key}
                      className={`track-step ${step.completed ? 'track-step--done' : ''} ${step.current ? 'track-step--current' : ''}`}
                    >
                      <div className="track-step__indicator">
                        {step.completed ? (
                          <div className="track-step__check"><HiOutlineCheck /></div>
                        ) : (
                          <div className="track-step__dot">
                            {step.current && <HiOutlineClock />}
                          </div>
                        )}
                        {i < result.timeline.length - 1 && (
                          <div className={`track-step__line ${step.completed ? 'track-step__line--done' : ''}`} />
                        )}
                      </div>
                      <div className="track-step__content">
                        <span className="track-step__label">{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

export default TrackOrder;
