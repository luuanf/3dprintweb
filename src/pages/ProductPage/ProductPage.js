import React, { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import Gallery from '../../components/common/Gallery';
import { getCategoryBySlug } from '../../data/products';
import SEO from '../../components/common/SEO';
import { SITE_NAME, absoluteUrl } from '../../config/seo';
import { FIXED_PRICE_CENTS } from '../../data/pricing';
import { whatsappOrderUrl } from '../../config/contact';
import './ProductPage.css';

function ProductHero({ product }) {
  const featuredImage = product.portfolio?.find((p) => p.image)?.image;
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
            <a
              href={whatsappOrderUrl(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-hero__btn pp-hero__btn--secondary"
            >
              <FaWhatsapp /> Pedir pelo WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          className="pp-hero__image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={product.name}
              className="pp-hero__image-photo"
              loading="lazy"
            />
          ) : (
            <div className="pp-hero__image-placeholder">
              <span className="pp-hero__image-icon">
                <HiOutlineSparkles />
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProductSection({ section, index, product }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reversed = index % 2 !== 0;
  const photoPool = (product.portfolio || []).filter((p) => p.image);
  const sectionImage = photoPool.length
    ? photoPool[(index + 1) % photoPool.length].image
    : null;

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
          {sectionImage ? (
            <img
              src={sectionImage}
              alt={section.label}
              className="pp-section__visual-photo"
              loading="lazy"
            />
          ) : (
            <div className="pp-section__visual-placeholder">
              <span className="pp-section__visual-num">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
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
            Bora fazer sua <em>{product.name.toLowerCase()}</em>?
          </h2>
          <p className="pp-cta__price">{product.price}</p>
          <div className="pp-cta__actions">
            <a
              href={whatsappOrderUrl(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-cta__btn pp-cta__btn--order"
            >
              <FaWhatsapp /> Pedir pelo WhatsApp
            </a>
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

  const featuredImage = product.portfolio?.find((p) => p.image)?.image;
  const seoImage = featuredImage ? absoluteUrl(featuredImage) : undefined;
  const priceBrl = (FIXED_PRICE_CENTS / 100).toFixed(2);
  const productTitle = `${product.name} — ${product.tagline}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: (product.portfolio || [])
      .filter((p) => p.image)
      .map((p) => absoluteUrl(p.image)),
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'Miniatura personalizada em impressão 3D',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: priceBrl,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/${product.slug}`),
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
  };

  const faqJsonLd = product.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: product.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.name,
        item: absoluteUrl(`/${product.slug}`),
      },
    ],
  };

  const jsonLd = [productJsonLd, breadcrumbJsonLd];
  if (faqJsonLd) jsonLd.push(faqJsonLd);

  return (
    <div className="product-page">
      <SEO
        title={productTitle}
        description={`${product.shortDescription} A partir de R$${priceBrl.replace('.', ',')}. Impressão 3D em PLA e pintura à mão.`}
        path={`/${product.slug}`}
        image={seoImage}
        type="product"
        keywords={[
          product.name.toLowerCase(),
          `${product.name.toLowerCase()} personalizado`,
          'miniatura personalizada',
          'impressão 3d',
          'pintura à mão',
          'presente personalizado',
        ]}
        jsonLd={jsonLd}
      />
      <ProductHero product={product} />
      {product.sections.map((section, i) => (
        <ProductSection key={section.id} section={section} index={i} product={product} />
      ))}
      <Gallery
        label="Portfólio"
        title={<>Peças que já <em>saíram do ateliê.</em></>}
        items={product.portfolio}
        categorySlug={product.slug}
      />
      <FAQSection items={product.faq} />
      <CTASection product={product} />
    </div>
  );
}

export default ProductPage;
