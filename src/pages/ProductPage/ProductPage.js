import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineShoppingBag } from 'react-icons/hi';
import { getCategoryBySlug } from '../../data/products';
import './ProductPage.css';

function ProductHero({ product }) {
  return (
    <section className="pp-hero">
      <div className="pp-hero__bg">
        <div className="pp-hero__bg-gradient" />
      </div>
      <div className="pp-hero__content container">
        <motion.div
          className="pp-hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="pp-hero__subtitle">{product.heroSubtitle}</span>
          <h1 className="pp-hero__title">
            {product.heroTitle.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? <em>{line}</em> : line}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="pp-hero__desc">{product.heroDescription}</p>
          <span className="pp-hero__price">{product.price}</span>
          <div className="pp-hero__actions">
            <Link
              to={`/pedido/${product.slug}`}
              className="pp-hero__btn pp-hero__btn--cart"
            >
              <HiOutlineShoppingBag /> Adicionar ao carrinho
            </Link>
            <Link to={`/pedido/${product.slug}`} className="pp-hero__btn pp-hero__btn--secondary">
              Personalizar e pedir <HiOutlineArrowRight />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="pp-hero__image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="pp-hero__image-placeholder">
            <span className="pp-hero__image-icon">
              <HiOutlineSparkles />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductSection({ section, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reversed = index % 2 !== 0;

  return (
    <motion.section
      ref={ref}
      className={`pp-section ${reversed ? 'pp-section--reversed' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="pp-section__inner container">
        <div className="pp-section__visual">
          <div className="pp-section__visual-placeholder">
            <span className="pp-section__visual-num">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="pp-section__content">
          <span className="pp-section__label">{section.label}</span>
          <h2 className="pp-section__title">
            {section.title.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? <em>{line}</em> : line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="pp-section__desc">{section.description}</p>
          <ul className="pp-section__features">
            {section.features.map((feat) => (
              <li key={feat} className="pp-section__feature">
                <span className="pp-section__feature-dot" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

function AIPreviewBanner({ slug }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      className="pp-ai-banner"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        <div className="pp-ai-banner__inner">
          <div className="pp-ai-banner__icon">
            <HiOutlineSparkles />
          </div>
          <div className="pp-ai-banner__content">
            <h3 className="pp-ai-banner__title">
              Pré-visualize antes de encomendar
            </h3>
            <p className="pp-ai-banner__text">
              Na página de pedido, você pode enviar sua foto e nossa inteligência artificial
              gerará uma prévia de como ficará sua miniatura. Assim você tem certeza antes de confirmar.
            </p>
          </div>
          <Link to={`/pedido/${slug}`} className="pp-ai-banner__cta">
            Experimentar <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function PortfolioGrid({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="pp-portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="pp-portfolio__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pp-portfolio__label">Portfólio</span>
          <h2 className="pp-portfolio__title">
            Trabalhos que contam <em>histórias.</em>
          </h2>
        </motion.div>

        <div className="pp-portfolio__grid">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="pp-portfolio__item"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              <div className="pp-portfolio__item-image">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="pp-portfolio__item-placeholder">
                    <span>{String(item.id).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              <h4 className="pp-portfolio__item-title">{item.title}</h4>
              <p className="pp-portfolio__item-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="pp-faq" ref={ref}>
      <div className="container">
        <motion.div
          className="pp-faq__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pp-faq__label">Dúvidas</span>
          <h2 className="pp-faq__title">Perguntas frequentes</h2>
        </motion.div>

        <div className="pp-faq__list">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="pp-faq__item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <h4 className="pp-faq__question">{item.q}</h4>
              <p className="pp-faq__answer">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ product }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      className="pp-cta"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        <div className="pp-cta__inner">
          <h2 className="pp-cta__title">
            Pronto para criar sua <em>{product.name.toLowerCase()}</em>?
          </h2>
          <p className="pp-cta__price">{product.price}</p>
          <div className="pp-cta__actions">
            <Link to={`/pedido/${product.slug}`} className="pp-cta__btn pp-cta__btn--cart">
              <HiOutlineShoppingBag /> Adicionar ao carrinho
            </Link>
            <Link to={`/pedido/${product.slug}`} className="pp-cta__btn pp-cta__btn--order">
              Personalizar e pedir <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProductPage() {
  const { slug } = useParams();
  const product = getCategoryBySlug(slug);

  if (!product) return <Navigate to="/" replace />;

  return (
    <div className="product-page">
      <ProductHero product={product} />
      {product.sections.map((section, i) => (
        <ProductSection key={section.id} section={section} index={i} />
      ))}
      <AIPreviewBanner slug={product.slug} />
      <PortfolioGrid items={product.portfolio} />
      <FAQSection items={product.faq} />
      <CTASection product={product} />
    </div>
  );
}

export default ProductPage;
